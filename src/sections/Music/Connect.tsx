import React, { useRef, useEffect, useState } from "react"
import styled from "styled-components"
import { Heading1, Body1, SubHeader } from "styles/text"
import colors from "styles/Colors"
import media from "styles/media"
import connectBG from "assets/images/connectBG.jpg"
import connectBGM from "assets/images/connectBGM.jpg"
import ContactForm from "components/ContactForm"
import gsap from "gsap"

const Connect: React.FC<{ mobile: boolean }> = ({ mobile }) => {
  const header = useRef(null)
  const headerLine = useRef(null)
  const collaborate = useRef(null)
  const [enter, setEnter] = useState(false)

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: collaborate.current, start: "top 80%" },
    })

    tl.from(collaborate.current, {
      x: "+=6vw",
      y: "+=3vw",
      opacity: 0,
      duration: 1,
      ease: "power1.inOut",
    })
  }, [])

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: headerLine.current,
      onComplete: () => setEnter(true),
    })

    tl.to(headerLine.current, {
      scale: 1,
      duration: 1,
      ease: "power1.inOut",
    })
      .to(header.current, { y: 0, duration: 0.6 }, 1)
      .to(header.current, { x: 0, duration: 0.6 }, 1.6)
  }, [mobile])

  return (
    <Wrapper id="connect">
      <HeaderWrapper>
        <Header ref={header}>Connect</Header>
        <HeaderLine ref={headerLine} />
      </HeaderWrapper>
      <Collaborate ref={collaborate}>
        <SubTitle>Let’s Connect</SubTitle>
        <Text>
          I'm always on the lookout for interesting and creative projects and
          people. If you have a film, opera, classical, theatre or just about
          any other project that needs artistically crafted music let's talk
          about the possibilities of working together. Just send me a quick
          message using the form above. I can't wait to hear about what you are
          working on.
        </Text>
      </Collaborate>
      <ContactForm
        setEnter={setEnter}
        enter={enter}
        leftVal={mobile ? "100%" : "12.8vw"}
        topVal={mobile ? "60vw" : "43.1vw"}
        leftValT={"40%"}
        topValT={"248px"}
        close={true}
      />
    </Wrapper>
  )
}

const Wrapper = styled.section`
  height: 90.4vw;
  padding: 10.3vw 6.3vw;
  background-size: cover;
  position: relative;
  box-sizing: border-box;
  background-image: url(${connectBG});
  overflow: hidden;

  ${media.mobile} {
    width: 100%;
    height: 310.6vw;
    padding: 0;
    background-image: url(${connectBGM});
  }

  ${media.tabletPortrait} {
    width: 100%;
    height: 1607px;
  }
`

const Text = styled.p`
  ${Body1};
  position: relative;
  width: 100%;

  ${media.mobile} {
    font-size: 3.9vw;
  }
  ${media.tabletPortrait} {
    font-size: 20px;
  }
`

const Header = styled.h2`
  ${Heading1};
  color: ${colors.brightPurple};
  transform: translate(5.6vw, 100%);
  position: absolute;
  width: fit-content;
  ${media.mobile} {
    transform: translate(8.5vw, 110%);
    font-size: 13.3vw;
  }
  ${media.tabletPortrait} {
    transform: translate(44px, 110%);
    font-size: 69px;
  }
`

const HeaderLine = styled.div`
  width: 82.4vw;
  height: 0.3vw;
  margin-left: 5.6vw;
  background: ${colors.brightPurple};
  position: absolute;
  bottom: 0;
  transform: scaleX(0);
  transform-origin: 100%;
  border-radius: 0.3vw;

  ${media.mobile} {
    height: 1vw;
    border-radius: 1vw;
    width: 82vw;
    margin-left: 5vw;
  }
  ${media.tabletPortrait} {
    height: 5px;
    border-radius: 5px;
    width: calc(100% - 26px);
    margin-left: 26px;
  }
`

const HeaderWrapper = styled.div`
  position: relative;
  width: 90vw;
  height: 5vw;
  margin-left: 0;
  overflow: hidden;

  ${media.mobile} {
    height: 14.9vw;
  }
  ${media.tabletPortrait} {
    margin-left: 3vw;
    height: 75px;
  }
`
const Collaborate = styled.div`
  position: absolute;
  width: 37.4vw;
  height: 31.4vw;
  left: 55.4vw;
  top: 26.5vw;

  ${media.mobile} {
    width: 95.2vw;
    height: 76.3vw;
    left: 2.4vw;
    top: 208.4vw;
  }
  ${media.tabletPortrait} {
    width: 492px;
    height: 395px;
    left: 30px;
    top: 900px;
  }
`

const SubTitle = styled.h3`
  ${SubHeader};
  margin-bottom: 1.9vw;

  ${media.mobile} {
    font-size: 8.7vw;
    text-align: right;
  }
  ${media.tabletPortrait} {
    font-size: 45px;
  }
`

export default Connect
