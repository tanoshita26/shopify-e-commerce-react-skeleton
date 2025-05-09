// https://shopify.dev/docs/api/storefront/2025-01/mutations/cartcreate
import CART_FRAGMENT from "../fragments/cart"

const mutation = `#graphql
  ${CART_FRAGMENT}
  mutation cartCreate($input: CartInput!, $country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
      cartCreate(input: $input) {
        userErrors {
          message
          code
          field
        }
        cart {
          ...CartFragment
        }
      }
    }
  `

export default mutation
