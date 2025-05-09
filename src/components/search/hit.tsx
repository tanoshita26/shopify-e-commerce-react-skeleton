import React from "react"
import { Link } from "gatsby"
import { Highlight } from "react-instantsearch-dom"
import styled from "styled-components"

interface Props {
  handle: string
  image: string
  max_variant_price: string
  min_variant_price: string
  objectID: string
  option_names: string[]
  price: string
  product_type: string
  style_description: string
  tags: string[]
  title: string
  vendor: string
}

const Component = styled.article`
  .product-title {
    font-weight: bold;
    text-transform: uppercase;
    font-size: 20px;
    line-height: 22px;
    @media screen and (min-width: 1024px) {
      font-size: 22px;
      line-height: 24px;
    }
    margin-bottom: 5px;
    a {
      color: #000;
      text-decoration: none;
    }
  }
  .product-price {
    text-transform: uppercase;
    color: #808080;
    font-size: 16px;
    line-height: 19px;
    font-family: var(--sub-heading-font);
    @media screen and (min-width: 1024px) {
      font-size: 18px;
      line-height: 20px;
    }
  }
  .aspect-tn {
    object-fit: cover;
    object-position: center;
    aspect-ratio: 3/2;
  }
`

const Hit = ({ hit }: { hit: Props }) => {
  const pricing =
    hit.price !== ""
      ? `$${Number(hit.price).toFixed(2)}`
      : `From $${Number(hit.min_variant_price).toFixed(2)}`

  return (
    <Component>
      <Link to={`/products/${hit.handle}`}>
        <img src={hit.image} alt={hit.title} className="aspect-tn" />
      </Link>
      <h3 className="product-title">
        <Link to={`/products/${hit.handle}`}>
          <Highlight attribute="title" hit={hit} />
        </Link>
      </h3>
      <p className="product-price">{pricing}</p>
    </Component>
  )
}

export default Hit
