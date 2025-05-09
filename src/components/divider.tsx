import React from "react"
import styled from "styled-components"

const Component = styled.div`
  margin-right: 15px;
  margin-right: 15px;
  hr {
    padding: 0;
    background-color: black;
    margin: 30px auto;
    max-width: 960px;
    width: 100%;
  }
`

const Divider = ({ className = "" }: { className?: string }) => {
  return (
    <Component className={className}>
      <hr />
    </Component>
  )
}

export default Divider
