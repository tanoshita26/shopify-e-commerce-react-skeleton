import { IGatsbyImageData } from "gatsby-plugin-image"
import { createContext } from "react"
import { SelectedVariants } from "../../types/global"

import type { CartContextType, CustomLineItem } from "./types/storefront-cart"

const defaultContext: CartContextType = {
  isDrawerOpen: false,
  setIsDrawerOpen: (value: boolean) => {},
  isCartDrawerOpen: false,
  setIsCartDrawerOpen: (value: boolean) => {},
  isActive: "",
  setIsActive: (value: string) => {},
  closeDrawer: () => {},
  cart: undefined,
  isAddingToCart: false,
  setIsAddingToCart: (value: boolean) => {},
  addProductToCart: (
    variantId: string,
    quantity: number,
    sku: string,
    image: IGatsbyImageData,
    shouldOpenDrawer?: boolean
  ) => {},
  addProductsToCart: (
    lineItems: { variantId: string; quantity: number }[]
  ) => {},
  addSunglassesToCart: (
    lineItems: CustomLineItem[],
    image: IGatsbyImageData,
    key: string
  ) => {},
  addProductCustomToCart: (
    items: CustomLineItem[],
    key: string,
    image: IGatsbyImageData,
    resumeData: SelectedVariants,
    sku: string,
    handle: string,
    activateDrawer: boolean
  ) => {},
  removeProductFromCart: (lineItemId: string, imageId: string) => {},
  removeProductsFromCart: (
    lineItemIds: string[],
    imageId: string,
    hasDiscount?: boolean
  ) => {},
  removeCustomProductWithId: (id: string) => {},
  updateProductInCart: (
    lineId: string,
    variantId: string,
    quantity: number,
    imageId: string
  ) => {},
  addDiscountCode: (code: string) => {},
  removeDiscountCode: () => {},
  isRemovingFromCart: false,
  getAppliedDiscountCode: () => "",
  updateShipInsureAttribute: (enableShipInsure: boolean) => {},
  isShipInsureEnabled: false,
}

const CartContext = createContext(defaultContext)
export default CartContext
