import { IGatsbyImageData } from "gatsby-plugin-image"

declare module "*.svg"
declare module "*.png"
declare module "*.json"

export interface ShopifyVariant {
  sku: string
  legacyResourceId: string
  compareAtPrice: number | null
  storefrontId: string
  title: string
  image: {
    altText: string
    localFile: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData
      }
    }
  }
  price: number
  product?: {
    title: string
    handle: string
  }
  selectedOptions?: {
    name?: string
    value?: string
  }
}

export interface ShopifyProduct {
  handle: string
  description: string
  id: string
  legacyResourceId: string
  featuredImage?: {
    localFile: {
      id: string
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData
      }
    }
  }
  images: [
    {
      altText: string
      localFile: {
        id: string
        childImageSharp: {
          gatsbyImageData: IGatsbyImageData
        }
      }
    }
  ]
  media: [
    {
      image: {
        altText: string
        localFile: {
          id: string
          childImageSharp: {
            gatsbyImageData: IGatsbyImageData
          }
        }
      }
    }
  ]
  title: string
  variants: ShopifyVariant[]
}

export interface ShopifyCollection {
  title: string
  products: ShopifyProduct[]
}

export interface SelectedVariants {
  step1: any
  step2: any
  step3: any
  step4: any
  case: any
}

export interface SavedCustomizeContexts {
  step1: boolean
  step2: boolean
  step3: boolean
  step4: boolean
  case: boolean
}

export interface SelectedVariantTable {
  cartId: string
  customs: {
    [key: string]: {
      selectedVariants: SelectedVariants
      sku: string
      handle: string
    }
  }
}

export interface SelectedVariantStorage {
  expiry: string
  value: SelectedVariantTable
}

export interface SelectedVariantStep {
  image: {
    altText: string
    localFile: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData
      }
    }
  }
  price: string
  product: {
    title: string
    description: string
  }
  selectedOptions: any
  sku: string
  storefrontId: string
  title: string
}
