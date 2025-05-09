import React from "react"
import styled from "styled-components"
import Layout from "../../components/layout"
import SEO from "../../components/seo"

const Page = styled.div`
  h1 {
    text-align: center;
  }
  h1,
  h2 {
    text-transform: uppercase;
    font-weight: normal;
  }
  h2 {
    font-size: 1.4em;
    margin-bottom: 15px;
  }
  h3 {
    font-weight: normal;
  }
  a {
    color: black;
    text-decoration: none;
  }
  p {
    font-family: var(--sub-heading-font);
    color: var(--color-grey-dark);
    margin-bottom: 16px;
  }
  li {
    font-family: var(--sub-heading-font);
    color: var(--color-grey-dark);
    margin-bottom: 16px;
  }
`

const WarrantyInfo = () => (
  <Layout>
    <SEO title="Warranty Info" />
    <Page className="wrapper">
      <h1>Warranty Info</h1>
      <article>
        <h2>Warranty</h2>
        <p>What is covered:</p>
        <ul>
          <li>
            Protects against any manufacturing defects up to 1 year from proof
            of purchase
          </li>
        </ul>
        <p>What is not covered:</p>
        <ul>
          <li>Damage caused by normal wear and tear</li>
          <li>Accidental damage</li>
          <li>Improper use damage</li>
          <li>Natural breakdown of colors and materials</li>
          <li>Scratched lenses</li>
          <li>Stupidity</li>
        </ul>
        <p>
          NOTE: If your glasses are damaged from an accident or wear and tear,
          many times we can help. We also stock replacement lenses for many of
          our frames. Email for more info.
        </p>
      </article>
      <h3>
        To make a warranty claim please email for return authorization number -
        info@tresnoir.com
      </h3>
    </Page>
  </Layout>
)

export default WarrantyInfo
