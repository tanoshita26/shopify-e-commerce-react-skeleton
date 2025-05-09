require("dotenv").config({
  path: `.env`,
})

const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken:
    process.env.CONTENTFUL_ACCESS_TOKEN ||
    process.env.CONTENTFUL_DELIVERY_TOKEN,
}

const siteUrl = `https://www.tresnoir.com`

/**
 * The currently active environment.
 * This is used to set the corresponding Tag Manager environment config.
 */
const activeEnv =
  process.env.GATSBY_ENVIRONMENT || process.env.NODE_ENV || "development"
console.log(`Using environment config: '${activeEnv}'`)

// The Tag Manager Container ID.
const gtmContainerId = process.env.GATSBY_GTM_CONTAINER_ID

/**
 * Tag Manager Environment values to configure gatsby-plugin-google-tagmanager.
 * null values will cause the default (live/production) snippet to load.
 */
const gtmEnv = {
  // If tag manager plugin is configured with includeInDevelopment set to
  // true then you should create a corresponding Development environment in
  // Tag Manager and replace the null values with the container environment
  // auth and preview values. Otherwise the production snippet will load.
  development: {
    gtmAuth: process.env.GATSBY_GTM_STAGING_AUTH,
    gtmPreview: process.env.GATSBY_GTM_STAGING_PREVIEW,
  },

  staging: {
    gtmAuth: process.env.GATSBY_GTM_STAGING_AUTH,
    gtmPreview: process.env.GATSBY_GTM_STAGING_PREVIEW,
  },

  // According to GTM docs you should use standard tag for prod so we'll set to null.
  production: {
    gtmAuth: process.env.GATSBY_GTM_LIVE_AUTH,
    gtmPreview: process.env.GATSBY_GTM_LIVE_PREVIEW,
  },
}

module.exports = {
  siteMetadata: {
    title: `Tres Noir`,
    description: `Tres Noir is an independent eyewear company located in Santa Ana, Calif.`,
    author: `@SuavecitoInc`,
    siteUrl: siteUrl,
  },
  plugins: [
    {
      resolve: "@sentry/gatsby",
      options: {
        dsn: process.env.SENTRY_DSN, // this is the default
        deleteSourcemapsAfterUpload: true,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: gtmContainerId,

        // Include GTM in development.
        //
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: true,

        // datalayer to be set before GTM is loaded
        // should be an object or a function that is executed in the browser
        //
        // Defaults to null
        defaultDataLayer: { platform: "gatsby" },

        // Specify optional GTM environment details.
        gtmAuth: gtmEnv[activeEnv].gtmAuth,
        gtmPreview: gtmEnv[activeEnv].gtmPreview,
        // dataLayerName: "YOUR_DATA_LAYER_NAME",

        // Name of the event that is triggered
        // on every Gatsby route change.
        //
        // Defaults to gatsby-route-change
        routeChangeEventName: "gatsby-route-change",
        // Defaults to false
        enableWebVitalsTracking: true,
        // Defaults to https://www.googletagmanager.com
        // selfHostedOrigin: "YOUR_SELF_HOSTED_ORIGIN",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`webp`, `auto`],
          quality: 40,
          placeholder: `dominantColor`,
        },
      },
    },
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#FFFFFF`,
        theme_color: `#FFFFFF`,
        display: `minimal-ui`,
        icon: `src/images/tres-noir-favicon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-netlify`,
    `gatsby-plugin-gatsby-cloud`,
    {
      resolve: `gatsby-source-shopify`,
      options: {
        storeUrl: process.env.GATSBY_STORE_MY_SHOPIFY,
        password: process.env.GATSBY_STORE_TOKEN,
        shopifyConnections: ["collections"],
        downloadImages: true,
        salesChannel: "Tres Noir Gatsby v4",
        prioritize: true,
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: contentfulConfig,
    },
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        queries: require("./src/utils/algolia-queries"),
      },
    },
    {
      resolve: `gatsby-source-yotpo`,
      options: {
        appKey: process.env.GATSBY_YOTPO_APP_KEY,
        appSecret: process.env.YOTPO_SECRET,
      },
    },
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        query: `
      {
        allSitePage {
          nodes {
            path
          }
        }
        allShopifyProduct {
          edges {
            node {
              handle
              updatedAt
            }
          }
        }
        allShopifyCollection {
          edges {
            node {
              handle
              updatedAt
            }
          }
        }
      }
    `,
        resolveSiteUrl: ({ site }) => siteUrl,
        resolvePages: ({
          allSitePage: { nodes: allPages },
          allShopifyProduct: { edges: allShopifyProducts },
          allShopifyCollection: { edges: allShopifyCollections },
        }) => {
          const normalizePath = path => path.replace(/\/+$/, "")

          const shopifyProductMap = allShopifyProducts.reduce(
            (acc, { node }) => {
              const path = normalizePath(`/products/${node.handle}`)
              acc[path] = { updatedAt: node.updatedAt }
              return acc
            },
            {}
          )

          const shopifyCollectionMap = allShopifyCollections.reduce(
            (acc, { node }) => {
              const path = normalizePath(`/collections/${node.handle}`)
              acc[path] = { updatedAt: node.updatedAt }
              return acc
            },
            {}
          )

          const pages = allPages
            .map(page => {
              const path = normalizePath(page.path)
              const productData = shopifyProductMap[path] || {}
              const collectionData = shopifyCollectionMap[path] || {}
              const pageData = {
                ...page,
                ...productData,
                ...collectionData,
              }

              return pageData
            })
            .filter(page => !page.path.includes("/customize"))

          return pages
        },
        serialize: ({ path, updatedAt }) => {
          return {
            url: path,
            lastmod: updatedAt,
          }
        },
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
