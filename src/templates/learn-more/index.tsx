import React, { useState, useEffect } from "react"
import { Link, graphql } from "gatsby"
import { StaticImage, GatsbyImage } from "gatsby-plugin-image"
import styled from "styled-components"

import Layout from "../../components/layout"
import SEO from "../../components/seo"
// @ts-ignorets
import text from "./text.json"

const Page = styled.div`
  h1 {
    background-color: #fff;
    font-size: 3rem;
    font-weight: normal;
    text-transform: uppercase;
    margin-bottom: 0;
    position: sticky;
    top: -1px;
    z-index: 2;
    &[data-is-stuck="true"] {
      border-bottom: 1px solid var(--color-grey-light);
      .details-shop {
        display: inline-block;
        margin-left: auto;
      }
      .diamonds {
        display: none;
      }
      .wrapper {
        padding-bottom: 0;
        padding: 10px 0;
        .product-title {
          font-size: 2.5rem;
          @media (max-width: 580px) {
            font-size: 2rem;
          }
        }
        .details-shop {
          .grey-text {
            @media (max-width: 580px) {
              display: none;
            }
          }
        }
      }
      @media (max-width: 768px) {
        font-size: 2.5rem;
      }
      @media (max-width: 580px) {
        font-size: 2rem;
        .wrapper {
          padding-left: 5px;
          padding-right: 5px;
        }
      }
      @media (max-width: 320px) {
        font-size: 1.5rem;
        .gatsby-image-wrapper {
          height: 1.5rem;
        }
      }
    }
    .wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      padding-bottom: 15pxr;
    }
    span {
      color: #000000;
      display: inline-block;
      padding: 0 5px;
    }
    .btn {
      font-size: 1.5rem;
      padding: 0.5rem;
      margin-left: 0;
    }
    .details-shop {
      display: none;
      .inner-flex {
        display: flex;
        column-gap: 35px;
        align-items: center;
        justify-content: center;
      }
      .inner-flex * {
        margin: auto 0;
      }
      .grey-text {
        text-transform: capitalize;
        color: #808080;
        font-size: 2.1rem;
      }
    }
  }
  section.tagline {
    margin: 0 auto 3rem;
    text-align: center;
    width: 480px;
    max-width: 100%;
    .h2 {
      color: var(--color-grey-dark);
      font-size: 2rem;
    }
    .h2,
    .h3 {
      font-family: var(--body-font);
    }
  }
  .h2,
  .h3 {
    font-weight: normal;
  }
  section.frame-details {
    .details-image {
      margin-bottom: 3rem;
    }
  }
  section.fit-info {
    .h2,
    .h3 {
      text-align: center;
    }
    .h2 {
      font-size: 1.75rem;
      padding-top: 1.45rem;
    }
  }
  .color-wrapper {
    background-color: var(--color-grey-light);
    .wrapper {
      width: 800px;
    }
    .h2 {
      font-size: 2.5rem !important;
      text-transform: uppercase;
      text-align: left !important;
      margin-bottom: 10px;
    }
    .h3 {
      color: var(--color-grey-dark);
      font-family: var(--body-font);
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 0;
      text-align: left !important;
    }
  }
  section.rx-able {
    padding-top: 3rem;
    .h2 {
      text-align: center;
      margin-bottom: 3rem;
      span {
        white-space: nowrap;
      }
    }
    .wrapper {
      @media (max-width: 767px) {
        padding-left: 5px;
        padding-right: 5px;
      }
    }
    .row {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }
    .col {
      display: flex;
      flex-direction: column;
      flex: 1;
      padding-right: 10px;
      position: relative;
      &:nth-of-type(2) {
        padding-left: 10px;
        padding-right: 0;
      }
      @media (max-width: 767px) {
        width: 100%;
        flex: none;
        padding: 0;
        &:nth-of-type(2) {
          padding: 0;
        }
      }
      .h2 {
        font-size: 3rem;
        padding-right: 10px;
        padding-top: 3rem;
        position: absolute;
        text-transform: uppercase;
        width: 100%;
        bottom: 0;
      }
      .h3 {
        color: #000000;
        font-size: 1.5rem;
        text-transform: uppercase;
        margin-bottom: 5px;
      }
      .color-wrapper {
        height: 100%;
      }
    }
    .faded {
      height: 100%;
      opacity: 0.7;
    }
    .lists {
      padding: 20px 1.45rem 0;
      .list {
        margin-bottom: 20px;
      }
      span {
        color: var(--color-grey-dark);
        font-size: 1.5rem;
        margin-bottom: 10px;
        width: 50%;
        .gatsby-image-wrapper {
          margin-right: 5px;
          margin-bottom: 2px;
        }
      }
    }
  }
  section.lenses-info {
    .wrapper {
      padding: 1.45rem 2.5rem;
      @media (max-width: 767px) {
        padding: 1.45rem 5px;
      }
    }
  }
  section.what-you-get {
    .h2 {
      font-size: 2.2rem;
      margin-top: 1.45rem;
      margin-bottom: 5px;
    }
    p {
      font-size: 2rem;
      line-height: 1;
      width: 800px;
      max-width: 95vw;
      margin: 0 auto;
      &:nth-of-type(2) {
        color: var(--color-grey-dark);
        margin-bottom: 1.45rem;
      }
    }
    .wrapper {
      padding-left: 0;
      padding-right: 0;
    }
  }
  section.call-to-action {
    text-align: center;
    .p {
      margin-bottom: 1.45rem;
    }
  }

  @media (max-width: 500px) {
    h1 {
      font-size: 2rem;
    }
    .h2 {
      font-size: 1.62671rem;
    }
  }
  .text-container,
  .title-container {
    .product-title {
      text-transform: initial;
    }
  }
  .title-container {
    display: flex;
    column-gap: 10px;
    .diamonds {
      margin: auto 0;
    }
  }
  .row {
    span {
      .gatsby-image-wrapper {
        vertical-align: middle;
      }
    }
  }
`

const LearnMore = ({ data: { contentfulProduct } }: any) => {
  const [isStuck, setIsStuck] = useState(false)
  // if (typeof window !== `undefined`) {
  //   const observer = new IntersectionObserver(
  //     ([e]) => {
  //       if (e.intersectionRatio < 1) {
  //         setIsStuck(true)
  //       } else {
  //         setIsStuck(false)
  //       }
  //     },
  //     { threshold: [1] }
  //   )
  //   useEffect(() => {
  //     const stickyHeading = document.getElementById("StickyHeading")
  //     if (stickyHeading) observer.observe(stickyHeading)
  //   })
  // }

  let productTitle = contentfulProduct.title
  if (
    productTitle.includes("Mooneyes") ||
    productTitle.includes("Low Bridge Fit")
  ) {
    productTitle = productTitle.split("-")[0]
  }

  useEffect(() => {
    if (typeof window !== `undefined`) {
      const observer = new IntersectionObserver(
        ([e]) => {
          if (e.intersectionRatio < 1) {
            setIsStuck(true)
          } else {
            setIsStuck(false)
          }
        },
        { threshold: [1] }
      )
      const stickyHeading = document.getElementById("StickyHeading")
      if (stickyHeading) observer.observe(stickyHeading)
    }
  })

  const seoDescription = [
    `Learn more about our ${productTitle} frame`,
    contentfulProduct.styleDescription.text,
  ].join(". ")

  return (
    <Layout>
      <SEO
        title={`${productTitle} - Learn More`}
        description={seoDescription}
        image={{
          url: contentfulProduct.variantsImage.url,
          alt: contentfulProduct.variantsImage.description,
        }}
      />
      <Page>
        <h1
          id="StickyHeading"
          className="sticky-heading"
          data-is-stuck={isStuck}
        >
          <div className="wrapper">
            <div className="title-container">
              <StaticImage
                src="../../images/double-diamonds.png"
                alt="Double Diamonds"
                placeholder="dominantColor"
                layout="constrained"
                height={25}
                className="diamonds"
              />
              <span className="product-title">{productTitle}</span>
              <StaticImage
                src="../../images/double-diamonds.png"
                alt="Double Diamonds"
                placeholder="dominantColor"
                layout="constrained"
                height={25}
                className="diamonds"
              />
            </div>
            <div className="details-shop">
              <div className="inner-flex">
                <span className="grey-text">Details</span>
                <Link
                  className="btn"
                  to={`/products/${contentfulProduct.handle}`}
                >
                  <span style={{ color: "#fff" }}>Shop</span>
                </Link>
              </div>
            </div>
          </div>
        </h1>
        <section className="tagline">
          <p className="h3">{contentfulProduct.styleDescription.text}</p>
        </section>
        <section className="frame-details wrapper">
          <GatsbyImage
            className="details-image"
            image={contentfulProduct.frameDetailsImage.data}
            alt={text.frameDetailsAlt}
          />
          <GatsbyImage
            image={contentfulProduct.variantsImage.data}
            alt={contentfulProduct.variantsImage.description}
          />
        </section>
        <section className="fit-info">
          <div className="wrapper">
            <p className="h2">
              {productTitle} frames are a{" "}
              {contentfulProduct.frameWidth.length > 1
                ? `${contentfulProduct.frameWidth[0]} to ${contentfulProduct.frameWidth[1]}`
                : contentfulProduct.frameWidth[0]}{" "}
              fit.
            </p>
            <p className="h3">{contentfulProduct.fitDimensions}</p>
          </div>
          <div className="color-wrapper">
            <div className="wrapper">
              <p className="h2">{text.fitHeading}</p>
              <p className="h3">{text.fitInfo}</p>
              <GatsbyImage
                image={contentfulProduct.fitDiagram.data}
                alt={text.fitDiagramAlt}
              />
            </div>
          </div>
        </section>
        {contentfulProduct.rxAble && (
          <section className="rx-able">
            <p className="h2">
              <span className="upper">{productTitle}</span> frames are{" "}
              <span>RX-able.</span>
            </p>
            <div className="row wrapper">
              <div className="col">
                <GatsbyImage
                  image={contentfulProduct.customizeImage.data}
                  alt={contentfulProduct.customizeImage.description}
                  className="faded"
                />
                <p className="h2">
                  Customize
                  <br />
                  to fit
                  <br />
                  your
                  <br />
                  needs
                </p>
              </div>
              <div className="col">
                <div className="color-wrapper lists">
                  {text.lensCustomizations.map((list: any, index: number) => (
                    <div className="list" key={`list-${index}`}>
                      <h3 className="h3">{list.title}</h3>
                      <div className="row">
                        {list.items.map((item: string, _index: number) => (
                          <span key={`item-${_index}`}>
                            <StaticImage
                              src="../../images/grey-diamond.png"
                              alt="Diamond"
                              placeholder="dominantColor"
                              layout="constrained"
                              height={15}
                            />
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
        <section className="lenses-info">
          <div className="wrapper">
            <GatsbyImage
              image={contentfulProduct.lensesInfoImage.data}
              alt={text.lensesInfoAlt}
            />
          </div>
        </section>
        <section className="what-you-get">
          <p className="h2">WHAT YOU GET</p>
          <p>{text.whatYouGet}</p>
          <div className="wrapper">
            <StaticImage
              src="../../images/CaseCloth.jpg"
              alt="Glasses case and cleaning cloth"
              layout="constrained"
              placeholder="blurred"
            />
          </div>
        </section>
        <section className="call-to-action">
          <div className="p">
            <StaticImage
              src="../../images/double-diamonds.png"
              alt="Double Diamonds"
              placeholder="dominantColor"
              layout="constrained"
              height={25}
            />
          </div>
          <p>
            <Link className="btn" to={`/products/${contentfulProduct.handle}`}>
              CUSTOMIZE &amp; BUY
            </Link>
          </p>
        </section>
      </Page>
    </Layout>
  )
}

export default LearnMore

export const query = graphql`
  query ContentfulProduct($handle: String) {
    contentfulProduct(handle: { eq: $handle }) {
      id
      customizeImage {
        data: gatsbyImageData
        description
      }
      frameDetailsImage {
        data: gatsbyImageData
      }
      fitDiagram {
        data: gatsbyImageData
      }
      fitDimensions
      frameWidth
      handle
      lensesInfoImage {
        data: gatsbyImageData
      }
      styleDescription {
        text: styleDescription
      }
      title
      rxAble
      variantsImage {
        data: gatsbyImageData
        description
        url
      }
    }
  }
`
