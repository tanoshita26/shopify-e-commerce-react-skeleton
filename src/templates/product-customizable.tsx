import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  ChangeEvent,
} from "react"
import { Link, graphql } from "gatsby"
import { StaticImage, GatsbyImage as Img } from "gatsby-plugin-image"
import styled from "styled-components"
import { useQuantityQuery } from "../hooks/useQuantityQuery"
import ProductCarousel from "../components/product-carousel"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { useCart } from "../contexts/storefront-cart"
import {
  addedToCartGTMEvent,
  addedCustomizedToCartGTMEvent,
  viewedProductGTMEvent,
} from "../helpers/gtm"
import { CustomizeContext } from "../contexts/customize"
import FreeShipping from "../components/free-shipping"
import Spinner from "../components/spinner"
import CaseGridSunglasses from "../components/case-grid-sunglasses"
import ProductDetails from "../components/product-contentful-details"
import PolarizedTooltip from "../components/polarize/polarized-tooltip"
import { useCaseCollection } from "../hooks/useCaseCollection"
import { useFilterDuplicateFrames } from "../hooks/useFilterDuplicateFrames"
import { useFilterHiddenCustomizableVariants } from "../hooks/useFilterHiddenCustomizableVariants"
import { useDiscountedPricing } from "../hooks/useDiscountedPricing"
import FeaturedStyles from "../components/featured-styles"
import ViewAsType from "../components/view-as-type"
import Reviews from "../components/reviews"
import { ReviewsProvider } from "../contexts/reviews"
import type { YotpoSourceProductBottomLine } from "../types/yotpo"
import { isDiscounted, formatPrice } from "../helpers/shopify"
import Divider from "../components/divider"
import Badge from "../components/badge"
import ProductBottomline from "../components/product-bottomline"

const Page = styled.div`
  .flex {
    display: flex;
  }
  .shipping-message {
    text-align: center;
    .h2 {
      font-family: var(--sub-heading-font);
      font-weight: normal;
      margin-top: 0.5rem;
      margin-bottom: 0.2rem;
    }
    .h3 {
      color: var(--color-grey-dark);
      font-family: var(--sub-heading-font);
      font-weight: normal;
    }
  }
  .row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 1280px;
    max-width: 100%;
    margin: 0 auto;
    @media only screen and (max-width: 768px) {
      &.mobile-reverse {
        flex-direction: column-reverse;
      }
    }
  }
  .row-no-flex {
    width: 1280px;
    max-width: 100%;
    margin: 0 auto;
  }
  .col {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 1.3rem;
    @media screen and (max-width: 768px) {
      padding-left: 0.5rem;
      padding-right: 0.5rem;
    }
    &.images {
      flex: 1.5;
      max-width: 65%;
      @media only screen and (max-width: 1024px) {
        max-width: 50%;
      }
      @media only screen and (max-width: 768px) {
        max-width: 100%;
      }
    }
  }
  .heading {
    align-self: flex-start;
    width: 100%;
  }
  h1 {
    font-weight: normal;
    font-size: 2.75rem;
    text-transform: uppercase;
    margin-bottom: 0;
    @media screen and (max-width: 600px) {
      font-size: 2.1rem;
    }
  }
  .fit {
    padding-top: 10px;
    color: var(--color-grey-dark);
    font-size: 1.5rem;
    width: 100%;
  }
  .fit-container {
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: space-between;
    max-width: 425px;
  }
  .fit-measurement {
    flex: 1;
  }
  .fit-range {
    text-transform: capitalize;
    flex: 1;
  }
  .options {
    button {
      background-color: transparent;
      border: 1px solid #fff;
      border-radius: 50%;
      line-height: 0;
      margin-right: 5px;
      padding: 5px;
      max-width: 50px;
      &[data-active="true"] {
        border-color: #000;
      }
      &:hover {
        cursor: pointer;
      }
      .gatsby-image-wrapper {
        border-radius: 50%;
      }
    }
  }
  .selected-text-label {
    font-size: 1.5rem;
    span {
      color: var(--color-grey-dark);
      text-transform: uppercase;
    }
  }
  .price {
    font-family: var(--sub-heading-font);
    margin-top: 1.45rem;
  }
  .starting-at {
    color: var(--color-grey-dark);
    margin-bottom: 0;
    line-height: 1.5;
    font-size: 1rem;
  }
  div.value {
    padding-bottom: 25px;
    font-size: 2rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .current-price-container {
      display: flex;
      flex-direction: column;
    }
    .compare-at-price {
      align-self: flex-end;
    }
    span {
      font-weight: normal;
      flex: 1;
      &.left {
        align-self: start;
        @media screen and (max-width: 480px) {
          font-size: 1.5rem;
        }
      }
      &.right {
        font-size: 1.8rem;
        @media screen and (max-width: 600px) {
          font-size: 1.8rem;
        }
        align-self: end;
        text-align: right;
      }
      a {
        color: var(--color-grey-dark);
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    }
    .left {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
    }
  }
  .actions {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    font-family: var(--sub-heading-font);
    div:not(.polarized-actions) {
      display: flex;
      flex-direction: column;
    }
    button,
    a {
      background-color: #000;
      color: #fff;
      border-radius: 0%;
      font-size: 1.5rem;
      font-weight: normal;
      line-height: 0.7;
      padding: 1rem 2rem;
      width: 100% !important;
      max-width: 100% !important;
      text-decoration: none;
      text-align: center;
      appearance: initial;
      -webkit-appearance: button-bevel;
      border-radius: 0%;
    }
    p {
      color: var(--color-grey-dark);
      font-size: 1.5rem;
      text-align: center;
      margin: 12px 0;
      &.small {
        font-size: 1rem;
      }
    }
  }
  .align-start {
    align-self: start;
  }
  .polarized-actions {
    display: flex;
    align-items: center;
    column-gap: 10px;
    margin-bottom: 15px;
    span {
      font-size: 1.8rem;
      font-family: var(--sub-heading-font);
    }
    .polarized-switch {
      display: flex;
      input[type="checkbox"] {
        height: 0;
        width: 0;
        visibility: hidden;
      }

      label {
        cursor: pointer;
        text-indent: -9999px;
        width: 70px;
        height: 35px;
        background: grey;
        display: block;
        border-radius: 100px;
        position: relative;
      }

      label:after {
        content: "";
        position: absolute;
        top: 3px;
        left: 5px;
        width: 30px;
        height: 30px;
        background: #fff;
        border-radius: 90px;
        transition: 0.3s;
      }

      input:checked + label {
        background: #22b473;
      }

      input:checked + label:after {
        left: calc(100% - 5px);
        transform: translateX(-100%);
      }

      label:active:after {
        width: 20px;
      }
    }
  }
  .disable {
    pointer-events: none;
    cursor: not-allowed;
    opacity: 0.2;
  }

  @media only screen and (max-width: 500px) {
    .shipping-message {
      .h3 {
        font-size: 1rem;
        margin-bottom: 0;
      }
    }
    .col {
      flex: none;
      width: 100%;
      &.images {
        width: 100%;
        max-width: 100%;
      }
    }
    .options {
      button {
        max-width: 45px;
      }
    }
  }
  @media only screen and (max-width: 375px) {
    p.value {
      font-size: 1.75rem;
    }
  }
  @media only screen and (max-width: 320px) {
    h1 {
      font-size: 2.25rem;
    }
    .options {
      button {
        max-width: 40px;
      }
    }
    p.value {
      font-size: 1.5rem;
    }
  }
  .review-row {
    @media screen and (min-width: 768px) {
      padding: 0 25px;
    }
    padding: 0.5rem;
  }
  .compare-at-price {
    span {
      color: var(--color-grey-dark);
      text-decoration: line-through;
    }
  }
  .desktop-only {
    @media screen and (max-width: 768px) {
      display: none;
    }
    display: block;
  }
  .learn-more {
  }
  .new-color-badge {
    position: absolute;
    font-size: 13px;
    border-radius: 4px;
    padding: 8px 4px;
    background-color: red;
    top: -10px;
    right: -10px;
    span {
      text-transform: uppercase;
      color: white;
      font-family: var(--sub-heading-font);
    }
  }
  .option-color-image-container {
    position: relative;
  }
  .disabled-polarize-action {
    pointer-events: none;
    cursor: not-allowed;
    opacity: 0.2;
  }
`
type Props = {
  data: {
    contentfulProduct: any
    shopifyProduct: any
    yotpoProductBottomline: YotpoSourceProductBottomLine
    site: {
      siteMetadata: {
        siteUrl: string
      }
    }
    contentfulHomepage: {
      enableBogo: boolean
    }
    contentfulVariantCollection: {
      variants: {
        sku: string
      }[]
    }
  }
  location: any
}
const ProductCustomizable = ({ data, location: any }: Props) => {
  const {
    contentfulProduct,
    shopifyProduct,
    yotpoProductBottomline,
    site,
    contentfulHomepage: { enableBogo },
    contentfulVariantCollection,
  } = data

  const { siteUrl } = site.siteMetadata

  const createDiscountApiPayload = (): any[] => {
    try {
      return data.shopifyProduct.variants.map(v => ({
        price: v.price,
        id: v.legacyResourceId,
      }))
    } catch (error) {
      return []
    }
  }

  // cart
  const { addProductToCart, isAddingToCart, addSunglassesToCart } = useCart()

  const createClearanceSKUs = (data): string[] => {
    try {
      const { variants } = data
      const handles = Array.from(variants.map(variant => variant.sku))
      return handles as string[]
    } catch (e) {
      return []
    }
  }

  const clearanceItemsData = contentfulVariantCollection
  const clearanceSKUs = createClearanceSKUs(clearanceItemsData)

  const {
    setSelectedVariantsToDefault,
    setCurrentStep,
    setHasSavedCustomized,
    setProductUrl,
  } = useContext(CustomizeContext)

  // remove hidden variants
  contentfulProduct.variants = useFilterHiddenCustomizableVariants(
    contentfulProduct,
    shopifyProduct
  )

  // check if lens type is set
  enum LensType {
    GLASSES = "glasses",
    SUNGLASSES = "sunglasses",
  }

  const [lensType, setLensType] = useState<string>("sunglasses")
  contentfulProduct.variants = useFilterDuplicateFrames(
    lensType,
    contentfulProduct.variants
  )

  const [selectedVariant, setSelectedVariant] = useState({
    contentful: contentfulProduct?.variants && contentfulProduct.variants[0],
    shopify: shopifyProduct.variants.find(
      (variant: any) => variant.sku === contentfulProduct.variants[0].sku
    ),
  })

  const [polarizedVariant, setPolarizedVariant] = useState({
    contentful: contentfulProduct?.variants && contentfulProduct.variants[0],
    shopify: shopifyProduct.variants.find(
      (variant: any) => variant.sku === contentfulProduct.variants[0].sku
    ),
  })
  const caseCollection = useCaseCollection()

  const [selectedCase, setSelectedCase] = useState<any>(
    caseCollection[0].variants[0]
  )

  const [showPolarizedModal, setShowPolarizedModal] = useState<boolean>(false)

  // used to swap polarized image if the lens color is different from original sku
  const [polarizedImage, setPolarizedImage] = useState<
    {
      data: any
      title: string
    }[]
  >([])

  const [isPolarized, setIsPolarized] = useState<boolean>(false)

  // return default Product Page if contentful values do not exist
  const quantityLevels = useQuantityQuery(
    shopifyProduct.handle,
    shopifyProduct.variants.length
  )

  const reviewListRef = useRef<HTMLDivElement>(null)

  // ref to toggle disable classes on buttons
  const actionsRef = useRef<HTMLDivElement>(null)

  const { discountedPrice, isApplicable, offer } = useDiscountedPricing({
    productId: shopifyProduct.legacyResourceId,
    prices: createDiscountApiPayload(),
    selectedVariantId: selectedVariant.shopify.legacyResourceId,
    handle: shopifyProduct.handle,
  })

  const seoDescription = contentfulProduct.styleDescription.styleDescription

  const isExcludedFromDeals = shopifyProduct.title.includes("Mooneyes")

  const isClearanceVariantPolarizable =
    clearanceSKUs.includes(selectedVariant.shopify.sku) &&
    selectedVariant.shopify.compareAtPrice &&
    !selectedVariant.shopify.product.tags.includes("Clearance - Polarized") &&
    isDiscounted(
      selectedVariant.shopify.price,
      selectedVariant.shopify.compareAtPrice
    )

  const getSelectedVariantOptionName = (variant: any) => {
    try {
      const optionName = variant.selectedOptions.find(
        c => c.name.toLowerCase() === "color"
      )
      const optionValue = optionName ? optionName.value : ""
      const colorName = optionValue.split("-")[0].trim()
      return colorName
    } catch (e) {
      return ""
    }
  }

  // if color option is new
  const isNewVariant = (variant: any): boolean => {
    const colorName = getSelectedVariantOptionName(variant)
    const tags = shopifyProduct.tags
    if (tags.includes(`new_color:${colorName}` || `new_color: ${colorName}`)) {
      return true
    }

    return false
  }

  const getBadge = (): { label: string; color: string } | null => {
    try {
      // bogo is enabled and product is not a mooneyes product
      if (enableBogo && !isExcludedFromDeals) {
        return {
          label: "BOGO",
          color: "#0ee2e2",
        }
      }
      // check if product is on sale
      const price = selectedVariant.shopify.price
      const compareAtPrice = selectedVariant.shopify.compareAtPrice
      if (compareAtPrice && isDiscounted(price, compareAtPrice)) {
        return {
          label: "Sale",
          color: "red",
        }
      }
      return null
    } catch (error) {
      return null
    }
  }

  const badge = getBadge()
  // switch selected variant to its polarized counterpart, toggled from switch
  // grey out customize option
  const switchToPolarized = (evt: ChangeEvent<HTMLInputElement>) => {
    const customizeBtn = actionsRef.current?.querySelector("#customize-btn")
    // if switch is toggled
    if (evt.target.checked) {
      if (polarizedVariant) {
        // check if the lens color for polarized is different than unpolarized
        // if it is, use string matching/interpolation to get the correct image
        const defaultLensColor: string = selectedVariant.shopify.title
          .toLowerCase()
          .split("-")[1]
          .replace("lens", "")
          .trim()
        const polarizedLensColor: string = polarizedVariant.shopify.title
          .toLowerCase()
          .split("-")[1]
          .replace("lens", "")
          .replace("polarized", "")
          .trim()
        // checks if polarized lens color is different from original lens color for a variant
        if (polarizedLensColor !== defaultLensColor) {
          // prefixes used for contentful image key
          let imagePrefix = "sunGlasses"
          const imageSuffix = "Lenses"
          // if the polarized image is gradient, change prefix to use gradient contentful image keys
          if (polarizedLensColor.includes("gradient")) {
            imagePrefix = "gradientTint"
          }
          // format color for contentful image key
          let formattedLensColor = polarizedLensColor.replace("gradient", "")
          // capitalize color
          formattedLensColor =
            formattedLensColor.charAt(0).toUpperCase() +
            formattedLensColor.slice(1)
          // join prefix and suffix to get contentful image key
          const polarizedImageKey =
            imagePrefix + formattedLensColor + imageSuffix

          const polarizedImageValue =
            selectedVariant.contentful.customizations[polarizedImageKey]
          // only swap the image if the key is valid, this prevents loading bad images
          if (polarizedImageValue) {
            setPolarizedImage([polarizedImageValue])
          }
        }
        // disable customize
        customizeBtn?.classList.add("disable")
        setIsPolarized(true)
        // set polarized variant to non polarized version
        setPolarizedVariant({
          contentful: selectedVariant.contentful,
          shopify: selectedVariant.shopify,
        })
        // set selected variant to polarized version
        setSelectedVariant({
          contentful: selectedVariant.contentful,
          shopify: polarizedVariant.shopify,
        })
      }
    }
    // if switch is untoggled
    else {
      if (polarizedVariant) {
        // enable customize
        customizeBtn?.classList.remove("disable")
        // set polarized variant to non polarized version
        setPolarizedVariant({
          contentful: selectedVariant.contentful,
          shopify: selectedVariant.shopify,
        })
        // set selected variant to polarized version
        setSelectedVariant({
          contentful: selectedVariant.contentful,
          shopify: polarizedVariant.shopify,
        })
      }
      // polarized switch has been set to off, reinitialize state and show old images
      setIsPolarized(false)
      setPolarizedImage([])
    }
  }

  // click event handler for variant options
  const selectVariant = (e: React.MouseEvent, variant: any) => {
    const shopify = shopifyProduct.variants.find(
      (_variant: any) => _variant.sku === variant.sku
    )
    if (shopify) {
      // clear polarized image on change
      setPolarizedImage([])
      setIsPolarized(false)
      //
      setSelectedVariant({
        contentful: variant,
        shopify,
      })
      // update url
      setProductUrl(
        `/products/${contentfulProduct.handle}/?variant=${variant.sku}`
      )
      // update url
      const isBrowser = typeof window !== "undefined"
      if (isBrowser) {
        const params = new URLSearchParams(location.search)
        params.set("variant", variant.sku)
        const { protocol, pathname, host } = window.location
        const newUrl = `${protocol}//${host}${pathname}?${params.toString()}`
        window.history.replaceState({}, "", newUrl)
      }
    }
  }

  const handleAddToCart = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const id = selectedVariant.shopify.storefrontId
    if (lensType !== LensType.GLASSES) {
      const today = new Date()
      const matchingKey: string = today.valueOf().toString()
      addSunglassesToCart(
        [
          {
            variantId: selectedVariant.shopify.storefrontId,
            quantity: 1,
            attributes: [
              { key: "customizationId", value: matchingKey },
              { key: "customizationStep", value: "1" },
            ],
          },
          {
            variantId: selectedCase.storefrontId,
            quantity: 1,
            attributes: [
              { key: "customizationId", value: matchingKey },
              { key: "customizationStep", value: "2" },
            ],
          },
        ],
        // sets cart image to be correct polarized image if its a mismatch from non-polarized variant
        polarizedImage.length !== 0
          ? polarizedImage[0].data
          : selectedVariant.contentful.imageSet[0].data,
        matchingKey
      )

      // updated to use case
      const productData = {
        main: {
          title: shopifyProduct.title,
          legacyResourceId: selectedVariant.shopify.legacyResourceId,
          sku: selectedVariant.shopify.sku,
          productType: shopifyProduct.productType,
          image: selectedVariant?.shopify?.image?.originalSrc
            ? selectedVariant.shopify.image?.originalSrc
            : shopifyProduct.featuredImage.originalSrc,
          url: shopifyProduct.onlineStoreUrl,
          vendor: shopifyProduct.vendor,
          price: selectedVariant.shopify.price,
          compareAtPrice: selectedVariant.shopify.compareAtPrice,
          collections: shopifyProduct.collections.map(
            (collection: { title: string }) => collection.title
          ),
          quantity: 1,
        },
        addOns: [
          {
            title: selectedCase.title,
            legacyResourceId: selectedCase.legacyResourceId,
            sku: selectedCase.sku,
            productType: selectedCase.product.productType,
            image: selectedCase?.image?.originalSrc
              ? selectedCase.image?.originalSrc
              : "",
            url: selectedCase.product.onlineStoreUrl,
            vendor: selectedCase.product.vendor,
            price: selectedCase.price,
            compareAtPrice: "",
          },
        ],
      }
      addedCustomizedToCartGTMEvent(productData)

      return
    }
    addProductToCart(
      id,
      1,
      selectedVariant.shopify.sku,
      selectedVariant.contentful.imageSet[0].data
    )
    const productData = {
      title: shopifyProduct.title,
      legacyResourceId: selectedVariant.shopify.legacyResourceId,
      sku: selectedVariant.shopify.sku,
      productType: shopifyProduct.productType,
      image: selectedVariant?.shopify?.image?.originalSrc
        ? selectedVariant.shopify.image?.originalSrc
        : shopifyProduct.featuredImage.originalSrc,
      url: shopifyProduct.onlineStoreUrl,
      vendor: shopifyProduct.vendor,
      price: selectedVariant.shopify.price,
      compareAtPrice: selectedVariant.shopify.compareAtPrice,
      collections: shopifyProduct.collections.map(
        (collection: { title: string }) => collection.title
      ),
      quantity: 1,
    }
    addedToCartGTMEvent(productData)
  }

  // state handler for toggling between glasses vs sunglasses
  const swapGlassesType = (type: "glasses" | "sunglasses") => {
    setLensType(type)
    const isBrowser = typeof window !== "undefined"
    if (isBrowser) {
      const params = new URLSearchParams(location.search)
      params.set("lens_type", type)
      const { protocol, pathname, host } = window.location
      const newUrl = `${protocol}//${host}${pathname}?${params.toString()}`
      window.history.replaceState({}, "", newUrl)
    }
    // edge case for when current state is polarized
    if (type === "glasses") {
      if (isPolarized) {
        switchToPolarized({
          target: { checked: false },
        } as ChangeEvent<HTMLInputElement>)
      }
      const customizeBtn = actionsRef.current?.querySelector("#customize-btn")
      customizeBtn?.classList.remove("disable")
    }
  }

  const generateProductContentfulJsonLD = () => {
    try {
      const firstNonPolarizedVariant = shopifyProduct.variants.find(
        variant => !variant.sku.includes("PZ") && !variant.sku.includes("P") // filter out polarized variants
      )
      const seoVariant = firstNonPolarizedVariant ?? shopifyProduct.variants[0]
      const name = shopifyProduct.title
      const sku = seoVariant.sku
      const color =
        (contentfulProduct.variants[0].dominantFrameColor as string) ?? ""
      const price = seoVariant.price

      const featuredImg = contentfulProduct.variants[0].featuredImage.url

      const description =
        contentfulProduct.styleDescription.styleDescription ?? ""

      const formattedColor = color.charAt(0).toUpperCase() + color.slice(1) // capitalize color

      let productSchema = {
        "@context": "https://schema.org/",
        "@type": "Product",
        name,
        sku,
        color: formattedColor,
        description,
        image: [featuredImg],
        brand: {
          "@type": "Brand",
          name: "Tres Noir",
        },
        offers: {
          "@type": "Offer",
          priceSpecification: {
            "@type": "PriceSpecification",
            price,
            priceCurrency: "USD",
          },
          hasMerchantReturnPolicy: {
            "@type": "MerchantReturnPolicy",
            applicableCountry: "US",
            returnPolicyCategory:
              "https://schema.org/MerchantReturnFiniteReturnWindow",
            merchantReturnDays: 30,
            returnMethod: "https://schema.org/ReturnByMail",
            returnFees: "https://schema.org/FreeReturn",
          },
        },
      }
      if (yotpoProductBottomline) {
        const { totalReviews, score } = yotpoProductBottomline
        productSchema["aggregateRating"] = {
          "@type": "AggregateRating",
          ratingValue: score,
          reviewCount: totalReviews,
        }
      }
      return JSON.stringify(productSchema, null, 2)
    } catch (error) {
      return null
    }
  }

  // use effects

  useEffect(() => {
    let paramSku: null | string = null
    const isBrowser = typeof window !== "undefined"
    if (isBrowser) {
      const params = new URLSearchParams(location.search)
      if (params.get("lens_type"))
        setLensType(params.get("lens_type") || "glasses")
      if (params.get("variant")) paramSku = params.get("variant")
    }

    const sku = paramSku || null
    if (sku) {
      const contentful = contentfulProduct.variants.find(
        (_variant: any) => _variant.sku === sku
      )
      const shopify = shopifyProduct.variants.find(
        (_variant: any) => _variant.sku === sku
      )
      if (contentful && shopify) {
        const variant = contentful
        setSelectedVariant({
          contentful: variant,
          shopify,
        })
      }
    }
  }, [])

  useEffect(() => {
    setProductUrl(
      `/products/${contentfulProduct.handle}/?variant=${shopifyProduct.variants[0].sku}`
    )
    setCurrentStep(1)
    setHasSavedCustomized({
      step1: false,
      step2: false,
      step3: false,
      step4: false,
      case: false,
    })
    setSelectedVariantsToDefault()
  }, [])

  useEffect(() => {
    const productData = {
      title: shopifyProduct.title,
      legacyResourceId: selectedVariant.shopify.legacyResourceId,
      sku: selectedVariant.shopify.sku,
      productType: shopifyProduct.productType,
      image: selectedVariant?.shopify?.image?.originalSrc
        ? selectedVariant.shopify.image?.originalSrc
        : shopifyProduct.featuredImage.originalSrc,
      url: shopifyProduct.onlineStoreUrl,
      vendor: shopifyProduct.vendor,
      price: selectedVariant.shopify.price,
      compareAtPrice: selectedVariant.shopify.compareAtPrice,
      collections: shopifyProduct.collections.map(
        (collection: { title: string }) => collection.title
      ),
    }
    viewedProductGTMEvent(productData)
  }, [])

  // will swap to the first available variant if selected is sold out
  useEffect(() => {
    let paramSku: null | string = null
    const isBrowser = typeof window !== "undefined"
    if (isBrowser) {
      const params = new URLSearchParams(location.search)
      if (params.get("lens_type"))
        setLensType(params.get("lens_type") || "glasses")
      if (params.get("variant")) paramSku = params.get("variant")
    }
    // if variant not supplied select first available
    if (
      !paramSku &&
      quantityLevels &&
      Object.keys(quantityLevels).length !== 0
    ) {
      const current = selectedVariant
      if (quantityLevels[current.shopify.sku] <= 0) {
        for (let key in quantityLevels) {
          if (quantityLevels[key] > 0) {
            const shopify = shopifyProduct.variants.find(
              (_variant: any) => _variant.sku === key
            )
            const contentful = contentfulProduct.variants.find(
              (_variant: any) => _variant.sku === key
            )
            if (shopify && contentful) {
              setSelectedVariant({
                contentful: contentful,
                shopify: shopify,
              })
            }
            break
          }
        }
      }
    }
  }, [quantityLevels])

  // useEffect for initializing polarizedVariant on selectedVariant change
  useEffect(() => {
    if (lensType === LensType.GLASSES) {
      const polarizedToggle =
        actionsRef.current?.querySelector("#polarized-toggle")
      const customizeBtn = actionsRef.current?.querySelector("#customize-btn")
      customizeBtn?.classList.remove("disable")
      polarizedToggle?.classList.add("disable")
      const polarizedSwitch: HTMLInputElement | null | undefined =
        polarizedToggle?.querySelector("#switch")
      if (polarizedSwitch) polarizedSwitch.checked = false
      return
    }
    const contentfulData = selectedVariant.contentful
    const sku = selectedVariant.shopify.sku
    const polVar = shopifyProduct.variants.find(
      _variant =>
        _variant.sku === `${sku}PZ` ||
        _variant.sku === `${sku}-PZ` ||
        _variant.sku === `${sku}P` ||
        _variant.sku === `${sku}-P`
    )
    const polarizedToggle =
      actionsRef.current?.querySelector("#polarized-toggle")
    const customizeBtn = actionsRef.current?.querySelector("#customize-btn")
    // if current Variant is polarized

    if (
      selectedVariant.shopify.sku.endsWith("PZ") ||
      selectedVariant.shopify.sku.endsWith("P")
    ) {
    }
    // if current variant is not polarized, but has a polarized option
    else if (polVar) {
      customizeBtn?.classList.remove("disable")
      polarizedToggle?.classList.remove("disable")
      const polarizedSwitch: HTMLInputElement | null | undefined =
        polarizedToggle?.querySelector("#switch")
      if (polarizedSwitch) polarizedSwitch.checked = false
      setPolarizedVariant({
        contentful: contentfulData,
        shopify: polVar,
      })
    }
    // if current variant is not polarized and has no polarized options
    else {
      customizeBtn?.classList.remove("disable")
      polarizedToggle?.classList.add("disable")
      const polarizedSwitch: HTMLInputElement | null | undefined =
        polarizedToggle?.querySelector("#switch")
      if (polarizedSwitch) polarizedSwitch.checked = false
    }
  }, [selectedVariant, lensType])

  return (
    <ReviewsProvider
      productTitle={shopifyProduct.title}
      productId={shopifyProduct.legacyResourceId}
      productHandle={shopifyProduct.handle}
      siteUrl={siteUrl}
    >
      <Layout>
        <SEO
          title={shopifyProduct.title}
          description={seoDescription}
          image={{
            url: contentfulProduct.variants[0].featuredImage.url,
            alt: contentfulProduct.variants[0].featuredImage.title,
          }}
          jsonLdPayload={generateProductContentfulJsonLD()}
        />
        <Page>
          <FreeShipping />
          <div className="row">
            <div className="col images">
              <ProductCarousel
                key={`${selectedVariant?.contentful.id}-${lensType}`}
                imageSet={
                  polarizedImage.length !== 0
                    ? polarizedImage
                    : selectedVariant?.contentful &&
                      lensType === LensType.GLASSES &&
                      selectedVariant.contentful.imageSetClear
                    ? selectedVariant.contentful.imageSetClear
                    : selectedVariant.contentful.imageSet
                }
              />
            </div>
            <div className="col">
              <ViewAsType
                lensType={lensType}
                swapGlassesType={swapGlassesType}
              />
              <div className="heading">
                <h1>{shopifyProduct.title}</h1>
                <ProductBottomline reviewListRef={reviewListRef as any} />
                <div className="fit">
                  {contentfulProduct.frameWidthMeasurement ? (
                    <p className="fit-container">
                      <span className="fit-measurement">
                        {`Frame Width: ${contentfulProduct.frameWidthMeasurement}mm`}
                      </span>
                      <span className="fit-range">
                        {contentfulProduct.frameWidth.length > 1
                          ? `${contentfulProduct.frameWidth[0]} to ${contentfulProduct.frameWidth[1]} `
                          : `${contentfulProduct.frameWidth[0]} `}
                        fit
                      </span>
                    </p>
                  ) : (
                    <p className="fit-range">
                      {contentfulProduct.frameWidth.length > 1
                        ? `${contentfulProduct.frameWidth[0]} to ${contentfulProduct.frameWidth[1]} `
                        : `${contentfulProduct.frameWidth[0]} `}
                      fit
                    </p>
                  )}
                  <p>
                    Dimensions:{" "}
                    {contentfulProduct &&
                      contentfulProduct.fitDimensions
                        .split("-")
                        .map(num => num + "mm")
                        .join(" - ")}{" "}
                  </p>
                </div>
              </div>
              <form className="options">
                {selectedVariant.shopify.title !== "Default Title" && (
                  <p className="selected-text-label">
                    Color:{" "}
                    <span>
                      {lensType === LensType.GLASSES
                        ? selectedVariant.shopify.title.split(" - ")[0]
                        : selectedVariant.shopify.title}
                    </span>
                  </p>
                )}

                <div className="buttons">
                  {contentfulProduct &&
                    contentfulProduct.variants.map((variant: any) => {
                      const shopifyVariant = shopifyProduct.variants.find(
                        v => v.sku === variant.sku
                      )
                      return (
                        <button
                          key={variant.id}
                          type="button"
                          data-active={
                            variant.id === selectedVariant.contentful.id
                          }
                          onClick={e => selectVariant(e, variant)}
                          aria-label={`Color option ${variant.colorImage.title}`}
                          aria-pressed={
                            variant.id === selectedVariant.contentful.id
                              ? "true"
                              : "false"
                          }
                        >
                          {variant.colorImage ? (
                            <div className="option-color-image-container">
                              <Img
                                image={variant.colorImage.data}
                                alt={variant.colorImage.title}
                              />
                              {shopifyVariant &&
                                isNewVariant(shopifyVariant) && (
                                  <div className="new-color-badge">
                                    <span>New</span>
                                  </div>
                                )}
                            </div>
                          ) : (
                            <StaticImage
                              src="../images/empty-color.png"
                              alt="Tres Noir"
                              placeholder="dominantColor"
                              layout="constrained"
                            />
                          )}
                        </button>
                      )
                    })}
                </div>
                <div className="price">
                  {!isApplicable ? (
                    <>
                      {badge && (
                        <div className="flex">
                          <Badge
                            label={badge.label}
                            color={badge.color}
                            position="static"
                            top={0}
                            left={0}
                          />
                        </div>
                      )}
                      <div className="value">
                        <div className="left">
                          <div className="current-price-container">
                            <span className="starting-at">STARTING AT</span>
                            <span>
                              ${formatPrice(selectedVariant.shopify.price)} USD
                            </span>
                          </div>
                          {!!selectedVariant.shopify.compareAtPrice &&
                            isDiscounted(
                              selectedVariant.shopify.price,
                              selectedVariant.shopify.compareAtPrice
                            ) && (
                              <div className="compare-at-price">
                                <span>
                                  $
                                  {formatPrice(
                                    selectedVariant.shopify.compareAtPrice
                                  )}{" "}
                                  USD
                                </span>
                              </div>
                            )}
                        </div>
                        <span className="right">
                          <Link
                            to={
                              contentfulProduct &&
                              `/${contentfulProduct.handle}`
                            }
                            className="learn-more"
                          >
                            Learn More &gt;
                          </Link>
                        </span>
                      </div>
                    </>
                  ) : (
                    discountedPrice &&
                    isDiscounted(
                      discountedPrice,
                      selectedVariant.shopify.price
                    ) && (
                      <>
                        <div className="flex">
                          <Badge
                            label={offer}
                            color={"red"}
                            position="static"
                            top={0}
                            left={0}
                          />
                        </div>

                        <div className="value">
                          <div className="left">
                            <div className="current-price-container">
                              <span className="starting-at">STARTING AT</span>
                              <span>${discountedPrice} USD</span>
                            </div>
                            <div className="compare-at-price">
                              <span>${selectedVariant.shopify.price} USD</span>
                            </div>
                          </div>
                          <span className="right">
                            <Link
                              to={
                                contentfulProduct &&
                                `/${contentfulProduct.handle}`
                              }
                              className="learn-more"
                            >
                              Learn More &gt;
                            </Link>
                          </span>
                        </div>
                      </>
                    )
                  )}
                </div>
                <div className="actions" ref={actionsRef}>
                  {lensType === LensType.SUNGLASSES && (
                    <>
                      <div
                        className={`polarized-actions ${
                          isClearanceVariantPolarizable
                            ? "disabled-polarize-action"
                            : ""
                        }`}
                        id="polarized-toggle"
                      >
                        <div className="polarized-switch">
                          <input
                            disabled={isClearanceVariantPolarizable}
                            type="checkbox"
                            id="switch"
                            checked={isPolarized}
                            onChange={evt => switchToPolarized(evt)}
                          />
                          <label htmlFor="switch">Toggle</label>
                        </div>
                        <span>Polarized</span>
                        <PolarizedTooltip
                          showPolarizedModal={showPolarizedModal}
                          setShowPolarizedModal={setShowPolarizedModal}
                        />
                      </div>
                    </>
                  )}
                  {quantityLevels &&
                  quantityLevels[selectedVariant.shopify.sku] <= 0 ? (
                    <div>
                      <button type="button" className="sold-out">
                        SOLD OUT
                      </button>
                    </div>
                  ) : (
                    <div>
                      {lensType !== LensType.GLASSES && (
                        <>
                          {" "}
                          <button
                            type="button"
                            onClick={handleAddToCart}
                            className="add-to-cart btn"
                            disabled={isAddingToCart}
                            id="add-to-cart-btn"
                          >
                            {isAddingToCart ? <Spinner /> : `ADD TO CART`}
                          </button>
                          <p>- OR -</p>
                        </>
                      )}

                      <Link
                        className={`btn ${isPolarized ? "disable" : ""}`}
                        // to={contentfulProduct && customizeUrl}
                        id="customize-btn"
                        to={`/products/${
                          contentfulProduct.handle
                        }/customize?variant=${selectedVariant.shopify.sku}${
                          lensType !== LensType.SUNGLASSES
                            ? `&lens_type=${lensType}`
                            : ""
                        }`}
                      >
                        CUSTOMIZE
                      </Link>
                      <p className="small">
                        Customize for Polarized, Rx, and more
                      </p>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
          <div className="row mobile-reverse">
            <div
              className={`col ${lensType !== LensType.GLASSES ? "images" : ""}`}
            >
              <ProductDetails
                frameWidth={contentfulProduct.frameWidthMeasurement}
                fitDimensions={contentfulProduct.fitDimensions}
                lensColor={selectedVariant.contentful.lensColor}
                lensType={lensType}
              />
            </div>
            {lensType !== LensType.GLASSES && (
              <div className="col">
                <CaseGridSunglasses
                  caseCollection={caseCollection}
                  selectedCase={selectedCase}
                  setSelectedCase={setSelectedCase}
                  casesAvailable={contentfulProduct.casesAvailable}
                />
              </div>
            )}
          </div>
          {contentfulProduct.featuredStyles && (
            <>
              {lensType === LensType.SUNGLASSES && (
                <Divider className="desktop-only" />
              )}

              <div className="row-no-flex">
                <FeaturedStyles images={contentfulProduct.featuredStyles} />
              </div>
            </>
          )}
          <Divider />
          <div className="row-no-flex review-row">
            <Reviews reviewListRef={reviewListRef as any} />
          </div>
        </Page>
      </Layout>
    </ReviewsProvider>
  )
}

export default ProductCustomizable

export const query = graphql`
  query ProductQuery($handle: String, $legacyResourceId: String) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    contentfulHomepage {
      enableBogo
    }
    yotpoProductBottomline(productIdentifier: { eq: $legacyResourceId }) {
      totalReviews
      score
      yotpoId
    }
    contentfulProduct(handle: { eq: $handle }) {
      handle
      styleDescription {
        styleDescription
      }
      frameWidth
      frameWidthMeasurement
      fitDimensions
      casesAvailable
      featuredStyles {
        data: gatsbyImageData(
          placeholder: DOMINANT_COLOR
          quality: 60
          width: 800
        )
        title
      }
      variants {
        dominantFrameColor
        colorName
        sku
        colorImage {
          data: gatsbyImageData
          title
        }
        featuredImage {
          url
          title
        }
        imageSet {
          data: gatsbyImageData(layout: CONSTRAINED, width: 2048, height: 1365)
          title
        }
        imageSetClear {
          data: gatsbyImageData(layout: CONSTRAINED, width: 2048, height: 1365)
          title
        }
        customizations {
          gradientTintSmokeLenses {
            data: gatsbyImageData(
              placeholder: DOMINANT_COLOR
              quality: 60
              width: 800
            )
            title
          }
          gradientTintBrownLenses {
            data: gatsbyImageData(
              placeholder: DOMINANT_COLOR
              quality: 60
              width: 800
            )
            title
          }
          gradientTintG15Lenses {
            data: gatsbyImageData(
              placeholder: DOMINANT_COLOR
              quality: 60
              width: 800
            )
            title
          }
          sunGlassesSmokeLenses {
            data: gatsbyImageData(
              placeholder: DOMINANT_COLOR
              quality: 60
              width: 800
            )
            title
          }
          sunGlassesBrownLenses {
            data: gatsbyImageData(
              placeholder: DOMINANT_COLOR
              quality: 60
              width: 800
            )
            title
          }
          sunGlassesGreenLenses {
            data: gatsbyImageData(
              placeholder: DOMINANT_COLOR
              quality: 60
              width: 800
            )
            title
          }
          sunGlassesOrangeLenses {
            data: gatsbyImageData(
              placeholder: DOMINANT_COLOR
              quality: 60
              width: 800
            )
            title
          }
          sunGlassesYellowLenses {
            data: gatsbyImageData(
              placeholder: DOMINANT_COLOR
              quality: 60
              width: 800
            )
            title
          }
          sunGlassesBlueLenses {
            data: gatsbyImageData(
              placeholder: DOMINANT_COLOR
              quality: 60
              width: 800
            )
            title
          }
          sunGlassesG15Lenses {
            data: gatsbyImageData(
              placeholder: DOMINANT_COLOR
              quality: 60
              width: 800
            )
            title
          }
        }
        id
        lensColor
      }
    }
    shopifyProduct(handle: { eq: $handle }) {
      collections {
        handle
        title
      }
      featuredImage {
        originalSrc
        altText
      }
      id
      handle
      legacyResourceId
      storefrontId
      onlineStoreUrl
      productType
      title
      vendor
      tags
      variants {
        availableForSale
        id
        price
        compareAtPrice
        sku
        title
        storefrontId
        legacyResourceId
        selectedOptions {
          name
          value
        }
        product {
          tags
        }
        metafields {
          key
          id
          value
          namespace
        }
      }
    }
    contentfulVariantCollection(handle: { eq: "sale" }) {
      variants {
        sku
      }
    }
  }
`
