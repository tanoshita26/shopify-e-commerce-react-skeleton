import React, { useEffect, useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import Cookies from "js-cookie"
import ErrorModal from "./error-modal"
import { identifyCustomerGTMEvent } from "../helpers/gtm"

import Header from "./header"
import Drawer from "./drawer"
import Footer from "./footer"
import CartDrawer from "./cart-drawer"
import "./fonts.css"
import "./layout.css"
import useUserWayAccessiblity from "../hooks/useUserWayAccessibility"

const Main = styled.main`
  max-width: 100%;
  .container {
    max-width: 1440px;
    margin: auto;
  }
`

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const { initialize: initUserWay } = useUserWayAccessiblity()

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const data = useStaticQuery(graphql`
    query SiteTitleQueryIndex {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  useEffect(() => {
    // check for __tn_ce
    const ce = Cookies.get("__tn_ce")
    if (ce) identifyCustomerGTMEvent(atob(ce))
    // init UserWay Accessiblity
    initUserWay()
  }, [])

  return (
    <>
      <Header
        siteTitle={data.site.siteMetadata?.title || `Title`}
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        isIndex
      />
      <Drawer isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
      <Main>{children}</Main>
      <Footer />
      <ErrorModal />
      <CartDrawer />
    </>
  )
}

export default Layout
