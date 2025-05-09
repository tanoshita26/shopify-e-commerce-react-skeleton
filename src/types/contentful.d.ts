import { IGatsbyImageData } from "gatsby-plugin-image"

export interface ContentfulProductVariant {
  id: string
  sku: string
  featuredImage: {
    data: IGatsbyImageData
  }
  featuredImageClear: {
    data: IGatsbyImageData
  }
  colorName: string
  colorImage: {
    data: IGatsbyImageData
  }
  frameColor: string[]
  dominantFrameColor: string
  lensColor: string
  product: {
    handle: string
    title: string
  }[]
}

export interface ContentfulProduct {
  handle: string
  id: string
  title: string
  frameWidth: string[]
  collection: {
    name: string
    handle: string
  }[]
  variants: ContentfulProductVariant[]
}

export interface ContentfulCollection {
  handle: string
  name: string
  description: string
  showOverlay: boolean
  featuredImage: {
    data: IGatsbyImageData
    description: string
    url: string
  }
  featuredImage2: {
    data: IGatsbyImageData
  }
  featuredImageTextColor: string
  featuredImageTextPosition: string
  featuredImageClear: {
    data: IGatsbyImageData
  }
  products: ContentfulProduct[]
}
