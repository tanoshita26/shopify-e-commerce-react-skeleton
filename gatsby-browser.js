import React from "react"
import ReactDOM from "react-dom/client"
import { CustomizeProvider } from "./src/contexts/customize"
import { CartProvider } from "./src/contexts/storefront-cart"
import { RxInfoContextProvider } from "./src/contexts/rxInfo"
import { ErrorModalProvider } from "./src/contexts/error"
import ErrorBoundary from "./src/components/error-boundary"

export const replaceHydrateFunction = () => {
  return (element, container) => {
    const root = ReactDOM.createRoot(container)
    root.render(element)
  }
}

export const wrapRootElement = ({ element }) => {
  return (
    <ErrorModalProvider>
      <CartProvider>
        <CustomizeProvider>
          <RxInfoContextProvider>
            <ErrorBoundary>{element}</ErrorBoundary>
          </RxInfoContextProvider>
        </CustomizeProvider>
      </CartProvider>
    </ErrorModalProvider>
  )
}
