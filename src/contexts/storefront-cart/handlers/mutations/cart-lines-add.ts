import CART_FRAGMENT from "../fragments/cart"

const mutation = `#graphql
  ${CART_FRAGMENT}
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        # Cart fields
        ...CartFragment
      }
      userErrors {
        field
        message
      }
      # warnings {
      #   # CartWarning fields
      # }
    }
  }
`

export default mutation
