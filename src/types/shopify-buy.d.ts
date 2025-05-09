// Type definitions for shopify-buy 2.10
// Project: https://github.com/Shopify/js-buy-sdk#readme
// Definitions by: Martin Köhn <https://github.com/openminder>
//                 Stephen Traiforos <https://github.com/straiforos>
//                 Rosana Ruiz <https://github.com/totemika>
//                 Juan Manuel Incaurgarat <https://github.com/kilinkis>
//                 Chris Worman <https://github.com/chrisworman-pela>
//                 Maciej Baron <https://github.com/MaciekBaron>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.7

/**
 * The JS Buy SDK is a lightweight library that allows you to build ecommerce into any website.
 * It is based on Shopify’s API and provides the ability to retrieve products and collections from your shop,
 * add products to a cart, and checkout.
 * It can render data on the client side or server. This will allow you to add ecommerce functionality to any
 * website or javascript application. This is helpful if you already have a website and need to add ecommerce
 * or only need a simple buy button on your site.
 */

declare namespace ShopifyBuy {
  export interface CheckoutResource {
    /**
     * Add discounts to cart
     */
    addDiscount(
      checkoutId: string | number,
      discountCode: string
    ): Promise<Cart>
  }
}
