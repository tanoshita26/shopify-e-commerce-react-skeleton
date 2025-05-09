import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { graphql, useStaticQuery } from "gatsby"
import { createStorefrontApiClient } from "@shopify/storefront-api-client"
import Cookies from "js-cookie"

import {
  CartFragmentFragment as CartFragmentType,
  CartCreateMutation as CartCreateMutationType,
  CartQuery as CartQueryType,
} from "./types/storefront.generated"
import type { Cart, CustomLineItem } from "./types/storefront-cart"

import CartContext from "./context"
import { ErrorModalContext } from "../error"
import {
  cartCreateMutation,
  cartDiscountCodesUpdate,
  cartQuery,
  cartLinesAdd,
  cartLinesRemove,
  cartLinesUpdate,
  cartAttributesUpdate,
} from "./handlers"
import {
  addCustomToLocalStorage,
  addToImageStorage,
  createBadgeCount,
  rebuildBundles,
  removeCustomFromLocalStorage,
  removeFromImageStorage,
} from "./helpers"
import { IGatsbyImageData } from "gatsby-plugin-image"
import { SelectedVariants } from "../../types/global"

type Props = {
  children: React.ReactNode | React.ReactNode[]
}

const isBrowser = typeof window !== "undefined"

export function CartProvider({ children }: Props) {
  const { renderErrorModal } = useContext(ErrorModalContext)
  // State
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false)
  const [isActive, setIsActive] = useState("shop")
  const [cart, setCart] = useState<Cart>()
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false)
  const [isRemovingFromCart, setIsRemovingFromCart] = useState<boolean>(false)

  const shipInsureData = useStaticQuery(graphql`
    query cartContextSettings {
      contentfulHomepage {
        autoEnableShipInsure
      }
      shopifyProduct(handle: { eq: "shipinsure" }) {
        id
        handle
        legacyResourceId
        variants {
          price
          legacyResourceId
          storefrontId
          sku
          title
        }
        featuredImage {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }
  `)

  const { autoEnableShipInsure } = shipInsureData.contentfulHomepage

  const client = createStorefrontApiClient({
    storeDomain: process.env.GATSBY_STORE_MY_SHOPIFY as string,
    apiVersion: process.env.GATSBY_SHOPIFY_API_VERSION ?? "2025-01",
    publicAccessToken: process.env.GATSBY_STORE_STOREFRONT_TOKEN as string,
  })

  const getShipInsureStatusCore = (cart: CartFragmentType | undefined) => {
    try {
      if (!cart) return false
      const shipInsureAttribute = cart.attributes.find(
        attr => attr.key === "_ShipInsure"
      )
      if (autoEnableShipInsure) {
        if (shipInsureAttribute) {
          return shipInsureAttribute.value === "false" ? false : true
        }
        return true
      } else {
        if (shipInsureAttribute) {
          return shipInsureAttribute.value === "true" ? true : false
        }
        return false
      }
    } catch (e) {
      return autoEnableShipInsure ? true : false
    }
  }

  const getShipInsureStatus = useCallback(() => {
    return getShipInsureStatusCore(cart)
  }, [cart, autoEnableShipInsure])

  const isShipInsureEnabled = getShipInsureStatus()

  /**
   * @function getDiscountParams - gets the current non-expired chechout cookie
   */
  const getDiscountParams = () => {
    try {
      const isBrowser = typeof window !== "undefined"
      if (!isBrowser) return ""
      const urlParams = new URLSearchParams(window.location.search)
      const offer = urlParams.get("offer") ?? urlParams.get("discount")
      if (!offer || offer === "") return ""
      return offer
    } catch (error) {
      return ""
    }
  }

  const getCartCookie = () => {
    return Cookies.get("shopifyCart")
  }

  const checkoutHasDiscountV2 = (code: string, cart: Cart) => {
    try {
      return cart.discountCodes.some(discount => discount.code === code)
    } catch (e) {
      return false
    }
  }

  const cartIsEmpty = cart => {
    try {
      return cart?.lines.edges.length === 0
    } catch (e) {
      return false
    }
  }

  /**
   * @function getNewCheckout - creates a new Shopify checkout
   * and sets the shopifyCheckout cookie (Shopify checkout ID)
   */
  const getNewCart = async () => {
    try {
      const response = await client.request<CartCreateMutationType>(
        cartCreateMutation,
        {
          variables: {
            input: {},
          },
        }
      )

      if (!response.data?.cartCreate?.cart) {
        throw new Error("Failed to create cart")
      }

      const newCart = response.data?.cartCreate?.cart
      // check for discount code in URL, if present cookie will be set
      const code = getDiscountParams()
      if (code && code !== "") {
        // set discount code cookie
        // this cookie will be used to apply discount code once an item is added to cart
        // buy-sdk does not allow to apply discount code on create checkout with 0 items
        // ignore if discount code is already applied
        if (!checkoutHasDiscountV2(code, newCart)) {
          Cookies.set("tnDiscountCode", code, {
            sameSite: "strict",
            expires: 2592000,
          })
        }
      }

      if (isBrowser) {
        Cookies.set("shopifyCart", String(newCart.id), {
          sameSite: "strict",
          expires: 2592000,
        })
        const now = new Date()
        // removing local storage objects
        localStorage.removeItem("cart")
        localStorage.removeItem("cart-images")
        localStorage.removeItem("customs-resume")
        newCart["tnLineItems"] = []
        createBadgeCount(newCart)
        localStorage.setItem(
          "cart",
          JSON.stringify({
            value: newCart,
            expiry: now.getTime() + 2592000,
          })
        )
        // reset image storage if new checkout
        localStorage.setItem(
          "cart-images",
          JSON.stringify({
            value: {
              checkoutId: newCart.id,
              images: {},
            },
            expiry: now.getTime() + 2592000,
          })
        )
        // reset custom product storage if new checkout
        localStorage.setItem(
          "customs-resume",
          JSON.stringify({
            value: {
              checkoutId: newCart.id,
              customs: {},
            },
            expiry: now.getTime() + 2592000,
          })
        )
      }
      return newCart
    } catch (err: any) {
      console.error(err)
      renderErrorModal()
    }
  }

  const closeDrawer = () => {
    setIsDrawerOpen(false)
  }

  const addProductToCart = useCallback(
    async (
      variantId: string,
      quantity: number,
      sku: string,
      image: IGatsbyImageData,
      shouldOpenDrawer: boolean = true
    ) => {
      try {
        if (!cart) return
        setIsAddingToCart(true)

        const lineItems = [
          {
            merchandiseId: variantId,
            quantity,
          },
        ]

        const preShipInsure = await client.request(cartLinesAdd, {
          variables: {
            cartId: cart.id,
            lines: lineItems,
          },
        })

        if (!preShipInsure.data?.cartLinesAdd?.cart) {
          throw new Error("Failed to add item to cart")
        }

        const response = await addShipInsure(
          preShipInsure.data?.cartLinesAdd?.cart
        )

        if (!response) {
          throw new Error("Failed to add ship insure to cart")
        }

        addToImageStorage(sku, image, cart.id)
        const updatedCart = rebuildBundles(response)
        setCart(updatedCart)
        setIsAddingToCart(false)
        if (shouldOpenDrawer) setIsCartDrawerOpen(true)
        handleDiscountCookie()
      } catch (err: any) {
        console.error(err)
        setIsAddingToCart(false)
        renderErrorModal()
      }
    },
    [cart]
  )

  const addProductsToCart = useCallback(
    async (lineItems: { variantId: string; quantity: number }[]) => {
      try {
        if (!cart) return
        setIsAddingToCart(true)

        const lines = lineItems.map(item => ({
          merchandiseId: item.variantId,
          quantity: item.quantity,
        }))
        const preShipInsure = await client.request(cartLinesAdd, {
          variables: {
            cartId: cart.id,
            lines,
          },
        })

        if (!preShipInsure.data?.cartLinesAdd?.cart) {
          throw new Error("Failed to add item to cart")
        }

        const response = await addShipInsure(
          preShipInsure.data?.cartLinesAdd?.cart
        )

        if (!response) {
          throw new Error("Failed to add ship insure to cart")
        }
        setCart(response)
        setIsAddingToCart(false)
        setIsCartDrawerOpen(true)
        handleDiscountCookie()
      } catch (err: any) {
        console.error(err)
        setIsAddingToCart(false)
        renderErrorModal()
      }
    },
    [cart]
  )

  const removeProductFromCart = useCallback(
    async (lineItemId: string, imageId: string) => {
      try {
        if (!cart) return

        const preShipInsure = await client.request(cartLinesRemove, {
          variables: {
            cartId: cart.id,
            lineIds: [lineItemId],
          },
        })

        if (!preShipInsure.data?.cartLinesRemove?.cart) {
          throw new Error("Failed to remove item from cart")
        }

        const response = await addShipInsure(
          preShipInsure.data?.cartLinesRemove?.cart
        )

        if (!response) {
          throw new Error("Failed to add ship insure to cart")
        }

        removeFromImageStorage(imageId)
        const updatedCart = rebuildBundles(response)
        setCart(updatedCart)
      } catch (err: any) {
        console.error(err)
        renderErrorModal()
      }
    },
    [cart]
  )

  const removeProductsFromCart = useCallback(
    async (
      lineItemIds: string[],
      imageId: string,
      hasDiscount: boolean = false
    ) => {
      try {
        if (!cart) return

        const preShipInsure = await client.request(cartLinesRemove, {
          variables: {
            cartId: cart.id,
            lineIds: lineItemIds,
          },
        })

        if (!preShipInsure.data?.cartLinesRemove?.cart) {
          throw new Error("Failed to remove item from cart")
        }

        const response = await addShipInsure(
          preShipInsure.data?.cartLinesRemove?.cart
        )

        if (!response) {
          throw new Error("Failed to add ship insure to cart")
        }

        removeFromImageStorage(imageId)
        removeCustomFromLocalStorage(imageId)
        const updatedCart = rebuildBundles(response)
        setCart(updatedCart)
      } catch (err: any) {
        console.error(err)
        renderErrorModal()
      }
    },
    [cart]
  )

  // removes an item from cart given a customization id, used for editing an item in cart
  const removeCustomProductWithId = useCallback(
    async (id: string) => {
      try {
        if (!cart) return

        let hasDiscount = false
        const itemToRemove = cart?.tnLineItems
          ? cart.tnLineItems.find(item => item.id === id)
          : false

        if (!itemToRemove) return

        const lineIds = itemToRemove.lineItems.map(item => {
          if (item.shopifyItem.discountAllocations.length > 0) {
            hasDiscount = true
          }
          return item.shopifyItem.id
        })

        await removeProductsFromCart(lineIds, itemToRemove.id, hasDiscount)
      } catch (err: any) {
        console.error(err)
        renderErrorModal()
      }
    },
    [cart]
  )

  const updateProductInCart = useCallback(
    async (
      lineId: string,
      variantId: string,
      quantity: number,
      imageId: string
    ) => {
      try {
        if (!cart) return

        const lineItems = [
          {
            id: lineId,
            merchandiseId: variantId,
            quantity,
          },
        ]

        const preShipInsure = await client.request(cartLinesUpdate, {
          variables: {
            cartId: cart.id,
            lines: lineItems,
          },
        })

        if (!preShipInsure.data?.cartLinesUpdate?.cart) {
          throw new Error("Failed to update item in cart")
        }

        const response = await addShipInsure(
          preShipInsure.data?.cartLinesUpdate?.cart
        )

        if (!response) {
          throw new Error("Failed to add ship insure to cart")
        }

        if (quantity === 0) {
          removeFromImageStorage(imageId)
        }
        const updatedCart = rebuildBundles(response)
        setCart(updatedCart)
      } catch (err: any) {
        console.error(err)
        renderErrorModal()
      }
    },
    [cart]
  )

  const checkoutHasDiscount = (code: string) => {
    try {
      return cart
        ? cart.discountCodes.some(discount => discount.code === code)
        : false
    } catch (e) {
      return false
    }
  }

  const handleDiscountCookie = async () => {
    const code = Cookies.get("tnDiscountCode")
    if (code && code !== "") {
      // check if code is already applied
      const isAlreadyApplied = checkoutHasDiscount(code)
      if (!isAlreadyApplied) {
        await addDiscountCode(code)
      }
      Cookies.remove("tnDiscountCode")
    }
  }

  const addDiscountCode = useCallback(
    async (code: string) => {
      try {
        if (!cart) return

        const response = await client.request(cartDiscountCodesUpdate, {
          variables: {
            cartId: cart.id,
            discountCodes: [code],
          },
        })

        if (!response.data?.cartDiscountCodesUpdate?.cart) {
          throw new Error("Failed to apply discount code")
        }

        if (isBrowser) {
          const now = new Date()
          localStorage.setItem(
            "checkout",
            JSON.stringify({
              value: response.data?.cartDiscountCodesUpdate?.cart,
              expiry: now.getTime() + 2592000,
            })
          )
        }

        const updatedCart = rebuildBundles(
          response.data?.cartDiscountCodesUpdate?.cart
        )
        setCart(updatedCart)
      } catch (err: any) {
        console.error(err)
        renderErrorModal()
      }
    },
    [cart]
  )

  const removeDiscountCode = useCallback(async () => {
    try {
      if (!cart) return

      const response = await client.request(cartDiscountCodesUpdate, {
        variables: {
          cartId: cart.id,
          discountCodes: [],
        },
      })

      if (!response.data?.cartDiscountCodesUpdate?.cart) {
        throw new Error("Failed to remove discount code")
      }

      if (isBrowser) {
        const now = new Date()
        localStorage.setItem(
          "checkout",
          JSON.stringify({
            value: response.data?.cartDiscountCodesUpdate?.cart,
            expiry: now.getTime() + 2592000,
          })
        )
      }

      const updatedCart = rebuildBundles(
        response.data?.cartDiscountCodesUpdate?.cart
      )
      setCart(updatedCart)
    } catch (err: any) {
      console.error(err)
      renderErrorModal()
    }
  }, [cart])

  const addProductCustomToCart = useCallback(
    async (
      lineItems: CustomLineItem[],
      key: string,
      image: IGatsbyImageData,
      resumeData: SelectedVariants,
      sku: string,
      handle: string,
      activateDrawer: boolean
    ) => {
      try {
        if (!cart) return

        setIsAddingToCart(true)

        const preShipInsure = await client.request(cartLinesAdd, {
          variables: {
            cartId: cart.id,
            lines: lineItems.map(item => ({
              merchandiseId: item.variantId,
              quantity: item.quantity,
              attributes: item.attributes,
            })),
          },
        })

        if (!preShipInsure.data?.cartLinesAdd?.cart) {
          throw new Error("Failed to add item to cart")
        }

        const response = await addShipInsure(
          preShipInsure.data?.cartLinesAdd?.cart
        )

        if (!response) {
          throw new Error("Failed to add ship insure to cart")
        }

        addToImageStorage(key, image, cart.id)
        const updatedCart = rebuildBundles(response)
        setCart(updatedCart)
        // add necessary data to localStorage to be able to resume from cart later on
        addCustomToLocalStorage(cart.id, key, resumeData, sku, handle)
        setIsAddingToCart(false)
        if (activateDrawer) setIsCartDrawerOpen(true)
        handleDiscountCookie()
      } catch (err: any) {
        console.error(err)
        setIsAddingToCart(false)
        renderErrorModal()
      }
    },
    [cart]
  )

  const addSunglassesToCart = useCallback(
    async (
      lineItems: CustomLineItem[],
      image: IGatsbyImageData,
      key: string
    ) => {
      try {
        if (!cart) return

        setIsAddingToCart(true)

        const preShipInsure = await client.request(cartLinesAdd, {
          variables: {
            cartId: cart.id,
            lines: lineItems.map(item => ({
              merchandiseId: item.variantId,
              quantity: item.quantity,
              attributes: item.attributes,
            })),
          },
        })

        if (!preShipInsure.data?.cartLinesAdd?.cart) {
          throw new Error("Failed to add item to cart")
        }

        const response = await addShipInsure(
          preShipInsure.data?.cartLinesAdd?.cart
        )

        if (!response) {
          throw new Error("Failed to add ship insure to cart")
        }

        if (isBrowser) {
          const now = new Date()
          localStorage.setItem(
            "checkout",
            JSON.stringify({
              value: response,
              expiry: now.getTime() + 2592000,
            })
          )
        }

        addToImageStorage(key, image, cart.id)
        const updatedCart = rebuildBundles(response)
        setCart(updatedCart)
        setIsAddingToCart(false)
        setIsCartDrawerOpen(true)
        handleDiscountCookie()
      } catch (err: any) {
        console.error(err)
        setIsAddingToCart(false)
        renderErrorModal()
      }
    },
    [cart]
  )

  const getAppliedDiscountCode = useCallback(() => {
    try {
      if (!cart) return ""

      if (cartIsEmpty(cart)) {
        const cookie = Cookies.get("tnDiscountCode")
        return cookie ? cookie : ""
      }

      if (cart.discountCodes.length > 0) {
        return cart.discountCodes[0].code
      }

      return ""
    } catch (err: any) {
      return ""
    }
  }, [cart])

  // Gets the correct ship insure variant based on subtotal
  const getCorrectShipInsureVariant = (subtotal: number) => {
    try {
      const shipInsureProduct = shipInsureData.shopifyProduct

      const parseRange = (sku: string) => {
        const match = sku.match(/SI_LEVEL_(\d+)-(\d+)/)
        if (match) {
          return {
            min: parseInt(match[1]),
            max: parseInt(match[2]),
          }
        }
        return null
      }

      const correctVariant = shipInsureProduct.variants.find(variant => {
        const range = parseRange(variant.sku)
        return range && subtotal >= range.min && subtotal <= range.max
      })

      if (!correctVariant && subtotal > 1000) {
        return shipInsureProduct.variants[shipInsureProduct.variants.length - 1]
      }

      if (!correctVariant) {
        let maxRangeVariant = null
        let maxRange = 0
        shipInsureProduct.variants.forEach(variant => {
          const range = parseRange(variant.sku)
          if (range && range.max > maxRange) {
            maxRange = range.max
            maxRangeVariant = variant
          }
        })
        return maxRangeVariant
      }

      return correctVariant
    } catch (e) {
      return undefined
    }
  }

  const getSubtotalWithoutShipInsure = (cart: Cart) => {
    try {
      const shipInsureItem = cart.lines.edges.find(
        ({ node }) => node.merchandise.product.handle === "shipinsure"
      )

      if (shipInsureItem) {
        return (
          Number(cart.cost.subtotalAmount.amount) -
          Number(shipInsureItem?.node.merchandise.price.amount)
        ).toFixed(2)
      }

      return cart.cost.subtotalAmount.amount
    } catch (e) {
      return cart.cost.subtotalAmount.amount
    }
  }

  // adds ship insure to cart and returns new checkout from buy-sdk
  const addShipInsure = async (cart: Cart) => {
    try {
      const subtotal = getSubtotalWithoutShipInsure(cart)
      const correctVariant = getCorrectShipInsureVariant(Number(subtotal))

      const currentShipInsure = cart.lines.edges.find(
        ({ node }) => node.merchandise.product.handle === "shipinsure"
      )

      // only add ship insure if it's not already in cart, and is enabled
      const hasShipInsureInCart = currentShipInsure !== undefined

      // check cart attributes for ship insure
      const isShipInsured = getShipInsureStatusCore(cart)

      if (!isShipInsured) return cart

      // if only ship insure in cart, remove it
      if (cart.lines.edges.length === 1 && hasShipInsureInCart) {
        const response = await client.request(cartLinesRemove, {
          variables: {
            cartId: cart.id,
            lineIds: [currentShipInsure.node.id],
          },
        })

        if (currentShipInsure.node.merchandise.sku) {
          removeFromImageStorage(currentShipInsure.node.merchandise.sku)
        }

        return response.data?.cartLinesRemove?.cart
      }

      if (hasShipInsureInCart) {
        if (
          correctVariant.storefrontId !== currentShipInsure.node.merchandise.id
        ) {
          // UPDATE SHIP INSURE
          // remove current ship insure
          await client.request(cartLinesRemove, {
            variables: {
              cartId: cart.id,
              lineIds: [currentShipInsure.node.id],
            },
          })

          if (currentShipInsure.node.merchandise.sku) {
            removeFromImageStorage(currentShipInsure.node.merchandise.sku)
          }

          // add correct ship insure
          const response = await client.request(cartLinesAdd, {
            variables: {
              cartId: cart.id,
              lines: [
                {
                  merchandiseId: correctVariant.storefrontId,
                  quantity: 1,
                },
              ],
            },
          })

          if (!response.data?.cartLinesAdd?.cart) {
            throw new Error("Failed to add correct ship insure item to cart")
          }

          addToImageStorage(
            correctVariant.sku,
            shipInsureData.shopifyProduct.featuredImage.localFile
              .childImageSharp.gatsbyImageData,
            cart.id
          )

          return response.data?.cartLinesAdd?.cart
        }
      }

      if (isShipInsured && !hasShipInsureInCart && correctVariant) {
        const lineItems = [
          {
            merchandiseId: correctVariant.storefrontId,
            quantity: 1,
          },
        ]

        const response = await client.request(cartLinesAdd, {
          variables: {
            cartId: cart.id,
            lines: lineItems,
          },
        })

        addToImageStorage(
          correctVariant.sku,
          shipInsureData.shopifyProduct.featuredImage.localFile.childImageSharp
            .gatsbyImageData,
          cart.id
        )

        return response.data?.cartLinesAdd?.cart
      }

      return cart
    } catch (err: any) {
      console.log("error", err)
      return cart
    }
  }

  // deletes ship insure from cart and returns new checkout from buy-sdk
  const deleteShipInsure = async (cart: Cart) => {
    try {
      const shipInsureItem = cart.lines.edges.find(
        ({ node }) => node.merchandise.product.handle === "shipinsure"
      )

      if (shipInsureItem) {
        const response = await client.request(cartLinesRemove, {
          variables: {
            cartId: cart.id,
            lineIds: [shipInsureItem.node.id],
          },
        })

        // remove ship insure from local storage
        if (shipInsureItem.node.merchandise.sku) {
          removeFromImageStorage(shipInsureItem.node.merchandise.sku)
        }

        return response.data?.cartLinesRemove?.cart
      }

      return cart
    } catch (err: any) {
      console.log("error", err)
      return cart
    }
  }

  const updateShipInsureAttribute = useCallback(
    async (enableShipInsure: boolean) => {
      try {
        if (!cart) return

        setIsRemovingFromCart(true)

        const response = await client.request(cartAttributesUpdate, {
          variables: {
            cartId: cart.id,
            attributes: [
              {
                key: "_ShipInsure",
                value: String(enableShipInsure),
              },
            ],
          },
        })

        if (!response.data?.cartAttributesUpdate?.cart) {
          throw new Error("Failed to update ship insure attribute")
        }

        const cartWithAttr = response.data?.cartAttributesUpdate?.cart

        // if ship insure is enabled, add the correct variant to cart
        if (enableShipInsure) {
          const updatedCheckoutWithShipInsure = await addShipInsure(
            cartWithAttr
          )

          if (!updatedCheckoutWithShipInsure) return

          const updatedCart = rebuildBundles(updatedCheckoutWithShipInsure)
          setCart(updatedCart)
          setIsRemovingFromCart(false)
        } else {
          // remove ship insure from cart
          const updatedCheckoutWithoutShipInsure = await deleteShipInsure(
            cartWithAttr
          )

          if (!updatedCheckoutWithoutShipInsure) return

          const updatedCart = rebuildBundles(updatedCheckoutWithoutShipInsure)
          setCart(updatedCart)
          setIsRemovingFromCart(false)
        }
      } catch (e) {
        console.error("error", e)
        setIsRemovingFromCart(false)
      }
    },
    [cart]
  )

  interface LocalCart {
    value: any
    expiry: number
  }

  useEffect(() => {
    const initializeCheckout = async () => {
      const validateLocalCheckout = async (localCart: LocalCart) => {
        const now = new Date()
        if (now.getTime() > localCart.expiry) {
          localStorage.removeItem("cart")
          localStorage.removeItem("cart-images")
          localStorage.removeItem("customs-resume")
          Cookies.remove("tnCartCounter")
          Cookies.remove("tnDiscountCode")
          // eslint-disable-next-line no-return-await
          return await getNewCart()
        }

        return localCart.value
      }
      try {
        console.log("initializeCheckout")
        // Check if cart exists
        const cartId = isBrowser ? getCartCookie() : null
        let cart: Cart
        // if Cart exists, fetch it from Shopify
        if (cartId) {
          console.log("cart id exists")
          // fetch cart and check if completedAt
          const response = await client.request<CartQueryType>(cartQuery, {
            variables: {
              id: cartId,
            },
          })

          if (!response.data?.cart) {
            throw new Error("Failed to fetch cart")
          }

          const fetchedCart = response.data.cart

          // Get Local Cart
          let localCart: string | null | LocalCart =
            localStorage.getItem("cart")

          // If local cart exists, validate it
          if (localCart) {
            console.log("localCart exists")
            localCart = JSON.parse(localCart) as LocalCart
            const localCartId = localCart.value.id

            if (localCartId === response.data.cart.id) {
              console.log("ids match")
              console.log("setting cart from local storage")
              cart = await validateLocalCheckout(localCart)
            } else {
              console.log("ids don't match")
              console.log("setting cart from fetched cart")
              cart = fetchedCart
            }
          } else {
            console.log(
              "localCart does not exist, setting cart from fetched cart"
            )
            cart = fetchedCart
          }
        } else {
          // if no cart exists, create a new one
          console.log("no cart id exists, creating new cart")
          cart = (await getNewCart()) as unknown as CartFragmentType
        }

        const rebuiltCart = rebuildBundles(cart)
        setCart(rebuiltCart)
      } catch (err: any) {
        console.error("ERROR", err.message)
        const cart = (await getNewCart()) as unknown as CartFragmentType
        const rebuiltCart = rebuildBundles(cart)
        setCart(rebuiltCart)
        // renderErrorModal()
      }
    }
    initializeCheckout()
  }, [])

  const value = useMemo(
    () => ({
      isDrawerOpen,
      setIsDrawerOpen,
      isCartDrawerOpen,
      setIsCartDrawerOpen,
      isActive,
      setIsActive,
      closeDrawer,
      cart,
      isAddingToCart,
      setIsAddingToCart,
      addProductToCart,
      addProductsToCart,
      removeProductFromCart,
      removeProductsFromCart,
      updateProductInCart,
      addDiscountCode,
      removeDiscountCode,
      removeCustomProductWithId,
      // customized products
      addProductCustomToCart,
      // for sunglasses
      addSunglassesToCart,
      isRemovingFromCart,
      getAppliedDiscountCode,
      updateShipInsureAttribute,
      isShipInsureEnabled,
    }),
    [
      isDrawerOpen,
      setIsDrawerOpen,
      isCartDrawerOpen,
      setIsCartDrawerOpen,
      isActive,
      setIsActive,
      cart,
      isAddingToCart,
      setIsAddingToCart,
      isRemovingFromCart,
    ]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
