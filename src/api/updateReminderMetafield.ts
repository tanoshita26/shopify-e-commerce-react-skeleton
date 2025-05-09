import fetch from "node-fetch"
import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby"
export default async function updateReminderMetafield(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  try {
    const API_VERSION = process.env.GATSBY_SHOPIFY_API_VERSION ?? "2025-01"
    const parsedBody = JSON.parse(req.body)
    const orderId = parsedBody.id
    const metafieldId = "gid://shopify/Metafield/23035194867942"
    const orderInput = {
      metafields: {
        id: metafieldId,
        value: "true",
      },
      id: `gid://shopify/Order/${orderId}`,
    }
    const url: string = process.env.GATSBY_STORE_MY_SHOPIFY
      ? `https://${process.env.GATSBY_STORE_MY_SHOPIFY}/admin/api/${API_VERSION}/graphql.json`
      : ""
    const adminToken: string = process.env.GATSBY_STORE_TOKEN
      ? process.env.GATSBY_STORE_TOKEN
      : ""

    const orderQuery = `#graphql
      mutation updateOrderMetafield($input: OrderInput!){
        orderUpdate(input: $input) {
          order {
            id
            metafield(namespace:"tresnoir", key: "has_received_prescription_reminder") {
              value
              id
            }
          }
          userErrors {
            field
            message
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
          input: orderInput,
        },
      }),
    })
    const responseJson = await response.json()
    if (response.ok) {
      return res.status(200).json(responseJson)
    }

    return res.status(400).json("Error while accessing shopify admin")
  } catch (error) {
    console.log("Error on fetching order details", error)
  }
}
