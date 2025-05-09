import React from "react"
import styled from "styled-components"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

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

const ThankYou = () => {
  const description =
    "Thank you for your interest in becoming an authorized dealer. We’ve received your application and our team is currently reviewing the details. We’ll be in touch soon with next steps or if we need any additional information."

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
        <SEO title="Thank You" description={description} />
        <h1>THANK YOU</h1>
        <div className="page-width">
          <div className="row">
            <div className="col">
              {/* <h2>Thank You For Your Application!</h2> */}
              <article>
                <p>{description}</p>
                <p>
                  We appreciate your interest in partnering with us and look
                  forward to the opportunity to work together.
                </p>
                <p>- The Tres Noir Team</p>
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

export default ThankYou
