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
import { graphql } from "gatsby"
import "fonts/reset.css"
import "fonts/typography.css"
import Header from "./Header"
import Footer from "./Footer"
import AudioPlayer from "./AudioPlayer"
export const DesktopContext = createContext(false)
export const TabletContext = createContext(false)
export const MobileContext = createContext(false)
export const AudioPlayerContext = createContext<{
  activeTrack: number[]
  setActiveTracks: React.Dispatch<React.SetStateAction<number[]>> | null
}>({ activeTrack: [-1], setActiveTracks: null })
import { Dispatch, SetStateAction } from "react"

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
  const [activeTracks, setActiveTracks] = useState<string[]>(["-1"])
  const combinedTracks = useRef([
    ...data.allContentfulConcertPiece.nodes,
    ...data.allContentfulMovement.nodes,
    ...data.allContentfulMediaPiece.nodes,
  ])
  const [parsedTracks, setParsedTracks] = useState<any[] | undefined>(undefined)
  const value = useMemo(
    () => ({
      activeTracks,
      setActiveTracks,
    }),
    [activeTracks]
  )

  const parseTracks = (trackArray: any[]) => {
    console.log(trackArray, "tracks")
  }

  useEffect(() => {
    const tracks = combinedTracks.current.filter(track => {
      return track.audio !== null
    })
    console.log(tracks, "parsed")
    setParsedTracks(tracks)
  }, [])
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
    <DesktopContext.Provider value={desktop}>
      <TabletContext.Provider value={tablet}>
        <MobileContext.Provider value={mobile}>
          <AudioPlayerContext.Provider value={value}>
            <Header />
            <AudioPlayer allTracks={parsedTracks} activeTracks={activeTracks} />
            <SEO></SEO>
            <Main>{children}</Main>
            <Footer />
          </AudioPlayerContext.Provider>
        </MobileContext.Provider>
      </TabletContext.Provider>
    </DesktopContext.Provider>
  )
}

const Main = styled.main`
  width: 100%;
`

export default Layout
