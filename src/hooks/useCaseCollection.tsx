import React, { useMemo } from "react"
import { useStaticQuery, graphql } from "gatsby"

export const useCaseCollection = () => {
  const getCaseCollection = () => {
    const { shopifyCollection } = useStaticQuery(graphql`
      query GetAOCaseCollectionStock {
        shopifyCollection(handle: { eq: "case-add-ons" }) {
          products {
            id
            title
            productType
            handle
            storefrontId
            legacyResourceId
            featuredImage {
              localFile {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
            variants {
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
        }
      }
    `)
    return shopifyCollection
  }
  const caseCollection = getCaseCollection().products

  const data = useMemo(() => {
    return caseCollection
  }, [caseCollection])

  return data
}
