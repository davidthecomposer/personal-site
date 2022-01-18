import React, {
  createContext,
  useState,
  useEffect,
  useRef,
  useMemo,
} from "react"
import styled from "styled-components"
import media from "styles/media"
import text from "styles/text"
import colors from "styles/colors"
import SEO from "components/seo"
import { graphql, StaticQuery } from "gatsby"
import "fonts/reset.css"
import "fonts/typography.css"
import Header from "./Header"
import Footer from "./Footer"
import AudioPlayer from "./AudioPlayer"
export const DesktopContext = createContext(false)
export const TabletContext = createContext(false)
export const MobileContext = createContext(false)
export const IntroAnimationContext = createContext<boolean>(true)
export const AudioPlayerContext = createContext<{
  activeTracks: HTMLAudioElement | null
  setActiveTracks: React.Dispatch<ActiveTrack> | null
}>({ activeTracks: null, setActiveTracks: () => {} })

type ActiveTrack = {
  audioRef: React.SetStateAction<HTMLAudioElement | null>
  title: string
  year: string
}

type Props = {
  children: any
  data: any
}

export const Layout: React.FC<Props> = ({ children, data }) => {
  const [desktop, setDesktop] = useState(window.innerWidth > 1024)
  const [tablet, setTablet] = useState(
    window.innerWidth >= 767 && window.innerWidth <= 1024
  )
  const [mobile, setMobile] = useState(
    window.innerWidth < 767 ||
      (window.innerWidth >= 767 &&
        window.innerWidth <= 1200 &&
        window.innerHeight > window.innerWidth)
  )
  const [activeTracks, setActiveTracks] = useState<ActiveTrack | null>({
    audioRef: null,
    title: "none",
    year: "2022",
  })
  const [intro, setIntro] = useState<boolean>(true)

  const value = useMemo(
    () => ({
      activeTracks,
      setActiveTracks,
    }),
    [activeTracks]
  )

  useEffect(() => {
    console.log(activeTracks, "in layout")
  }, [activeTracks])

  useEffect(() => {
    window.addEventListener("resize", () => {
      setDesktop(window.innerWidth > 1024)
      setTablet(window.innerWidth >= 767 && window.innerWidth <= 1024)
      setMobile(window.innerWidth < 767)
    })
    return () => {
      window.removeEventListener("resize", () => {})
    }
  }, [])

  return (
    <StaticQuery
      query={graphql`
        query AudioQuery {
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
              key
              tags
              title
              images {
                file {
                  url
                }
              }
            }
          }
        }
      `}
      render={data => (
        <DesktopContext.Provider value={desktop}>
          <TabletContext.Provider value={tablet}>
            <MobileContext.Provider value={mobile}>
              <AudioPlayerContext.Provider value={value}>
                <IntroAnimationContext.Provider value={intro}>
                  <Header setIntro={setIntro} />
                  <AudioPlayer data={data} activeTracks={activeTracks} />
                  <SEO></SEO>
                  <Main>{children}</Main>
                  <Footer />
                </IntroAnimationContext.Provider>
              </AudioPlayerContext.Provider>
            </MobileContext.Provider>
          </TabletContext.Provider>
        </DesktopContext.Provider>
      )}
    />
  )
}

const Main = styled.main`
  width: 100%;
`

export default Layout
