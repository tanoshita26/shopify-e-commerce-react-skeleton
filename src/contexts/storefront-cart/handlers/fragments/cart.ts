export const CART_FRAGMENT = `#graphql
  fragment CartFragment on Cart {
    id
    checkoutUrl
    createdAt
    attributes {
      key
      value
    }
    discountAllocations {
      discountedAmount {
        amount
        currencyCode
      }
    }
    discountCodes {
      code
    }
    lines(first: 250) {
      edges {
        node {
          id
          quantity
          attributes {
            key
            value
          }
          merchandise {
            ... on ProductVariant {
              id
              sku
              title
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
                currencyCode
              }
              product {
                handle
                title
              }
              image {
                url
                altText
              }
            }
          }
          cost {
            amountPerQuantity {
              amount
              currencyCode
            }
            compareAtAmountPerQuantity {
              amount
              currencyCode
            }
            totalAmount {
              amount
              currencyCode
            }
            subtotalAmount {
              amount
              currencyCode
            }
          }
          discountAllocations {
            discountedAmount {
              amount
              currencyCode
            }
          }
        }
      }
    }
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
    }
    discountCodes {
      applicable
      code
    }
  }
`

export default CART_FRAGMENT
