import React from "react"
import styled from "styled-components"
import Layout from "../../components/layout"
import SEO from "../../components/seo"

const Page = styled.div`
  h1 {
    text-align: center;
  }
  a {
    text-decoration: none;
    color: black;
    &:focus,
    &:hover,
    &:visited {
      color: black;
    }
    &:focus,
    &:hover {
      text-decoration: underline;
    }
  }
  h1,
  h4 {
    font-weight: normal;
  }
  h4 {
    margin-bottom: 16px;
  }
  ol {
    li,
    p {
      font-family: var(--sub-heading-font);
    }
    p {
      color: #808080;
    }
    strong {
      color: black;
    }
    h4,
    li::marker {
      font-size: 1.35rem;
    }
    li {
      margin-bottom: 30px;
    }
  }
`

const RxFAQ = () => (
  <Layout>
    <Page>
      <article className="wrapper">
        <SEO title="Rx FAQ" />
        <h1>Rx FAQ</h1>
        <section>
          <ol>
            <li>
              <h4>Do I have Single Vision, Progressive, or Bifocal?</h4>
              <p>
                A Single Vision lens is a standard Rx lens. Single Vision is
                used to correct one field of vision, the entire lens has ONE
                correction. If your prescription does not include an "ADD", you
                have a single vision prescription.
              </p>
              <p>
                A Bifocal or Progressive lens has TWO areas of correction on the
                lens. On a Bifocal lens, these two areas are separated by a
                line, usually somewhere on the bottom half of the lens.
              </p>
              <p>
                A Progressive lens is a no-line bifocal. The two areas are
                separated by a smooth transition, and no line is visible. If
                your prescription includes an "ADD" your lenses will be
                Progressive or Bifocal.
              </p>
            </li>
            <li>
              <h4>What is PD? How do I obtain it?</h4>
              <p>
                The PD (Pupilary Distance) is the measurement of the distance
                between your pupils. This measurement is essential in order to
                properly make your Rx lenses. If it is not on your prescription
                you can ask your eye doctor, they may have it on file. Otherwise
                you can measure it yourself or visit any optometry office.
              </p>
              <p>
                Check out this video for easy instructions:&nbsp;
                <a href="https://www.youtube.com/watch?v=_Ev2Vw_7_Xg">
                  PD VIDEO
                </a>
              </p>
            </li>
            <li>
              <h4>
                What is the difference between CR-39, Polycarbonate (PC) and
                Hi-Index?
              </h4>
              <p>
                <strong>CR-39</strong> is a standard lens. It is the least
                expensive. It is shatterproof and offers adequate scratch
                resistance.
              </p>
              <p>
                <strong>Polycarbonate (PC)</strong> is recommended for
                prescriptions above +2.50 or below -2.50. PC is a lighter,
                thinner and more scratch resistant lens than a CR-39.
              </p>
              <p>
                <strong>Hi-Index</strong> is an ultra thin lens and recommended
                for prescriptions above +5.00 or below -5.00.
              </p>
            </li>
            <li>
              <h4>How long will it take to make my lenses?</h4>
              <p>
                Rx and custom lenses take 7-10 business days. We will call or
                email when they are ready.
              </p>
            </li>
            <li>
              <h4>What is your return policy for Rx lenses?</h4>
              <p>
                Since they are custom made to your specific prescription, Rx
                lenses are non-refundable. All sales are final for Rx orders.
              </p>
            </li>
            <li>
              <h4>Do you accept insurance?</h4>
              <ul>
                <li>
                  <p>
                    Make the most of your healthcare benefits with us. We
                    proudly accept both FSA (Flexible Spending Account) and HSA
                    (Health Savings Account) payments for our complete range of
                    vision care products. Use your benefits to invest in:
                  </p>
                  <p>
                    - Prescription eyewear with advanced lens options:
                    Blue-light filtering technology, Light responsive lenses,
                    progressive lenses
                  </p>
                  <p>- Prescription sunglasses</p>
                  <p>- Safety (coming 2025)</p>
                </li>
                <li>
                  <p>An Itemized receipt will be included in your order.</p>
                </li>
                <li>
                  <p>
                    No FSA or HSA card (insurance debit card)? No problem, we
                    will provide you with an itemized receipt so that you may
                    submit to your vision insurance for reimbursement.
                  </p>
                </li>
                <li>
                  <p>
                    For questions about insurance, please email{" "}
                    <a
                      href="mailto:info@tresnoir.com"
                      aria-describedby="a11y-external-message"
                    >
                      info@tresnoir.com
                    </a>{" "}
                    or call us 714-656-4796
                  </p>
                </li>
              </ul>
            </li>
            <li>
              <h4>
                I want something that isn't an option on your website, can I
                order it?
              </h4>
              <p>
                We offer additional Rx and lens customization options that may
                not be listed on our website. Please email us at{" "}
                <a
                  href="mailto:info@tresnoir.com"
                  aria-describedby="a11y-external-message"
                >
                  info@tresnoir.com
                </a>{" "}
                with your request and we will send you a quote.
              </p>
            </li>
          </ol>
        </section>
      </article>
    </Page>
  </Layout>
)

export default RxFAQ
