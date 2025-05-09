import React, { useState } from "react"
import styled from "styled-components"
import { useReviews } from "../../contexts/reviews"
import {
  IoMdThumbsDown as ThumbsDownIcon,
  IoMdThumbsUp as ThumbsUpIcon,
} from "react-icons/io"

const VotesContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: end;
  gap: 10px;
  @media screen and (min-width: 768px) {
    gap: 15px;
  }
  .thumbs-wrapper {
    display: flex;
    gap: 10px;
  }
  .thumbs {
    display: flex;
    align-items: center;
    gap: 3px;
  }
  span {
    color: var(--color-grey-dark);
    font-size: 14px;
  }
  svg {
    fill: var(--color-grey-dark);
    &:hover {
      fill: #666666;
      cursor: pointer;
    }
  }
  .active-thumb-vote {
    fill: #000000 !important;
    color: black !important;
  }
`
const ReviewVotes = ({
  reviewId,
  votesUp,
  votesDown,
}: {
  reviewId: number
  votesUp: number
  votesDown: number
}) => {
  const { mutateReviewThumbVote } = useReviews()

  const [thumbState, setThumbState] = useState<"up" | "down" | undefined>(
    undefined
  )
  const handleClick = (vote: "up" | "down") => {
    if (thumbState === vote) {
      console.log("CANCEL", vote)
      setThumbState(undefined)
      mutateReviewThumbVote({ vote, reviewId, undo: true })
      // cancel request
      return
    }
    console.log("VOTE", vote)
    setThumbState(vote)
    mutateReviewThumbVote({ vote, reviewId })
  }

  const getVotes = (action: "up" | "down") => {
    if (action === "up") {
      if (thumbState && thumbState === "up") {
        return votesUp + 1
      }
      return votesUp
    }
    // action is down
    if (thumbState && thumbState === "down") {
      return votesDown + 1
    }
    return votesDown
  }

  return (
    <VotesContainer>
      <span>Was this review helpful?</span>
      <div className="thumbs-wrapper">
        <div className="thumbs">
          <span className={thumbState === "up" ? "active-thumb-vote" : ""}>
            {getVotes("up")}
          </span>
          <ThumbsUpIcon
            role="button"
            onClick={() => handleClick("up")}
            className={thumbState === "up" ? "active-thumb-vote" : ""}
          />
        </div>
        <div className="thumbs">
          <ThumbsDownIcon
            role="button"
            onClick={() => handleClick("down")}
            className={thumbState === "down" ? "active-thumb-vote" : ""}
          />
          <span className={thumbState === "down" ? "active-thumb-vote" : ""}>
            {getVotes("down")}
          </span>
        </div>
      </div>
    </VotesContainer>
  )
}

export default ReviewVotes
