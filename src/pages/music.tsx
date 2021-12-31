import React, { useContext } from "react"
import styled from "styled-components"
import { MobileContext } from "components/layout"
import Hero from "sections/Music/Hero"
import MediaMusic from "sections/Music/MediaMusic"
import { graphql } from "gatsby"
import ConcertMusic from "sections/Music/ConcertMusic"
import About from "sections/Music/About"
import News from "sections/Music/News"
import Connect from "sections/Music/Connect"

type data = {
  data: any
}

const MusicPage: React.FC<data> = ({ data }) => {
  const mobile = useContext(MobileContext)
  const newsData = data.allContentfulAnnouncement.nodes
  const concertData = data.allContentfulConcertPiece.nodes
  const uniqueConcert = data.allContentfulEnsemble.distinct
  return (
    <Wrapper>
      <Hero mobile={mobile} />
      <MediaMusic mobile={mobile} />
      <ConcertMusic tags={uniqueConcert} data={concertData} mobile={mobile} />
      <News data={newsData} />
      <About mobile={mobile} />
      <Connect mobile={mobile} />
    </Wrapper>
  )
}

const Wrapper = styled.main`
  background: #000000;
`

export default MusicPage

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
    allContentfulEnsemble {
      distinct(field: ensembleName)
    }
    allContentfulConcertPiece(sort: { fields: ensemble___ensembleName }) {
      nodes {
        instrumentation
        id
        duration
        key
        title
        year
        movements {
          mvtNumber
        }
        ensemble {
          backgroundColor
          button
          ensembleName
        }
      }
    }
  }
`
