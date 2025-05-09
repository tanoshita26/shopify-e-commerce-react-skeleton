import React from "react"
import styled from "styled-components"
import { navigate } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import useUserWayAccessiblity from "../hooks/useUserWayAccessibility"

const Page = styled.div`
  width: 800px;
  max-width: 100%;
  margin: auto;
  label {
    display: block;
    font-size: 0.875rem;
    line-height: 1.4em;
    margin-bottom: 4px;
  }
  input {
    font-size: 15px;
    line-height: 15px;
    background: #fff;
    color: #8a8f93;
    border: 1px solid #e1e3e4;
    padding: 11px 15px;
    margin: 0;
    vertical-align: middle;
    max-width: 100%;
    border-radius: 0;
    box-sizing: border-box;
    &.customer-password,
    &.customer-email {
      width: 100%;
    }
  }
  .action {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .btn {
    background: #232323;
    border: 1px solid #232323;
    color: #fff;
    font-size: 12px;
    line-height: 15px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    height: auto;
    margin: 0;
    text-decoration: none;
    cursor: pointer;
    padding: 11px 25px;
    vertical-align: middle;
    text-align: center;
    box-sizing: content-box;
    transition: background-color 0.1s, color 0.1s, border-color 0.1s;
    display: inline-block;
    margin-bottom: 50px;
  }
  .action-bottom {
    margin-top: 20px;
  }
`

const Accessibility = () => {
  const { enabled, toggleWidget } = useUserWayAccessiblity()

  return (
    <Layout>
      <SEO title="Accessibility" />
      <Page>
        <h1>Accessibility</h1>
        <p>
          Tres Noir is committed to providing a web experience that is
          accessible to all people by meeting or exceeding the requirements of
          the WCAG 2.0 AA. Accessibility is an ongoing effort, and we are here
          to help. Feel free to email us at info@tresnoir.com for assistance.
        </p>
        <div className="action">
          <button className="btn" onClick={() => toggleWidget(!enabled)}>
            {enabled ? "Disable" : "Enable"} Accessibility
          </button>
        </div>
      </Page>
    </Layout>
  )
}

export default Accessibility
