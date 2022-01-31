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
}

export const Layout: React.FC<Props> = ({ children }) => {
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
    <DesktopContext.Provider value={desktop}>
      <TabletContext.Provider value={tablet}>
        <MobileContext.Provider value={mobile}>
          <AudioPlayerContext.Provider value={value}>
            <AudioPlayer activeTracks={activeTracks} />
            <SEO></SEO>
            <Main>{children}</Main>
            {location.pathname === "/music" && <Footer />}
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
