import fetch from "node-fetch"
import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby"
import { flattenConnection } from "../utils/flattenConnection"

export default async function getCollectionDiscountedPricing(
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
    const { offer, handle, prices } = JSON.parse(req.body) as {
      offer: string
      handle: string
      prices: PricesType[]
    }

    const adminToken: string = process.env.GATSBY_STORE_TOKEN ?? ""
    const storeName = process.env.GATSBY_STORE_MY_SHOPIFY ?? ""
    const url = `https://${storeName}/admin/api/${API_VERSION}/graphql.json`

    const variables = {
      query: `(title:${offer}) AND (status:active)`,
    }

    const query = `#graphql
      query getDiscounts($query: String!) {
        discountNodes(first: 1, query: $query) {
          nodes {
            id
            discount {
              __typename
              ... on DiscountCodeFreeShipping {
                title
                customerSelection {
                  __typename
                  ... on DiscountCustomerAll {
                    allCustomers
                  }
                }  
              }
              ... on DiscountAutomaticFreeShipping {
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
                      products(first: 250) {
                        nodes {
                          legacyResourceId
                          handle
                          variants(first: 250) {
                            nodes {
                              id
                              legacyResourceId
                            }
                          }
                        }
                      }
                      productVariants(first: 250) {
                        nodes {
                          id
                          legacyResourceId
                          product {
                            handle
                            legacyResourceId
                          }
                        }
                      }
                    }
                    ... on DiscountCollections {
                      collections(first: 25) {
                        nodes {
                          id
                          handle
                          products(first: 250) {
                            nodes {
                              legacyResourceId
                              handle
                            }
                          }
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
                      products(first: 250) {
                        nodes {
                          legacyResourceId
                          handle
                          variants(first: 250) {
                            nodes {
                              id
                              legacyResourceId
                            }
                          }
                        }
                      }
                      productVariants(first: 250) {
                        nodes {
                          id
                          legacyResourceId
                          product {
                            handle
                            legacyResourceId
                          }
                        }
                      }
                    }
                    ... on DiscountCollections {
                      collections(first: 25) {
                        nodes {
                          id
                          handle
                          products(first: 250) {
                            nodes {
                              legacyResourceId
                              handle
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

        const applicableCollectionProducts = applicableCollections.map(el =>
          el.products.nodes.map(el => el.handle)
        )
        // get handles of products in applicable collections
        const applicableProductHandles = Array.from(
          new Set(applicableCollectionProducts.flat())
        )
        // check if request collection has applicable products
        const applicableCollectionProductHandles = applicableCollections
          .map(el => el.products.nodes.map(el => el.handle))
          .flat()
        const requestCollectionHasApplicableProducts =
          applicableProductHandles.some(el =>
            applicableCollectionProductHandles.includes(el)
          )

        if (requestCollectionHasApplicableProducts) {
          // filter prices by applicable product handles, then create discounts
          const filteredCollectionPrices = prices.filter(el =>
            applicableProductHandles.includes(el.handle)
          )
          const newPrices = productCreateDiscounts(
            applicableDiscount,
            filteredCollectionPrices
          )
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
        const applicableProducts =
          applicableItems?.products &&
          applicableItems?.products.nodes?.length > 0
            ? flattenConnection(applicableItems.products)
            : []

        // applicableVariants is are products w/ multiple variants, but not all variants are selected
        const applicableVariants =
          applicableItems?.productVariants &&
          applicableItems?.productVariants?.nodes?.length > 0
            ? flattenConnection(applicableItems.productVariants)
            : []
        // check if prices array contains an id that matches an applicable product id
        // filter out prices that are not applicable
        const applicableProductIds = applicableProducts
          .map(el => el.variants.nodes.map(el => el.legacyResourceId))
          .flat() // flatten array of arrays

        const applicableVariantIds = applicableVariants.map(
          el => el.legacyResourceId
        )

        // concat applicable product ids and applicable variant ids
        const applicableIds = applicableProductIds.concat(applicableVariantIds)
        // get ids of prices to modify
        const priceApplicableIds = prices.map(el => el.id)
        const requestIsApplicable = applicableIds.some(el =>
          priceApplicableIds.includes(el)
        )

        // check if request product is applicable to offer
        if (requestIsApplicable) {
          const filteredProductPrices = prices.filter(el =>
            applicableIds.includes(el.id)
          )
          const newPrices = productCreateDiscounts(
            applicableDiscount,
            filteredProductPrices
          )

          if (!newPrices || newPrices.length === 0) {
            return res.status(400).json({
              error: "Product price discount unable to be created",
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
  handle: string
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
          products: {
            nodes: {
              legacyResourceId: string
              handle: string
            }[]
          }
        }[]
      }
    }
  }
}
