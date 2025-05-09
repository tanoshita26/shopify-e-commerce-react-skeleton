/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

interface Props {
  description?: string
  lang?: string
  meta?: any
  title: string
  isIndex?: boolean
  image?: ImageMeta
  jsonLdPayload?: string | null
  shouldIndex?: boolean
}

interface ImageMeta {
  url: string
  alt: string
}

const SEO = ({
  description = "",
  lang = "en",
  meta = [],
  title,
  isIndex = false,
  image,
  jsonLdPayload,
  shouldIndex = true,
}: Props) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const siteTitle = site.siteMetadata.title
  const defaultImage = image ?? {
    url: "https://cdn.shopify.com/s/files/1/0140/0012/8057/files/TN_OpenGraph_Image.jpg?v=1698699695",
    alt: "Tres Noir Handmade Eyewear",
  }

  const titleTemplate = () => {
    if (isIndex) {
      return `${siteTitle} | %s`
    } else {
      return `%s | ${siteTitle}`
    }
  }

  const robotsContent = () => {
    if (!shouldIndex) {
      return "noindex, nofollow"
    }
    if (
      process.env.GATSBY_ENVIRONMENT === "STAGING" ||
      process.env.GATSBY_ENVIRONMENT === "staging"
    ) {
      return "noindex, nofollow"
    }
    return ""
  }

  const formattedTitle = isIndex ? `${siteTitle} | ${title}` : title

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={titleTemplate()}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: formattedTitle,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: "og:image:url",
          content: defaultImage.url,
        },
        {
          property: "og:image:alt",
          content: defaultImage.alt,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: "og:site_name",
          content: siteTitle,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:image`,
          content: defaultImage.url,
        },
        {
          name: `twitter:image:alt`,
          content: defaultImage.alt,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata?.author || ``,
        },
        {
          name: `twitter:title`,
          content: formattedTitle,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `robots`,
          content: robotsContent(),
        },
      ].concat(meta)}
    >
      {jsonLdPayload && (
        <script type="application/ld+json">{jsonLdPayload}</script>
      )}
    </Helmet>
  )
}

export default SEO
