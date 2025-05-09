import React from "react"
import styled from "styled-components"
import ReviewBottomlineStars from "./review-bottomline-stars"
import { Bottomline } from "../../types/yotpo"

const Component = styled.section`
  display: flex;
  align-items: center;
  gap: 5px;
  span {
    padding-top: 2px;
    color: var(--color-grey-dark);
    font-family: var(--sub-heading-font);
    font-size: 15px;
  }
`
type Props = {
  bottomline: Bottomline
  reviewListRef?: React.RefObject<HTMLDivElement>
}

const ReviewBottomline = ({ bottomline, reviewListRef }: Props) => {
  const { total_review, average_score } = bottomline

  const handleClick = () => {
    const isBrowser = typeof window !== "undefined"
    if (isBrowser && reviewListRef && reviewListRef?.current) {
      setTimeout(() => {
        reviewListRef?.current?.scrollIntoView({ behavior: "smooth" })
      }, 500)
    }
  }

  return (
    <Component
      className={reviewListRef ? "clickable" : ""}
      onClick={() => handleClick()}
      style={{ cursor: reviewListRef ? "pointer" : "default" }}
    >
      <ReviewBottomlineStars score={average_score} />
      <span>{`(${total_review})`}</span>
    </Component>
  )
}

export default ReviewBottomline
