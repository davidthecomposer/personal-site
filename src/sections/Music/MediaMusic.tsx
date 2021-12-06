import React, { useEffect, useRef, useState } from "react"
import ContactForm from "components/ContactForm"
import styled from "styled-components"
import { Heading1, Body1, SubHeader, SubHeader2 } from "styles/text"
import colors from "styles/Colors"
import media from "styles/media"
import mediaMusicBG from "assets/images/mediaMusicBG.jpg"
import { PrimaryButtonStyle } from "styles/Buttons"
import { mediaPieces } from "data/MediaPieces"

import gsap from "gsap"
import AudioPlayer from "components/AudioPlayer"
import { ReactComponent as ButtonArrowSVG } from "assets/svg/buttonArrow.svg"

const MediaMusic: React.FC<{ mobile: boolean }> = ({ mobile }) => {
  const header = useRef(null)
  const headerLine = useRef(null)
  const screen = useRef(null)
  const cta = useRef(null)
  const [playListEnter, setPlayListEnter] = useState(false)
  const [enter, setEnter] = useState(false)
  const [mobileInfo, setMobileInfo] = useState(false)
  const [activeScreen, setActiveScreen] = useState(0)
  const [trackState, setTrackState] = useState(0)

  useEffect(() => {
    if (headerLine.current) {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: headerLine.current, start: "top 90%" },
      })

      tl.to(headerLine.current, {
        scale: 1,
        duration: 1,
        ease: "power1.inOut",
      })
        .to(header.current, { y: 0, duration: 0.6 }, 1)
        .to(header.current, { x: 0, duration: 0.6 }, 1.6)
    }
  }, [])

  useEffect(() => {
    if (screen.current) {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: screen.current, start: "top 90%" },
        onStart: () => {
          setPlayListEnter(true)
        },
      })

      tl.from(
        screen.current,
        {
          x: "+=3vw",
          y: "+=3vw",
          opacity: 0,
          duration: 1,
          ease: "power1.inOut",
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

  useEffect(() => {
    setTrackState(0)
  }, [activeScreen])

  const allTracks = mediaPieces.map((track: any, i: number) => {
    return (
      <ScreenWrapper
        key={`track-presentation-${i}`}
        activeScreen={activeScreen === i}
      >
        <ControlPanel>
          <Story trackState={trackState === 0} onClick={() => setTrackState(0)}>
            Story
          </Story>
          <Music trackState={trackState === 1} onClick={() => setTrackState(1)}>
            Music
          </Music>
          {/* <Details>Details</Details> */}
        </ControlPanel>
        <TextWrapper>
          <TrackText visibleText={activeScreen === i && trackState === 0}>
            {track.story}
          </TrackText>
          <TrackText visibleText={activeScreen === i && trackState === 1}>
            {track.music}
          </TrackText>
        </TextWrapper>
        <ImageWrapper>
          <img src={mobile ? track.img[1] : track.img[0]} alt={track.title} />
        </ImageWrapper>
        <Title>{track.title}</Title>
      </ScreenWrapper>
    )
  })

  return (
    <Wrapper id="media-music">
      <HeaderWrapper>
        <Header ref={header}>Music for Media</Header>
        <HeaderLine ref={headerLine} />
      </HeaderWrapper>

      <MobileWrapper>
        <MobileInner mobileInfo={mobileInfo}>
          <AudioPlayer
            introAni={playListEnter}
            setActiveScreen={setActiveScreen}
            setMobileInfo={setMobileInfo}
            mobileInfo={mobileInfo}
            mediaPieces={mediaPieces}
          />
          {mobile && (
            <Info
              mobileInfo={mobileInfo}
              onClick={() => setMobileInfo(!mobileInfo)}
            >
              Tracks
            </Info>
          )}
          <Screen ref={screen}>{allTracks}</Screen>
        </MobileInner>
      </MobileWrapper>
      <MobileWrapper1>
        <CTA ref={cta} enter={enter}>
          <HeadLine>Have a Media Project?</HeadLine>
          <Text>
            Quality music can add so much to any media project. I have access to
            world-class virtual instruments, live musicians, and knowledge that
            can add that extra level of craft and realism to help realize your
            artistic vision. Send me a message and let's talk more about what we
            can make together!
          </Text>
          <GetInTouch
            onClick={() => {
              setEnter(mobile ? !enter : true)
            }}
          >
            Get in Touch <Arrow />
          </GetInTouch>
        </CTA>
        <ContactForm
          enter={enter}
          leftVal={mobile ? "100%" : "63.4vw"}
          topVal={mobile ? "0" : "92.3vw"}
          setEnter={setEnter}
          leftValT={"33%"}
          topValT={"0"}
        />
      </MobileWrapper1>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  height: 125vw;
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

const Info = styled.button<{ mobileInfo: boolean }>`
  ${PrimaryButtonStyle};
  width: 29vw;
  height: 9.7vw;
  border-radius: 2.4vw;
  border-color: white;
  position: absolute;
  z-index: 100;
  left: 105vw;
  top: 12vw;
  opacity: ${props => (props.mobileInfo ? 1 : 0)};
  transition: opacity 0.3s 0.4s;
  ${media.mobile} {
    border-radius: 1.2vw;
  }
  ${media.tabletPortrait} {
    font-size: 22px;
    width: 150px;
    height: 50px;
    border-radius: 8px;
    left: 544px;
    top: 70px;
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

  margin-left: 5.6vw;
  overflow: hidden;

  ${media.mobile} {
    height: 29.7vw;
  }
  ${media.tabletPortrait} {
    margin-left: 15px;
    height: 75px;
  }
`

const MobileWrapper = styled.div`
  ${media.mobile} {
    position: relative;
    display: flex;
    width: 100vw;
    overflow: hidden;
    height: 145vw;
    margin-top: 13vw;
  }
  ${media.tabletPortrait} {
    width: 517px;
    height: 750px;
    margin-top: 67px;
    left: 180px;
  }
`

const MobileWrapper1 = styled.div`
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

const MobileInner = styled.div<{ mobileInfo: boolean }>`
  ${media.mobile} {
    width: fit-content;
    transform: translateX(${props => (props.mobileInfo ? "-100vw" : "0")});
    transition: 0.5s;
  }
  ${media.tabletPortrait} {
    width: fit-content;
    transform: translateX(${props => (props.mobileInfo ? "-517px" : "0")});
    transition: 0.5s;
  }
`

const Screen = styled.div`
  position: absolute;
  width: 60vw;
  height: 31vw;
  left: 34vw;
  top: 41vw;
  padding: 1.5vw;

  background: radial-gradient(
    50% 50% at 50% 50%,
    #151515 0%,
    #131313 28.12%,
    #0f0e10 53.65%,
    #0b0b0c 75%,
    #09090a 100%
  );
  /* card Shadow */

  box-shadow: 1vw 1vw 2vw 1vw rgba(0, 0, 0, 0.25);
  border-radius: 2px;
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

const ScreenWrapper = styled.div<{ activeScreen: boolean }>`
  position: absolute;
  width: 60vw;
  height: 25vw;
  padding: 1.5vw;
  top: 0;
  left: 0;
  opacity: ${props => (props.activeScreen ? 1 : 0)};
  transition: opacity 0.5s;
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
  flex-wrap: wrap;
  width: 20vw;
`

const Story = styled.button<{ trackState: boolean }>`
  ${PrimaryButtonStyle};
  padding: 0;
  text-align: center;
  border-color: #50caff;
  margin-bottom: 1.4vw;
  margin-right: 1.9vw;
  position: relative;
  z-index: 10;
  transition: 0.2s;
  ${media.hover} {
    :hover {
      transform: scale(1.03);
      transition-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
      transition: 0.2s;
    }
  }

  ${media.mobile} {
    position: absolute;
    margin: 0;
    left: 4.8vw;
    width: 29vw;
    height: 9.7vw;
    border-radius: 1.2vw;
    top: 1vw;
    opacity: ${props => (props.trackState ? 0 : 1)};
    transform: scale(${props => (props.trackState ? 0 : 1)});
    z-index: 0;
    transition: opacity 0.5s transform 0s 0.5s;
  }
  ${media.tabletPortrait} {
    left: 25px;
    width: 150px;
    height: 50px;
    border-radius: 12px;
    top: 5px;
  }
`
const Music = styled.button<{ trackState: boolean }>`
  ${PrimaryButtonStyle};
  padding: 0;
  text-align: center;
  border-color: ${colors.activeTeal};
  border-radius: 0.6vw;
  margin-bottom: 1.4vw;
  position: relative;
  z-index: 10;
  transition: 0.2s;
  ${media.hover} {
    :hover {
      transform: scale(1.03);
      transition-timing-function: cubic-bezier(0.95, 0.05, 0.795, 0.035);
      transition: 0.2s;
    }
  }

  ${media.mobile} {
    position: absolute;
    margin: 0;
    left: 4.8vw;
    width: 29vw;
    height: 9.7vw;
    border-radius: 1.2vw;
    text-align: left;
    padding-left: 2vw;
    opacity: ${props => (props.trackState ? 0 : 1)};
    transform: scale(${props => (props.trackState ? 0 : 1)});
    transition: opacity 0.5s transform 0 0.5s;
  }
  ${media.tabletPortrait} {
    font-size: 22px;
    left: 25px;
    width: 150px;
    height: 50px;
    border-radius: 8px;
  }
`
// const Details = styled.button`
//   ${PrimaryButtonStyle};
//   padding: 0;
//   text-align: center;
//   border-color: #f5ed28;
//   margin-bottom: 1.4vw;

//   ${media.tablet} {
//   }
//   ${media.mobile} {
//   }
// `;

const Text = styled.div`
  ${Body1};
  width: 17vw;

  ${media.mobile} {
    font-size: 4.3vw;
  }
  ${media.tabletPortrait} {
    font-size: 22px;
  }
`

const TrackText = styled.p<{ visibleText?: boolean }>`
  ${Body1};
  width: 17vw;
  opacity: ${props => (props.visibleText ? 1 : 0)};
  position: absolute;
  top: 0;

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
  ${SubHeader2};
  position: absolute;
  right: 1.5vw;
  bottom: 1.5vw;

  ${media.mobile} {
    font-size: 5.8vw;
    bottom: auto;
    top: 5.1vw;
    right: 4.6vw;
    width: 55.6vw;
    text-align: right;
  }
  ${media.tabletPortrait} {
    font-size: 30px;
    top: 26px;
    right: 24px;
    width: 287px;
  }
`

const ImageWrapper = styled.div`
  position: absolute;
  width: 38.8vw;
  height: 23.3vw;
  right: 1.5vw;
  top: 1.5vw;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
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

const CTA = styled.div<{ enter: boolean }>`
  position: absolute;
  width: 46vw;
  height: 19.8vw;
  left: 6.3vw;
  top: 94.4vw;
  z-index: 3;
  ${Text} {
    width: 100%;
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
  ${SubHeader};
  width: 100%;
  margin-bottom: 1.7vw;
  ${media.tablet} {
  }
  ${media.mobile} {
    font-size: 8.7vw;
  }
  ${media.tabletPortrait} {
    font-size: 36px;
  }
`

const Arrow = styled(ButtonArrowSVG)`
  width: 2.5vw;
  height: 1vw;
  margin-left: 1.5vw;
  z-index: 3;
  color: ${colors.activeTeal};
  transition: 0.5s;
  path {
    fill: currentColor;
  }

  ${media.mobile} {
    width: 9.7vw;
    height: 3.9vw;
    margin-left: 5vw;
  }
  ${media.tabletPortrait} {
    width: 50px;
    height: 20px;
    margin-left: 26px;
  }
`

const GetInTouch = styled.button`
  position: absolute;
  bottom: 0;
  left: 0;
  ${PrimaryButtonStyle};
  border-color: ${colors.activeTeal};
  width: 12.5vw;

  padding-left: 0.8vw;

  :hover {
    ${Arrow} {
      transform: translateX(0.4vw);

      transition: 0.5s;
    }
  }
  ${media.tablet} {
  }
  ${media.mobile} {
    position: relative;
    width: 46.1vw;
    height: 9.7vw;

    margin-top: 15.6vw;
  }
  ${media.tabletPortrait} {
    font-size: 22px;
    width: 239px;
    height: 50px;
    border-radius: 8px;
    margin-top: 81px;
  }
`

const TextWrapper = styled.div`
  width: 19.3vw;
  position: relative;
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

export default MediaMusic
