import { shopifyApiProject, ApiType } from "@shopify/api-codegen-preset"
import dotenv from "dotenv"

dotenv.config()

const API_VERSION = process.env.GATSBY_SHOPIFY_API_VERSION ?? "2025-01"

export default {
  // For syntax highlighting / auto-complete when writing operations
  schema: `https://shopify.dev/storefront-graphql-direct-proxy/${API_VERSION}`,
  documents: [
    "./src/contexts/storefront-cart/handlers/fragments/cart.ts",
    "./src/contexts/storefront-cart/handlers/mutations/*.ts",
    "./src/contexts/storefront-cart/handlers/queries/*.ts",
  ],
  projects: {
    // To produce variable / return types for Admin API operations
    default: shopifyApiProject({
      apiType: ApiType.Storefront,
      apiVersion: API_VERSION,
      documents: [
        "./src/contexts/storefront-cart/handlers/fragments/cart.ts",
        "./src/contexts/storefront-cart/handlers/mutations/*.ts",
        "./src/contexts/storefront-cart/handlers/queries/*.ts",
      ],
      outputDir: "./src/contexts/storefront-cart/types",
    }),
  },
}
