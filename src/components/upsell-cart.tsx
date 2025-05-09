import React from "react"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
import UpsellProduct from "./upsell-product"
import { UpsellItems, UpsellItem } from "../types/upsell"

const Component = styled.section`
  background: white;
  .upsell-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
    @media (max-width: 600px) {
      grid-auto-flow: column;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(2, 1fr);
    }
    place-items: center;
    > div {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 15px;
      text-align: center;
      @media (max-width: 600px) {
        margin: 20px 11px 20px 11px;
      }
      a {
        color: black;
        text-decoration: none;
        :visited {
          text-decoration: none;
          color: black;
        }
      }
      p {
        margin-bottom: 5px;
      }
    }
  }
  .upsell-image {
    max-width: 280px;
  }
  h6 {
    text-align: center;
    font-size: 1.6rem;
    font-weight: normal;
    text-transform: uppercase;
  }
  .btn {
    @media (max-width: 600px) {
      font-size: 0.9rem;
      padding: 8px 10px;
    }
  }
`

const getUpsellItems = () => {
  const { shopifyCollection } = useStaticQuery(graphql`
    query GetUpsellProducts {
      shopifyCollection(handle: { eq: "upsell" }) {
        products {
          id
          featuredImage {
            localFile {
              childImageSharp {
                gatsbyImageData(quality: 40)
              }
            }
          }
          title
          handle
          hasOnlyDefaultVariant
          variants {
            storefrontId
            compareAtPrice
            price
            sku
            title
            legacyResourceId
            product {
              collections {
                title
              }
              featuredImage {
                originalSrc
              }
              onlineStoreUrl
              productType
              title
              vendor
            }
          }
          storefrontId
        }
      }
    }
  `)
  return shopifyCollection
}

const UpsellCart = () => {
  const upsellItems: UpsellItems = getUpsellItems()

  return (
    <Component>
      <h6>Suggested Add-ons</h6>
      <div className="row">
        <div className="upsell-cards">
          {upsellItems &&
            upsellItems.products.map((item: UpsellItem) => (
              <UpsellProduct key={item.handle} upsellProduct={item} />
            ))}
        </div>
      </div>
    </Component>
  )
}

export default UpsellCart
