import React, { useEffect, useContext, useRef } from "react"
import { Link, navigate, graphql } from "gatsby"
import {
  GatsbyImage,
  StaticImage,
  type IGatsbyImageData,
} from "gatsby-plugin-image"
import styled from "styled-components"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Loader from "../components/loader"
import QuantitySelector from "../components/quantity-selector"
import { useCart } from "../contexts/storefront-cart"
import {
  tnItem,
  tnSubItem,
  rxType,
  LineItem,
} from "../contexts/storefront-cart/types/storefront-cart"
import { startedCheckoutGTMEvent } from "../helpers/gtm"
import { VscClose } from "react-icons/vsc"
import UpsellCart from "../components/upsell-cart"
import { SelectedVariantStorage } from "../types/global"
import { CustomizeContext } from "../contexts/customize"
import { RxInfoContext } from "../contexts/rxInfo"
import { isDiscounted } from "../helpers/shopify"
import EnableShipInsure from "../components/enable-shipinsure"

const ShipInsureComponent = styled.div`
  .card {
    flex-direction: row !important;
    padding-bottom: 0px !important;
  }
  .card-image {
    margin-top: -30px;
    img {
      max-height: 120px;
      height: auto;
    }
  }
`

const LoaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(204, 204, 204, 0.6);
`

const Page = styled.div`
  .final-sale-disclaimer {
    font-family: var(--sub-heading-font);
    text-align: right;
    text-transform: none;
  }
  .cart-message {
    border: 1px solid;
    background: white;
    text-decoration: underline;
    padding: 6px;
    text-align: center;
  }
  .cart-wrapper {
    max-width: 860px;
    width: 100%;
    padding-left: 22px;
    padding-right: 22px;
    h2 {
      font-weight: normal;
    }
    padding-top: 30px;
    ul {
      .wrapper {
        padding: 0;
      }
      margin: 0;
      li {
        padding: 5px;
        border-radius: 10px;
        .close-btn {
          text-align: right;
          padding: 0px 3px 3px 3px;
          a {
            text-align: right;
            svg {
              font-size: 1.65rem;
            }
          }
        }
        list-style: none;
        background: white;
        margin: 30px 0;
        .card {
          display: flex;
          justify-content: space-between;
          padding: 0 10px 20px 10px;
          > div {
            flex: 1;
            padding: 0 10px;
          }
          @media (max-width: 600px) {
            flex-direction: column;
            .card-image {
              max-width: 280px;
              align-self: center;
            }
          }
        }
        .card-items {
          .quantity-selector {
            margin-top: 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .price {
              color: var(--color-grey-dark);
              font-size: 100%;
              font-family: var(--sub-heading-font);
            }
          }
        }
        .title {
          /* font-weight: bold; */
          &:hover {
            text-decoration: underline;
          }
          margin-bottom: 0;
          a {
            color: #000;
            text-decoration: none;
            display: block;
            margin-bottom: 2px;
          }
        }
        .sub-title {
          display: flex;
          justify-content: space-between;
          color: var(--color-grey-dark);
          margin-bottom: 5px;
          span {
            font-family: var(--sub-heading-font);
            line-height: 18px;
          }
        }
        .sub-title-customize {
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          color: var(--color-grey-dark);
          span {
            font-size: 85%;
            font-family: var(--sub-heading-font);
          }
          .price {
            text-align: right;
          }
        }
        /* img {
          width: 100px;
          height: auto;
        } */
        .remove-item {
          text-decoration: none;
          /* font-weight: bold; */
          color: #000;
        }
      }
    }
    .subtotal {
      text-align: right;
      p {
        &:first-child {
          font-size: 1.75rem;
        }
        &:not(:first-child) {
          color: var(--color-grey-dark);
          font-family: var(--sub-heading-font);
        }
        margin-bottom: 10px;
      }
    }
    .btn-container {
      text-align: right;
      padding: 15px 0;
      button,
      .button {
        background-color: #000;
        border-radius: 0;
        border: 1px solid #000;
        color: #fff;
        display: block;
        font-family: var(--sub-heading-font);
        padding: 10px 20px;
        text-decoration: none;
        text-transform: uppercase;
        font-family: var(--heading-font);
        appearance: button;
        -webkit-appearance: button-bevel;
        :hover {
          cursor: pointer;
        }
        @media only screen and (max-width: 480px) {
          display: inline-block;
        }
      }
      /* a {
        text-decoration: none;
        color: #000;
      } */
    }
    p,
    span,
    a,
    h2 {
      font-family: var(--heading-font);
      text-transform: uppercase;
    }
    &:nth-child(1) {
      background: #e0e0e0;
    }
    &:nth-child(2) {
      background: white;
    }
    hr {
      background-color: black;
      margin-bottom: 0;
      margin: 5px 0 5px 0;
    }
  }
  .customized {
    .step-name {
      color: black;
    }
  }
  .grey-background {
    background: #e0e0e0;
  }
  .empty-cart {
    p {
      font-family: var(--heading-font);
      color: var(--color-grey-dark);
      font-size: 130%;
    }
    h1 {
      text-transform: uppercase;
      font-weight: normal;
      text-align: center;
    }
    .empty-flex {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 40px 0;
    }
  }
  .no-events {
    pointer-events: none;
    opacity: 0.5;
  }
  .checkout-loading {
    min-height: 42px;
    min-width: 165px;
    position: relative;
    @media only screen and (max-width: 468px) {
      min-height: 39px;
      min-width: 152px;
    }
    div {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .price-group {
    display: flex;
    column-gap: 10px;
    justify-content: end;
  }
  .original-price {
    text-decoration-line: line-through;
  }
`

const Cart = ({
  data: {
    contentfulHomepage: { cartMessage, cartMessageToggle },
    contentfulVariantCollection: clearanceItemsData,
  },
}) => {
  const {
    cart,
    removeProductFromCart,
    updateProductInCart,
    removeProductsFromCart,
    isRemovingFromCart,
    updateShipInsureAttribute,
  } = useCart()

  const { rxInfo, rxInfoDispatch } = useContext(RxInfoContext)

  const { setSelectedVariants, setCurrentStep, setHasSavedCustomized } =
    useContext(CustomizeContext)

  const stepMap = new Map()
  stepMap.set(1, "RX TYPE")
  stepMap.set(2, "LENS TYPE")
  stepMap.set(3, "LENS MATERIAL")
  stepMap.set(4, "LENS COATING")
  stepMap.set(5, "CASE")
  const loadingOverlay = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (cart) {
      if (cart.lines.edges.length > 0) {
        startedCheckoutGTMEvent(cart)
      }
    }
  }, [cart])

  const editGlasses = (item: tnItem) => {
    const isBrowser: boolean = typeof window !== "undefined"
    if (isBrowser) {
      const customsResume = localStorage.getItem("customs-resume")
      if (customsResume) {
        const customsStorage = JSON.parse(
          customsResume
        ) as SelectedVariantStorage
        const parsedCustoms = customsStorage.value.customs
        const resumedSelectedVariants = parsedCustoms[item.id].selectedVariants
        const handle = parsedCustoms[item.id].handle
        const sku = parsedCustoms[item.id].sku

        // grab prescription and set context
        const rxAttr = item.lineItems[1].shopifyItem.attributes.find(
          el => el.key === "Prescription"
        )
        if (rxAttr && rxAttr.value !== "Non-Prescription") {
          const prescription = JSON.parse(rxAttr.value) as rxType
          rxInfoDispatch({
            type: `full`,
            payload: prescription,
          })
        }
        // prepare context for editing
        // setting context
        setSelectedVariants(resumedSelectedVariants)
        // setting savedCustomized context so radio won't default to top option
        setHasSavedCustomized({
          step1: true,
          step2: true,
          step3: true,
          step4: true,
          case: true,
        })
        setCurrentStep(5)
        // navigate to step 5 of customize page
        navigate(
          // @ts-ignore
          `/products/${handle}/customize?variant=${sku}&custom_id=${item.id.toString()}`
        )
      }
    }
  }

  const removeMultipleProducts = async (item: tnItem) => {
    let hasDiscount = false
    const lineIds = item.lineItems.map(item => {
      if (item.shopifyItem.discountAllocations.length > 0) {
        hasDiscount = true
      }
      return item.shopifyItem.id
    })

    loadingOverlay.current?.classList.add("no-events")
    await removeProductsFromCart(lineIds, item.id, hasDiscount)
    loadingOverlay.current?.classList.remove("no-events")
  }

  const removeSingleProduct = async item => {
    loadingOverlay.current?.classList.add("no-events")
    await removeProductFromCart(item.lineItems[0].shopifyItem.id, item.id)
    loadingOverlay.current?.classList.remove("no-events")
  }

  const updateQuantity = async (
    lineId: string,
    variantId: string,
    quantity: number,
    imageId: string
  ) => {
    loadingOverlay.current?.classList.add("no-events")
    await updateProductInCart(lineId, variantId, quantity, imageId)
    loadingOverlay.current?.classList.remove("no-events")
  }

  const totalSum = (lineItems: tnSubItem[]) => {
    let sum = 0
    lineItems.forEach(item => {
      const hasDiscount = item.shopifyItem.discountAllocations.length > 0
      let price = parseFloat(item.shopifyItem.merchandise.price.amount)
      if (hasDiscount) {
        price =
          Number(price) -
          Number(
            item.shopifyItem.discountAllocations[0].discountedAmount.amount
          )
      }
      sum += price
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
  const totalCompareAt = (lineItems: tnSubItem[]) => {
    let sum = 0
    lineItems.forEach(item => {
      let price = item.shopifyItem.merchandise.compareAtPrice
        ? item.shopifyItem.merchandise.compareAtPrice.amount
        : "0.00"
      sum += parseFloat(price)
    })
    return sum.toFixed(2)
  }

  const checkForDiscountInBundle = (lineItems: tnSubItem[]): boolean => {
    return lineItems.some(
      item => item.shopifyItem.discountAllocations.length > 0
    )
  }

  const priceTimesQuantity = (price: string, quantity: number) => {
    return (Number(price) * quantity).toFixed(2)
  }

  const formatItemTitle = (
    subItem: tnSubItem,
    stepName: string,
    isCustom: boolean
  ) => {
    if (subItem.stepNumber === "0" && isCustom) {
      return subItem.shopifyItem.merchandise.title.split("-")[0]
    }
    if (stepName === "CASE") {
      let spl = subItem.shopifyItem.merchandise.product.title.split("AO")[0]
      return spl.slice(0, -2)
    }
    if (subItem.shopifyItem.merchandise.title === "Default Title") {
      return subItem.shopifyItem.merchandise.product.title
    } else {
      return `${subItem.shopifyItem.merchandise.product.title} - ${subItem.shopifyItem.merchandise.title}`
    }
  }

  const renderStandardProduct = (item: tnItem) => {
    // check if product is shipinsure, if so, return the shipinsure component

    const line = item.lineItems[0].shopifyItem

    if (line.merchandise.product.handle === "shipinsure") {
      return renderShipInsure(line, item.image)
    }

    const hasDiscount = line.discountAllocations.length > 0
    const originalPrice = line.merchandise.price.amount

    let price: string | number = line.merchandise.price.amount
    if (hasDiscount) {
      price = (
        Number(price) -
        Number(line.discountAllocations[0].discountedAmount.amount) /
          line.quantity
      ).toString()
    }
    const discountAllocation =
      item.lineItems[0].shopifyItem.discountAllocations.length > 0
        ? parseFloat(
            item.lineItems[0].shopifyItem.discountAllocations[0]
              .discountedAmount.amount
          )
        : 0
    const totalOriginalPrice = (
      Number(line.merchandise.price.amount) * line.quantity
    ).toFixed(2)
    const totalCompareAtPrice = !line.merchandise.compareAtPrice
      ? "0.00"
      : (
          Number(line.merchandise.compareAtPrice.amount) * line.quantity
        ).toFixed(2)
    return (
      <li key={line.id}>
        <div className="close-btn">
          <a
            className="remove-item"
            href="#"
            onClick={() => removeSingleProduct(item)}
          >
            <VscClose className="text-btn" />
          </a>
        </div>
        <div className="card">
          <div className="card-image">
            {item.image ? (
              <GatsbyImage
                image={item.image}
                alt={line.merchandise.title}
              ></GatsbyImage>
            ) : (
              <StaticImage
                src="../images/product-no-image.jpg"
                alt="No image"
              ></StaticImage>
            )}
          </div>
          <div className="card-items">
            <div>
              <p className="title">
                <Link to={`/products/${line.merchandise.product.handle}`}>
                  {line.merchandise.product.title}
                </Link>
              </p>
              <div className="sub-title">
                <span>
                  {line.merchandise.title !== "Default Title"
                    ? line.merchandise.title
                    : ""}
                </span>
                <div className="price-group">
                  {hasDiscount ? (
                    <span className="original-price">
                      ${Number(originalPrice).toFixed(2)}
                    </span>
                  ) : (
                    line.merchandise.compareAtPrice &&
                    isDiscounted(
                      originalPrice,
                      line.merchandise.compareAtPrice.amount
                    ) && (
                      <span className="original-price">
                        $
                        {Number(line.merchandise.compareAtPrice.amount).toFixed(
                          2
                        )}
                      </span>
                    )
                  )}
                  <span className="price">${Number(price).toFixed(2)}</span>
                </div>
              </div>
            </div>
            <hr />
            <div className="quantity-selector">
              <QuantitySelector
                lineId={line.id}
                quantity={line.quantity}
                imageId={item.id}
                variantId={line.merchandise.id}
                updateQuantity={updateQuantity}
              />
              <div className="price-group">
                {hasDiscount ? (
                  <span className="price original-price">
                    ${totalOriginalPrice}
                  </span>
                ) : (
                  line.merchandise.compareAtPrice &&
                  isDiscounted(totalOriginalPrice, totalCompareAtPrice) && (
                    <span className="price original-price">
                      ${totalCompareAtPrice}
                    </span>
                  )
                )}
                <span className="price">
                  $
                  {(
                    Number(line.merchandise.price.amount) * line.quantity -
                    discountAllocation
                  ).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </li>
    )
  }

  const renderShipInsure = (
    item: LineItem,
    image: IGatsbyImageData | null | undefined
  ) => {
    return (
      <li key={item.id}>
        <ShipInsureComponent>
          <div className="close-btn">
            <a
              className="remove-item"
              href="#"
              onClick={() => updateShipInsureAttribute(false)}
            >
              <VscClose className="text-btn" />
            </a>
          </div>
          <div className="card">
            <div className="card-image">
              {image ? (
                <GatsbyImage
                  image={image}
                  alt={item.merchandise.product.title ?? "ShipInsure"}
                />
              ) : (
                <StaticImage
                  src="../images/product-no-image.jpg"
                  alt="No image"
                />
              )}
            </div>
            <div className="card-items">
              <div>
                <p className="title">
                  <Link to={`/products/${item.merchandise.product.handle}`}>
                    {item.merchandise.product.title}
                  </Link>
                </p>
                <div className="sub-title">
                  <span>
                    {/* {item.variant.title !== "Default Title"
                    ? item.variant.title
                    : ""} */}
                  </span>
                  <div className="price-group">
                    <span className="price">
                      ${Number(item.merchandise.price.amount).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ShipInsureComponent>
      </li>
    )
  }

  const renderSunglasses = (item: tnItem) => {
    const sunglassesStepMap = new Map()
    sunglassesStepMap.set(1, "CASE")
    const hasDiscount = checkForDiscountInBundle(item.lineItems)

    const createClearanceSKUs = (data): string[] => {
      try {
        const { variants } = data
        const handles = Array.from(variants.map(variant => variant.sku))
        return handles as string[]
      } catch (e) {
        console.log(e)
        return []
      }
    }

    const clearanceSKUs = createClearanceSKUs(clearanceItemsData)
    // if a sunglasses's product handle is in const variable and isDiscounted, then it is a clearance sale, and we should show the final sale disclaimer
    const isClearanceSale =
      clearanceSKUs.includes(item.lineItems[0].shopifyItem.merchandise.sku) &&
      item.lineItems[0].shopifyItem.merchandise.compareAtPrice &&
      isDiscounted(
        item.lineItems[0].shopifyItem.merchandise.price.amount,
        item.lineItems[0].shopifyItem.merchandise.compareAtPrice.amount
      )

    return (
      <li key={item.id} className="customized">
        <div className="close-btn">
          <a
            className="remove-item"
            href="#"
            onClick={() => removeMultipleProducts(item)}
          >
            <VscClose />
          </a>
        </div>
        <div className="card">
          <div className="card-image">
            {item.image ? (
              <GatsbyImage
                image={item.image}
                alt={item.lineItems[0].shopifyItem.merchandise.title}
              ></GatsbyImage>
            ) : (
              <StaticImage
                src="../images/product-no-image.jpg"
                alt="no-image"
              ></StaticImage>
            )}
          </div>
          <div>
            <div>
              <p className="title">
                <Link
                  to={`/products/${item.lineItems[0].shopifyItem.merchandise.product.handle}`}
                >
                  {item.lineItems[0].shopifyItem.merchandise.product.title}
                </Link>
              </p>
              <div className="sub-title-customize">
                {item.lineItems.map((subItem, subIndex) => {
                  // new discounts
                  const hasDiscount =
                    subItem.shopifyItem.discountAllocations.length > 0
                  let price = subItem.shopifyItem.merchandise.price.amount
                  const originalPrice =
                    subItem.shopifyItem.merchandise.price.amount
                  const compareAtPrice = subItem.shopifyItem.merchandise
                    .compareAtPrice
                    ? subItem.shopifyItem.merchandise.compareAtPrice.amount
                    : "0.00"
                  if (hasDiscount) {
                    price = (
                      Number(price) -
                      Number(
                        subItem.shopifyItem.discountAllocations[0]
                          .discountedAmount.amount
                      )
                    ).toFixed(2)
                  }
                  // new discounts
                  return (
                    <div className="sub-item" key={subItem.shopifyItem.id}>
                      <div className="step-name">
                        <p>{sunglassesStepMap.get(subIndex)}</p>
                      </div>
                      <div className="sub-title" key={subItem.shopifyItem.id}>
                        <span key={subItem.shopifyItem.id}>
                          {formatItemTitle(
                            subItem,
                            sunglassesStepMap.get(subIndex),
                            item.isCustom
                          )}
                        </span>
                        <div className="price-group">
                          {hasDiscount ? (
                            <span className="original-price">
                              ${Number(originalPrice).toFixed(2)}
                            </span>
                          ) : (
                            subItem.shopifyItem.merchandise.compareAtPrice &&
                            isDiscounted(
                              subItem.shopifyItem.merchandise.price.amount,
                              subItem.shopifyItem.merchandise.compareAtPrice
                                .amount
                            ) && (
                              <span className="original-price">
                                ${Number(compareAtPrice).toFixed(2)}
                              </span>
                            )
                          )}
                          <span className="price">
                            {price === "0.00" || price === "0.0"
                              ? "Free"
                              : "$" + Number(price).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
                <hr />
                <div className="price-group">
                  {hasDiscount ? (
                    <span className="price original-price">
                      ${totalOriginalSum(item.lineItems)}
                    </span>
                  ) : (
                    isDiscounted(
                      totalOriginalSum(item.lineItems),
                      totalCompareAt(item.lineItems)
                    ) && (
                      <span className="price original-price">
                        ${totalCompareAt(item.lineItems)}
                      </span>
                    )
                  )}
                  <span className="price total-price">
                    ${totalSum(item.lineItems)}
                  </span>
                </div>
                {isClearanceSale && (
                  <span className="final-sale-disclaimer">
                    Final sale. No returns or exchanges.
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </li>
    )
  }

  const renderCustomProduct = (item: tnItem) => {
    const hasDiscount = checkForDiscountInBundle(item.lineItems)
    return (
      <li key={item.id} className="customized">
        <div className="close-btn">
          <a
            className="remove-item"
            href="#"
            onClick={() => removeMultipleProducts(item)}
          >
            <VscClose />
          </a>
        </div>
        <div className="card">
          <div className="card-image">
            {item.image ? (
              <GatsbyImage
                image={item.image}
                alt={item.lineItems[0].shopifyItem.merchandise.title}
              ></GatsbyImage>
            ) : (
              <StaticImage
                src="../images/product-no-image.jpg"
                alt="no-image"
              ></StaticImage>
            )}
          </div>
          <div>
            <div>
              <p className="title">
                <Link
                  to={`/products/${item.lineItems[0].shopifyItem.merchandise.product.handle}`}
                >
                  {item.lineItems[0].shopifyItem.merchandise.product.title}
                </Link>
              </p>
              <div className="sub-title-customize">
                {Array.from({ length: 6 }, (v, i) => i).map(subIndex => {
                  const subItems = item.lineItems.filter(
                    el => Number(el.stepNumber) === subIndex
                  )
                  if (subItems) {
                    return (
                      <div key={subIndex}>
                        {subItems.map((subItem, i) => {
                          // new discounts
                          const hasDiscount =
                            subItem.shopifyItem.discountAllocations.length > 0
                          let price =
                            subItem.shopifyItem.merchandise.price.amount
                          const originalPrice =
                            subItem.shopifyItem.merchandise.price.amount
                          if (hasDiscount) {
                            price = (
                              Number(price) -
                              Number(
                                subItem.shopifyItem.discountAllocations[0]
                                  .discountedAmount.amount
                              )
                            ).toFixed(2)
                          }
                          // new discounts
                          return (
                            <div
                              className="sub-item"
                              key={subItem.shopifyItem.id}
                            >
                              {i === 0 && (
                                <div className="step-name">
                                  <p>{stepMap.get(subIndex)}</p>
                                </div>
                              )}

                              <div
                                className="sub-title"
                                key={subItem.shopifyItem.id}
                              >
                                <span key={subItem.shopifyItem.id}>
                                  {formatItemTitle(
                                    subItem,
                                    stepMap.get(subIndex),
                                    item.isCustom
                                  )}
                                </span>
                                <div className="price-group">
                                  {hasDiscount ? (
                                    <span className="original-price">
                                      ${Number(originalPrice).toFixed(2)}
                                    </span>
                                  ) : (
                                    subItem.shopifyItem.merchandise
                                      .compareAtPrice &&
                                    isDiscounted(
                                      originalPrice,
                                      subItem.shopifyItem.merchandise
                                        .compareAtPrice.amount
                                    ) && (
                                      <span className="original-price">
                                        $
                                        {Number(
                                          subItem.shopifyItem.merchandise
                                            .compareAtPrice.amount
                                        ).toFixed(2)}
                                      </span>
                                    )
                                  )}
                                  <span className="price">
                                    {price === "0.00" || price === "0.0"
                                      ? "Free"
                                      : "$" + Number(price).toFixed(2)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )
                  } else {
                    return null
                  }
                })}
                <hr />
                <div className="price-group">
                  {hasDiscount ? (
                    <span className="price original-price">
                      ${totalOriginalSum(item.lineItems)}
                    </span>
                  ) : (
                    isDiscounted(
                      totalOriginalSum(item.lineItems),
                      totalCompareAt(item.lineItems)
                    ) && (
                      <span className="price original-price">
                        ${totalCompareAt(item.lineItems)}
                      </span>
                    )
                  )}
                  <span className="price total-price">
                    ${totalSum(item.lineItems)}
                  </span>
                </div>
              </div>
            </div>
            <div className="edit-product">
              <button className="btn" onClick={evt => editGlasses(item)}>
                EDIT
              </button>
            </div>
          </div>
        </div>
      </li>
    )
  }

  return (
    <Layout>
      <SEO title="Cart" />
      <Page>
        {!cart ? (
          <Loader />
        ) : (
          <>
            {!cart.lines.edges.length ? (
              <section className="empty-cart">
                <h1>Cart</h1>
                <div className="grey-background">
                  <div className="empty-flex">
                    <figure>
                      <picture>
                        <StaticImage
                          src="../images/empty-cart.png"
                          alt="Empty cart icon."
                          height={225}
                        ></StaticImage>
                      </picture>
                    </figure>
                    <p>Your cart is empty.</p>
                    <Link to={"/"} className="btn">
                      CONTINUE SHOPPING
                    </Link>
                  </div>
                </div>
              </section>
            ) : (
              <section>
                <div className="grey-background" ref={loadingOverlay}>
                  <section className="cart-items cart-wrapper wrapper">
                    <h2>
                      Your cart:{" "}
                      <span className="total">
                        ${Number(cart.cost.subtotalAmount.amount).toFixed(2)}
                      </span>
                    </h2>
                    <ul>
                      {cart &&
                        cart?.tnLineItems &&
                        cart.tnLineItems.map((item: tnItem) => {
                          if (item) {
                            if (item.isCustom) {
                              return renderCustomProduct(item)
                            } else if (item.lineItems.length === 2) {
                              return renderSunglasses(item)
                            }
                            return renderStandardProduct(item)
                          }
                        })}
                    </ul>
                    <EnableShipInsure />
                    <div className="subtotal">
                      <p>
                        Subtotal:{" "}
                        <span className="total">
                          ${Number(cart.cost.subtotalAmount.amount).toFixed(2)}
                        </span>
                      </p>
                      <p>Delivery & Taxes are calculated at checkout.</p>
                      {cartMessageToggle && (
                        <p className="cart-message">{cartMessage}</p>
                      )}
                    </div>
                    <div className="btn-container">
                      <a href={cart.checkoutUrl} className="btn checkout">
                        Check Out
                      </a>
                    </div>
                  </section>
                </div>
                <section className="cart-wrapper wrapper">
                  <UpsellCart />
                </section>
                {isRemovingFromCart && (
                  <LoaderContainer>
                    <Loader />
                  </LoaderContainer>
                )}
              </section>
            )}
          </>
        )}
      </Page>
    </Layout>
  )
}

export default Cart

export const query = graphql`
  query getCartSettings {
    contentfulHomepage {
      cartMessage
      cartMessageToggle
    }
    contentfulVariantCollection(handle: { eq: "sale" }) {
      variants {
        sku
      }
    }
  }
`
