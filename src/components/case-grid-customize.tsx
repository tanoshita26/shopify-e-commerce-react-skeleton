import React, { useContext, useEffect } from "react"
import { GatsbyImage, StaticImage } from "gatsby-plugin-image"
import styled from "styled-components"
import { IGatsbyImageData } from "gatsby-plugin-image"
import { ShopifyVariant } from "../types/global"
import { CustomizeContext } from "../contexts/customize"
import { formatPrice } from "../helpers/shopify"
import { useCaseCollection } from "../hooks/useCaseCollection"

const Component = styled.div`
  margin-top: 35px;
  width: 75%;
  @media screen and (max-width: 750px) {
    width: 100%;
  }
  margin-bottom: 35px;
  p {
    margin: 0;
  }
  .heading {
    text-transform: uppercase;
    font-size: 1.5rem;
    font-family: var(--sub-heading-font);
  }
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(2, 1fr);
    row-gap: 10px;
    column-gap: 50px;
    .product-flex {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .title {
      font-family: var(--heading-font);
      text-transform: uppercase;
      font-weight: normal;
      text-align: center;
      margin: 0;
    }
    .price {
      font-family: var(--sub-heading-font);
      color: var(--color-grey-dark);
    }
  }
  /* new */
  .radio-container {
    display: block;
    position: relative;
    cursor: pointer;
    height: 25px;
    width: 25px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    &:hover input ~ .checkmark {
      background-color: grey;
    }
    input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 100%;
      width: 100%;
      &:checked ~ .checkmark {
        background-color: #fff;
      }
      &:checked ~ .checkmark:after {
        display: block;
      }
    }
    .checkmark {
      position: absolute;
      top: 0;
      left: 0;
      height: 25px;
      width: 25px;
      background-color: #fff;
      border: 1px solid #000;
      border-radius: 50%;
      &:after {
        content: "";
        position: absolute;
        display: none;
        top: 3px;
        left: 3px;
        width: 17px;
        height: 17px;
        border-radius: 50%;
        background: #000;
      }
    }
  }
  .ps-btn {
    cursor: pointer;
    &:hover,
    &:focus {
      opacity: 0.7;
    }
  }
  .ps-text {
    cursor: pointer;
    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }
`

interface Product {
  featuredImage: {
    altText: string
    localFile: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData
      }
    }
  }
  handle: string
  id: string
  productType: string
  storeFrontId: string
  title: string
  variants: ShopifyVariant[]
}

interface Props {
  casesAvailable: string[]
}

const CaseGridCustomize: React.FC<Props> = ({ casesAvailable }) => {
  const {
    selectedVariants,
    setSelectedVariants,
    hasSavedCustomized,
    setHasSavedCustomized,
  } = useContext(CustomizeContext)

  const caseCollection: Product[] = useCaseCollection()

  const formatTitle = (str: string) => {
    return str.split(" - AO")[0]
  }

  const formatMoney = (price: number) => {
    if (price === 0) {
      return "FREE"
    }
    return `+ $${formatPrice(price)} USD`
  }

  const handleChange = (variant: ShopifyVariant, isSetFromEvent: boolean) => {
    setSelectedVariants({
      ...selectedVariants,
      ["case"]: variant,
    })
    setHasSavedCustomized({
      ...hasSavedCustomized,
      ["case"]: isSetFromEvent,
    })
  }

  useEffect(() => {
    if (hasSavedCustomized["case"] === false) {
      handleChange(caseCollection[0].variants[0], false)
    }
  }, [])

  return (
    <Component>
      <p className="heading">Choose your case:</p>
      <div className="container">
        {caseCollection &&
          caseCollection.map((product: Product) => {
            if (casesAvailable.includes(formatTitle(product.title))) {
              return (
                <div key={product.id} className="product-flex">
                  <div
                    className="case-image ps-btn"
                    role="button"
                    onClick={() => handleChange(product.variants[0], true)}
                  >
                    {product.featuredImage?.localFile ? (
                      <GatsbyImage
                        image={
                          product.featuredImage.localFile.childImageSharp
                            .gatsbyImageData
                        }
                        alt={product.title}
                      />
                    ) : (
                      <StaticImage
                        src="../images/product-no-image.jpg"
                        alt={product.title}
                      />
                    )}
                  </div>
                  <div
                    className="ps-text"
                    role="button"
                    onClick={() => handleChange(product.variants[0], true)}
                  >
                    <p className="title">{formatTitle(product.title)}</p>
                  </div>
                  <div>
                    <p className="price">
                      {formatMoney(product.variants[0].price)}
                    </p>
                  </div>
                  <div>
                    <label className="radio-container">
                      <input
                        type="radio"
                        name="case-select"
                        id={`case-${product.title}`}
                        aria-label={product.title}
                        onChange={() => handleChange(product.variants[0], true)}
                        checked={
                          product.variants[0].storefrontId ===
                          selectedVariants["case"].storefrontId
                        }
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </div>
              )
            } else {
              return null
            }
          })}
      </div>
    </Component>
  )
}

export default CaseGridCustomize
