import React, { createContext, useState, useEffect } from "react"
import styled from "styled-components"
import media from "styles/media"
import text from "styles/text"
import colors from "styles/colors"
import SEO from "components/seo"
import "fonts/reset.css"
import "fonts/typography.css"
import Header from "./Header"
export const DesktopContext = createContext(false)
export const TabletContext = createContext(false)
export const MobileContext = createContext(false)

export const Layout: React.FC<{}> = ({ children }) => {
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
          <Header />
          <SEO></SEO>
          <Main>{children}</Main>
        </MobileContext.Provider>
      </TabletContext.Provider>
    </DesktopContext.Provider>
  )
}

const Main = styled.main`
  width: 100%;
`

export default Layout
