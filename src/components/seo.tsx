import React, { useContext } from "react"
// import PropTypes from "prop-types";
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

const SEO: React.FC<SEOProps> = ({
  description,
  lang,
  meta,
  title,
  image,
  url,
}) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            image
            siteUrl
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const currentTitle = title || site.siteMetadata?.title
  const currentImage = image || site.siteMetadata?.image
  const currentURL = url || site.siteMetadata?.siteUrl

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={currentTitle}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: currentTitle,
        },
        {
          property: "og:image",
          content: currentImage,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:url`,
          content: currentURL,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:image`,
          content: currentImage,
        },
        {
          name: `twitter:creator`,
          content: ``,
        },
        {
          name: `twitter:title`,
          content: currentTitle,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1, maximum-scale=1, minimal-ui",
        },
      ]}
    />
  )
}

type PropertyMetaObj = {
  property: string
  content: string
}

type NameMetaObj = {
  name: string
  content: string
}
type Meta = ConcatArray<PropertyMetaObj | NameMetaObj>
interface SEOProps {
  description?: string
  lang?: string
  meta?: Meta
  title?: string
  image?: string
  url?: string
}

export default SEO
