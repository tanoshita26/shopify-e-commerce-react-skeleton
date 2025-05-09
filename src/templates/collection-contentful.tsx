import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import Product from "../components/product-contentful"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Filters from "../components/filters-contentful"
import { ContentfulCollection, ContentfulProduct } from "../types/contentful"
import FreeShipping from "../components/free-shipping"
import CollectionImage from "../components/collection-image"
import { viewedCollectionGTMEvent } from "../helpers/gtm"

const Grid = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 15px;
  margin-bottom: 55px;
`

const CollectionContentful = ({
  data,
}: {
  data: {
    contentfulCollection: ContentfulCollection
    shopifyCollection: { products: any[] }
  }
}) => {
  const { contentfulCollection: collection, shopifyCollection } = data
  const defaultFilters = { frameWidth: "", colorName: "" }
  const [filters, setFilters] = useState<{
    frameWidth: string
    colorName: string
  }>(defaultFilters)
  const [products, setProducts] = useState<ContentfulProduct[]>(
    collection.products
  )

  useEffect(() => {
    const collectionInfo = {
      handle: collection.handle,
      title: collection.name,
    }
    viewedCollectionGTMEvent(collectionInfo)
  }, [])

  const getShopifyProduct = product => {
    if (!shopifyCollection?.products) return null

    const shopifyProduct = shopifyCollection.products.find(
      shopifyProduct =>
        shopifyProduct.handle.toLowerCase() === product.handle.toLowerCase() ||
        shopifyProduct.title === product.title
    )

    return shopifyProduct
  }

  return (
    <Layout>
      <SEO
        title={collection.name}
        description={collection.featuredImage.description}
        image={{
          url: collection.featuredImage.url,
          alt: collection.featuredImage.description,
        }}
      />
      <div className="page">
        <FreeShipping />
        {collection.featuredImage && (
          <CollectionImage
            collectionImage={collection.featuredImage.data}
            collectionName={collection.name}
            collectionDescription={collection.description}
            textColor={collection.featuredImageTextColor}
            position={collection.featuredImageTextPosition}
            showOverlay={collection.showOverlay}
          />
        )}
        {products && (
          <div className="filters-container">
            <Filters
              collection={collection}
              filters={filters}
              setFilters={setFilters}
              setProducts={setProducts}
            />
          </div>
        )}

        <Grid>
          {products && products.length ? (
            Array.from(products.slice(0, 6)).map(
              (product: ContentfulProduct) => {
                const shopifyProduct = getShopifyProduct(product)

                return (
                  <Product
                    key={product.id}
                    data={product}
                    color={filters.colorName}
                    collectionHandle={collection.handle}
                    shopifyProduct={shopifyProduct}
                  />
                )
              }
            )
          ) : (
            <p>No Products found please remove filters and try again.</p>
          )}
        </Grid>

        {collection.featuredImage2 && products.length > 6 && (
          <CollectionImage collectionImage={collection.featuredImage2.data} />
        )}

        <Grid>
          {products &&
            products.length > 6 &&
            Array.from(products.slice(6)).map((product: ContentfulProduct) => {
              const shopifyProduct = getShopifyProduct(product)

              return (
                <Product
                  key={product.id}
                  data={product}
                  color={filters.colorName}
                  collectionHandle={collection.handle}
                  shopifyProduct={shopifyProduct}
                />
              )
            })}
        </Grid>
      </div>
    </Layout>
  )
}

export default CollectionContentful

export const query = graphql`
  query ContentfulCollectionQuery($handle: String!) {
    contentfulCollection(handle: { eq: $handle }) {
      handle
      name
      description
      showOverlay
      featuredImage {
        data: gatsbyImageData(width: 2048, formats: [AUTO, WEBP], quality: 50)
        description
        url
      }
      featuredImage2 {
        data: gatsbyImageData(width: 2048, formats: [AUTO, WEBP], quality: 50)
      }
      featuredImageTextColor
      featuredImageTextPosition
      products {
        title
        handle
        id
        frameWidth
        collection {
          name
          handle
        }
        variants {
          id
          sku
          featuredImage {
            data: gatsbyImageData(
              width: 600
              quality: 40
              aspectRatio: 1.5
              cropFocus: CENTER
            )
          }
          featuredImageClear {
            data: gatsbyImageData(
              width: 600
              quality: 40
              aspectRatio: 1.5
              cropFocus: CENTER
            )
          }
          colorName
          colorImage {
            data: gatsbyImageData(width: 40)
          }
          frameColor
          dominantFrameColor
        }
      }
    }
    shopifyCollection(handle: { eq: $handle }) {
      products {
        title
        handle
        createdAt
        tags
        variants {
          price
          compareAtPrice
          sku
          metafields {
            key
            namespace
            value
          }
          selectedOptions {
            name
            value
          }
        }
      }
    }
  }
`
