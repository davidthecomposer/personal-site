import React, { useContext } from "react"
import styled from "styled-components"
import Layout, { MobileContext } from "components/layout"
import Hero from "sections/Music/Hero"
import MediaMusic from "sections/Music/MediaMusic"
import { graphql } from "gatsby"

import News from "sections/News/news"
import Connect from "sections/Music/Connect"

type data = {
  data: any
}

const NewsPage: React.FC<data> = ({ data }) => {
  const mobile = useContext(MobileContext)
  const newsData = data.allContentfulAnnouncement.nodes

  return (
    <Wrapper>
      <News data={newsData} />
    </Wrapper>
  )
}

const Wrapper = styled.main`
  background: #000000;
`

export default NewsPage

export const announceQuery = graphql`
  {
    allContentfulAnnouncement {
      nodes {
        url
        order
        title
        mainImages {
          file {
            fileName
            url
          }
        }
        articleBlurb {
          articleBlurb
        }
        articleText {
          raw
        }
        contributors {
          bio {
            raw
          }
          mainImages {
            file {
              fileName
              url
            }
            title
          }
          name
          socialLinks {
            iconImage {
              file {
                fileName
                url
              }
            }
            url
          }
        }
      }
      totalCount
    }
  }
`
