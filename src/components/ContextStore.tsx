import React, {
  useState,
  useEffect,
  createContext,
  useMemo,
  ReactNode,
} from "react"
import { mobile, desktop, tablet } from "assets/styles/media"
import AudioPlayer from "./AudioPlayer"
export const DesktopContext = createContext(false)
export const TabletContext = createContext(false)
export const MobileContext = createContext(false)
import "fonts/reset.css"
import "fonts/typography.css"
import { ActiveTrack } from "types/types"

export const AudioPlayerContext = createContext<{
  activeTracks: ActiveTrack
  setActiveTracks: React.Dispatch<ActiveTrack>
}>({
  activeTracks: { audioRef: null, title: "none", year: "2022" },
  setActiveTracks: () => {},
})

type Props = {
  children: ReactNode
}

const ContextStore: React.FC<Props> = ({ children }) => {
  const [mobileBool, setMobile] = useState(false)
  const [desktopBool, setDesktop] = useState(false)
  const [tabletBool, setTablet] = useState(false)

  const [activeTracks, setActiveTracks] = useState<ActiveTrack>({
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
    window.addEventListener("resize", () => {
      setDesktop(window.innerWidth > 1024)
      setTablet(window.innerWidth >= 767 && window.innerWidth <= 1024)
      setMobile(window.innerWidth < 767)
    })
    return () => {
      window.removeEventListener("resize", () => {})
    }
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      setMobile(window.innerWidth <= mobile)
      setTablet(window.innerWidth > mobile && window.innerWidth <= tablet)
      setDesktop(window.innerWidth > tablet && window.innerWidth <= desktop)

      window.addEventListener("resize", () => {
        setMobile(window.innerWidth <= mobile)
        setTablet(window.innerWidth > mobile && window.innerWidth <= tablet)
        setDesktop(window.innerWidth > tablet && window.innerWidth <= desktop)
      })
    }

    return () => {
      window.removeEventListener("resize", () => false)
    }
  }, [])

  return (
    <DesktopContext.Provider value={desktopBool}>
      <TabletContext.Provider value={tabletBool}>
        <MobileContext.Provider value={mobileBool}>
          <AudioPlayerContext.Provider value={value}>
            <>
              <AudioPlayer activeTracks={activeTracks} />
            </>
            {children}
          </AudioPlayerContext.Provider>
        </MobileContext.Provider>
      </TabletContext.Provider>
    </DesktopContext.Provider>
  )
}

export default ContextStore
