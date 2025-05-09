import React from "react"
import styled from "styled-components"

const Component = styled.div`
  font-size: 1.15rem;
  color: white;
  padding: 0 10px;
  border-radius: 6px;
  font-family: var(--sub-heading-font);
  text-transform: uppercase;
  align-self: flex-start;
`

type Props = {
  color: string
  label: string
  top?: number
  left?: number
  position?: "absolute" | "relative" | "static"
}

const Badge = ({
  color,
  label,
  top = 13,
  left = 0,
  position = "absolute",
}: Props) => {
  return (
    <Component style={{ backgroundColor: color, top, left, position }}>
      {label}
    </Component>
  )
}

export default Badge
