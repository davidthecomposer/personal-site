import React, { useContext, useEffect } from "react"
import styled from "styled-components"
import SEO from "components/seo"
import "fonts/reset.css"
import "fonts/typography.css"
import Footer from "./Footer"
import AudioPlayer from "./AudioPlayer"
import { AudioPlayerContext } from "./ContextStore"
type Props = {
  children: any
}

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <Wrapper>
      <SEO></SEO>
      {children}
      <Footer />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
`

export default Layout
