export interface ShopifyProductInfo {
  collections: string[]
  compareAtPrice: number | null
  image: string
  legacyResourceId: string
  price: number
  productType: string
  quantity?: number
  sku: string
  title: string
  url: string
  vendor: string
}

export interface ShopifyCustomizedProductInfo {
  main: {
    collections: string[]
    compareAtPrice: string | number
    image: string
    legacyResourceId: string
    price: string | number
    productType: string
    sku: string
    title: string
    url: string
    vendor: string
  }
  addOns: {
    title: string
    legacyResourceId: string
    sku: string
    productType: string
    image: string
    url: string
    vendor: string
    price: string | number
    compareAtPrice: string | number
  }[]
}

export interface ViewedProductPayload {
  Brand: string
  Categories: string[]
  CompareAtPrice: number
  ImageUrl: string
  Name: string
  Price: number
  ProductID: string
  ProductType: string
  SKU: string
  Url: string
}

export interface AddedToCartPayload {
  $value: number
  AddedItemProductName: string
  AddedItemProductID: string
  AddedItemSKU: string
  AddedItemCategories: string[]
  AddedItemImageURL: string
  AddedItemURL: string
  AddedItemPrice: number
  AddedItemProductType: string
  AddedItemQuantity: number
  ItemNames: string[]
  Items: {
    ProductID: string
    SKU: string
    ProductName: string
    ProductType: string
    Quantity: number
    ItemPrice: number
    RowTotal: number
    ProductURL: string
    ImageURL: string
  }[]
}

export interface StartedCheckoutPayload {
  $event_id: number
  $value: number
  ItemNames: string[]
  CheckoutURL: string
  Items: {
    ImageURL: string
    ItemPrice: number
    ProductName: string
    Quantity: number
    RowTotal: number
    SKU: string
  }[]
}

export interface CollectionInfo {
  handle: string
  title: string
}

export interface ViewedCollectionPayload {
  handle: string
  title: string
}
