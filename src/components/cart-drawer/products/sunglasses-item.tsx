import React, { useRef } from "react"
import type {
  tnItem,
  tnSubItem,
} from "../../../contexts/storefront-cart/types/storefront-cart"
import { GatsbyImage } from "gatsby-plugin-image"
import { graphql } from "gatsby"
import { useCart } from "../../../contexts/storefront-cart"
import styled from "styled-components"
import { VscClose } from "react-icons/vsc"
import { Link, useStaticQuery } from "gatsby"
import { isDiscounted } from "../../../helpers/shopify"

const Component = styled.div`
  .fs-cont {
    display: flex;
    justify-content: flex-end;
  }
  .final-sale-disclaimer {
    font-family: var(--sub-heading-font);
    text-align: right;
    margin: none;
    font-size: 0.8rem;
    color: var(--color-grey-dark);
    text-transform: uppercase;
    margin-top: 6px;
    line-height: 15px;
  }
  .small {
    p {
      margin: none;
      font-size: 0.8rem;
    }
  }
  .price-quantity {
    justify-content: flex-end !important;
    display: flex;
    column-gap: 10px;
  }
  .original-price {
    text-decoration-line: line-through;
    color: var(--color-grey-dark);
  }
`

const SunglassesItem = (props: { item: tnItem }) => {
  const { item } = props
  const { removeProductsFromCart, setIsCartDrawerOpen } = useCart()

  const clearanceItemsData = useStaticQuery(graphql`
    query getClearanceItemsDrawer {
      contentfulVariantCollection(handle: { eq: "sale" }) {
        variants {
          sku
        }
      }
    }
  `)

  const createClearanceSKUs = (data): string[] => {
    try {
      const { contentfulVariantCollection } = data
      const { variants } = contentfulVariantCollection
      const handles = Array.from(variants.map(variant => variant.sku))
      return handles as string[]
    } catch (e) {
      console.log(e)
      return []
    }
  }

  const clearanceSKUs = createClearanceSKUs(clearanceItemsData)

  const loadingOverlay = useRef<HTMLDivElement>(null)

  // if a sunglasses's product handle is in const variable and isDiscounted, then it is a clearance sale, and we should show the final sale disclaimer
  const isClearanceSale =
    clearanceSKUs.includes(item.lineItems[0].shopifyItem.merchandise.sku) &&
    item.lineItems[0].shopifyItem.merchandise.compareAtPrice &&
    isDiscounted(
      item.lineItems[0].shopifyItem.merchandise.price.amount,
      item.lineItems[0].shopifyItem.merchandise.compareAtPrice.amount
    )

  const removeMultipleProducts = async (item: tnItem) => {
    const loadingContainer = loadingOverlay.current?.closest(".cart-products")
    let hasDiscount = false
    const lineIds = item.lineItems.map(item => {
      if (item.shopifyItem.discountAllocations.length > 0) {
        hasDiscount = true
      }
      return item.shopifyItem.id
    })

    loadingContainer?.classList.add("no-events")
    await removeProductsFromCart(lineIds, item.id, hasDiscount)
    loadingContainer?.classList.remove("no-events")
  }

  const totalCompareAt = lineItems => {
    let sum = 0
    lineItems.forEach(item => {
      let price = item.shopifyItem.merchandise.compareAtPrice
        ? item.shopifyItem.merchandise.compareAtPrice.amount
        : "0.00"
      sum += parseFloat(price)
    })
    return sum.toFixed(2)
  }

  const totalSum = (lineItems: tnSubItem[]) => {
    let sum = 0
    lineItems.forEach(item => {
      // new discounts
      const hasDiscount = item.shopifyItem.discountAllocations.length > 0
      let price = item.shopifyItem.merchandise.price.amount
      if (hasDiscount) {
        price = (
          Number(price) -
          Number(
            item.shopifyItem.discountAllocations[0].discountedAmount.amount
          )
        ).toFixed(2)
      }
      // new discounts
      sum += parseFloat(price)
    })
    return sum.toFixed(2)
  }

  const totalOriginalSum = (lineItems: tnSubItem[]) => {
    let sum = 0
    lineItems.forEach(item => {
      let price = item.shopifyItem.merchandise.price.amount
      sum += parseFloat(price)
    })
    return sum.toFixed(2)
  }

  const checkForDiscountInBundle = (lineItems: tnSubItem[]): boolean => {
    return lineItems.some(
      item => item.shopifyItem.discountAllocations.length > 0
    )
  }

  const formatCaseName = (caseName: string) => {
    let spl = caseName.split("AO")[0]
    return spl.slice(0, -2)
  }

  const hasDiscount = checkForDiscountInBundle(item.lineItems)

  return (
    <Component className="item-card" ref={loadingOverlay}>
      <div className="close-btn">
        <button
          className="remove-item"
          onClick={() => removeMultipleProducts(item)}
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
            <p className="subtitle">
              +{" "}
              {formatCaseName(
                item.lineItems[item.lineItems.length - 1].shopifyItem
                  .merchandise.product.title
              )}
            </p>
          </div>
          <div className="price-quantity">
            <p>${totalSum(item.lineItems)}</p>
            {hasDiscount ? (
              <p className="original-price">
                ${totalOriginalSum(item.lineItems)}
              </p>
            ) : (
              isDiscounted(
                totalSum(item.lineItems),
                totalCompareAt(item.lineItems)
              ) && (
                <p className="original-price">
                  ${totalCompareAt(item.lineItems)}
                </p>
              )
            )}
          </div>
          {isClearanceSale && (
            <div className="fs-cont">
              <span className="final-sale-disclaimer">
                Final sale. No returns or exchanges.
              </span>
            </div>
          )}
        </div>
      </div>
    </Component>
  )
}

export default SunglassesItem
