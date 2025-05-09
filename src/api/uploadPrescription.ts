import fetch from "node-fetch"
import FormData from "form-data"
import crypto from "crypto"
import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby"

export const config = {
  bodyParser: {
    json: {
      type: "application/json",
      limit: "32mb",
    },
    raw: {
      type: "application/octet-stream",
      limit: "32mb",
    },
    text: {
      type: "text/plain",
      limit: "32mb",
    },
    urlencoded: {
      type: "application/x-www-form-urlencoded",
      limit: "100mb",
      extended: true,
    },
  },
}

export default async function uploadPrescription(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  try {
    const publicId = req.body.name
    const imageToUpload = req.body.file
    const timeStamp = new Date().getTime()
    const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET
    const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY
    const cloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME
    const url: string = `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`

    const preSign = `public_id=${publicId}&timestamp=${timeStamp}${cloudinaryApiSecret}`

    const computedHash = crypto.createHash("sha1").update(preSign).digest("hex")
    const formData = new FormData()
    formData.append("file", imageToUpload)
    formData.append("public_id", publicId)
    formData.append("api_key", cloudinaryApiKey)
    formData.append("timestamp", timeStamp)
    formData.append("signature", computedHash)
    const options = {
      method: "POST",
      body: formData,
    }
    const response = await fetch(url, options)
    const resBodyJson: any = await response.json()
    const secureUrl = resBodyJson["secure_url"]
    if (response.ok) {
      return res.status(200).json({
        url: secureUrl,
      })
    }
    return res.status(400).json("Error while sending image to cloudinary")
  } catch (error) {
    console.log("Error on cloudinary image request", error)
  }
}
