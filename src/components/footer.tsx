import React from "react"
import styled from "styled-components"
import { FaFacebookF as F } from "react-icons/fa"
import { FaInstagram as I } from "react-icons/fa"
import { FaPinterest as P } from "react-icons/fa"
import FooterLinks from "./footer/footer-links"
import FooterForm from "./footer/footer-form"
import { StaticImage } from "gatsby-plugin-image"

const Component = styled.footer`
  background-color: var(--color-grey-dark);
  color: #fff;
  font-family: var(--sub-heading-font);
  padding: 30px 45px 5px 45px;
  @media (max-width: 910px) {
    padding: 15px 0;
  }
  svg {
    font-size: 1.5rem;
  }
  .flex-child {
    display: flex;
    flex-direction: column;
  }

  address {
    p,
    a {
      color: black;
      font-style: initial;
    }
  }
  address,
  figure {
    margin-bottom: 0px;
  }
  .social-media {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    @media (max-width: 600px) {
      justify-content: flex-start;
      align-items: flex-start;
    }
    ul {
      margin-left: 0;
      margin-bottom: 0;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      @media (max-width: 600px) {
        justify-content: flex-start;
      }
      column-gap: 25px;
      li {
        display: inline;
      }
    }
    p {
      margin-bottom: 6px;
      color: black;
      text-transform: uppercase;
      font-family: var(--heading-font);
      text-align: right;
      @media (max-width: 600px) {
        text-align: initial;
      }
    }
  }
  span {
    color: black;
    text-transform: uppercase;
    font-family: var(--heading-font);
  }
  li {
    list-style: none;
  }
  a {
    color: #fff;
    text-decoration: none;
  }
  .row {
    display: flex;
    justify-content: space-between;
    column-gap: 16px;
    @media (max-width: 600px) {
      flex-direction: column;
    }
    &:nth-child(2) {
      margin-top: -16px;
      @media (max-width: 600px) {
        margin-top: 2px;
      }
      @media (min-width: 601px) and (max-width: 899px) {
        margin-top: -8px;
      }
    }
  }
  .page-width {
    max-width: 1200px;
    margin: 0 auto;
    @media (max-width: 768px) {
      padding-left: 22px;
      padding-right: 22px;
    }
    @media (min-width: 769px) and (max-width: 821px) {
      padding-left: 45px;
      padding-right: 45px;
    }
    padding-left: 55px;
    padding-right: 55px;
  }
  .foot-icon {
    &:hover,
    .focus {
      color: #262626;
    }
    &:active {
      color: #4f4f4f;
    }
  }
`

const Footer = () => {
  return (
    <Component>
      <div className="page-width">
        <div className="row">
          <div className="flex-child">
            <FooterLinks></FooterLinks>
          </div>
          <div className="flex-child">
            <div className="social-media">
              <p>Follow us on social media</p>
              <ul className="social-media-list">
                <li className="social">
                  <a
                    href="https://instagram.com/tresnoir"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <I className="foot-icon" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://facebook.com/tresnoir"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <F className="foot-icon" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.pinterest.com/tres_noir/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <P className="foot-icon" />
                  </a>
                </li>
              </ul>
            </div>
            <FooterForm></FooterForm>
          </div>
        </div>
        <div className="row">
          <div className="flex-child">
            <address>
              <p>
                <a href="tel:1-714-656-4796">714.656.4796</a>
                <br />
                2831 W 1st St, Santa Ana, CA 92703
              </p>
            </address>
          </div>
          <div className="flex-child">
            <figure>
              <picture>
                <StaticImage
                  src="../images/tres-noir-independent-eyewear-co.png"
                  alt="Tres Noir Independent Eyewear Co"
                  height={55}
                ></StaticImage>
              </picture>
            </figure>
          </div>
        </div>
      </div>
    </Component>
  )
}

export default Footer
