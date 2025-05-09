// https://shopify.dev/docs/api/storefront/2025-01/queries/cart
import CART_FRAGMENT from "../fragments/cart"
const query = `#graphql
  ${CART_FRAGMENT}
  query cart($id: ID!) {
    cart(id: $id) {
      ...CartFragment
    }
  }
`

export default query
