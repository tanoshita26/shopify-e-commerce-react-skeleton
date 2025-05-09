import React, {
  createContext,
  ReactChild,
  useState,
  useMemo,
  useEffect,
} from "react"
import {
  SelectedVariants,
  ShopifyVariant,
  SavedCustomizeContexts,
  SelectedVariantStorage,
} from "../types/global"

const defaultSelectedVariants = {
  step1: {
    image: {
      originalSrc: "",
      altText: "",
      localFile: {
        childImageSharp: {
          gatsbyImageData: {},
        },
      },
    },
    legacyResourceId: "",
    price: 0,
    compareAtPrice: null,
    product: {
      title: "",
      description: "",
      onlineStoreUrl: "",
      productType: "",
      collections: {
        handle: "",
        title: "",
      },
      vendor: "",
    },
    selectedOptions: [
      {
        name: "",
        value: "",
      },
    ],
    storefrontId: "",
    sku: "",
    title: "",
  },
  step2: {
    image: {
      originalSrc: "",
      altText: "",
      localFile: {
        childImageSharp: {
          gatsbyImageData: {},
        },
      },
    },
    legacyResourceId: "",
    price: 0,
    compareAtPrice: null,
    product: {
      title: "",
      description: "",
      onlineStoreUrl: "",
      productType: "",
      collections: {
        handle: "",
        title: "",
      },
      vendor: "",
    },
    selectedOptions: [
      {
        name: "",
        value: "",
      },
    ],
    storefrontId: "",
    sku: "",
    title: "",
  },
  step3: {
    image: {
      originalSrc: "",
      altText: "",
      localFile: {
        childImageSharp: {
          gatsbyImageData: {},
        },
      },
    },
    legacyResourceId: "",
    price: 0,
    compareAtPrice: null,
    product: {
      title: "",
      description: "",
      onlineStoreUrl: "",
      productType: "",
      collections: {
        handle: "",
        title: "",
      },
      vendor: "",
    },
    selectedOptions: [
      {
        name: "",
        value: "",
      },
    ],
    storefrontId: "",
    sku: "",
    title: "",
  },
  step4: [
    {
      image: {
        originalSrc: "",
        altText: "",
        localFile: {
          childImageSharp: {
            gatsbyImageData: {},
          },
        },
      },
      legacyResourceId: "",
      price: 0,
      compareAtPrice: null,
      product: {
        title: "",
        description: "",
        onlineStoreUrl: "",
        productType: "",
        collections: {
          handle: "",
          title: "",
        },
        vendor: "",
      },
      selectedOptions: [
        {
          name: "",
          value: "",
        },
      ],
      storefrontId: "",
      sku: "",
      title: "",
    },
  ],
  case: {
    image: {
      originalSrc: "",
      altText: "",
      localFile: {
        childImageSharp: {
          gatsbyImageData: {},
        },
      },
    },
    legacyResourceId: "",
    compareAtPrice: null,
    price: 0,
    product: {
      title: "",
      description: "",
      onlineStoreUrl: "",
      productType: "",
      collections: {
        handle: "",
        title: "",
      },
      vendor: "",
    },
    selectedOptions: [
      {
        name: "",
        value: "",
      },
    ],
    storefrontId: "",
    sku: "",
    title: "",
  },
}

const defaultVariant = {
  image: {
    originalSrc: "",
    altText: "",
    localFile: {
      childImageSharp: {
        gatsbyImageData: {},
      },
    },
  },
  legacyResourceId: "",
  price: 0,
  product: {
    title: "",
    description: "",
    onlineStoreUrl: "",
    productType: "",
    collections: {
      handle: "",
      title: "",
    },
    vendor: "",
  },
  selectedOptions: [
    {
      name: "",
      value: "",
    },
  ],
  storefrontId: "",
  sku: "",
  title: "",
}

const defaultContext = {
  currentStep: 1,
  setCurrentStep: (currentStep: number) => {},
  productUrl: "/",
  setProductUrl: (productUrl: string) => {},
  selectedVariants: defaultSelectedVariants,
  setSelectedVariants: (selectedVariants: SelectedVariants) => {},
  setSelectedVariantsToDefault: () => {},
  hasSavedCustomized: {
    step1: false,
    step2: false,
    step3: false,
    step4: false,
    case: false,
  },
  setHasSavedCustomized: (hasSavedCustomized: SavedCustomizeContexts) => {},
  defaultVariant: defaultVariant,
}

export const CustomizeContext = createContext(defaultContext)

export const CustomizeProvider = ({ children }: { children: ReactChild }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [productUrl, setProductUrl] = useState("")
  const [hasSavedCustomized, setHasSavedCustomized] = useState({
    step1: false,
    step2: false,
    step3: false,
    step4: false,
    case: false,
  })

  const [selectedVariants, setSelectedVariants] = useState<SelectedVariants>(
    defaultSelectedVariants
  )

  const setSelectedVariantsToDefault = () => {
    setSelectedVariants(defaultSelectedVariants)
  }

  const value = useMemo(
    () => ({
      currentStep,
      setCurrentStep,
      productUrl,
      setProductUrl,
      selectedVariants,
      setSelectedVariants,
      setSelectedVariantsToDefault,
      hasSavedCustomized,
      setHasSavedCustomized,
      defaultVariant,
    }),
    [
      currentStep,
      setCurrentStep,
      productUrl,
      setProductUrl,
      selectedVariants,
      setSelectedVariants,
      hasSavedCustomized,
      setHasSavedCustomized,
      defaultVariant,
    ]
  )

  return (
    <CustomizeContext.Provider value={value}>
      {children}
    </CustomizeContext.Provider>
  )
}
