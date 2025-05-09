import { IGatsbyImageData } from "gatsby-plugin-image"

export interface UpsellItems {
  products: UpsellItem[]
}

export interface UpsellItem {
  featuredImage: {
    localFile: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData
      }
    }
    originalSrc: string
  }
  handle: string
  hasOnlyDefaultVariant: boolean
  hasOutofStockVariants: boolean
  id: string
  onlineStoreUrl: string
  productType: string
  storefrontId: string
  tags: string[]
  title: string
  variants: UpsellItemVariant[]
}

export interface UpsellItemVariant {
  image?: {
    localFile: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData
      }
    }
    originalSrc: string
  }
  inventoryQuantity: number
  legacyResourceId: string
  position: number
  price: number
  compareAtPrice: number
  selectedOptions: {
    name: string
  }[]
  sku: string
  storefrontId: string
  title: string
  product: {
    collections: { title: string }[]
    featuredImage: {
      originalSrc: string
    }
    onlineStoreUrl: string
    productType: string
    title: string
    vendor: string
  }
}
