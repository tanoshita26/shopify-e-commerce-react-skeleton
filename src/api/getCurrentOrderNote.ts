import fetch from "node-fetch"
import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby"

export default async function getCurrentOrderNote(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  try {
    const API_VERSION = process.env.GATSBY_SHOPIFY_API_VERSION ?? "2025-01"
    const parsedBody = JSON.parse(req.body)
    const orderId = parsedBody.id
    const url: string = process.env.GATSBY_STORE_MY_SHOPIFY
      ? `https://${process.env.GATSBY_STORE_MY_SHOPIFY}/admin/api/${API_VERSION}/graphql.json`
      : ""
    const adminToken: string = process.env.GATSBY_STORE_TOKEN
      ? process.env.GATSBY_STORE_TOKEN
      : ""

    const orderQuery = `
      query getOrderNote($orderId: ID!){
        order(id: $orderId) {
          name
          id
          note
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
          orderId: `gid://shopify/Order/${orderId}`,
        },
      }),
    })
    const responseJson: any = await response.json()
    console.log("responseJson", responseJson)
    if (response.ok) {
      console.log("sending", responseJson.data)
      return res.status(200).json(responseJson.data)
    }

    return res.status(400).json("Error while fetching from admin api")
  } catch (error) {
    console.log("Error on fetching order details", error)
  }
}
