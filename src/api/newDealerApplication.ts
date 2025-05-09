import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby"
import fetch from "node-fetch"
import * as crypto from "crypto"
interface FormData {
  storeName: string
  storeTel: string
  address: string
  city: string
  stateProvince: string
  postalCode: string
  country: string
  owners: string
  authorizedBuyerContact: string
  businessType: string
  question1: string
  averageRetailPrice: string
  brand1: string
  brand2: string
  brand3: string
  question4: string
  question5: string
  question6: string
  date: string
}

// create a function to create an hmac sha256 hash
function createHmacSha256Hash(data: string): string {
  const secret = process.env.SECRET_KEY as string
  if (!secret) {
    throw new Error("SECRET_KEY is not defined")
  }
  const hmac = crypto.createHmac("sha256", secret).update(data).digest("base64")
  return hmac
}

// uncomment this function to use without waiting for the response
// this is due to the standard 10 second timeout for netlify functions
// export default async function newDealerApplication(
//   req: GatsbyFunctionRequest,
//   res: GatsbyFunctionResponse
// ) {
//   try {
//     const { body } = req
//     console.log("Request body:", body)
//     if (!body) {
//       throw new Error("No body found")
//     }

//     const endpoint = process.env.TN_DEALER_APPLICATION_ENDPOINT as string
//     const data = JSON.stringify(body)
//     fetch(endpoint, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "X-Tres-Noir-Hmac-Sha256": createHmacSha256Hash(data),
//       },
//       body: data,
//     })
//     res.status(200).json({ message: "ok" })
//   } catch (error) {
//     console.log("Error Creating PDF:", error)
//     res.status(500).json({ error: "Error creating PDF" })
//   }
// }

// uncomment this function to use with waiting for the response
// netlify functions have a standard 10 second timeout, but you can request an increase to 30 seconds on a paid plan
export default async function newDealerApplication(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  try {
    const { body } = req
    console.log("Request body:", body)
    if (!body) {
      throw new Error("No body found")
    }

    const endpoint = process.env.TN_DEALER_APPLICATION_ENDPOINT as string
    const data = JSON.stringify(body)
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Tres-Noir-Hmac-Sha256": createHmacSha256Hash(data),
      },
      body: data,
    })

    const responseJson = await response.json()
    console.log("Response from endpoint:", responseJson)
    res.status(200).json({ message: "ok" })
  } catch (error) {
    console.log("Error Creating PDF:", error)
    res.status(500).json({ error: "Error creating PDF" })
  }
}
