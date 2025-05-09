import React, { useEffect, useRef } from "react"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
import { useCart } from "../../contexts/storefront-cart"
import type { tnItem } from "../../contexts/storefront-cart/types/storefront-cart"
import CartIcon from "./cart-icon"
import { FaChevronRight } from "react-icons/fa"
import { useClickAway } from "react-use"
import { useSpring, animated, config } from "react-spring"
import ShopifyItem from "./products/shopify-item"
import SunglassesItem from "./products/sunglasses-item"
import CustomItem from "./products/custom-item"
import Loader from "../loader"
import EnableShipInsure from "../enable-shipinsure"

const DRAWER_INTERVAL = 10000

const Component = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  z-index: 100000;
  max-height: 100vh;
  height: 100vh;
  width: 400px;
  max-width: 100vw;
  overflow-y: auto;
  border: 0.5px solid #c5c5c5;
  border-top: none;
  font-family: var(--sub-heading-font);
  .cart-message {
    font-size: 15px !important;
    line-height: 18px !important;
    border: 1px solid;
    background: white;
    text-decoration: underline;
    padding: 3px;
    text-align: center;
  }
  .header {
    position: sticky;
    top: 0;
    z-index: 100002;
    button {
      margin-left: 19px;
      @media screen and (max-width: 400px) {
        margin-left: 30px;
      }
      padding: 0;
      color: white;
      background: none;
      outline: none;
      border: none;
      cursor: pointer;
    }
    background-color: black;
    display: flex;
    color: white;
    justify-content: space-between;
    align-items: center;
    font-family: var(--heading-font);
    text-transform: uppercase;
    .sub-flex {
      display: flex;
      margin-right: 15px;
      > span {
        &:first-of-type {
          margin-right: 18px;
        }
      }
    }
    padding: 25px 10px 25px 0px;
    font-size: 1.5rem;
  }
  .cart-products {
    overflow-y: auto;
    flex: 1 0 auto;
  }
  .item-card {
    border: 0.5px solid #c5c5c5;
    padding: 5px 2px;
    .close-btn {
      text-align: right;
      button {
        appearance: none;
        background: none;
        outline: none;
        border: none;
        padding: 0;
      }
    }
    svg {
      cursor: pointer;
      font-size: 1.6rem;
      color: var(--color-grey-dark);
    }
    .product-card {
      display: flex;
      justify-content: space-between;
      > div {
        &:first-of-type {
          flex: 0.7;
        }
        &:last-of-type {
          flex: 1;
        }
      }
      padding: 10px;
      padding-top: 0;
      p {
        text-transform: uppercase;
      }
      .product-titles {
        text-align: left;
        p {
          margin: 0;
        }
        a {
          text-decoration: none;
          color: black;
          &:hover,
          &:focus {
            text-decoration: underline;
          }
        }
        .title {
          font-family: var(--heading-font);
        }
        .subtitle {
          font-size: 0.85rem;
          color: var(--color-grey-dark);
        }
      }
      .product-image {
        padding-left: 5px;
        padding-right: 15px;
        .gatsby-image-wrapper {
          max-width: 128px;
        }
      }
    }
  }
  .cart-icon {
    filter: invert(1);
  }
  .cart-badge {
    background: white;
    .cart-number {
      color: black;
    }
  }
  .sticky-bottom {
    box-shadow: 0px 5px 15px #888;
    flex-shrink: 0;
    position: sticky;
    bottom: 0;
    background: white;
    padding: 0 20px;
    padding-top: 25px;
    border: 0.5px solid #c5c5c5;
    .button-flex {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      a {
        color: white;
        padding: 12px 16px;
        font-size: 1.1rem;
      }
    }
    p {
      text-transform: uppercase;
      margin: 0;
      text-align: right;
      margin-bottom: 20px;
      &:first-of-type {
        font-size: 1.3rem;
      }
      &:not(:first-of-type) {
        color: var(--color-grey-dark);
        text-align: center;
      }
    }
  }
  .price-quantity {
    margin-top: 20px;
    > div {
      flex: 1;
    }
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      margin: 0;
    }
  }
  .no-events {
    pointer-events: none;
    opacity: 0.5;
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

const CartDrawer = () => {
  const { cart, isCartDrawerOpen, setIsCartDrawerOpen, isRemovingFromCart } =
    useCart()

  const {
    contentfulHomepage: { cartMessage, cartMessageToggle },
  } = useStaticQuery(graphql`
    query getCartMessageForDrawer {
      contentfulHomepage {
        cartMessage
        cartMessageToggle
      }
    }
  `)

  const clickRef = useRef(null)

  useClickAway(clickRef, () => {
    setIsCartDrawerOpen(false)
  })

  useEffect(() => {
    if (!isCartDrawerOpen) return
    const intevalAmount = DRAWER_INTERVAL
    const timer = setInterval(() => {
      setIsCartDrawerOpen(false)
    }, intevalAmount)

    return () => clearInterval(timer)
  }, [isCartDrawerOpen])

  // React Spring
  const isBrowser = typeof window !== "undefined"
  if (!isBrowser) return null
  const slideInStyles = useSpring({
    config: { ...config.default },
    from: {
      opacity: 0,
      position: "fixed" as any,
      top: 0,
      right: 0,
      transform: "translateX(0)",
      zIndex: 100000,
    },
    to: {
      position: "fixed",
      top: 0,
      right: 0,
      opacity: isCartDrawerOpen ? 1 : 0,
      transform: isCartDrawerOpen ? "translateX(0px)" : "translateX(1000px)",
      zIndex: 100000,
    },
  })

  return (
    <animated.div style={{ ...slideInStyles }} className="animated">
      {cart && cart.tnLineItems && cart.tnLineItems.length !== 0 && (
        <Component ref={clickRef}>
          <div className="header">
            <button onClick={evt => setIsCartDrawerOpen(false)}>
              <FaChevronRight />
            </button>
            <div className="sub-flex">
              <span>Cart</span>
              <span onClick={evt => setIsCartDrawerOpen(false)}>
                <CartIcon />
              </span>
            </div>
          </div>
          <div className="cart-products">
            {cart &&
              cart.tnLineItems &&
              cart.tnLineItems.map((item: tnItem) => {
                if (!item.isCustom && item.lineItems.length === 1) {
                  return <ShopifyItem item={item} key={item.id} />
                } else if (!item.isCustom && item.lineItems.length === 2) {
                  return <SunglassesItem item={item} key={item.id} />
                } else {
                  return <CustomItem item={item} key={item.id} />
                }
              })}
          </div>
          <div className="sticky-bottom">
            <div>
              <EnableShipInsure />
            </div>
            <p>
              Subtotal:{" "}
              <span>
                ${Number(cart.cost.subtotalAmount.amount).toFixed(2)} USD
              </span>
            </p>

            <div className="button-flex">
              <button
                className="btn"
                onClick={evt => setIsCartDrawerOpen(false)}
              >
                CONTINUE SHOPPING
              </button>
              <a
                className="btn"
                href={cart.checkoutUrl}
                onClick={evt => setIsCartDrawerOpen(false)}
              >
                CHECKOUT
              </a>
            </div>
            <p>TAXES AND SHIPPING WILL BE CALCULATED AT CHECKOUT</p>
            {cartMessageToggle && <p className="cart-message">{cartMessage}</p>}
          </div>
          {isRemovingFromCart && (
            <LoaderContainer>
              <Loader />
            </LoaderContainer>
          )}
        </Component>
      )}
    </animated.div>
  )
}

export default CartDrawer
