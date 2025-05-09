const path = require("path")

// patch development store schema
if (
  process.env.GATSBY_ENVIRONMENT === "development" ||
  process.env.GATSBY_ENVIRONMENT === "staging"
) {
  exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions
    createTypes(`
      type ShopifyProduct {
        onlineStoreUrl: String
      }
    `)
  }
}

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const pageable = await graphql(`
    query PagesQuery {
      allShopifyProduct {
        edges {
          node {
            handle
            id
            legacyResourceId
            status
            metafields {
              key
              value
            }
            productType
          }
        }
      }
      allShopifyCollection {
        edges {
          node {
            handle
            legacyResourceId
            id
            title
          }
        }
      }
      allContentfulProduct {
        edges {
          node {
            handle
          }
        }
      }
      allContentfulCollection {
        edges {
          node {
            handle
          }
        }
      }
      allContentfulVariantCollection {
        edges {
          node {
            handle
          }
        }
      }
    }
  `)
  const contentfulHandles = pageable.data.allContentfulProduct.edges.map(
    i => i.node.handle
  )

  pageable.data.allShopifyProduct.edges.forEach(
    async ({
      node: { handle, id, metafields, productType, legacyResourceId, status },
    }) => {
      let template = "product"
      if (metafields.length) {
        metafields.forEach(node => {
          if (node.key === "gatsby_template_name" && node.value) {
            template = node.value
          }
        })
      }

      if (productType === "Glasses" && contentfulHandles.includes(handle)) {
        template = "product-customizable"
        // TODO: if it exists in contentful its forsure customizable, add this case to optimize data in product-customizable.tsx
      } else if (productType === "Gift Card" || productType === "Gift Cards") {
        template = "gift-card"
      }

      if (
        productType !== "Lense Customization" &&
        productType !== "Lens Customization" &&
        productType !== "Lenses" &&
        productType !== "Upsell AO" &&
        productType !== "Case Add-Ons" &&
        productType !== "Insurance" &&
        status === "ACTIVE"
      ) {
        createPage({
          path: `/products/${handle}`,
          component: path.resolve(`./src/templates/${template}.tsx`),
          context: {
            id,
            handle,
            legacyResourceId: legacyResourceId
              ? legacyResourceId.toString()
              : "",
          },
        })
      }
    }
  )
  pageable.data.allShopifyProduct.edges.forEach(
    async ({ node: { handle, id, productType, legacyResourceId } }) => {
      if (productType === "Glasses" && contentfulHandles.includes(handle)) {
        createPage({
          path: `/products/${handle}/customize`,
          component: path.resolve(`./src/templates/customize.tsx`),
          context: {
            id,
            handle,
            legacyResourceId: legacyResourceId
              ? legacyResourceId.toString()
              : "",
          },
        })
      }
    }
  )
  pageable.data.allShopifyCollection.edges.forEach(
    ({ node: { handle, id, title } }) => {
      const template = "collection"
      // exclude collections
      const excludedCollections = [
        "Lens Coating",
        "Lens Material",
        "Lenses",
        "Lens Type",
        "RX Type",
        "Welcome",
        "Home Page",
        "Black Friday Sale",
        "Case Add-ons",
        "Mens",
        "Womens",
        "Sale",
      ]

      if (!excludedCollections.includes(title)) {
        createPage({
          path: `/collections/${handle}`,
          component: path.resolve(`./src/templates/${template}.tsx`),
          context: {
            id,
            handle,
          },
        })
      }
    }
  )
  pageable.data.allContentfulVariantCollection.edges.forEach(
    ({ node: { handle } }) => {
      const template = "variant-collection"
      createPage({
        path: `/collections/${handle}`,
        component: path.resolve(`./src/templates/${template}.tsx`),
        context: {
          handle,
        },
      })
    }
  )
  pageable.data.allContentfulProduct.edges.forEach(({ node: { handle } }) => {
    createPage({
      path: `/${handle}`,
      component: path.resolve(`./src/templates/learn-more/index.tsx`),
      context: {
        handle,
      },
    })
  })
  pageable.data.allContentfulCollection.edges.forEach(
    ({ node: { handle } }) => {
      const template = "collection-contentful"
      createPage({
        path: `/collections/${handle}`,
        component: path.resolve(`./src/templates/${template}.tsx`),
        context: {
          handle,
        },
      })
    }
  )
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /offending-module/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}
