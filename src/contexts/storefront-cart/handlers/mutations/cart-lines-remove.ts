import CART_FRAGMENT from "../fragments/cart"

const mutation = `#graphql
  ${CART_FRAGMENT}
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
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
