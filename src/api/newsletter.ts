import fetch from "node-fetch"
import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby"

export default async function klaviyoFormHandler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type")

    if (req.method === "OPTIONS") {
      return res.status(200).end()
    }
    const reqEmail = req.body.inEmail
    const listId = "R4y2R5"
    const apiKey = process.env.KLAVIYO_PRIVATE_KEY
    const url =
      "https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs"

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Revision: "2024-06-15",
        Authorization: `Klaviyo-API-Key ${apiKey}`,
      },
      body: JSON.stringify({
        data: {
          type: "profile-subscription-bulk-create-job",
          attributes: {
            custom_source: "Gatsby Sign Up Form",
            profiles: {
              data: [
                {
                  type: "profile",
                  attributes: {
                    email: reqEmail,
                  },
                },
              ],
            },
          },
          relationships: {
            list: {
              data: {
                type: "list",
                id: listId,
              },
            },
          },
        },
      }),
    }

    const response = await fetch(url, options)
    if (response.ok) {
      return res.status(200).json("success")
    }
    return res.status(400).json("Error while posting to Klaviyo")
  } catch (error) {
    console.log("Error on Klaviyo form request", error)
    return res
      .status(400)
      .json(`Error on Klaviyo form request, ${JSON.stringify(error)}`)
  }
}
