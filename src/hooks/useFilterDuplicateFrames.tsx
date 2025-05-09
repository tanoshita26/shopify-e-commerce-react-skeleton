import { useEffect, useState } from "react"
import { ContentfulProductVariant } from "../types/contentful"

export const useFilterDuplicateFrames = (
  lensType: string,
  variants: ContentfulProductVariant[]
) => {
  const [frameVariants, setFrameVariants] =
    useState<ContentfulProductVariant[]>(variants)

  const filterDuplicates = () => {
    const uniqueFrameColors: string[] = []
    const uniqueVariants: ContentfulProductVariant[] = []
    variants.forEach(variant => {
      const name = variant.colorName.split(" - ")[0] as string
      if (!uniqueFrameColors.includes(name)) {
        uniqueFrameColors.push(name)
        uniqueVariants.push(variant)
      }
    })
    return uniqueVariants
  }

  useEffect(() => {
    if (lensType === "glasses") {
      const unique = filterDuplicates()
      setFrameVariants(unique)
    } else {
      setFrameVariants(variants)
    }
  }, [lensType])

  return frameVariants
}
