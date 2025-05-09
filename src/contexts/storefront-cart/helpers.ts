import Cookies from "js-cookie"

import { IGatsbyImageData } from "gatsby-plugin-image"
import { tnItem, ImageHashTable, ImageStorage } from "./types/storefront-cart"
import { SelectedVariants, SelectedVariantStorage } from "../../types/global"
import type { Cart } from "./types/storefront-cart"

const isBrowser = typeof window !== "undefined"

// creates cookie with cart item total for shopify site to use
export const createBadgeCount = cart => {
  if (isBrowser) {
    let cartCount = 0
    if (cart.tnLineItems) {
      cart.tnLineItems.forEach((item: tnItem) => {
        if (!item.isCustom) {
          cartCount += item.lineItems[0].shopifyItem.quantity
        } else {
          cartCount += 1
        }
      })
      Cookies.set("tnCartCounter", String(cartCount), {
        expires: 2592000,
        domain: ".tresnoir.com",
      })
    }
  }
}

// adds a product from custom products local storage
export const addCustomToLocalStorage = (
  cartId: string,
  id: string,
  resumeData: SelectedVariants,
  sku: string,
  handle: string
) => {
  if (isBrowser) {
    const now = new Date()
    let currentData = localStorage.getItem("customs-resume")
    let parsedCustoms = {
      cartId,
      customs: {},
    }
    if (currentData) {
      const localCustoms = JSON.parse(currentData) as SelectedVariantStorage
      parsedCustoms = localCustoms.value
    }
    parsedCustoms.customs[id] = {
      selectedVariants: resumeData,
      sku: sku,
      handle: handle,
    }
    localStorage.setItem(
      "customs-resume",
      JSON.stringify({
        value: parsedCustoms,
        expiry: now.getTime() + 2592000,
      })
    )
  }
}

// removes a product from custom products local storage
export const removeCustomFromLocalStorage = (id: string) => {
  if (isBrowser) {
    const now = new Date()
    let storageCustoms = localStorage.getItem("customs-resume")
    if (storageCustoms) {
      const localCustoms = JSON.parse(storageCustoms) as SelectedVariantStorage
      const parsedCustoms = localCustoms.value
      delete parsedCustoms.customs[id]
      localStorage.setItem(
        "customs-resume",
        JSON.stringify({
          value: parsedCustoms,
          expiry: now.getTime() + 2592000,
        })
      )
    }
  }
}

// adds a product to image local storage
export const addToImageStorage = (
  id: string,
  image: IGatsbyImageData,
  cartId: string
) => {
  if (isBrowser) {
    const now = new Date()
    let cartImages = localStorage.getItem("cart-images")
    let parsedImages: ImageHashTable = {
      cartId: cartId,
      images: {},
    }
    if (cartImages) {
      const localImages = JSON.parse(cartImages) as ImageStorage
      parsedImages = localImages.value
    }
    parsedImages.images[id] = image
    localStorage.setItem(
      "cart-images",
      JSON.stringify({
        value: parsedImages,
        expiry: now.getTime() + 2592000,
      })
    )
  }
}

// removes a product from image local storage
export const removeFromImageStorage = (id: string) => {
  if (isBrowser) {
    const now = new Date()
    let cartImages = localStorage.getItem("cart-images")
    if (cartImages) {
      const localImages = JSON.parse(cartImages) as ImageStorage
      const parsedImages = localImages.value
      delete parsedImages.images[id]
      localStorage.setItem(
        "cart-images",
        JSON.stringify({
          value: parsedImages,
          expiry: now.getTime() + 2592000,
        })
      )
    }
  }
}

// gets a product image from local storage
export const getImageFromLocalStorage = (id: string) => {
  if (isBrowser) {
    let cartImages = localStorage.getItem("cart-images")
    if (!cartImages) {
      return null
    }
    const parsedImages = JSON.parse(cartImages) as ImageStorage
    return parsedImages.value.images[id]
  }
}

// rebuild tnLineItems
export const rebuildBundles = (cart: Cart) => {
  let itemsToAdd: tnItem[] = []
  let itemsMap = new Map()
  cart.lines.edges.forEach(({ node }) => {
    const item = node
    // non-custom item
    if (item.attributes.length === 0) {
      // gift card does not have a sku, using id instead
      if (item.merchandise.product.handle === "gift-card") {
        itemsMap.set(item.merchandise.id, [{ shopifyItem: item }])
      } else {
        itemsMap.set(item.merchandise.sku, [{ shopifyItem: item }])
      }
    } else {
      // custom item
      const foundProperties = item.attributes
        .filter(
          el => el.key === "customizationId" || el.key === "customizationStep"
        )
        .map(el => el.value)
      if (foundProperties.length === 2) {
        const key = foundProperties[0]
        const step = foundProperties[1]
        if (itemsMap.has(key)) {
          let currentArr = itemsMap.get(key)
          currentArr.push({
            stepNumber: step,
            shopifyItem: item,
          })
          itemsMap.set(key, currentArr)
        } else {
          itemsMap.set(key, [
            {
              stepNumber: step,
              shopifyItem: item,
            },
          ])
        }
      }
    }
  })
  itemsMap.forEach((value, key) => {
    // normal item
    if (value.length === 1) {
      itemsToAdd.push({
        id: key,
        lineItems: value,
        image: getImageFromLocalStorage(key),
        isCustom: false,
      })
    }
    // sunglasses + case
    else if (value.length === 2) {
      itemsToAdd.push({
        id: key,
        lineItems: value.sort((a, b) => {
          return a.stepNumber - b.stepNumber
        }),
        image: getImageFromLocalStorage(key),
        isCustom: false,
      })
    }
    // customized lenses
    else {
      itemsToAdd.push({
        id: key,
        lineItems: value.sort((a, b) => {
          return a.stepNumber - b.stepNumber
        }),
        image: getImageFromLocalStorage(key),
        isCustom: true,
      })
    }
  })
  cart["tnLineItems"] = itemsToAdd
  // add to localStorage
  if (isBrowser) {
    const now = new Date()
    localStorage.setItem(
      "cart",
      JSON.stringify({
        value: cart,
        expiry: now.getTime() + 2592000,
      })
    )
  }
  createBadgeCount(cart)
  return cart
}
