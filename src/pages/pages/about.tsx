import React from "react"
import styled from "styled-components"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, StaticImage } from "gatsby-plugin-image"

const Page = styled.div`
  h1,
  h2 {
    text-transform: uppercase;
    font-weight: normal;
  }
  h1 {
    text-align: center;
  }
  h2 {
    font-size: 115%;
    text-align: justify;
  }
  .page-width {
    max-width: 1200px;
    padding-left: 55px;
    padding-right: 55px;
    margin: 0 auto;
    @media (max-width: 749px) {
      padding-left: 22px;
      padding-right: 22px;
    }
  }
  .row {
    display: flex;
    flex-direction: row;
    .col {
      flex: 1;
      padding: 0 30px 30px 30px;
      @media (max-width: 899px) {
        padding: 0 15px;
      }
    }
    @media (max-width: 899px) {
      flex-direction: column-reverse;
    }
  }
  article {
    ul {
      margin-left: 0;
      li {
        list-style-position: inside;
        display: flex;
        align-items: baseline;
        column-gap: 10px;
        div {
          flex-shrink: 0;
        }
      }
    }
  }
  p,
  li,
  h2 {
    font-family: var(--sub-heading-font);
  }
  p {
    text-align: justify;
  }
`

const About = () => {
  const description =
    "Tres Noir is a California-based company, dedicated to crafting high-quality eyewear with a commitment to affordability. Founded with a mission to provide premium sunglasses at a fair price, Tres Noir focuses on unique designs and meticulous craftsmanship, all while remaining a small, family-run business. As a West Coast lifestyle brand that draws inspiration from car culture and rock n roll, we are not limited to a certain aesthetic or way of life, but more so, an attitude that promotes and carries authenticity. We believe the customer is above all else and we pride ourselves in providing exceptional service and quality; the end result is a loyal and satisfied customer."

  const aboutImage = useStaticQuery(graphql`
    query AboutImageQuery {
      contentfulMenuItem(name: { eq: "About" }) {
        image {
          gatsbyImageData
          url
        }
      }
    }
  `)
  return (
    <Layout>
      <Page>
        <SEO title="About Us" description={description} />
        <h1>About Us</h1>
        <div className="page-width">
          <div className="row">
            <div className="col">
              <h2>Designed in California, Worn Worldwide.</h2>
              <article>
                <p>
                  <strong>Tres Noir</strong> is a California-based company,
                  dedicated to crafting high-quality eyewear with a commitment
                  to affordability. Founded with a mission to provide premium
                  sunglasses at a fair price, Tres Noir focuses on unique
                  designs and meticulous craftsmanship, all while remaining a
                  small, family-run business. As a West Coast lifestyle brand
                  that draws inspiration from car culture and rock n roll, we
                  are not limited to a certain aesthetic or way of life, but
                  more so, an attitude that promotes and carries authenticity.
                  We believe the customer is above all else and we pride
                  ourselves in providing exceptional service and quality; the
                  end result is a loyal and satisfied customer.
                </p>
                <ul>
                  <p>PRODUCT FEATURES:</p>

                  <li>
                    <StaticImage
                      alt=""
                      src="../../images/diamond.png"
                      height={13}
                    ></StaticImage>
                    <span>EVERY FRAME IS HAND MADE - NEVER INJECTED</span>
                  </li>
                  <li>
                    <StaticImage
                      alt=""
                      src="../../images/diamond.png"
                      height={13}
                    ></StaticImage>
                    <span>STOCK LENS MADE OF CR-39 MATERIAL</span>
                  </li>
                  <li>
                    <StaticImage
                      alt=""
                      src="../../images/diamond.png"
                      height={13}
                    ></StaticImage>
                    <span>100% UVA and UVB PROTECTIVE</span>
                  </li>
                  <li>
                    <StaticImage
                      alt=""
                      src="../../images/diamond.png"
                      height={13}
                    ></StaticImage>
                    <span>ALL FRAMES ARE RX-ABLE</span>
                  </li>
                  <li>
                    <StaticImage
                      alt=""
                      src="../../images/diamond.png"
                      height={13}
                    ></StaticImage>
                    <span>
                      1 YEAR WARRANTY TO PROTECT AGAINST MANUFACTURER DEFECTS,
                      THIS DOES NOT INCLUDE LENS SCRATCHES, ACCIDENTS, THEFT OR
                      EVERY DAY WEAR AND TEAR
                    </span>
                  </li>
                  <li>
                    <StaticImage
                      alt=""
                      src="../../images/diamond.png"
                      height={13}
                    ></StaticImage>
                    <span>
                      REFUNDS AND EXCHANGES MUST BE RETURNED IN NEW, UNWORN
                      CONDITION WITHIN 30 DAYS OF PURCHASE
                    </span>
                  </li>
                </ul>
              </article>
            </div>
            <div className="col">
              <aside>
                <figure>
                  <picture>
                    <GatsbyImage
                      image={
                        aboutImage.contentfulMenuItem.image.gatsbyImageData
                      }
                      alt="Tres Noir Glasses Showcase"
                    ></GatsbyImage>
                  </picture>
                </figure>
              </aside>
            </div>
          </div>
        </div>
      </Page>
    </Layout>
  )
}

export default About
