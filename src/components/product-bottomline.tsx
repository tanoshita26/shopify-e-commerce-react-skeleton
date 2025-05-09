import React from "react"
import styled from "styled-components"
import { useReviews } from "../contexts/reviews"
import ReviewBottomline from "./reviews/review-bottomline"

const Component = styled.section`
  min-height: 24px;
  margin-top: 1px;
  margin-bottom: 8px;
  span {
    font-family: var(--sub-heading-font);
  }
`

type Props = {
  reviewListRef: React.RefObject<HTMLDivElement>
}

const ProductBottomline = ({ reviewListRef }: Props) => {
  const { data, isLoading } = useReviews()

  return (
    <Component>
      {data && !isLoading && (
        <ReviewBottomline
          bottomline={data.bottomline}
          reviewListRef={reviewListRef}
        />
      )}
    </Component>
  )
}

export default ProductBottomline
