import React, {
  useState,
  useMemo,
  ReactNode,
  useCallback,
  useEffect,
} from "react"
import { ReviewsContext } from "./context"
import {
  YotpoRetrieveReviewsData,
  YotpoRetrieveReviewsResponse,
  YotpoCreateFormData,
} from "../../types/yotpo"

type Props = {
  productId: number
  productTitle: string
  productHandle: string
  siteUrl: string
  children: ReactNode | ReactNode[]
}

export const YOTPO_REVIEWS_PER_PAGE = 5

export function ReviewsProvider({
  productId,
  productTitle,
  productHandle,
  siteUrl,
  children,
}: Props) {
  const [data, setData] = useState<YotpoRetrieveReviewsResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefetching, setIsRefetching] = useState(false)

  const abortController = new AbortController()

  useEffect(() => {
    let isMounted = true

    const getReviewsForProduct = async () => {
      try {
        setIsLoading(true)
        const YOTPO_APP_KEY = process.env.GATSBY_YOTPO_APP_KEY as string
        const perPage = YOTPO_REVIEWS_PER_PAGE
        const url = `https://api-cdn.yotpo.com/v1/widget/${YOTPO_APP_KEY}/products/${productId}/reviews.json?sort=date&per_page=${perPage}`
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          signal: abortController.signal,
        })
        const json = (await response.json()) as YotpoRetrieveReviewsData
        if (json.status.code !== 200) {
          throw Error(JSON.stringify(json.status))
        }
        if (isMounted) {
          setData(json.response)
          setIsLoading(false)
        }
      } catch (error) {
        console.error("Error fetching reviews for product", error)
      }
    }

    getReviewsForProduct()

    return () => {
      isMounted = false
      abortController.abort()
    }
  }, [productId])

  const refreshToPage = async (pageNumber: number) => {
    try {
      setIsRefetching(true)
      const YOTPO_APP_KEY = process.env.GATSBY_YOTPO_APP_KEY as string
      const perPage = YOTPO_REVIEWS_PER_PAGE
      const url = `https://api-cdn.yotpo.com/v1/widget/${YOTPO_APP_KEY}/products/${productId}/reviews.json?sort=date&per_page=${perPage}&page=${pageNumber}`
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      const json = (await response.json()) as YotpoRetrieveReviewsData
      if (json.status.code !== 200) {
        throw Error(JSON.stringify(json.status))
      }
      setData(json.response)
      setIsRefetching(false)
      return json
    } catch (error) {
      console.error("Error fetching reviews for product", error)
    }
  }

  const mutateReviewThumbVote = async ({
    vote,
    reviewId,
    undo = false,
  }: {
    vote: "up" | "down"
    reviewId: number
    undo?: boolean
  }) => {
    try {
      const url = !undo
        ? `https://api.yotpo.com/reviews/${reviewId}/vote/${vote}`
        : `https://api.yotpo.com/reviews/${reviewId}/vote/${vote}/true`
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          review_id: reviewId,
          vote_type: vote,
        }),
      })
      const json = await response.json()
    } catch (error) {
      console.error("Error on mutateReviewThumbVote", error)
    }
  }
  const createReview = async (data: YotpoCreateFormData) => {
    try {
      let payload = data
      payload["productId"] = productId
      payload["productTitle"] = productTitle
      payload["submissionTimeStamp"] = new Date()
      payload["productUrl"] = `${siteUrl}/products/${productHandle}`
      const response = await fetch("/api/createReview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...payload,
        }),
      })
      return response.ok
    } catch (error) {
      console.error("Error on createReview in context provider", error)
      return false
    }
  }

  const reviewsContextValue = useMemo(
    () => ({
      data,
      isLoading,
      mutateReviewThumbVote,
      refreshToPage,
      isRefetching,
      createReview,
    }),
    [data, isLoading, isRefetching]
  )

  return (
    <ReviewsContext.Provider value={reviewsContextValue}>
      {children}
    </ReviewsContext.Provider>
  )
}

export default ReviewsProvider
