import React, { useContext, useState, createContext, useEffect } from "react"
import styled from "styled-components"
import { MobileContext } from "components/ContextStore"
import Layout from "components/Layout"
import Hero from "sections/Music/Hero"
import MediaMusic from "sections/Music/MediaMusic"
import { graphql } from "gatsby"
import ConcertMusic from "sections/Music/ConcertMusic"
import About from "sections/Music/About"
import News from "sections/Music/News"
import Connect from "sections/Music/Connect"
import Header from "components/Header"
export const IntroAnimationContext = createContext<boolean>(true)
type data = {
  data: any
}

const MusicPage: React.FC<data> = ({ data }) => {
  const mobile = useContext(MobileContext)
  const newsData = data.allContentfulAnnouncement.nodes
  const concertData = data.allContentfulConcertPiece.nodes
  const uniqueConcert = data.allContentfulEnsemble.distinct
  const mediaData = data.allContentfulMediaPiece.nodes
  const [intro, setIntro] = useState<boolean>(true)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const newsDataCurated = newsData.map((news: any) => {
    console.log(news)
    return {
      title: news.title,
      image: news.mainImages,
      slug: news.url,
      buttonText: news.buttonText,
      news: news.news,
      audio: "",
      video: "",
    }
  })

  console.log(mediaData, "media")

  return (
    <Layout>
      <IntroAnimationContext.Provider value={intro}>
        <Header setIntro={setIntro} />
        <Hero data={newsDataCurated} mobile={mobile} />
        <MediaMusic data={mediaData} mobile={mobile} />
        <ConcertMusic tags={uniqueConcert} data={concertData} mobile={mobile} />
        <News data={newsData} />
        <About mobile={mobile} />
        <Connect mobile={mobile} />
      </IntroAnimationContext.Provider>
    </Layout>
  )
}

export default MusicPage

export const announceQuery = graphql`
  {
    allContentfulAnnouncement {
      nodes {
        url
        order
        title
        news
        buttonText
        mainImages {
          ...ContentfulImageQuery
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
      distinct(field: { ensembleName: SELECT })
    }
    allContentfulConcertPiece(sort: { ensemble: { ensembleName: ASC } }) {
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
        audio {
          file {
            fileName
            url
            contentType
          }
        }
      }
    }
    allContentfulMovement {
      nodes {
        parent {
          id
        }
        audio {
          file {
            fileName
            url
            contentType
          }
        }
        key
        mvtNumber
        title
      }
    }
    allContentfulMediaPiece {
      nodes {
        storyBlurb {
          storyBlurb
        }
        musicBlurb {
          musicBlurb
        }
        audio {
          file {
            url
            contentType
          }
        }
        video {
          file {
            url
            contentType
          }
        }
        key
        tags
        title
        images {
          ...ContentfulImageQuery
        }
        posterImage: images {
          file {
            fileName
            url
          }
          title
        }
      }
    }
  }
`
