import React from "react"
import styled from "styled-components"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import { FiPhone, FiMail } from "react-icons/fi"

const Page = styled.div`
  h1 {
    text-align: center;
  }
  h1,
  h3 {
    text-transform: uppercase;
    font-weight: normal;
  }
  h3 {
    margin-bottom: 16px;
    font-size: 1.45em;
  }
  .row {
    display: flex;
    .col {
      flex-basis: 50%;
      &:nth-of-type(2) {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
    }
  }
  p,
  span,
  label,
  input,
  textarea {
    font-family: var(--sub-heading-font);
  }
  address {
    font-style: normal;
    margin-bottom: 0;
  }

  p {
    margin-bottom: 5px;
  }
  section {
    :not(.grid-top-form) {
      margin-bottom: 20px;
    }
  }
  input {
    width: 100%;
    max-width: 325px;
    line-height: 35px;
    padding: 3px 5px;
  }
  textarea {
    width: 100%;
    height: 200px;
    padding: 5px 8px;
    resize: vertical;
  }
  input,
  textarea {
    border-radius: 0;
    border-width: 1px;
    -webkit-appearance: none;
    -moz-appearance: none;
    border-style: solid;
  }
  label {
    display: block;
    color: var(--color-grey-dark);
    text-transform: uppercase;
    margin-bottom: 5px;
  }
  .grid-top-form,
  .grid-bottom-form {
    display: contents;
  }
  button,
  .button {
    background-color: #000;
    border-radius: 0;
    border: 1px solid #000;
    color: #fff;
    display: block;
    font-family: var(--sub-heading-font);
    padding: 10px 20px;
    text-decoration: none;
    text-transform: uppercase;
    font-family: var(--heading-font);
    -webkit-appearance: button-bevel;
    &:hover {
      cursor: pointer;
    }
    @media only screen and (max-width: 480px) {
      display: inline-block;
    }
  }
  .grid-top-form,
  .grid-bottom-form {
    div {
      margin: 12px 0;
    }
  }
  .grid-form {
    display: contents;
    .grid-top-form,
    .grid-bottom-form {
      display: block;
    }
  }
  .container {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: 0.1fr 0.1fr 1fr;
    grid-template-areas:
      "grid-hours grid-location"
      "grid-top-form grid-location"
      "grid-bottom-form grid-bottom-form";
    @media (max-width: 665px) {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(4, 0.1fr);
      grid-template-areas:
        "grid-top-form"
        "grid-bottom-form"
        "grid-hours"
        "grid-location";
      input {
        width: 100%;
        max-width: unset;
      }
      section {
        :not(.grid-top-form, .grid-bottom-form) {
          margin-bottom: 16px;
        }
      }
      button {
        margin: 0 auto;
      }
      .grid-location {
        justify-self: left;
      }
      .grid-bottom-form {
        margin-bottom: 28px;
      }
      label {
        font-size: 105%;
      }
    }
  }
  .grid-hours {
    grid-area: grid-hours;
    .hours {
      p {
        color: var(--color-grey-dark);
      }
    }
    .contact-details {
      div {
        svg,
        span {
          vertical-align: middle;
        }
        svg {
          margin-right: 10px;
          font-size: 0.85rem;
        }
      }
    }
  }
  .grid-location {
    justify-self: right;
    grid-area: grid-location;
    address {
      p {
        text-align: center;
      }
    }
    div {
      display: flex;
      iframe {
        margin-bottom: 0;
        width: 100%;
      }
    }
  }
  .grid-top-form {
    grid-area: grid-top-form;
  }
  .grid-bottom-form {
    grid-area: grid-bottom-form;
  }
`

const Contact = () => {
  return (
    <Layout>
      <Page className="wrapper">
        <SEO title="Contact" />
        <h1>Contact</h1>
        <div className="container">
          <section className="grid-hours">
            <section className="hours">
              <h3>Store Hours</h3>
              <p>MONDAY - FRIDAY: 8am - 7pm</p>
              <p>SATURDAY: 9am - 5pm</p>
              <p>SUNDAY: 11am - 4pm</p>
            </section>
            <section className="contact-details">
              <div>
                <FiPhone></FiPhone>
                <span>714-656-4796</span>
              </div>
              <div>
                <FiMail></FiMail>
                <span>info@tresnoir.com</span>
              </div>
            </section>
          </section>
          <form
            className="grid-form"
            method="post"
            data-netlify="true"
            netlify-honeypot="bot-field"
            name="contact"
          >
            <input type="hidden" name="bot-field" />
            <input type="hidden" name="form-name" value="contact" />
            <section className="grid-top-form">
              <h3>Send us a message</h3>
              <div>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
              </div>
            </section>
            <section className="grid-bottom-form">
              <div>
                <label htmlFor="email">Message</label>
                <textarea id="message" name="message" required />
              </div>
              <button type="submit" className="button">
                Submit
              </button>
            </section>
          </form>
          <section className="grid-location">
            <div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13270.183422911474!2d-117.907836!3d33.7465578!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x2e1a7151ccb3c86!2sTres%20Noir%20Optics!5e0!3m2!1sen!2sus!4v1650307263749!5m2!1sen!2sus"
                width="350"
                height="350"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <address>
              <p>2831 W. 1st St. Santa Ana, CA 92703</p>
            </address>
          </section>
        </div>
      </Page>
    </Layout>
  )
}

export default Contact
