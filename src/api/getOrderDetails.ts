import fetch from "node-fetch"
import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby"

export default async function getOrderDetails(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  try {
    const API_VERSION = process.env.GATSBY_SHOPIFY_API_VERSION ?? "2025-01"
    const orderId = req.body.id
    const url: string = process.env.GATSBY_STORE_MY_SHOPIFY
      ? `https://${process.env.GATSBY_STORE_MY_SHOPIFY}/admin/api/${API_VERSION}/graphql.json`
      : ""
    const adminToken: string = process.env.GATSBY_STORE_TOKEN
      ? process.env.GATSBY_STORE_TOKEN
      : ""

    const orderQuery = `#graphql
      query getOrderDetails($orderId: ID!){
        order(id: $orderId) {
          name
          id
          note
          lineItems(first: 100) {
            edges {
              node {
                id
                name
                customAttributes {
                  key
                  value
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
        query: orderQuery,
        variables: {
          orderId: orderId,
        },
      }),
    })
    const responseJson = await response.json()
    if (response.ok) {
      return res.status(200).json(responseJson)
    }

    return res.status(400).json("Error while fetching from admin api")
  } catch (error) {
    console.log("Error on fetching order details", error)
  }
}
