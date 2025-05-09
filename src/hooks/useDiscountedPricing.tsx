import { useEffect, useState } from "react"

import { useCart } from "../contexts/storefront-cart"
import useDiscountIdentifier from "./useDiscountIdentifier"

type Params = {
  productId: string
  prices: { id: string; price: number }[]
  selectedVariantId: string
  handle: string
}
export const useDiscountedPricing = ({
  productId,
  prices,
  selectedVariantId,
  handle,
}: Params) => {
  const [discountedPrices, setDiscountedPrices] = useState<
    {
      id: string
      discountedPrice: number
    }[]
  >([])
  const [isApplicable, setIsApplicable] = useState(false)
  const [offer, setOffer] = useState("")
  // cart
  const { getAppliedDiscountCode } = useCart()
  const { discountIdentifier, enableDiscountIdentifier } =
    useDiscountIdentifier()
  const abortController = new AbortController()

  // on mount
  useEffect(() => {
    const fetchDiscountedPricing = async () => {
      try {
        let offer = ""
        if (enableDiscountIdentifier) {
          offer = discountIdentifier
        } else {
          offer = getAppliedDiscountCode()
        }

        // get URL params
        if (!offer || offer === "") return

        const res = await fetch("/api/getDiscountedPricing", {
          method: "POST",
          body: JSON.stringify({ productId, offer, prices, handle }),
          signal: abortController.signal,
        })
        const json = await res.json()
        if (res.ok) {
          setDiscountedPrices(json.prices)
          setIsApplicable(true)
          setOffer(offer)
        }
      } catch (error) {}
    }
    fetchDiscountedPricing()
    return () => {
      abortController.abort()
    }
  }, [getAppliedDiscountCode])

  return {
    isApplicable:
      isApplicable && discountedPrices.some(p => p.id === selectedVariantId),
    offer,
    discountedPrice:
      discountedPrices.find(p => p.id === selectedVariantId)?.discountedPrice ??
      null,
  }
}

export default useDiscountedPricing
