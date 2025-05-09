import fetch from "node-fetch"
import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby"
import { flattenConnection } from "../utils/flattenConnection"

export default async function getDiscountedPricing(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  // START HELPER FUNCTIONS
  const formatNumber = (inputNumber: string) =>
    isNaN(parseFloat(inputNumber))
      ? NaN
      : parseFloat(parseFloat(inputNumber).toFixed(2))

  const productCreateDiscounts = (
    discount: ShopifyDiscount,
    prices: PricesType[]
  ) => {
    return prices.map(el =>
      calculateDiscount(discount, el)
    ) as DiscountedPricesType[]
  }

  const variantCreateDiscounts = (
    discount: ShopifyDiscount,
    prices: PricesType[],
    applicableVariants: ShopifyApplicableVariant[]
  ) => {
    let discountedPrices: DiscountedPricesType[] = []
    for (const item of prices) {
      const { id } = item
      const variantId = applicableVariants.some(
        el => getLegacyId(el.id) === String(id)
      )
      if (variantId) {
        const discountedPrice = calculateDiscount(discount, item)
        discountedPrices.push(discountedPrice as DiscountedPricesType)
      }
    }
    return discountedPrices
  }

  const calculateDiscount = (
    discount: ShopifyDiscount,
    variant: PricesType
  ) => {
    const discountValue = discount.customerGets.value
    const { id } = variant
    const price = formatNumber(variant.price)
    if (discountValue.__typename === "DiscountAmount") {
      const { amount } = discountValue
      const calcAmount = price - amount.amount
      const discountAmount = calcAmount <= 0 ? 0 : calcAmount
      const roundedDiscountAmount = roundShopify(discountAmount)
      return {
        id,
        discountedPrice: Number(roundedDiscountAmount),
      }
    } else if (discountValue.__typename === "DiscountPercentage") {
      const { percentage } = discountValue
      const discountAmount = price - price * percentage
      const roundedDiscountAmount = roundShopify(discountAmount)
      return {
        id,
        discountedPrice: Number(roundedDiscountAmount),
      }
    }
    return res
      .status(400)
      .json({ error: "Error while fetching from admin api" })
  }

  const getLegacyId = (id: string): string => {
    try {
      const match = id.match(/(\d+)$/)
      return match ? match[0] : ""
    } catch (err: any) {
      return ""
    }
  }

  const roundShopify = (amount: number) => {
    try {
      const amountString = amount.toFixed(3)
      const decimalIndex = amountString.indexOf(".")
      const thirdDecimalPlace = amountString.charAt(decimalIndex + 3)

      if (thirdDecimalPlace === "0") {
        return parseFloat(amountString).toFixed(2)
      } else {
        return (Math.ceil(amount * 100) / 100).toFixed(2)
      }
    } catch (error) {
      return amount.toFixed(2)
    }
  }

  // END HELPER FUNCTIONS
  try {
    const API_VERSION = process.env.GATSBY_SHOPIFY_API_VERSION ?? "2025-01"
    const { offer, handle, productId, prices } = JSON.parse(req.body)

    const adminToken: string = process.env.GATSBY_STORE_TOKEN ?? ""
    const storeName = process.env.GATSBY_STORE_MY_SHOPIFY ?? ""
    const url = `https://${storeName}/admin/api/${API_VERSION}/graphql.json`

    const variables = {
      productId: `gid://shopify/Product/${productId}`,
      query: `(title:${offer}) AND (status:active)`,
    }

    const query = `#graphql
      query getDiscounts($query: String!, $productId: ID!) {
        discountNodes(first: 1, query: $query) {
          nodes {
            id
            discount {
              __typename
              ... on DiscountCodeFreeShipping {
                title
              }
              ... on DiscountAutomaticBasic {
                title
                customerGets {
                  value {
                    __typename
                    ... on DiscountAmount {
                      amount {
                        amount
                        currencyCode
                      }
                    }
                    ... on DiscountPercentage {
                      percentage
                    }
                  }
                  items {
                    __typename
                    ... on DiscountProducts {
                      productVariants(first: 250) {
                        nodes {
                          id
                          product {
                            handle
                          }
                        }
                      }
                      products(first: 250) {
                        nodes {
                          handle
                        }
                      }
                    }
                    ... on DiscountCollections {
                      collections(first: 50) {
                        nodes {
                          id
                          handle
                          hasProduct(id: $productId)
                        }
                      }
                    }
                  }
                }
              }
              ... on DiscountCodeBasic {
                title
                customerSelection {
                  __typename
                  ... on DiscountCustomerAll {
                    allCustomers
                  }
                }
                customerGets {
                  value {
                    __typename
                    ... on DiscountAmount {
                      amount {
                        amount
                        currencyCode
                      }
                    }
                    ... on DiscountPercentage {
                      percentage
                    }
                  }
                  items {
                    __typename
                    ... on DiscountProducts {
                      productVariants(first: 250) {
                        nodes {
                          id
                          product {
                            handle
                          }
                        }
                      }
                      products(first: 250) {
                        nodes {
                          handle
                        }
                      }
                    }
                    ... on DiscountCollections {
                      collections(first: 50) {
                        nodes {
                          id
                          handle
                          hasProduct(id: $productId)
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Shopify-Access-Token": adminToken,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    })
    const responseJson: any = await response.json()
    if (responseJson.errors) {
      return res.status(400).json({
        error:
          responseJson.errors[0].message ??
          "Error while fetching from admin api",
      })
    }
    const { data } = responseJson

    const { discountNodes } = data
    const discounts = flattenConnection(discountNodes)
    // filter out discounts that are not of type DiscountCodeBasic
    const filteredDiscounts = discounts.filter(
      el =>
        el.discount.__typename === "DiscountCodeBasic" ||
        el.discount.__typename === "DiscountAutomaticBasic" ||
        el.discount.__typename === "DiscountCodeFreeShipping"
    )

    if (!filteredDiscounts.length)
      return res.status(400).json("Discount found, but not supported")

    const discountNode = filteredDiscounts[0]
    const applicableDiscount = discountNode.discount as ShopifyDiscount
    const applicableDiscountType = applicableDiscount.__typename
    const isApplicableToAllCustomers = applicableDiscount.customerSelection
      ? applicableDiscount.customerSelection.__typename ===
          "DiscountCustomerAll" &&
        applicableDiscount.customerSelection.allCustomers
      : true
    if (!isApplicableToAllCustomers) {
      return res
        .status(400)
        .json({ error: "Discount not applicable to all customers" })
    }
    const applicableItems = applicableDiscount.customerGets.items

    switch (applicableItems.__typename) {
      case "AllDiscountItems":
        const newPrices = productCreateDiscounts(applicableDiscount, prices)
        if (!newPrices || !newPrices.length) {
          return res
            .status(400)
            .json({ error: "Error while calculating order discount" })
        }
        return res.status(200).json({
          prices: newPrices,
          type: applicableDiscountType,
        })
      case "DiscountCollections":
        const applicableCollections = flattenConnection(
          applicableItems.collections
        )
        const requestCollectionIsApplicable = applicableCollections.some(
          el => el.hasProduct
        )
        if (requestCollectionIsApplicable) {
          const newPrices = productCreateDiscounts(applicableDiscount, prices)
          if (!newPrices || newPrices.length === 0) {
            return res
              .status(400)
              .json({ error: "Product price discount unable to be created" })
          }
          return res.status(200).json({
            prices: newPrices,
            type: applicableDiscountType,
          })
        }
        break
      default:
        // applicableProducts is are either products with single variants or products with ALL variants selected
        const applicableProducts = flattenConnection(applicableItems.products)
        // applicableVariants is are products w/ multiple variants, but not all variants are selected
        const applicableVariants = flattenConnection(
          applicableItems.productVariants
        )
        const requestProductIsApplicable = applicableProducts.some(
          el => el.handle === handle
        )
        const requestVariantIsApplicable = applicableVariants.some(
          el => el.product.handle === handle
        )
        // check if request product is applicable to offer
        // case "DiscountProducts":
        if (requestProductIsApplicable) {
          const newPrices = productCreateDiscounts(applicableDiscount, prices)
          if (!newPrices || newPrices.length === 0) {
            return res.status(400).json({
              error: "Product price discount unable to be created",
            })
          }
          return res.status(200).json({
            prices: newPrices,
            type: applicableDiscountType,
          })
        } else if (requestVariantIsApplicable) {
          const newPrices = variantCreateDiscounts(
            applicableDiscount,
            prices,
            applicableVariants
          )
          if (!newPrices || newPrices.length === 0) {
            return res.status(400).json({
              error: "Variant price discount unable to be created",
            })
          }
          return res.status(200).json({
            prices: newPrices,
            type: applicableDiscountType,
          })
        }
        break
    }

    return res
      .status(400)
      .json({ error: "Error while fetching from admin api" })
  } catch (error) {
    console.log("Error on getDiscountedPricing:", error)
  }
}

type PricesType = {
  id: string
  price: string
}

type DiscountedPricesType = {
  id: string
  discountedPrice: number
}

type ShopifyApplicableVariant = {
  id: string
  product: {
    handle: string
  }
}

type ShopifyDiscount = {
  __typename: string
  customerSelection?: {
    __typename: string
    allCustomers: boolean
  }
  customerGets: {
    value: {
      __typename: string
      amount: {
        amount: number
        currencyCode: string
      }
      percentage: number
    }
    items: {
      __typename: string
      productVariants: {
        nodes: {
          id: string
          product: {
            handle: string
          }
        }[]
      }
      products: {
        nodes: {
          handle: string
        }[]
      }
      collections: {
        nodes: {
          id: string
          handle: string
          hasProduct: boolean
        }[]
      }
    }
  }
}
