import CART_FRAGMENT from "../fragments/cart"

const mutation = `#graphql
  ${CART_FRAGMENT}
  mutation cartDiscountCodesUpdate($cartId: ID!, $discountCodes: [String!]) {
    cartDiscountCodesUpdate(cartId: $cartId, discountCodes: $discountCodes) {
      cart {
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
