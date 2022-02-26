import React, { useEffect, useRef, useState, useContext } from "react"
import ContactForm from "components/ContactForm"
import styled from "styled-components"
import text from "styles/text"
import colors from "styles/colors"
import media from "styles/media"
import mediaMusicBG from "assets/images/mediaMusicBG.jpg"
import gsap from "gsap"
import MainButton from "components/buttons/MainButton"
import SectionHeaders from "components/textElements/SectionHeaders"
import { AudioPlayerElement } from "components/AudioPlayer"
import { AudioPlayerContext } from "components/ContextStore"
type props = {
  mobile: boolean
  data: any
}

type pieceProps = {
  track: any
  i: number
}

const MediaPiece: React.FC<pieceProps> = ({ track, i }) => {
  const [audioRef, setAudioRef] = useState<HTMLAudioElement>()
  const value = useContext(AudioPlayerContext)
  const video = useRef<HTMLVideoElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const playing = useRef<boolean>(false)
  const [buttonText, setButtonText] = useState("Watch")
  const [info, setInfo] = useState(-1)
  console.log(track)
  const handlePlay = () => {
    if (track.audio) {
      if (value.setActiveTracks && audioRef) {
        // audioRef.play()
        value.setActiveTracks({
          audioRef: audioRef,
          title: track.title,
          year: "Media",
        })
      }
    }
  }

  const handleInfo = (activeNum: number) => {
    setInfo(activeNum)
  }

  const setControls = () => {
    if (video.current) {
      video.current.controls = true
    }
  }

  const unsetControls = () => {
    if (video.current) {
      video.current.controls = false
    }
  }
  const handleVideoEnd = () => {
    if (video.current) {
      video.current.currentTime = 0
      video.current.pause()
      video.current.load()
    }
    console.log(video.current)
  }

  return (
    <PieceWrapper className={`media_pieces`} info={info === i}>
      <ImageWrapper>
        {track.audio && (
          <ControlPanel ref={panel}>
            <MainButton
              limit
              bGOpacity={"20"}
              backgroundColor={colors.activeTeal}
              onClick={handlePlay}
            >
              {track.audio ? "Listen" : buttonText}
            </MainButton>
            {typeof window !== "undefined" &&
              window.matchMedia("(hover: none)").matches && (
                <MainButton
                  limit
                  bGOpacity={"20"}
                  backgroundColor={colors.activeTeal}
                  onClick={() => handleInfo(i)}
                >
                  Info
                </MainButton>
              )}
          </ControlPanel>
        )}
        {track.audio ? (
          <>
            <img src={track.images[0].file.url} alt={track.title} />
            <AudioWrapper>
              <AudioPlayerElement
                myKey={track.key}
                getRef={setAudioRef}
                audio={track.audio.file.url}
              />
            </AudioWrapper>
          </>
        ) : (
          <video
            src={track.video.file.url}
            poster={track.images[0].file.url}
            preload={"meta"}
            ref={video}
            onMouseEnter={setControls}
            onMouseLeave={unsetControls}
            onEnded={handleVideoEnd}
          />
        )}
        <TextWrapper>
          <TrackText>{track.storyBlurb.storyBlurb}</TrackText>
        </TextWrapper>
      </ImageWrapper>
      <Title>{track.title}</Title>
    </PieceWrapper>
  )
}

const MediaMusic: React.FC<props> = ({ mobile, data }) => {
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

  const playMedia = () => {}

  const allTracks = data.map((track: any, i: number) => {
    return <MediaPiece key={`track-presentation-${i}`} track={track} i={i} />
  })

  const handleEnter = () => {
    setEnter(mobile ? !enter : true)
  }

  return (
    <Wrapper id="media-music">
      <SectionHeaders left text="Music For Media" classRoot="media-header" />

      <MediaPieces ref={screen}>{allTracks}</MediaPieces>

      <BottomSection>
        <CTA ref={cta} enter={enter}>
          <Row>
            <HeadLine>Have a Media Project?</HeadLine>
            <MainButton
              onClick={handleEnter}
              borderColor={colors.coolWhiteLight}
              backgroundColor={colors.activeTeal}
              limit
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
          topVal={"0"}
          setEnter={setEnter}
          leftValT={"55%"}
          topValT={"0"}
        />
      </BottomSection>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  padding: 14.4vw 0 0 0;
  background-image: url(${mediaMusicBG});
  background-size: cover;
  position: relative;
  box-sizing: border-box;

  ${media.mobile} {
    padding: 22vw 2vw 0 2vw;
  }
  ${media.tablet} {
  }
  ${media.fullWidth} {
    padding: 200px 0 0 0;
  }
`

const BottomSection = styled.div`
  position: relative;
  height: 30vw;
  width: 100%;
  margin-top: 16.4vw;
  ${media.fullWidth} {
    height: 728px;
  }
  ${media.tablet} {
  }
  ${media.mobile} {
    height: 100vw;
  }
`

const MediaPieces = styled.div`
  position: relative;
  width: 96vw;
  margin: 6.25vw auto 10vw auto;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  ${media.fullWidth} {
    width: 1536px;
    margin: 100px auto;
  }
  ${media.tablet} {
    width: 85vw;
  }
  ${media.mobile} {
    width: 96vw;
    align-items: center;
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
  background: #00000050;
  color: ${colors.coolWhite};
  opacity: 0;
  transition: 0.3s;
  ${media.tablet} {
  }
  ${media.mobile} {
    padding-left: 20%;
  }

  ${media.fullWidth} {
    padding: 20px 8px 20px 144px;
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
  video {
    width: 100%;
    height: 100%;
    position: absolute;
    object-fit: cover;
    padding: 0;
    left: 0;
    top: 0;
    z-index: 5;
    transition: 0.4s;
  }

  ${media.tablet} {
    width: 37.76vw;
    height: 22.14vw;
    img {
      width: 37.76vw;
      height: 22.14vw;
      top: 0;
      right: 0;
      filter: grayscale(0%);
      transition: 0.4s;
    }
  }

  ${media.mobile} {
    width: 98.13vw;
    height: 58.41vw;

    img {
      width: 100%;
      height: 58.41vw;
    }
  }
  ${media.fullWidth} {
    width: 484px;
    height: 284px;
    img {
      width: 484px;
      height: 284px;
    }
  }
`

const PieceWrapper = styled.div<{ info: boolean }>`
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
  img {
    filter: grayscale(100%);
  }

  background: linear-gradient(
    94.3deg,
    #000000 0.09%,
    rgba(7, 10, 1, 0.5) 0.1%,
    rgba(16, 17, 16, 0.38) 99.67%
  );
  -webkit-box-shadow: 5px 5px 5px 0px #00000000,
    inset 4px 4px 15px 0px #00000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
  box-shadow: 5px 5px 5px 0px #00000000, inset 4px 4px 15px 0px #00000000,
    5px 5px 15px 5px rgba(0, 0, 0, 0);

  ${TextWrapper} {
    ${props =>
      props.info
        ? `opacity: 1;
        transition: 0.3s;`
        : `opacity: 0;`}
  }
  ${ImageWrapper} {
    img {
      ${props =>
        props.info
          ? ` filter: grayscale(100);
          opacity: 1;`
          : `filter: grayscale(0)`}
    }
  }

  ${media.hover} {
    :hover {
      ${TextWrapper} {
        opacity: 1;
        transition: 0.3s;
      }

      ${ImageWrapper} {
        img {
          filter: grayscale(100);
          opacity: 1;
        }
      }
    }
  }

  ${media.fullWidth} {
    width: 484px;
    height: 335px;
    border-radius: 6px;
  }

  ${media.tablet} {
    width: 37.76vw;
    height: 26.17vw;
    margin-right: 4vw;
  }
  ${media.mobile} {
    width: 100%;
    height: auto;
    margin-right: 0;
    margin-bottom: 5vw;
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

  ${media.fullWidth} {
    left: 5.6px;
    width: 120px;
  }
  ${media.mobile} {
    width: 25vw;

    align-items: center;
  }
`

const Text = styled.div`
  ${text.desktop.bodyS};
  width: 17vw;
  color: ${colors.coolWhite};
  ${media.mobile} {
    font-size: 4.3vw;
  }

  ${media.fullWidth} {
    ${text.fullWidth.bodyS};
    width: 272px;
  }
  ${media.tablet} {
    ${text.tablet.bodyXS};
    width: 37.24vw;
  }

  ${media.mobile} {
    ${text.mobile.bodyM};
  }
`

const TrackText = styled.p`
  ${text.desktop.bodyXS};
  font-size: 1vw;
  opacity: 1;
  position: relative;

  ${media.tablet} {
    ${text.tablet.bodyXS};
    font-size: 1.3vw;
    width: 25vw;
  }

  ${media.mobile} {
    ${text.mobile.bodyM};
    width: 90%;
  }
  ${media.fullWidth} {
    ${text.fullWidth.bodyXS};
    font-size: 16px;
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

  ${media.tablet} {
    font-size: 2.86vw;
  }
  ${media.mobile} {
    font-size: 4.6vw;
  }
  ${media.fullWidth} {
    ${text.fullWidth.h5};
    margin-top: 10.08px;
    padding-right: 10.08px;
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
  ${media.fullWidth} {
    width: 576px;
    height: 316.8px;
    left: 100.8px;
    top: 32px;
    ${Text} {
      width: 576px;
    }
  }
  ${media.mobile} {
    top: 0;
    width: 70%;
    height: 50vw;
    left: ${props => (props.enter ? "-100vw" : "4.1vw")};
    transition: 0.5s;
    ${Text} {
      width: 100%;
    }
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
    font-size: 5vw;
    width: 50%;
  }

  ${media.fullWidth} {
    ${text.fullWidth.h3};
    width: 416px;

    margin-bottom: 27.2px;
  }
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  ${media.tablet} {
  }

  ${media.fullWidth} {
  }
  ${media.fullWidth} {
  }
  ${media.mobile} {
    margin-bottom: 5vw;
  }
`

const AudioWrapper = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
  z-index: -1;

  ${media.fullWidth} {
  }
`

export default MediaMusic
