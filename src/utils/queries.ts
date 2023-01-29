import { graphql } from "gatsby"

export const localImageQuery = graphql`
  fragment LocalImageQuery on File {
    id
    childImageSharp {
      gatsbyImageData(formats: WEBP, placeholder: BLURRED)
    }
  }
`

export const contentfulImageQuery = graphql`
  fragment ContentfulImageQuery on ContentfulAsset {
    id
    gatsbyImageData(formats: WEBP, placeholder: BLURRED)
    description
  }
`
