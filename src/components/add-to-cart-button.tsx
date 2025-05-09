import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Spinner from "./spinner"

const Button = styled.button`
  min-height: 42px;
  min-width: 150px;
  border-radius: 0% !important;

  @media only screen and (max-width: 468px) {
    min-height: 40px;
    min-width: 140px;
  }
`

interface Props {
  handler?: (e) => void
  loading?: boolean
  soldOut: boolean
}

const AddToCartButton: React.FC<Props> = ({
  handler,
  soldOut,
  loading = false,
}) => {
  const [self, setSelf] = useState<boolean>(false)
  const [addingToCart, setAddingToCart] = useState<boolean>(loading)

  const handleAddToCart = (e: any) => {
    setSelf(true)
    if (handler) {
      handler(e)
      setAddingToCart(loading)
    }
  }

  useEffect(() => {
    if (self) {
      setAddingToCart(loading)
      if (!loading) setSelf(false)
    }
  }, [loading])

  if (soldOut) {
    return (
      <Button type="button" className="sold-out btn">
        SOLD OUT
      </Button>
    )
  } else {
    return (
      <Button
        type="button"
        className="btn"
        onClick={handleAddToCart}
        disabled={addingToCart}
      >
        {addingToCart ? <Spinner /> : `ADD TO CART`}
      </Button>
    )
  }
}

export default AddToCartButton
