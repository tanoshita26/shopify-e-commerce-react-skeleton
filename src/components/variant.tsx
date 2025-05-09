import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import ProductAction from "./collection-product-action"
import type { ContentfulProductVariant } from "../types/contentful"
import { isDiscounted, formatPrice } from "../helpers/shopify"
import Badge from "./badge"

const Component = styled.div`
  margin-bottom: 1.45rem;
  width: 25%;
  @media screen and (min-width: 601px) and (max-width: 1023px) {
    width: 33%;
  }
  padding: 0 15px;
  text-align: center;
  font-family: var(--heading-font);
  text-transform: uppercase;
  @media only screen and (max-width: 600px) {
    width: 50%;
  }
  h3 {
    margin-bottom: 0;
    padding-bottom: 8px;
    a {
      color: #000;
      text-decoration: none;
      text-align: center;
      font-weight: 400;
      font-size: 1.2rem;
      &:visited {
        color: #000;
      }
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .options {
    button {
      background-color: transparent;
      border: 1px solid #fff;
      border-radius: 50%;
      line-height: 0;
      margin-right: 5px;
      padding: 5px;
      max-width: 50px;
      &[data-active="true"] {
        border-color: #000;
      }
      :hover {
        cursor: pointer;
      }
      .gatsby-image-wrapper {
        border-radius: 50%;
      }
    }
  }
  .variant-container {
    position: relative;
    &:hover > a > .gatsby-image-wrapper {
      opacity: 0.7;
    }
    @media (hover: hover) {
      &:hover > .collection-product-action {
        max-height: 50px;
      }
    }
  }
  .price-container {
    font-family: var(--sub-heading-font);
    font-size: 1.3rem;
    display: flex;
    flex-direction: column;
    .strikethrough {
      text-decoration: line-through;
      color: var(--color-grey-dark);
    }
  }
  @media only screen and (max-width: 600px) {
    .price-container {
      font-size: 1.1rem;
    }
    h3 {
      line-height: 16px;
      a {
        font-size: 1rem;
      }
    }
  }
`

type Props = {
  contentfulData: ContentfulProductVariant
  price: number
  compareAtPrice: number
  productHandle: string
  name: string
  badge: { label: string; color: string } | null
}

const Variant = ({
  contentfulData,
  price,
  productHandle,
  name,
  compareAtPrice,
  badge,
}: Props) => {
  const { sku } = contentfulData
  const link = `/products/${productHandle}?variant=${sku}`

  return (
    <Component>
      <article className="variant-container">
        <Link to={link}>
          <GatsbyImage
            image={contentfulData.featuredImage.data}
            alt={"contentfulData.title"}
          />
          {badge && <Badge label={badge.label} color={badge.color} />}
        </Link>
        <ProductAction>
          <Link to={link}>View Product</Link>
        </ProductAction>
      </article>
      <h3>
        <Link to={link}>{name}</Link>
      </h3>
      {price !== 0 && (
        <div className="price-container">
          <span>${formatPrice(price)} USD</span>
          {!!compareAtPrice && isDiscounted(price, compareAtPrice) && (
            <span className="strikethrough">
              ${formatPrice(compareAtPrice)} USD
            </span>
          )}
        </div>
      )}
    </Component>
  )
}

export default Variant
