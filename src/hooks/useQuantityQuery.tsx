import { useState, useEffect, useContext } from "react"
import { ErrorModalContext } from "../contexts/error"

export function useQuantityQuery(handle: string, size: number) {
  const { renderErrorModal } = useContext(ErrorModalContext)

  const [productQuantities, setProductQuantities] = useState<{} | undefined>({})

  const url: string = process.env.GATSBY_STORE_ENDPOINT
    ? `${process.env.GATSBY_STORE_ENDPOINT}.json`
    : ""
  const storefrontToken: string = process.env.GATSBY_STORE_STOREFRONT_TOKEN
    ? process.env.GATSBY_STORE_STOREFRONT_TOKEN
    : ""

  const abortController = new AbortController()

  const fetchQuery = async () => {
    try {
      const inventoryQuery = `#graphql
        query variantInStock($handle:String!, $size: Int!) {
          product(handle: $handle) {
            variants(first: $size) {
              edges {
                node {
                  quantityAvailable
                  sku
                }
              }
            }
          }
        }
      `
      const headers: HeadersInit = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Shopify-Storefront-Access-Token": storefrontToken,
      })
      const params: RequestInit = {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          query: inventoryQuery,
          variables: {
            handle: handle,
            size: size,
          },
        }),
        signal: abortController.signal,
      }

      const response = await fetch(url, params)
      const data = await response.json()
      return data
    } catch (err: any) {
      console.log(
        "Error while fetching product inventory productQuantities",
        err
      )
      renderErrorModal()
    }
  }

  const createQuantityData = async () => {
    try {
      const json = await fetchQuery()
      if (json.data.product) {
        const variants = json.data.product.variants.edges
        const quantities = {}
        variants.forEach(element => {
          quantities[element.node.sku] = element.node.quantityAvailable
        })
        return quantities
      }
      return {}
    } catch (err: any) {
      console.log("Error while calling fetch", err)
      renderErrorModal()
    }
  }

  useEffect(() => {
    const isBrowser = typeof window !== "undefined"
    if (isBrowser) {
      createQuantityData().then(result => setProductQuantities(result))
    }
    return () => {
      abortController.abort()
    }
  }, [])
  return productQuantities
}
