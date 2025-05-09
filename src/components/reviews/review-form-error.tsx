import React from "react"
import styled from "styled-components"
const Component = styled.div`
  span {
    color: red;
  }
`
type Props = {
  error: string
}
const ReviewFormError = ({ error }: Props) => {
  return (
    <Component>
      <span>{error}</span>
    </Component>
  )
}

export default ReviewFormError
