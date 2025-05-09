import React from "react"
import styled from "styled-components"
import { BsStarFill as StarIcon } from "react-icons/bs"

const StarList = styled.div`
  display: flex;
  padding-bottom: 6px;
  gap: 2.5px;
  .fill {
    fill: #ffd700;
    stroke: #ffd700;
  }
  svg {
    font-size: 16px;
    fill: none;
    stroke: var(--color-grey-dark);
    stroke-width: 0.4px;
    stroke-linejoin: round;
    paint-order: stroke;
  }
`
export const ReviewStars = ({ score }: { score: number }) => {
  const starArr = Array.from(Array(5), (_, x) => x + 1)

  return (
    <StarList>
      {starArr.map(star => (
        <StarIcon
          className={score >= star ? "fill" : ""}
          key={`star-${star}`}
        />
      ))}
    </StarList>
  )
}
export default ReviewStars
