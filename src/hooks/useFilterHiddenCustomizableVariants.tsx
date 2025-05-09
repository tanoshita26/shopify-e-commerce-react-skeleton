import { useMemo } from "react"
import { ContentfulProduct } from "../types/contentful"

// uses metafield tresnoir.hide_online to stop product from displaying

interface ShopifyProductWithMetafields {
  handle: string
  variants: {
    sku: string
    metafields: {
      key: string
      value: string
    }[]
  }[]
}

export const useFilterHiddenCustomizableVariants = (
  contentfulProduct: ContentfulProduct,
  shopifyProduct: ShopifyProductWithMetafields
) => {
  const filterHidden = useMemo(() => {
    const shopifyHidden: string[] = []
    shopifyProduct.variants.forEach(variant => {
      const foundHidden = variant.metafields.find(metafield => {
        return metafield.key === "hide_online" && metafield.value === "true"
      })
      if (foundHidden) {
        shopifyHidden.push(variant.sku)
      }
    })
    // remove from contentful variants
    const contentfulAvailable = contentfulProduct.variants.filter(
      variant => !shopifyHidden.includes(variant.sku)
    )
    return contentfulAvailable
  }, [contentfulProduct, shopifyProduct])

  return filterHidden
}
