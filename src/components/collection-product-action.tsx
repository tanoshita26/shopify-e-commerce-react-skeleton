import React from "react"
import styled from "styled-components"

const Component = styled.div`
  overflow-y: hidden;
  max-height: 0; /* approximate max height */
  transition-property: all;
  transition-duration: 0.5s;
  transition-timing-function: cubic-bezier(0.5, 1, 0.5, 1);
  position: absolute;
  bottom: 1rem;
  left: 0;
  right: 0;
  width: 100%;
  margin: 0 auto;
  background-color: #000;
  color: #fff;
  text-align: center;
  text-transform: uppercase;
  cursor: pointer;
  border: none;
  font-size: 1rem;
  font-family: var(--heading-font);
  a {
    color: #fff;
    text-decoration: none;
    padding: 0.5rem;
    width: 100%;
    display: inline-block;
    &:visited {
      color: #fff;
    }
    &:hover {
      background-color: grey;
    }
  }
  button {
    background-color: #000;
    color: #fff;
    border: none;
    cursor: pointer;
    text-transform: uppercase;
    width: 100%;
    padding: 0.5rem;
    height: 100%;
    &:hover {
      background-color: grey;
    }
  }
`

interface Props {
  children: React.ReactNode
}

const CollectionProductAction: React.FC<Props> = ({ children }) => {
  return <Component className="collection-product-action">{children}</Component>
}

export default CollectionProductAction
