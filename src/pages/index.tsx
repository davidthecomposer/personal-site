import React, { useEffect } from "react"

import styled from "styled-components"
import colors from "assets/styles/colors"
import { navigate } from "gatsby"

const IndexPage: React.FC = () => {
  useEffect(() => {
    navigate("/music")
  }, [])

  return <Wrapper></Wrapper>
}

const Wrapper = styled.main`
  background: #000000;
  color: ${colors.coolPurple};
`

export default IndexPage
