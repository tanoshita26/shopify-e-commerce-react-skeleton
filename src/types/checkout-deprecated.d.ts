import { IGatsbyImageData } from "gatsby-plugin-image"

export interface LocalCheckout {
  value: Checkout
  expiry: number
}

export interface Checkout {
  appliedGiftCards: string[]
  completedAt: null | string
  createdAt: string
  currencyCode: string
  customAttributes: any[]
  discountApplications: any[]
  email: null | string
  id: string
  lineItems: LineItem[]
  tnLineItems?: tnItem[]
  lineItemsSubtotalPrice: {
    amount: string
    currencyCode: string
  }
  note: null | string
  subtotalPrice: {
    amount: string
    currencyCode: string
  }
  subtotalPriceV2: {
    amount: string
    currencyCode: string
  }
  totalPrice: {
    amount: string
    currencyCode: string
  }
  webUrl: string
}

export interface LineItem {
  customAttributes: any[]
  discountAllocations: any[]
  hasNextPage: boolean
  hasPreviousPage: boolean
  id: string
  quantity: number
  title: string
  type: {
    name: string
    kind: string
  }
  product: {
    id: string
    handle: string
  }
  variant: {
    available: boolean
    compareAtPrice: null | {
      amount: string
      currencyCode: string
      type: any
    }
    id: string
    image: {
      altText: string
      id: string
      src: string
    }
    price: {
      amount: string
      currencyCode: string
      type: any
    }
    product: {
      handle: string
      id: string
    }
    sku: string
    title: string
  }
}

export interface tnSubItem {
  stepNumber?: string
  shopifyItem: LineItem
}

export interface tnItem {
  id: string
  lineItems: tnSubItem[]
  image: IGatsbyImageData | null | undefined
  isCustom: boolean
}

export interface ImageHashTable {
  cartId: string
  images: {
    [key: string]: IGatsbyImageData
  }
}

export interface ImageStorage {
  value: ImageHashTable
  expiry: string
}

export interface CustomLineItem {
  variantId: string
  quantity: number
  attributes: { key: string; value: string }[]
}

export interface rxDetails {
  sph: string
  cyl: string
  axis: string
  add: string
  pd: string
}
export interface rxType {
  right: rxDetails
  left: rxDetails
}
