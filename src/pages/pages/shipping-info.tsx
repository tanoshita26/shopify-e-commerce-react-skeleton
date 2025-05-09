import React from "react"
import styled from "styled-components"
import Layout from "../../components/layout"
import SEO from "../../components/seo"

const Page = styled.div`
  h1 {
    text-align: center;
  }
  h1,
  h3 {
    font-weight: normal;
    text-transform: uppercase;
    margin-bottom: 18px;
  }
  h3 {
    font-size: 1.41rem;
  }
  p {
    font-family: var(--sub-heading-font);
    color: var(--color-grey-dark);
  }
  span {
    color: black;
  }
  a {
    color: black;
    &:visited {
      color: black;
    }
    &:hover,
    &:active,
    &:focus {
      color: var(--color-grey-dark);
    }
  }
`

const ShippingInfo = () => (
  <Layout>
    <Page className="wrapper">
      <SEO title="Shipping Info" />
      <h1>Shipping &amp; Returns</h1>
      <article>
        <h3>Shipping</h3>
        <p>
          Free U.S shipping on all orders over $50. Most orders ship same day if
          received before 2pm Pacific time M-F. Orders received on the weekend
          or U.S. Federal holidays will ship the next business day. Tracking
          numbers will be emailed when orders ship.
        </p>
        <p>
          All orders ship from our warehouse in Southern California. Domestic
          transit time is 1-5 days depending on your location.
        </p>
        <p>
          Domestic mainland orders ship US POST unless otherwise requested. Next
          Day air is available upon request.
        </p>
        <p>
          <span>International Orders:</span> <br />
          VAT, Duties and other Local Taxes may apply upon delivery. Rates vary
          by country. Expect to pay additional govt. fees before receiving your
          order. Orders typically arrive within 5-10 days.
        </p>
      </article>
      <article>
        <h3>Return Policy</h3>
        <p>
          If you are not happy with a product purchased on our website or
          directly from Tres Noir at an event, you may return it within 30 days
          of the purchase date, unworn and in its original package. Please keep
          in mind that original shipping charges cannot be refunded.
        </p>
        <p>
          <strong>
            We are unable to accept returns on custom lenses with an Rx and/or
            lens coatings.
          </strong>{" "}
          Should the frames themselves be unworn and in the same condition in
          which they were shipped, they may be returned for refund of exchange.
        </p>
        <p>
          Any product that is marked down in our SALE section(s) is not eligible
          for refund or exchange- All sales are FINAL.
        </p>
        <p>
          There is a small restocking fee of 5% for processing, which will be
          deducted from your total refund.
        </p>
        <p>
          Purchases made from other authorized retailers must be returned to the
          original point of purchase.
        </p>
        <p>
          Purchases made online at TresNoir.com may be returned or exchanged at
          our store front in Santa Ana, CA. Please have receipt of payment and
          order number available.
        </p>
        <p>Click below to download the return form.</p>
        <p>
          <a
            href="https://cdn.shopify.com/s/files/1/0140/0012/8057/files/tn_return_form_2020.pdf?v=1603495365"
            download=""
            target="_blank"
            rel="noopener noreferrer"
          >
            RETURN FORM
          </a>
        </p>
      </article>
    </Page>
  </Layout>
)

export default ShippingInfo
