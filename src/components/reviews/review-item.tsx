import React from "react"
import styled from "styled-components"
import { Review as ReviewType } from "../../types/yotpo"
import ReviewStars from "./review-stars"
import ReviewVotes from "./review-votes"
import ReviewAuthor from "./review-author"

const Component = styled.section`
  padding-bottom: 25px;
  display: flex;
  .outer {
    flex: 1;
  }
  .review-author {
    font-weight: bold;
  }
  .review-name-date {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
  }
  .review-title {
    margin-bottom: 6px;
    font-family: var(--heading-font);
  }
  .review-content {
    font-size: 16px;
    line-height: 19px;
    margin-bottom: 20px;
  }
`

type Props = { review: ReviewType }

const ReviewItem = ({ review }: Props) => {
  const {
    id,
    content,
    user,
    score,
    created_at,
    title,
    votes_up,
    votes_down,
    verified_buyer,
  } = review
  const date = new Date(created_at).toLocaleDateString("en-US")
  const isVerified = verified_buyer || user.user_type === "User" ? true : false
  return (
    <Component>
      <div>
        <ReviewAuthor isVerified={isVerified} />
      </div>
      <div className="outer">
        <div className="review-name-date">
          <span className="review-author">{user.display_name}</span>
          <span>{date}</span>
        </div>
        <div>
          <ReviewStars score={score} />
        </div>
        <p
          className="review-title"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <p
          className="review-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <ReviewVotes reviewId={id} votesUp={votes_up} votesDown={votes_down} />
      </div>
    </Component>
  )
}

export default ReviewItem
