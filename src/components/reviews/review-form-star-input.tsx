import React, { useState } from "react"
import styled from "styled-components"
import { BsStarFill as StarIcon } from "react-icons/bs"

const StarList = styled.div`
  margin-top: 8px;
  .fill {
    fill: #ffd700;
  }
  svg {
    margin: 0 2px;
    fill: none;
    font-size: 18px;
    stroke: black;
    stroke-width: 0.4px;
    stroke-linejoin: round;
    paint-order: stroke;
    cursor: pointer;
  }
`

type Props = {
  rating: number
  setRating: (_rating: number) => void
  clearError: () => void
}

export const ReviewFormStarInput = ({
  rating,
  setRating,
  clearError,
}: Props) => {
  const [hovered, setHovered] = useState<number | null>(null)
  const starArr = Array.from(Array(5), (_, x) => x + 1)

  const handleChange = (star: number) => {
    if (!rating) clearError()
    setRating(star)
  }
  const handleHoverIn = (star: number) => {
    setHovered(star)
  }
  const handleHoverOut = () => {
    setHovered(null)
  }

  return (
    <StarList>
      {starArr.map(star => (
        <StarIcon
          key={`star-${star}`}
          role="button"
          onClick={() => handleChange(star)}
          onMouseEnter={() => handleHoverIn(star)}
          onMouseLeave={handleHoverOut}
          className={
            (hovered ? star <= hovered : star <= rating) ? "fill active" : ""
          }
        />
      ))}
    </StarList>
  )
}

export default ReviewFormStarInput
