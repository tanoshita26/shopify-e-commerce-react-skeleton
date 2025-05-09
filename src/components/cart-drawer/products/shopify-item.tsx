import React, { useRef } from "react"
import type { tnItem } from "../../../contexts/storefront-cart/types/storefront-cart"
import { GatsbyImage } from "gatsby-plugin-image"
import QuantitySelector from "../../quantity-selector"
import { useCart } from "../../../contexts/storefront-cart"
import styled from "styled-components"
import { VscClose } from "react-icons/vsc"
import { Link } from "gatsby"
import { isDiscounted } from "../../../helpers/shopify"
import ShipInsureItem from "./shipinsure-item"

const Component = styled.div`
  .original-price {
    text-decoration-line: line-through;
    color: var(--color-grey-dark);
  }
`

const ShopifyItem = (props: { item: tnItem }) => {
  const { item } = props
  const { updateProductInCart, removeProductFromCart, setIsCartDrawerOpen } =
    useCart()

  const loadingOverlay = useRef<HTMLDivElement>(null)

  if (
    item.lineItems[0].shopifyItem.merchandise.product.handle === "shipinsure"
  ) {
    return <ShipInsureItem item={item} />
  }

  const removeSingleProduct = async item => {
    const loadingContainer = loadingOverlay.current?.closest(".cart-products")
    loadingContainer?.classList.add("no-events")
    await removeProductFromCart(item.lineItems[0].shopifyItem.id, item.id)
    loadingContainer?.classList.remove("no-events")
  }

  const updateQuantity = async (
    lineId: string,
    variantId: string,
    quantity: number,
    imageId: string
  ) => {
    const loadingContainer = loadingOverlay.current?.closest(".cart-products")
    loadingContainer?.classList.add("no-events")
    await updateProductInCart(lineId, variantId, quantity, imageId)
    loadingContainer?.classList.remove("no-events")
  }

  const discountAllocation =
    item.lineItems[0].shopifyItem.discountAllocations.length > 0
      ? parseFloat(
          item.lineItems[0].shopifyItem.discountAllocations[0].discountedAmount
            .amount
        )
      : 0
  const hasDiscount =
    item.lineItems[0].shopifyItem.discountAllocations.length > 0

  const priceTimesQuantity = (price: string, quantity: number) => {
    return (Number(price) * quantity - discountAllocation).toFixed(2)
  }

  const priceTimesQuantityOriginal = (price: string, quantity: number) => {
    return (Number(price) * quantity).toFixed(2)
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
            <p className="subtitle">
              {item.lineItems[0].shopifyItem.merchandise.title ===
              "Default Title"
                ? ""
                : item.lineItems[0].shopifyItem.merchandise.title}
            </p>
          </div>
          <div className="price-quantity">
            <QuantitySelector
              lineId={item.lineItems[0].shopifyItem.id}
              variantId={item.lineItems[0].shopifyItem.merchandise.id}
              quantity={item.lineItems[0].shopifyItem.quantity}
              imageId={item.lineItems[0].shopifyItem.id}
              updateQuantity={updateQuantity}
            />
            <div className="price-wrapper">
              <p>
                $
                {priceTimesQuantity(
                  item.lineItems[0].shopifyItem.merchandise.price.amount,
                  item.lineItems[0].shopifyItem.quantity
                )}
              </p>
              {hasDiscount ? (
                <p className="original-price">
                  $
                  {priceTimesQuantityOriginal(
                    item.lineItems[0].shopifyItem.merchandise.price.amount,
                    item.lineItems[0].shopifyItem.quantity
                  )}
                </p>
              ) : (
                item.lineItems[0].shopifyItem.merchandise.compareAtPrice &&
                isDiscounted(
                  item.lineItems[0].shopifyItem.merchandise.price.amount,
                  item.lineItems[0].shopifyItem.merchandise.compareAtPrice
                    .amount
                ) && (
                  <p className="original-price">
                    $
                    {priceTimesQuantityOriginal(
                      item.lineItems[0].shopifyItem.merchandise.compareAtPrice
                        .amount,
                      item.lineItems[0].shopifyItem.quantity
                    )}
                  </p>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </Component>
  )
}

export default ShopifyItem
