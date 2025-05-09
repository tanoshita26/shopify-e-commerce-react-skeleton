import React from "react"
import styled from "styled-components"
const Component = styled.div`
  padding-top: 15px;
  padding-bottom: 50px;
`

const ReviewsEmpty = () => {
  return (
    <Component>
      <span>Be the first to write a review!</span>
    </Component>
  )
}

export default ReviewsEmpty
