import React from "react"
import styled from "styled-components"
import { useReviews } from "../../contexts/reviews"
import ReviewList from "./review-list"
import ReviewForm from "./review-form"
import ReviewsEmpty from "./reviews-empty"
import ReviewPagination from "./review-pagination"
import Spinner from "../spinner"

const Component = styled.section`
  button {
    padding: 8px 15px;
  }
  p {
    margin: unset;
  }
  p,
  span,
  input,
  label,
  textarea {
    font-family: var(--sub-heading-font);
  }
  h4 {
    font-weight: normal !important;
    font-size: 20px;
    text-transform: uppercase;
  }
`
const SpinContainer = styled.div`
  padding-bottom: 50px;
  padding-top: 20px;
  .icon-spinner {
    height: 50px;
  }
`

type Props = {
  reviewListRef: React.RefObject<HTMLDivElement>
}

const Reviews = ({ reviewListRef }: Props) => {
  const { data, isLoading } = useReviews()

  const scrollToTop = () => {
    const isBrowser = typeof window !== "undefined"
    if (isBrowser && reviewListRef.current) {
      setTimeout(() => {
        reviewListRef.current?.scrollIntoView({ behavior: "smooth" })
      }, 500)
    }
  }

  // If the environment is development or staging, show the review form and empty reviews
  if (
    process.env.GATSBY_ENVIRONMENT === "development" ||
    process.env.GATSBY_ENVIRONMENT === "staging"
  ) {
    return (
      <Component>
        <ReviewForm
          bottomline={{
            total_review: 0,
            average_score: 0,
            total_organic_reviews: 0,
            organic_average_score: 0,
            star_distribution: {},
            custom_fields_bottomline: {},
          }}
        />
        <ReviewsEmpty />
      </Component>
    )
  }

  return (
    <div ref={reviewListRef}>
      {isLoading || !data ? (
        <SpinContainer>
          <Spinner fill="#000000" />
        </SpinContainer>
      ) : (
        <Component>
          <ReviewForm bottomline={data.bottomline} />
          {!data.reviews.length ? (
            <ReviewsEmpty />
          ) : (
            <>
              <ReviewList reviews={data.reviews} />
              <ReviewPagination
                pagination={data.pagination}
                scrollToTop={scrollToTop}
              />
            </>
          )}
        </Component>
      )}
    </div>
  )
}

export default Reviews
