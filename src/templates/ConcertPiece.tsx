import React, { useEffect, useRef, useState, useCallback } from "react"
import styled from "styled-components"
import { PrimaryButtonStyle } from "styles/Buttons"
import colors from "styles/Colors"
import text from "styles/text"
import twitter from "assets/svg/twitterIcon.svg"
import linkedin from "assets/svg/linkedIcon.svg"
import facebook from "assets/svg/facebookIcon.svg"
import media from "styles/media"
import gsap from "gsap"
import { navigate } from "gatsby"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"
import { renderRichText } from "gatsby-source-contentful/rich-text"

import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from "react-share"
import MainButton from "components/buttons/MainButton"
import SectionHeaders from "components/textElements/SectionHeaders"

type props = {
  mobile: boolean
  pageContext: any
}

const ConcertPiece: React.FC<props> = ({ pageContext, mobile }) => {
  const mainText = useRef<HTMLDivElement>(null)
  const [mvtInfo, setMvtInfo] = useState([])
  const [activeCard, setActiveCard] = useState(1)

  const {
    movements,
    scoreSample,
    title,
    year,
    key,
    description,
    instrumentation,
    backgroundImages,
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

  const allMovements = movements.map((con: any, i: number) => {
    const { mvtNumber, description, title, key, time } = con

    return (
      <Movement
        className="mvt_info"
        activeCard={activeCard === mvtNumber}
        key={key}
      >
        <MvtTitle>{title}</MvtTitle>
        <MvtSummary> {renderRichText(description, options)}</MvtSummary>
        <MvtTime>{time}</MvtTime>
      </Movement>
    )
  })

  const playList = movements
    .sort((a: any, b: any) => {
      return a.mvtNumber - b.mvtNumber
    })
    .map((mvt: any, i: number) => {
      return (
        <Playlist
          key={`playlist-item-${i}`}
          onMouseEnter={() => setActiveCard(mvt.mvtNumber)}
        >
          <div>
            <MainButton>PLAY</MainButton>
          </div>
          <MvtName>{`${mvt.mvtNumber ? mvt.mvtNumber + "." : ""}  ${
            mvt.title
          }`}</MvtName>
        </Playlist>
      )
    })

  const renderActiveMvt = useCallback(
    (arr: any) => {
      return arr.filter((list: any, i: number, arr: any) => {
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
    const newArr = renderActiveMvt(allMovements)
    gsap.to(".mvt_info", {
      opacity: 0,
      duration: 0.5,
      onComplete: () => setMvtInfo(newArr),
    })
  }, [renderActiveMvt])

  useEffect(() => {
    gsap.to(".mvt_info", {
      opacity: 1,
      duration: 0.5,
    })
  }, [mvtInfo])

  return (
    <Wrapper
      bGImage={
        backgroundImages ? backgroundImages[0].file.url : colors.deepPurple
      }
    >
      <SectionHeaders text={title} classRoot={`${key}-header`} />
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
                  console.log("add all mvts to playlist")
                }}
                borderColor={colors.coolWhiteLight}
                backgroundColor={colors.activeTeal}
              >
                PLAY ALL
              </MainButton>
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
    height: 146.1vw;
    margin-bottom: 30vw;
  }
  ${media.tabletPortrait} {
    width: 517px;
    height: 756px;
    margin-bottom: 155px;
  }
`

const Text = styled.div`
  width: 100%;
  color: ${colors.coolWhite};

  transition: 0.5s;
  margin: 3.13vw 0 6.25vw;
  ${media.mobile} {
  }
  ${media.tabletPortrait} {
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

  ${media.tablet} {
  }
  ${media.mobile} {
  }
  ${media.fullWidth} {
  }
`

const Movement = styled.div<{
  activeCard: boolean
}>`
  position: relative;
  width: 48.81vw;

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

  ${media.tablet} {
  }
  ${media.mobile} {
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
    width: 45vw;
    position: absolute;
    bottom: -10%;
    left: 5%;
    height: 0.06vw;
    background: ${colors.coolWhite};
    opacity: 0.33;
  }
  ${media.tablet} {
  }
  ${media.mobile} {
  }
  ${media.fullWidth} {
  }
`

const MvtSummary = styled.div`
  width: 100%;
  ${text.desktop.bodyS};
  color: ${colors.coolWhite};

  ${media.tablet} {
  }
  ${media.mobile} {
  }
  ${media.fullWidth} {
  }
`
const MvtName = styled.p`
  width: 100%;
  ${text.desktop.h6};
  color: ${colors.coolWhite};

  ${media.tablet} {
  }
  ${media.mobile} {
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
  ${media.tablet} {
  }
  ${media.mobile} {
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
`
const Paragraph = styled.p`
  ${text.fullWidth.bodyS};
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

  ${media.tablet} {
  }
  ${media.mobile} {
  }
  ${media.fullWidth} {
  }
`

const Playlist = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: fit-content;
  cursor: pointer;
  transition: 0.4s;
  div {
    width: 3vw;
    height: 3vw;

    margin-right: 3vw;
    button {
      position: absolute;
      width: 3vw;
      height: 3vw;
      ${text.desktop.bodyXS};
    }
  }
  padding: 0.25vw 0;
  ${media.hover} {
    :hover {
      ${MvtName} {
        color: ${colors.storyBlue};
        transition: 0.4s;
      }
    }
  }

  ${media.tablet} {
  }
  ${media.mobile} {
  }
  ${media.fullWidth} {
  }
`

const Date = styled.p`
  ${text.desktop.bodyL};
  color: ${colors.coolWhite};
  opacity: 0.33;
  ${media.tablet} {
  }
  ${media.mobile} {
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
  ${media.tablet} {
  }
  ${media.mobile} {
  }
  ${media.fullWidth} {
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
  }
  ${media.mobile} {
  }
  ${media.fullWidth} {
  }
`

const Column = styled.div`
  position: relative;

  ${media.tablet} {
  }
  ${media.mobile} {
  }
  ${media.fullWidth} {
  }
`

export default ConcertPiece
