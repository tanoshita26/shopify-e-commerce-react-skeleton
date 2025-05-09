import React, { useRef } from "react"
import type { tnItem } from "../../../contexts/storefront-cart/types/storefront-cart"
import { GatsbyImage } from "gatsby-plugin-image"
import { useCart } from "../../../contexts/storefront-cart"
import styled from "styled-components"
import { VscClose } from "react-icons/vsc"
import { Link } from "gatsby"

const Component = styled.div`
  .product-card {
    padding-bottom: 0px !important;
  }
  .original-price {
    text-decoration-line: line-through;
    color: var(--color-grey-dark);
  }
  .title {
    font-size: 16px;
    line-height: 20px;
  }
  .product-image {
    margin-top: -20px;
    padding-right: 0px !important;
  }
`
type Props = {
  item: tnItem
}
const ShipInsureItem: React.FC<Props> = ({ item }) => {
  const { setIsCartDrawerOpen, updateShipInsureAttribute } = useCart()

  const loadingOverlay = useRef<HTMLDivElement>(null)

  const removeSingleProduct = async item => {
    const loadingContainer = loadingOverlay.current?.closest(".cart-products")
    loadingContainer?.classList.add("no-events")
    await updateShipInsureAttribute(false)
    loadingContainer?.classList.remove("no-events")
  }

  return (
    <Component className="item-card" ref={loadingOverlay}>
      <div className="close-btn">
        <button
          className="remove-item"
          onClick={() => removeSingleProduct(item)}
        >
          <VscClose />
        </button>
      </div>
      <div className="product-card">
        {item.image && (
          <div className="product-image">
            <GatsbyImage
              image={item.image}
              alt={item.lineItems[0].shopifyItem.merchandise.product.title}
            />
          </div>
        )}

        <div>
          <div className="product-titles">
            <Link
              onClick={evt => setIsCartDrawerOpen(false)}
              to={`/products/${item.lineItems[0].shopifyItem.merchandise.product.handle}`}
            >
              <p className="title">
                {item.lineItems[0].shopifyItem.merchandise.product.title}
              </p>
            </Link>
          </div>
          <div className="price-quantity">
            <div className="price-wrapper">
              <p>${item.lineItems[0].shopifyItem.merchandise.price.amount}</p>
            </div>
          </div>
        </div>
      </div>
    </Component>
  )
}

export default ShipInsureItem
