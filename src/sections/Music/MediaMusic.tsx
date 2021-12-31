import React, { useEffect, useRef, useState } from "react"
import ContactForm from "components/ContactForm"
import styled from "styled-components"
import text from "styles/text"
import colors from "styles/Colors"
import media from "styles/media"
import mediaMusicBG from "assets/images/mediaMusicBG.jpg"
import { PrimaryButtonStyle } from "styles/Buttons"
import { mediaPieces } from "data/MediaPieces"

import gsap from "gsap"
import MainButton from "components/buttons/MainButton"
import SectionHeaders from "components/textElements/SectionHeaders"

const MediaMusic: React.FC<{ mobile: boolean }> = ({ mobile }) => {
  const screen = useRef(null)
  const cta = useRef(null)
  const [enter, setEnter] = useState(false)

  useEffect(() => {
    if (screen.current) {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: screen.current, start: "top 90%" },
      })

      tl.to(
        ".media_pieces",
        {
          stagger: 0.12,
          opacity: 1,
          duration: 1,
          ease: "power4.inOut",
        },
        0
      )
    }
  }, [])

  useEffect(() => {
    if (cta.current) {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: cta.current, start: "top 80%" },
      })

      tl.from(cta.current, {
        x: "+=6vw",
        y: "+=3vw",
        opacity: 0,
        duration: 1,
        ease: "power1.inOut",
      })
    }
  }, [])

  const allTracks = mediaPieces.map((track: any, i: number) => {
    return (
      <MediaPiece key={`track-presentation-${i}`} className={`media_pieces`}>
        <ImageWrapper>
          <ControlPanel>
            <MainButton bGOpacity={"20"} backgroundColor={colors.activeTeal}>
              LISTEN
            </MainButton>
          </ControlPanel>
          <img src={mobile ? track.img[1] : track.img[0]} alt={track.title} />
          <TextWrapper>
            <TrackText>{track.story}</TrackText>
          </TextWrapper>
        </ImageWrapper>
        <Title>{track.title}</Title>
      </MediaPiece>
    )
  })

  return (
    <Wrapper id="media-music">
      <SectionHeaders left text="Music For Media" classRoot="media-header" />

      <MediaPieces ref={screen}>{allTracks}</MediaPieces>

      <BottomSection>
        <CTA ref={cta} enter={enter}>
          <Row>
            <HeadLine>Have a Media Project?</HeadLine>
            <MainButton
              onClick={() => {
                setEnter(mobile ? !enter : true)
              }}
              borderColor={colors.coolWhiteLight}
              backgroundColor={colors.activeTeal}
            >
              GET IN <br /> TOUCH
            </MainButton>
          </Row>

          <Text>
            Quality music can add so much to any media project. I have access to
            world-class virtual instruments, live musicians, and knowledge that
            can add that extra level of craft and realism to help realize your
            artistic vision. Send me a message and let's talk more about what we
            can make together!
          </Text>
        </CTA>
        <ContactForm
          enter={enter}
          leftVal={mobile ? "100%" : "63.4vw"}
          topVal={mobile ? "0" : "92.3vw"}
          setEnter={setEnter}
          leftValT={"33%"}
          topValT={"0"}
        />
      </BottomSection>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  padding: 21.4vw 0 0 0;
  background-image: url(${mediaMusicBG});
  background-size: cover;
  position: relative;
  box-sizing: border-box;

  ${media.mobile} {
    width: 100%;
    height: 360.5vw;
    padding: 0;
    background-position: 50% 50%;
  }
  ${media.tabletPortrait} {
    width: 100%;
    height: 1865px;
  }
`

const BottomSection = styled.div`
  position: relative;
  height: 1000px;
  ${media.tablet} {
  }
  ${media.mobile} {
    position: relative;
    display: flex;
    width: 100vw;
    overflow: hidden;
    height: 100vw;
    margin-top: 16.4vw;
  }
  ${media.tabletPortrait} {
    width: 90%;
    height: 875px;
    margin-top: 150px;
  }
`

const MediaPieces = styled.div`
  position: relative;
  width: 96vw;
  margin: 6.25vw auto;
  height: auto;
  display: flex;
  flex-wrap: wrap;

  ${media.tablet} {
  }
  ${media.mobile} {
    left: 100vw;
    top: 0;
    height: 100%;
    width: 100vw;
  }
  ${media.tabletPortrait} {
    left: 517px;
    width: 517px;
  }
`

const TextWrapper = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 3;
  padding: 1.25vw 0.5vw 1.25vw 9vw;
  position: absolute;
  background: #00000090;
  color: ${colors.coolWhite};
  opacity: 0;
  transition: 0.3s;
  ${media.tablet} {
  }
  ${media.mobile} {
    top: 85vw;
    width: 90.3vw;
  }
  ${media.tabletPortrait} {
    top: 440px;
    width: 467px;
  }
`
const ImageWrapper = styled.div`
  position: relative;
  width: 30.25vw;
  height: 17.75vw;
  img {
    position: absolute;
    object-fit: cover;
    width: 30.25vw;
    height: 17.75vw;
    top: 0;
    right: 0;
    filter: grayscale(0%);
    transition: 0.4s;
  }

  ${media.mobile} {
    width: 90.3vw;
    height: 54.3vw;
    left: 4.8vw;
    top: 25.6vw;
  }
  ${media.tabletPortrait} {
    width: 467px;
    height: 281px;
    left: 25px;
    top: 132px;
  }
`

const MediaPiece = styled.div`
  position: relative;
  width: 30.25vw;
  height: 20.94vw;
  cursor: pointer;
  border-radius: 0.38vw;
  overflow: hidden;
  opacity: 0;
  transition: 0.3s;

  margin-bottom: 1.88vw;
  margin-right: 1.25vw;
  padding: 0;

  background: linear-gradient(
    94.3deg,
    #000000 0.09%,
    rgba(7, 10, 1, 0.5) 0.1%,
    rgba(16, 17, 16, 0.38) 99.67%
  );
  ${media.hover} {
    :hover {
      ${TextWrapper} {
        opacity: 1;
        transition: 0.3s;
      }

      ${ImageWrapper} {
        img {
          filter: grayscale(80%);
        }
      }
    }
  }

  ${media.tablet} {
  }
  ${media.mobile} {
    width: 97vw;
    height: 120.8vw;
  }
  ${media.tabletPortrait} {
    width: 502px;
    height: 625px;
  }
`

const ControlPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: absolute;
  top: 0;
  left: 0.35vw;
  width: 7.5vw;
  height: 100%;
  z-index: 10;
`

const Text = styled.div`
  ${text.desktop.bodyS};
  width: 17vw;
  color: ${colors.coolWhite};
  ${media.mobile} {
    font-size: 4.3vw;
  }
  ${media.tabletPortrait} {
    font-size: 22px;
  }
`

const TrackText = styled.p`
  ${text.desktop.bodyXS};
  font-size: 1vw;
  opacity: 1;
  position: relative;

  ${media.mobile} {
    font-size: 3.9vw;
    width: 90.3vw;
    left: 4.8vw;
  }
  ${media.tabletPortrait} {
    font-size: 20px;
    width: 467px;
    left: 25px;
  }
`

const Title = styled.h3`
  ${text.desktop.h5};
  position: relative;
  width: 100%;
  text-align: right;
  color: ${colors.coolWhite};
  margin-top: 0.63vw;
  padding-right: 0.63vw;
  ${media.mobile} {
  }
  ${media.tabletPortrait} {
  }
`

const CTA = styled.div<{ enter: boolean }>`
  position: absolute;
  width: 36vw;
  height: 19.8vw;
  left: 6.3vw;
  top: 2vw;
  z-index: 3;

  ${Text} {
    width: 36vw;
  }

  ${media.mobile} {
    top: 0;
    width: 91.8vw;
    left: ${props => (props.enter ? "-100vw" : "4.1vw")};
    transition: 0.5s;
    height: 100vw;
  }

  ${media.tabletPortrait} {
    width: 475px;
    left: ${props => (props.enter ? "-517px" : "21px")};

    height: 517px;
  }
`

const HeadLine = styled.h3`
  ${text.desktop.h3};
  width: 26vw;

  margin-bottom: 1.7vw;
  color: ${colors.coolWhite};
  ${media.tablet} {
  }
  ${media.mobile} {
    font-size: 8.7vw;
  }
  ${media.tabletPortrait} {
    font-size: 36px;
  }
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  ${media.tablet} {
  }
  ${media.mobile} {
  }
  ${media.fullWidth} {
  }
`

export default MediaMusic
