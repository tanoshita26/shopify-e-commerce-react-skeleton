import { useContext } from "react"

import { ReviewsContext } from "./context"

export const useReviews = () => useContext(ReviewsContext)

export default useReviews
