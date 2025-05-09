import React from "react"
import { StaticImage, GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
import Carousel from "../components/carousel"
import Layout from "../components/layout-index"
import SEO from "../components/seo"
import FreeShipping from "../components/free-shipping"
import SaleHeroBanner from "../components/sale-hero-banner"

const Page = styled.div`
  margin: auto;
  .h2,
  .h3 {
    font-weight: normal;
  }
  .shipping-message {
    text-align: center;
    .h2 {
      font-family: var(--sub-heading-font);
      font-weight: normal;
      margin-top: 0.5rem;
      margin-bottom: 0.2rem;
    }
    .h3 {
      color: var(--color-grey-dark);
      font-family: var(--sub-heading-font);
      font-weight: normal;
    }
  }
  .featured {
    position: relative;
    display: block;
    .featured-actions {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      text-align: right;
      button,
      .button {
        display: inline-block;
        margin: 16px;
      }
    }
  }
  .featured-styles {
    max-width: 80%;
    @media only screen and (max-width: 480px) {
      max-width: 100%;
    }
  }
  button,
  .button {
    font-family: var(--heading-font);
    background-color: #000;
    border-radius: 0;
    border: 1px solid #000;
    color: #fff;
    display: block;
    padding: 10px 20px;
    text-decoration: none;
    &:hover {
      cursor: pointer;
    }
  }
  .diamond-divider {
    text-align: center;
  }
  .sub-title {
    max-width: 700px;
    text-align: center;
    display: block;
    margin: 1.45rem auto;
    padding: 10px 20px;
    font-size: 1.35rem;
  }
  .featured-products {
    text-align: center;
    margin: 1.45rem auto;
    font-size: 1.65rem;
  }
  .hero {
    display: flex;
    justify-content: center;
    @media screen and (max-width: 767px) {
      flex-direction: column;
    }
  }
  .about {
    background: #000;
    margin-top: -100px;
    @media only screen and (max-width: 1024px) {
      margin-top: -60px;
    }
    @media only screen and (max-width: 768px) {
      margin-top: -70px;
    }
    @media only screen and (max-width: 480px) {
      margin-top: -25px;
      padding-bottom: 40px;
    }
    .about-content {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      max-width: 925px;
      @media only screen and (max-width: 480px) {
        display: block;
      }
      .about-image {
        flex: 1;
        @media screen and (min-width: 480px) {
          margin: 200px 20px 100px 20px;
        }
      }
      .gatsby-image-wrapper {
        padding: 20px;
        @media only screen and (max-width: 480px) {
          margin: 0 15px;
          padding: 0;
          &:nth-child(1) {
            margin-top: 50px;
          }
          &:nth-child(2) {
            margin-bottom: 25px;
          }
        }
      }
    }
  }
  .home-text {
    font-weight: normal;
  }
  .no-padding {
    margin-left: -15px;
    margin-right: -15px;
  }
  .navigation {
    .nav-prev,
    .nav-next {
      a {
        svg {
          fill: var(--color-grey-dark);
        }
      }
    }
  }
  .sale-hero {
    @media screen and (max-width: 600px) {
      min-height: 210px;
    }
    object-fit: cover;
    object-position: center;
  }
`

const IndexPage = ({
  data: { contentfulHomepage },
}: {
  data: HomePageQuery
}) => {
  const { enableSaleHero, saleHero, saleHeroUrl, enableSaleHeroUrl } =
    contentfulHomepage
  const generateJsonLd = () => {
    try {
      const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        url: "https://www.tresnoir.com",
        logo: "https://cdn.shopify.com/s/files/1/0140/0012/8057/files/tres-noir-icon-large_copy.png?v=1699387986",
      }
      return JSON.stringify(schema, null, 2)
    } catch (error) {
      return null
    }
  }
  return (
    <Layout>
      <SEO
        title="Handmade Eyewear"
        isIndex={true}
        jsonLdPayload={generateJsonLd()}
      />
      <Page>
        <FreeShipping />

        <SaleHeroBanner
          data={saleHero}
          enableSaleHero={enableSaleHero}
          saleHeroUrl={saleHeroUrl}
          enableSaleHeroUrl={enableSaleHeroUrl}
        />

        <div className="hero container">
          <div className="featured">
            <GatsbyImage
              image={contentfulHomepage.hero.gatsbyImageData}
              alt="Hero"
            />
            <div className="featured-actions">
              <Link className="button" to="/collections/sunglasses-for-men">
                SHOP MEN'S
              </Link>
            </div>
          </div>
          <div className="featured">
            <GatsbyImage
              image={contentfulHomepage.hero2.gatsbyImageData}
              alt="Hero"
            />
            <div className="featured-actions">
              <Link className="button" to="/collections/sunglasses-for-women">
                SHOP WOMEN'S
              </Link>
            </div>
          </div>
        </div>

        <h2 className="sub-title home-text">
          {contentfulHomepage.tagline.tagline}
        </h2>
        <div className="diamond-divider">
          <StaticImage
            src="../images/double-diamonds.png"
            alt="double diamonds"
            width={40}
          />
        </div>
        <div className="featured-styles container">
          <h3 className="home-text featured-products">FEATURED PRODUCTS</h3>
          <Carousel
            imageSet={contentfulHomepage && contentfulHomepage.featuredStyles}
            imageLinks={
              contentfulHomepage && contentfulHomepage.featuredStylesLinks
            }
          />
        </div>
        <div className="about no-padding">
          <div className="about-content container">
            <Link to="/pages/rx-faq" className="about-image">
              <GatsbyImage
                image={contentfulHomepage.aboutTresNoir1.gatsbyImageData}
                alt="About Tres Noir 1"
              />
            </Link>
            <Link to="/collections/new" className="about-image">
              <GatsbyImage
                image={contentfulHomepage.aboutTresNoir2.gatsbyImageData}
                alt="About Tres Noir 2"
              />
            </Link>
          </div>
        </div>
      </Page>
    </Layout>
  )
}

export default IndexPage

interface HomePageQuery {
  contentfulHomepage: {
    enableSaleHero: boolean
    saleHero: {
      gatsbyImageData: IGatsbyImageData
    }
    saleHeroUrl: string
    enableSaleHeroUrl: boolean
    hero: {
      gatsbyImageData: IGatsbyImageData
    }
    hero2: {
      gatsbyImageData: IGatsbyImageData
    }
    tagline: {
      tagline: string
    }
    featuredStyles: [
      {
        data: IGatsbyImageData
        title: string
      }
    ]
    featuredStylesLinks: string[]
    aboutTresNoir1: {
      gatsbyImageData: IGatsbyImageData
    }
    aboutTresNoir2: {
      gatsbyImageData: IGatsbyImageData
    }
  }
}

export const query = graphql`
  query HomepageQuery {
    contentfulHomepage {
      enableSaleHero
      saleHero {
        gatsbyImageData
      }
      saleHeroUrl
      enableSaleHeroUrl
      hero {
        gatsbyImageData
      }
      hero2 {
        gatsbyImageData
      }
      tagline {
        tagline
      }
      featuredStyles {
        data: gatsbyImageData(layout: CONSTRAINED, quality: 40, width: 600)
        title
      }
      featuredStylesLinks
      aboutTresNoir1 {
        gatsbyImageData
      }
      aboutTresNoir2 {
        gatsbyImageData
      }
    }
  }
`
