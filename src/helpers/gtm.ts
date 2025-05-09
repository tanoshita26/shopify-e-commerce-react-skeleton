import type {
  AddedToCartPayload,
  ViewedProductPayload,
  ShopifyProductInfo,
  ShopifyCustomizedProductInfo,
  StartedCheckoutPayload,
  CollectionInfo,
  ViewedCollectionPayload,
} from "../types/gtm"
import type { Cart } from "../contexts/storefront-cart/types/storefront-cart"

// Check if window is defined (so if in the browser or in node.js).
const isBrowser = typeof window !== "undefined"

export const identifyCustomerGTMEvent = (email: string) => {
  if (isBrowser) {
    const payload: string = email

    window.dataLayer.push({
      event: "identify_customer",
      identify_customer_payload: payload,
    })
  }
}

export const viewedCollectionGTMEvent = (collectionInfo: CollectionInfo) => {
  if (isBrowser) {
    const payload: ViewedCollectionPayload = {
      handle: collectionInfo.handle,
      title: collectionInfo.title,
    }

    window.dataLayer.push({
      event: "view_collection",
      viewed_collection_payload: payload,
    })
  }
}

export const viewedProductGTMEvent = (productInfo: ShopifyProductInfo) => {
  if (isBrowser) {
    const payload: ViewedProductPayload = {
      Brand: productInfo.vendor,
      Categories: productInfo.collections,
      CompareAtPrice: Number(productInfo.compareAtPrice),
      ImageUrl: productInfo.image,
      Name: productInfo.title,
      Price: Number(productInfo.price),
      ProductID: productInfo.legacyResourceId,
      SKU: productInfo.sku,
      Url: productInfo.url,
      ProductType: productInfo.productType,
    }

    window.dataLayer.push({
      event: "view_item",
      viewed_product_payload: payload,
    })
  }
}

export const addedToCartGTMEvent = (productInfo: ShopifyProductInfo) => {
  if (isBrowser) {
    const payload: AddedToCartPayload = {
      $value: Number(productInfo.price), // cart value
      AddedItemProductName: productInfo.title,
      AddedItemProductID: productInfo.legacyResourceId,
      AddedItemSKU: productInfo.sku,
      AddedItemCategories: productInfo.collections,
      AddedItemImageURL: productInfo.image,
      AddedItemURL: productInfo.url,
      AddedItemPrice: Number(productInfo.price),
      AddedItemProductType: productInfo.productType,
      AddedItemQuantity: Number(productInfo.quantity),
      ItemNames: [productInfo.title], // all product names
      // CheckoutURL: "http://www.example.com/path/to/checkout",
      Items: [
        {
          ImageURL: productInfo.image,
          ItemPrice: Number(productInfo.price),
          ProductName: productInfo.title,
          ProductType: productInfo.productType,
          // ProductCategories: item.collections,
          ProductID: productInfo.legacyResourceId,
          ProductURL: productInfo.url,
          Quantity: 1,
          RowTotal: Number(productInfo.price),
          SKU: productInfo.sku,
        },
      ],
    }

    window.dataLayer.push({
      event: "add_to_cart",
      added_to_cart_payload: payload,
    })
  }
}

export const addedCustomizedToCartGTMEvent = (
  productInfo: ShopifyCustomizedProductInfo
) => {
  if (isBrowser) {
    // calculate value
    let value = Number(productInfo.main.price)
    // get item names
    let itemNames = [productInfo.main.title]
    productInfo.addOns.forEach(addOn => {
      value += Number(addOn.price)
      itemNames.push(addOn.title)
    })

    const payload: AddedToCartPayload = {
      $value: value, // cart value
      AddedItemProductName: productInfo.main.title,
      AddedItemProductID: productInfo.main.legacyResourceId,
      AddedItemSKU: productInfo.main.sku,
      AddedItemCategories: productInfo.main.collections,
      AddedItemImageURL: productInfo.main.image,
      AddedItemURL: productInfo.main.url,
      AddedItemPrice: Number(productInfo.main.price),
      AddedItemProductType: "Glasses",
      AddedItemQuantity: 1,
      ItemNames: itemNames, // all product names
      Items: [],
    }
    // push first item
    payload.Items.push({
      ImageURL: productInfo.main.image,
      ItemPrice: Number(productInfo.main.price),
      ProductName: productInfo.main.title,
      ProductID: productInfo.main.legacyResourceId,
      ProductType: "Glasses",
      ProductURL: productInfo.main.url,
      Quantity: 1,
      RowTotal: Number(productInfo.main.price),
      SKU: productInfo.main.sku,
    })

    productInfo.addOns
      .map(addOn => ({
        ImageURL: addOn.image,
        ItemPrice: Number(addOn.price),
        ProductName: addOn.title,
        ProductType: addOn.productType,
        ProductID: addOn.legacyResourceId,
        ProductURL: addOn.url,
        Quantity: 1,
        RowTotal: Number(addOn.price),
        SKU: addOn.sku,
      }))
      .forEach(lineItem => {
        payload.Items.push(lineItem)
      })

    window.dataLayer.push({
      event: "add_to_cart",
      added_to_cart_payload: payload,
    })
  }
}

export const startedCheckoutGTMEvent = (cartInfo: Cart) => {
  if (isBrowser) {
    const payload: StartedCheckoutPayload = {
      $event_id: new Date().getTime(),
      $value: Number(cartInfo.cost.totalAmount.amount),
      CheckoutURL: cartInfo.checkoutUrl,
      ItemNames: [],
      Items: [],
    }
    cartInfo.lines.edges
      .map(lineItem => ({
        ItemPrice: Number(lineItem.node.merchandise.price),
        ImageURL: lineItem.node.merchandise.image?.url || "",
        // ProductCategories: ["Fiction", "Children"],
        ProductID: lineItem.node.merchandise.id.split(
          "gid://shopify/ProductVariant/"
        )[1],
        ProductName: lineItem.node.merchandise.product.title,
        // ProductURL: "http://www.example.com/path/to/product",
        Quantity: lineItem.node.quantity,
        RowTotal:
          Number(lineItem.node.merchandise.price) *
          Number(lineItem.node.quantity),
        SKU: lineItem.node.merchandise.sku || "",
      }))
      .forEach(lineItem => {
        payload.Items.push(lineItem)
        if (!payload.ItemNames.includes(lineItem.ProductName)) {
          payload.ItemNames.push(lineItem.ProductName)
        }
      })

    window.dataLayer.push({
      event: "begin_checkout",
      started_checkout_payload: payload,
    })
  }
}
