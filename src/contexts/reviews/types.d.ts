import {
  YotpoCreateFormData,
  YotpoRetrieveReviewsResponse,
} from "../../types/yotpo"

export type ReviewContextType = {
  isLoading: boolean
  isRefetching: boolean
  data: YotpoRetrieveReviewsResponse | null
  mutateReviewThumbVote: (props: {
    vote: "up" | "down"
    reviewId: number
    undo?: boolean
  }) => void
  refreshToPage: (pageNumber: number) => void
  createReview: (_data: YotpoCreateFormData) => Promise<boolean>
}
