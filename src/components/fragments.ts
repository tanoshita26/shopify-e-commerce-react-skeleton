import { graphql } from "gatsby"

export const shopifyProductsFields = graphql`
  fragment shopifyProductsFields on ShopifyProduct {
    handle
    description
    id
    legacyResourceId
    media {
      ... on ShopifyMediaImage {
        image {
          altText
          localFile {
            id
            childImageSharp {
              gatsbyImageData(quality: 50)
            }
          }
        }
      }
    }
    productType
    onlineStoreUrl
    vendor
    featuredImage {
      originalSrc
      altText
      localFile {
        id
        childImageSharp {
          gatsbyImageData(quality: 50)
        }
      }
    }
    title
    variants {
      compareAtPrice
      sku
      storefrontId
      legacyResourceId
      title
      image {
        originalSrc
        altText
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      price
      product {
        legacyResourceId
        title
        description
        onlineStoreUrl
        productType
        collections {
          handle
          title
        }
        vendor
      }
      selectedOptions {
        name
        value
      }
    }
  }
`
