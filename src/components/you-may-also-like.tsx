import React from "react"
import styled from "styled-components"
import UpsellProduct from "./upsell-product"
import { useRandomizeCollection } from "../hooks/useRandomizeCollection"
import { ShopifyProduct } from "../types/shopify"
import Divider from "./divider"

const Component = styled.section`
  margin-bottom: 40px;
  background: white;
  .hr-wrapper {
    margin-right: 15px;
    margin-right: 15px;
    hr {
      padding: 0;
      background-color: black;
      margin: 30px auto;
      max-width: 960px;
      width: 100%;
    }
  }
  .upsell-cards {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 1fr;

    @media (max-width: 768px) {
      grid-auto-flow: column;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(2, 1fr);
    }
  }
  .upsell-image {
    max-width: 280px;
    margin-bottom: 10px;
  }
  h6 {
    text-align: center;
    font-size: 1.6rem;
    font-weight: normal;
    text-transform: uppercase;
  }
`

const YouMayAlsoLike = (props: { shopifyProduct: ShopifyProduct }) => {
  const { shopifyProduct } = props

  const collectionItems = useRandomizeCollection(shopifyProduct.storefrontId)

  return (
    <Component>
      <Divider />
      <h6>You May Also Like</h6>
      <div className="row">
        <div className="upsell-cards">
          {collectionItems.map(product => {
            return (
              <UpsellProduct
                key={product.id}
                upsellProduct={product}
                showDrawer={true}
              />
            )
          })}
        </div>
      </div>
    </Component>
  )
}

export default YouMayAlsoLike
