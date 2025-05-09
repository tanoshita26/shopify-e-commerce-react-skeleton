import CART_FRAGMENT from "../fragments/cart"

const mutation = `#graphql
  ${CART_FRAGMENT}
  mutation cartAttributesUpdate($attributes: [AttributeInput!]!, $cartId: ID!) {
    cartAttributesUpdate(attributes: $attributes, cartId: $cartId) {
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
