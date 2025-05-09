import { createContext } from "react"
import { ReviewContextType } from "./types"
import { YotpoCreateFormData } from "../../types/yotpo"

const defaultContext: ReviewContextType = {
  isLoading: true,
  isRefetching: false,
  data: null,
  mutateReviewThumbVote: (props: {
    vote: "up" | "down"
    reviewId: number
    undo?: boolean
  }) => {},
  refreshToPage: (pageNumber: number) => {},
  createReview: async (_data: YotpoCreateFormData) => false,
}

export const ReviewsContext = createContext(defaultContext)

export default ReviewsContext
