import React from "react"
import styled from "styled-components"
import { BiPlus, BiMinus } from "react-icons/bi"

const Selector = styled.div`
  .qty-selector {
    display: inline-flex;
    font-family: var(--sub-heading-font);
    border: 1px solid black;
    border-radius: 3px;
    line-height: 18px;
    span,
    input {
      align-items: center;
    }
    span {
      padding: 0 2px;
      font-weight: normal;
    }
    input {
      border: none;
      text-align: center;
      width: 2rem;
      border: 1px solid black;
      border-top: 0;
      border-bottom: 0;
      color: var(--color-grey-dark);
      font-size: 0.8rem;
      border-radius: 0;
    }
    .qty {
      cursor: pointer;
      text-decoration: none;
      color: #000;
      font-size: 1rem;
      svg {
        color: black;
        font-size: 1rem;
        vertical-align: middle;
      }
    }
  }
`

interface Props {
  lineId: string
  variantId: string
  quantity: number
  imageId: string
  updateQuantity: (
    lineId: string,
    variantId: string,
    quantity: number,
    imageId: string
  ) => void
}

const QuantitySelector = (props: Props) => {
  const { lineId, variantId, quantity, imageId, updateQuantity } = props
  return (
    <Selector>
      <div className="qty-selector">
        <span
          className="quantity-down qty text-btn"
          onClick={() =>
            updateQuantity(lineId, variantId, quantity - 1, imageId)
          }
        >
          <BiMinus />
        </span>
        <input className="quantity" type="text" value={quantity} readOnly />
        <span
          className="quantity-up qty text-btn"
          onClick={() =>
            updateQuantity(lineId, variantId, quantity + 1, imageId)
          }
        >
          <BiPlus />
        </span>
      </div>
    </Selector>
  )
}

export default QuantitySelector
