import React from "react"
import styled from "styled-components"
import text from "assets/styles/text"
import colors from "assets/styles/colors"
import media from "assets/styles/media"

const MusicPage: React.FC = () => {
  return <Wrapper>Coming Soon</Wrapper>
}

const Wrapper = styled.main`
  background: #000000;
  ${text.desktop.h1};
  font-size: 10vw;
  color: ${colors.dullerTeal};
  display: flex;
  text-align: center;
  min-height: 100vh;
  padding-top: 0vw;
  line-height: 100vh;
  ${media.mobile} {
  }
`

export default MusicPage
