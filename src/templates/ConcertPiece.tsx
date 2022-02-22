import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useContext,
} from "react"
import styled from "styled-components"
import colors from "styles/colors"
import text from "styles/text"
import media from "styles/media"
import gsap from "gsap"
import { navigate, graphql } from "gatsby"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { AudioPlayerContext } from "components/ContextStore"
import MainButton from "components/buttons/MainButton"
import SectionHeaders from "components/textElements/SectionHeaders"
import { AudioPlayerElement } from "components/AudioPlayer"
type props = {
  mobile: boolean
  pageContext: any
  data: any
}

const ConcertPiece: React.FC<props> = ({ pageContext, mobile, data }) => {
  const mainText = useRef<HTMLDivElement>(null)
  const [mvtInfo, setMvtInfo] = useState([])
  const [activeCard, setActiveCard] = useState(1)
  const value = useContext(AudioPlayerContext)
  const lastTrack = useRef(0)

  const {
    movements,
    scoreSample,
    title,
    year,
    key,
    description,
    instrumentation,
    duration,
    backgroundImages,
    small,
  } = pageContext.concertPiece

  const options = {
    renderNode: {
      [BLOCKS.HEADING_1]: (n: any, children: any) => (
        <Heading1>{children}</Heading1>
      ),
      [BLOCKS.HEADING_2]: (n: any, children: any) => (
        <Heading2>{children}</Heading2>
      ),
      [BLOCKS.HEADING_3]: (n: any, children: any) => (
        <Heading3>{children}</Heading3>
      ),
      [BLOCKS.HEADING_4]: (n: any, children: any) => (
        <Heading4>{children}</Heading4>
      ),
      [BLOCKS.HEADING_5]: (n: any, children: any) => (
        <Heading5>{children}</Heading5>
      ),
      [BLOCKS.HEADING_6]: (n: any, children: any) => (
        <Heading6>{children}</Heading6>
      ),
      [BLOCKS.PARAGRAPH]: (n: any, children: any) => (
        <Paragraph>{children}</Paragraph>
      ),
      [INLINES.HYPERLINK]: (n: any, children: any) => (
        <ExternalLink
          href={n.data.uri}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </ExternalLink>
      ),
    },
  }

  const allInstruments = instrumentation.map(
    (inst: string, i: number, arr: any) => {
      return (
        <Instrument key={`inst-${i}`}>
          {inst} {i !== arr.length - 1 && "|"}{" "}
        </Instrument>
      )
    }
  )
  const parsedMovements = movements
    ? movements
    : [
        {
          mvtNumber: "",
          description: "",
          title: title,
          key: key,
          time: duration,
        },
      ]
  const allMovements =
    parsedMovements.length > 1 &&
    parsedMovements.map((con: any, i: number, arr: any) => {
      const { mvtNumber, description, title, key, time } = con

      return (
        <Movement
          className="mvt_info"
          activeCard={activeCard === mvtNumber}
          key={key}
        >
          <MvtTitle>{title}</MvtTitle>
          <MvtSummary>
            {arr.length > 1
              ? renderRichText(description, options)
              : description}
          </MvtSummary>
          <MvtTime>{time}</MvtTime>
        </Movement>
      )
    })

  const sortedPlayList =
    allMovements.length > 1
      ? parsedMovements.sort((a: any, b: any) => {
          return a.mvtNumber - b.mvtNumber
        })
      : parsedMovements

  const audioRefs = useRef([])

  const handlePlay = (
    i: number,
    title: string,
    year: string,
    canPlay: boolean
  ) => {
    if (canPlay) {
      if (value.setActiveTracks && audioRefs.current) {
        audioRefs.current[lastTrack.current].pause()
        audioRefs.current[lastTrack.current].currentTime = 0
        lastTrack.current = i
        audioRefs.current[i].play()
        value.setActiveTracks({
          audioRef: audioRefs.current[i],
          title: title,
          year: year,
        })
        //going to need to send in an object with anmy nmeeded Data (title image audioRef, composer etc)
      }
    }
  }
  const handleGetAudioRef = (ref: any) => {
    const newArr = audioRefs.current
    newArr.push(ref)

    audioRefs.current = newArr
  }

  const playList = sortedPlayList.map((mvt: any, i: number) => {
    return (
      <Playlist
        key={`playlist-item-${i}`}
        onMouseEnter={() => setActiveCard(mvt.mvtNumber)}
        onClick={() => setActiveCard(mvt.mvtNumber)}
      >
        <ButtonContainer visible={mvt.audio?.file?.url}>
          <MainButton
            onClick={() =>
              handlePlay(
                mvt.mvtNumber - 1,
                mvt.title,
                year || "",
                mvt.audio?.file?.url
              )
            }
            disabled={!mvt.audio?.file?.url}
          >
            PLAY
          </MainButton>
        </ButtonContainer>
        <AudioPlayerElement
          myKey={mvt.key}
          getRef={handleGetAudioRef}
          audio={mvt.audio ? mvt.audio.file.url : ""}
        />
        <MvtName>{`${mvt.mvtNumber ? mvt.mvtNumber + "." : ""}  ${
          mvt.title
        }`}</MvtName>
      </Playlist>
    )
  })

  const renderActiveMvt = useCallback(
    (arr: any) => {
      return arr.filter((list: any, i: number, arr: any) => {
        console.log(list)
        if (arr.length === 1) {
          return list
        } else {
          return list.props.activeCard
        }
      })
    },
    [activeCard]
  )

  useEffect(() => {
    if (parsedMovements.length > 1) {
      const newArr = renderActiveMvt(allMovements)
      setMvtInfo(newArr)
    }
  }, [renderActiveMvt])

  useEffect(() => {
    if (mvtInfo.length > 0) {
      gsap.to(".mvt_info", {
        opacity: 1,
        duration: 0.5,
      })
    }
  }, [mvtInfo])

  return (
    <Wrapper
      bGImage={
        backgroundImages ? backgroundImages[0].file.url : colors.deepPurple
      }
    >
      <SectionHeaders text={title} classRoot={`${key}-header`} small={small} />
      <Row>
        <Date>{year}</Date>
        <Instrumentation>{allInstruments}</Instrumentation>
      </Row>
      <BottomContainer>
        <Text ref={mainText}>{renderRichText(description, options)}</Text>
        <BigRow>
          <PlaylistColumn>{playList}</PlaylistColumn>
          <Column>
            <Sticky className={"sticky"}>
              {scoreSample && (
                <a
                  href={scoreSample ? scoreSample[0].file.url : ""}
                  target="__blank"
                  rel="noopener noreferrer"
                >
                  <MainButton
                    borderColor={colors.coolWhiteLight}
                    backgroundColor={colors.activeTeal}
                  >
                    SCORE
                  </MainButton>
                </a>
              )}

              <MainButton
                onClick={() => {
                  navigate("/music")
                }}
                borderColor={colors.coolWhiteLight}
                backgroundColor={colors.activeTeal}
              >
                HOME
              </MainButton>
            </Sticky>
          </Column>
          <MovementDescription>{mvtInfo}</MovementDescription>
        </BigRow>
      </BottomContainer>
    </Wrapper>
  )
}

const Wrapper = styled.section<{ bGImage: string }>`
  width: 100%;
  position: relative;
  height: auto;
  min-height: 100vh;
  background: ${colors.deepPurple};
  padding: 6.25vw 0;
  background-image: url(${props => props.bGImage});
  background-size: cover;
  ${media.mobile} {
    width: 100%;
    min-height: 100vh;
    margin-bottom: 30vw;
  }
`

const BottomContainer = styled.div`
  position: relative;
  padding: 0 7.25vw;
  ${media.tablet} {
  }
  ${media.mobile} {
  }
  ${media.fullWidth} {
  }
`

const PlaylistColumn = styled.div`
  width: fit-content;
  max-width: 30vw;
  ${media.tablet} {
    margin-top: 23vw;
  }
  ${media.mobile} {
    margin-top: 50px;
  }
  ${media.mobile} {
    width: 100%;
    max-width: 100%;
  }
`

const Movement = styled.div<{
  activeCard: boolean
}>`
  position: relative;
  width: 100%;

  transition: 0.5s;
  opacity: 0;
  ${media.tablet} {
  }
  ${media.mobile} {
  }
  ${media.fullWidth} {
  }
`

const MovementDescription = styled.div`
  position: relative;

  width: 40vw;
  ${media.tablet} {
    width: 70%;
  }
  ${media.mobile} {
    width: 100%;
  }
  ${media.fullWidth} {
  }
`

const MvtTitle = styled.h3`
  width: 100%;
  ${text.desktop.h5};
  text-transform: uppercase;
  margin-bottom: 1.25vw;
  color: ${colors.coolWhite};
  position: relative;
  :after {
    content: "";
    width: 37vw;
    position: absolute;
    bottom: -10%;
    left: 5%;
    height: 0.06vw;
    background: ${colors.coolWhite};
    opacity: 0.33;
  }
  ${media.tablet} {
    ${text.tablet.h5};
  }
  ${media.mobile} {
    ${text.mobile.h5};
  }
`

const MvtSummary = styled.div`
  width: 100%;
  ${text.desktop.bodyS};
  color: ${colors.coolWhite};

  ${media.tablet} {
    ${text.tablet.bodyS};
  }
  ${media.mobile} {
    ${text.mobile.bodyS};
  }
`
const MvtName = styled.p`
  width: 100%;
  ${text.desktop.h6};
  color: ${colors.coolWhite};
  ${media.tablet} {
    ${text.tablet.h6};
  }
  ${media.mobile} {
    ${text.mobile.h4};
  }
  ${media.fullWidth} {
  }
`

const MvtTime = styled.div`
  width: 100%;
  ${text.desktop.bodyL};
  color: ${colors.coolWhite};
  width: 100%;
  text-align: center;
  opacity: 0.33;
  margin-top: 2.81vw;
  position: relative;

  ${media.tablet} {
  }
  ${media.mobile} {
    ${text.mobile.bodyL};
  }
  ${media.fullWidth} {
  }
`

const Heading1 = styled.h1`
  ${text.fullWidth.h1};
`
const Heading2 = styled.h2`
  ${text.fullWidth.h2};
`
const Heading3 = styled.h3`
  ${text.fullWidth.h3};
`
const Heading4 = styled.h4`
  ${text.fullWidth.h4};
`
const Heading5 = styled.h5`
  ${text.fullWidth.h5};
`
const Heading6 = styled.h6`
  ${text.fullWidth.bodyM};

  ${media.tablet} {
    ${text.tablet.bodyL};
  }
`
const Paragraph = styled.p`
  ${text.fullWidth.bodyS};
  ${media.tablet} {
    ${text.tablet.bodyM};
  }
  ${media.mobile} {
    ${text.tablet.bodyL};
  }
`
const ExternalLink = styled.a`
  ${text.fullWidth.bodyM};
  text-decoration: none;
  color: ${colors.activeTeal};
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 85vw;
  margin-left: 5.3vw;
  ${media.tablet} {
  }
  ${media.mobile} {
  }
  ${media.fullWidth} {
  }
`
const BigRow = styled.div`
  display: flex;
  justify-content: space-between;

  ${media.mobile} {
    flex-direction: column;
  }
`

const Text = styled.div`
  width: 100%;
  color: ${colors.coolWhite};

  transition: 0.5s;
  margin: 3.13vw 0 6.25vw;
  ${media.mobile} {
  }
  ${media.tablet} {
    ${Paragraph} {
      ${text.tablet.bodyS};
    }
  }
`

const ButtonContainer = styled.div<{ visible: boolean }>`
  width: 3vw;
  height: 3vw;
  margin-right: 2vw;
  position: relative;
  button {
    position: absolute;
    width: 3vw;
    height: 100%;
    ${text.desktop.bodyXS};
    left: 0;
    top: 0;
    opacity: ${props => (props.visible ? 1 : 0.1)};
  }
  ${media.tablet} {
  }
  ${media.mobile} {
    width: 10vw;
    height: 10vw;
    margin-right: 5vw;
    button {
      position: absolute;
      width: 10vw;
      height: 10vw;
      ${text.desktop.bodyL};
      left: 0;
      top: 0;
      opacity: ${props => (props.visible ? 1 : 0.1)};
    }
  }
  ${media.fullWidth} {
  }
`

const Playlist = styled.div`
  display: flex;

  align-items: center;
  width: 100%;
  cursor: pointer;
  transition: 0.4s;

  padding: 0.25vw 0;
  ${media.hover} {
    :hover {
      ${MvtName} {
        color: ${colors.storyBlue};
        transition: 0.4s;
      }
    }
  }
`

const Date = styled.p`
  ${text.desktop.bodyL};
  color: ${colors.coolWhite};
  opacity: 0.33;
  ${media.tablet} {
  }
  ${media.mobile} {
    ${text.mobile.bodyL};
  }
  ${media.fullWidth} {
  }
`

const Instrumentation = styled.div`
  display: flex;
  flex-wrap: wrap;
  ${media.tablet} {
  }
  ${media.mobile} {
  }
  ${media.fullWidth} {
  }
`

const Instrument = styled.p`
  ${text.desktop.bodyM};
  color: ${colors.coolWhite};
  opacity: 0.33;
  margin-right: 0.63vw;

  ${media.mobile} {
    ${text.mobile.bodyM};
  }
`
const Sticky = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  width: 11.63vw;
  height: auto;
  background: linear-gradient(
    180deg,
    rgba(22, 98, 84, 0.24) 0%,
    rgba(172, 160, 243, 0.07) 100%
  );
  border-radius: 0.38vw;
  padding: 0.81vw 0.81vw 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  button {
    margin-bottom: 1.25vw;
  }
  a {
    text-decoration: none;
  }
  ${media.tablet} {
    position: absolute;
  }
  ${media.mobile} {
    position: relative;
    flex-direction: row;
    justify-content: space-around;
    width: 60%;
    margin: 20px auto;
  }
`

const Column = styled.div`
  position: relative;

  ${media.tablet} {
    position: absolute;
  }
  ${media.mobile} {
    position: relative;
  }
`

export default ConcertPiece

export const announceQuery = graphql`
  {
    allContentfulConcertPiece(sort: { fields: ensemble___ensembleName }) {
      nodes {
        key
        title
        audio {
          file {
            fileName
            url
            contentType
          }
        }
      }
    }
    allContentfulMovement {
      nodes {
        parent {
          ... on ContentfulConcertPiece {
            key
          }
        }
        audio {
          file {
            fileName
            url
            contentType
          }
        }
        key
        mvtNumber
        title
      }
    }
    allContentfulMediaPiece {
      nodes {
        audio {
          file {
            url
            contentType
          }
        }
        key
        title
      }
    }
  }
`
