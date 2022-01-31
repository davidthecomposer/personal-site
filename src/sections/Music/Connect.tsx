import React, { useRef, useEffect, useState } from "react"
import styled from "styled-components"
import text from "styles/text"
import colors from "styles/colors"
import media from "styles/media"
import connectBG from "assets/images/connectBG.jpg"
import connectBGM from "assets/images/connectBGM.jpg"
import ContactForm from "components/ContactForm"
import gsap from "gsap"
import SectionHeaders from "components/textElements/SectionHeaders"

const Connect: React.FC<{ mobile: boolean }> = ({ mobile }) => {
  const collaborate = useRef(null)
  const [enter, setEnter] = useState(false)

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: "#connect", start: "top 80%" },
    })

    tl.from(collaborate.current, {
      x: "+=6vw",
      y: "+=3vw",
      opacity: 0,
      duration: 1,
      ease: "power1.inOut",
      onComplete: () => setEnter(true),
    })
  }, [])

  return (
    <Wrapper id="connect">
      <SectionHeaders left text="Connect" classRoot="connect-header" />
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
        topVal={mobile ? "30vw" : "43.1vw"}
        leftValT={"55%"}
        topValT={"25vw"}
        close={true}
      />
    </Wrapper>
  )
}

const Wrapper = styled.section`
  height: 90.4vw;
  padding: 10.3vw 0;
  background-size: cover;
  position: relative;
  box-sizing: border-box;
  background-image: url(${connectBG});
  overflow: hidden;
  color: ${colors.coolWhite};

  ${media.fullWidth} {
    height: 1446.4px;
    padding: 164.8px 0;
  }
  ${media.mobile} {
    width: 100%;
    height: 260vw;
    padding: 0;
    background-image: url(${connectBGM});
  }
`

const Text = styled.p`
  ${text.desktop.bodyM};
  position: relative;
  width: 100%;

  ${media.fullWidth} {
    ${text.fullWidth.bodyM};
  }

  ${media.mobile} {
    font-size: 3.9vw;
  }
`
const Collaborate = styled.div`
  position: absolute;
  width: 37.4vw;
  height: 31.4vw;
  right: 4vw;
  top: 26.5vw;

  ${media.fullWidth} {
    width: 598.4px;
    height: 502.4px;
    right: 192px;
    top: 424px;
  }

  ${media.mobile} {
    width: 95.2vw;
    height: 76.3vw;
    left: 2.4vw;
    top: 160.4vw;
  }
`

const SubTitle = styled.h3`
  ${text.desktop.h3};
  margin-bottom: 1.9vw;

  ${media.mobile} {
    font-size: 8.7vw;
    text-align: right;
  }

  ${media.fullWidth} {
    ${text.fullWidth.h3};
    margin-bottom: 30.4px;
  }
`

export default Connect
