import { IGatsbyImageData } from "gatsby-plugin-image"

export interface ContentfulProduct {
  handle: string
  fitDimensions: string
  frameWidthMeasurement: number;
  variants: ContentfulProductVariant[]
  casesAvailable: string[]
}

export interface ContentfulProductVariant {
  colorName: string
  sku: string
  colorImage: {
    data: IGatsbyImageData
    title: string
  }
  customizations: {
    bifocal: {
      data: IGatsbyImageData
      title: string
    }
    bifocalGradientTintSmokeLenses: {
      data: IGatsbyImageData
      title: string
    }
    bifocalGradientTintBrownLenses: {
      data: IGatsbyImageData
      title: string
    }
    bifocalGradientTintG15Lenses: {
      data: IGatsbyImageData
      title: string
    }
    clear: {
      data: IGatsbyImageData
      title: string
    }
    gradientTintSmokeLenses: {
      data: IGatsbyImageData
      title: string
    }
    gradientTintBrownLenses: {
      data: IGatsbyImageData
      title: string
    }
    gradientTintG15Lenses: {
      data: IGatsbyImageData
      title: string
    }
    sunGlassesSmokeLenses: {
      data: IGatsbyImageData
      title: string
    }
    sunGlassesBrownLenses: {
      data: IGatsbyImageData
      title: string
    }
    sunGlassesGreenLenses: {
      data: IGatsbyImageData
      title: string
    }
    sunGlassesOrangeLenses: {
      data: IGatsbyImageData
      title: string
    }
    sunGlassesYellowLenses: {
      data: IGatsbyImageData
      title: string
    }
    sunGlassesBlueLenses: {
      data: IGatsbyImageData
      title: string
    }
    sunGlassesG15Lenses: {
      data: IGatsbyImageData
      title: string
    }
    sunGlassesSmokeLensesBifocal: {
      data: IGatsbyImageData
      title: string
    }
    sunGlassesBrownLensesBifocal: {
      data: IGatsbyImageData
      title: string
    }
    sunGlassesGreenLensesBifocal: {
      data: IGatsbyImageData
      title: string
    }
    sunGlassesOrangeLensesBifocal: {
      data: IGatsbyImageData
      title: string
    }
    sunGlassesYellowLensesBifocal: {
      data: IGatsbyImageData
      title: string
    }
    sunGlassesBlueLensesBifocal: {
      data: IGatsbyImageData
      title: string
    }
    sunGlassesG15LensesBifocal: {
      data: IGatsbyImageData
      title: string
    }
  }
}

export interface ShopifyProduct {
  collections: { title: string }[]
  featuredImage: {
    originalSrc: string
  }
  id: string
  handle: string
  legacyResourceId: string
  onlineStoreUrl: string
  priceRangeV2: {
    minVariantPrice: string
    maxVariantPrice: string
  }
  productType: string
  title: string
  variants: ShopifyProductVariant[]
  vendor: string
}

export interface ShopifyProductVariant {
  availableForSale: boolean
  compareAtPrice: number | null
  id: string
  legacyResourceId: string
  price: number
  product: {
    collections: {
      handle: string
      title: string
    }[]
    handle: string
    onlineStoreUrl: string
    productType: string
    vendor: string
    title: string
  }
  sku: string
  storefrontId: string
  title: string
  image: {
    originalSrc: string
  }
}
