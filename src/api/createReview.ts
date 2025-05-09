import fetch from "node-fetch"
import crypto from "crypto"
import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby"
import { YotpoCreateFormData } from "../types/yotpo"

type PayloadType = YotpoCreateFormData & {
  productId: string
  productTitle: string
  productUrl: string
  submissionTimeStamp: string
}

export default async function createReview(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  try {
    const body = req.body as PayloadType
    // const token = await authenticateYotpo()
    const YOTPO_CLIENT_ID = process.env.GATSBY_YOTPO_APP_KEY as string
    const YOTPO_SECRET = process.env.YOTPO_SECRET as string
    const reviewerType = "verified_reviewer"
    const timeStamp = new Date()
    const signature = crypto
      .createHash("sha1")
      .update(YOTPO_SECRET)
      .digest("hex")
    const payload = {
      appkey: YOTPO_CLIENT_ID,
      sku: body.productId,
      product_title: body.productTitle,
      product_url: body.productUrl,
      display_name: body.reviewerName,
      email: body.reviewerEmail,
      review_content: body.reviewContent,
      review_title: body.reviewTitle,
      review_score: body.reviewScore,
      // signature,
      // time_stamp: timeStamp,
      // submission_time_stamp: body.submissionTimeStamp,
      // reviewer_type: reviewerType,
    }
    const response = await fetch("https://api.yotpo.com/v1/widget/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ ...payload }),
    })
    const resJson: any = await response.json()
    if (resJson.code === 200) {
      return res.status(200).json("Success")
    } else {
      console.log("error")
      return res.status(400).json("error")
    }
  } catch (error) {
    console.log("Error in /createReview api route", error)
    res.status(400)
  }
}
