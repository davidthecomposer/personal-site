import React, { useRef, useEffect, useState, useCallback } from "react"
import styled from "styled-components"
import text from "styles/text"
import colors from "styles/Colors"
import media from "styles/media"
import ContactForm from "components/ContactForm"
import concertMusicBG from "assets/images/concertMusic.jpg"
import concertMusicBGM from "assets/images/concertMusicM.jpg"
import { PrimaryButtonStyle } from "styles/Buttons"
import { ReactComponent as ButtonArrowSVG } from "assets/svg/buttonArrow.svg"
import gsap from "gsap"
import { concertPieces } from "data/ConcertPieces"
import { ReactComponent as TrebleUnderlaySVG } from "assets/svg/trebleUnderlay.svg"
import { ReactComponent as AltoUnderlaySVG } from "assets/svg/altoUnderlay.svg"
import { ReactComponent as BassUnderlaySVG } from "assets/svg/bassUnderlay.svg"

const ConcertMusic: React.FC<{ mobile: boolean }> = ({ mobile }) => {
  const [enter, setEnter] = useState(false)
  const header = useRef(null)
  const headerLine = useRef(null)
  const musicBook = useRef(null)
  const cta = useRef(null)
  const page = useRef(0)

  useEffect(() => {
    const tl = gsap.timeline({ scrollTrigger: headerLine.current })

    tl.to(headerLine.current, {
      scale: 1,
      duration: 1,
      ease: "power1.inOut",
    })
      .to(header.current, { y: 0, duration: 0.6 }, 1)
      .to(header.current, { x: 0, duration: 0.6 }, 1.6)
  }, [])

  // const allButtons = concertPieces.map((piece: any, index: number) => {
  //   const { tabName } = piece
  //   if (index < concertPieces.length - 1) {
  //     return (
  //       <PageTab
  //         key={`${tabName}-mobile-btn`}
  //         activeTab={activePage === index}
  //         className={`tab-${index}-front`}
  //         onClick={() => {
  //           handlePageTurn(index, concertPieces.length - index)
  //         }}
  //         yOffset={index}
  //       >
  //         {tabName}
  //       </PageTab>
  //     )
  //   } else {
  //     return null
  //   }
  // })

  const allConcert = concertPieces.map((genre: any, index: number) => {
    const { nexTitle, playList, allPieces, tabName } = genre
    console.log(genre)
    const pieceTemplates =
      allPieces &&
      allPieces.map((piece: any, i: number) => {
        const { title, year, movements, instrumentation, duration, key } = piece

        const allInstrumentation = instrumentation.map((ins: any, i: any) => {
          return <Instrument key={`${key}-inst-${i}`}>{ins}</Instrument>
        })

        return (
          <PieceCard key={title} bGColor={genre.colors.background}>
            <PieceTitle>{title}</PieceTitle>
            <Instrumentation>{allInstrumentation}</Instrumentation>
            <Year>{year}</Year>
            <Duration>{duration}</Duration>
            <Movements>{movements.length}</Movements>
            <More borderColor={genre.colors.button}>More</More>
            {i % 3 === 0 ? (
              <BassUnderlay />
            ) : i % 2 === 0 ? (
              <AltoUnderlay />
            ) : (
              <TrebleUnderlay />
            )}
          </PieceCard>
        )
      })

    return pieceTemplates
  })

  return (
    <Wrapper id="Concert-Music">
      <HeaderWrapper>
        <Header ref={header}>Concert Music</Header>
        <HeaderLine ref={headerLine} />
      </HeaderWrapper>

      <MobileWrapper className="mobile__wrapper">
        <ConcertPiecesContainer ref={musicBook}>
          <TopLabels>
            <Label>Title</Label>
            <Label>Instruments</Label>
            <Label>Year</Label>
            <Label>Duration</Label>
            <Label>Movements</Label>
          </TopLabels>
          {allConcert}
        </ConcertPiecesContainer>
      </MobileWrapper>
      <BottomSection>
        <CTA ref={cta} enter={enter}>
          <HeadLine>Want to Collaborate?</HeadLine>
          <Text>
            I am always on the lookout for passionate musicians, or music lovers
            who are looking to collaborate on or commission art music. If you
            are an author, musician or patron looking for new music send me a
            message and let's create something amazing!
          </Text>
          <GetInTouch
            onClick={() => {
              setEnter(true)
            }}
          >
            Get in Touch <Arrow />
          </GetInTouch>
        </CTA>
        <ContactForm
          setEnter={setEnter}
          enter={enter}
          leftVal={mobile ? "100%" : "63.4vw"}
          topVal={mobile ? "0" : "102.4vw"}
          leftValT={"40%"}
          topValT={"0"}
        />
      </BottomSection>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  padding: 15.4vw 0 0 0;
  background-size: cover;
  position: relative;
  box-sizing: border-box;
  background-image: url(${concertMusicBG});

  /* -webkit-transform: translate3d(0, 0, 0);
  -webkit-transform-style: preserve-3d;
  -webkit-backface-visibility: hidden; */

  ${media.mobile} {
    width: 100%;
    height: 410.6vw;
    padding: 0;
    background-image: url(${concertMusicBGM});
  }
  ${media.tabletPortrait} {
    width: 100%;
    height: 2125px;
    padding: 0;
    background-image: url(${concertMusicBGM});
  }
`

const HeaderWrapper = styled.div`
  position: relative;
  flex-direction: column;
  width: 88.1vw;
  margin-left: 6.3vw;
  height: 7vw;
  overflow: hidden;
  z-index: 5;

  ${media.mobile} {
    height: 29.7vw;
  }
  ${media.tabletPortrait} {
    height: 75px;
  }
`

const Header = styled.h2`
  ${text.desktop.h1};
  color: ${colors.headlineWhite};
  transform: translate(-8vw, 110%);
  position: absolute;
  width: fit-content;
  right: 0;
  z-index: 2;

  ${media.mobile} {
    transform: translate(-8.5vw, 110%);
    font-size: 13.3vw;
    width: 59.9vw;
    text-align: right;
  }
  ${media.tabletPortrait} {
    transform: translate(-44px, 110%);
    font-size: 69px;
    width: 625px;
  }
`

const HeaderLine = styled.div`
  position: absolute;
  width: 82.4vw;
  height: 0.3vw;
  right: 3.9vw;
  bottom: 0;
  background: ${colors.headlineWhite};
  transform: scaleX(0);
  transform-origin: 0%;
  border-radius: 0.3vw;

  ${media.mobile} {
    height: 1vw;
    border-radius: 1vw;
    width: 88vw;
    margin-right: 2vw;
  }
  ${media.tabletPortrait} {
    height: 5px;
    border-radius: 5px;
    width: calc(100% - 10px);
    margin-right: 10px;
  }
`

const MobileWrapper = styled.div`
  ${media.mobile} {
    position: relative;
    overflow: scroll;
    height: 130.1vw;
    width: 100%;
    margin-top: 7vw;
    padding-top: 1vw;
  }
  ${media.tabletPortrait} {
    height: 674px;
    width: 100%;
    margin-top: 36px;
    padding-top: 5px;
  }
`

const Text = styled.div`
  ${text.desktop.bodyS};
  width: 19.3vw;

  ${media.mobile} {
    font-size: 3.9vw;
    width: 81.6vw;
  }
  ${media.tabletPortrait} {
    font-size: 20px;
    width: 422px;
  }
`

const CTA = styled.div<{ enter: boolean }>`
  position: absolute;
  width: 46vw;
  height: 19.8vw;
  left: 6.3vw;
  top: 106.4vw;
  z-index: 3;

  ${Text} {
    width: 100%;
  }
  ${media.mobile} {
    top: 0;
    width: 82.1vw;
    left: ${props => (props.enter ? "-100vw" : "4.1vw")};
    transition: 0.5s;
    height: 100vw;
  }
  ${media.tabletPortrait} {
    width: 425px;
    left: ${props => (props.enter ? "-517px" : "21px")};

    height: 517px;
  }
`

const HeadLine = styled.h3`
  ${text.desktop.h6};
  width: 100%;
  margin-bottom: 1.7vw;

  ${media.mobile} {
    font-size: 8.7vw;
  }
  ${media.tabletPortrait} {
    font-size: 45px;
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

const BottomSection = styled.div`
  position: relative;
  ${media.mobile} {
    position: relative;
    display: flex;
    width: 100vw;
    overflow: hidden;
    height: 100vw;
    margin-top: 25.4vw;
  }
  ${media.tabletPortrait} {
    width: 750px;
    height: 517px;
    margin-top: 131px;
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
  ${media.hover} {
    :hover {
      ${Arrow} {
        transform: translateX(0.4vw);

        transition: 0.5s;
      }
    }
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

const ConcertPiecesContainer = styled.div`
  position: relative;
  width: 87.5vw;
  padding: 2.25vw;
  background: rgba(23, 27, 28, 0.73);
  border-radius: 0.25vw;
  margin: 3.38vw auto 19.44vw;
  ${media.mobile} {
  }
  ${media.tabletPortrait} {
    left: 467px;
    width: 450px;
    height: 657px;
    margin-right: 36px;
  }
`

const PieceCard = styled.div<{ bGColor: string }>`
  position: relative;
  opacity: 1,
  z-index: 1,
  transition: opacity 0.4s z-index 0.1s 0.5s;
  width: 100%;
  height: 8.75vw;
  display: flex;
  align-items: center;
  color: ${colors.coolWhite};
  background: ${props => props.bGColor};
border-radius: 0.5vw;
  margin-bottom: 20px;
  padding: 0 2.19vw;
  ${media.mobile} {
    width: calc(100% - 8.8vw);
    height: calc(100% - 2vw);
    padding: 2vw 4.8vw 0 0;
    top: 0;
  }
  ${media.tabletPortrait} {
    width: calc(100% - 45px);
    height: calc(100% - 10px);
    padding: 10px 25px 0 0;
    top: 0;
  }
`
const PieceTitle = styled.h3`
  ${text.desktop.h5};
  width: 18.06vw;
  text-align: left;

  ${media.mobile} {
  }
  ${media.tabletPortrait} {
    font-size: 26px;
  }
`

const TrebleUnderlay = styled(TrebleUnderlaySVG)`
  position: absolute;
  width: 82.88vw;
  height: 8.63vw;
  left: 0;
  top: 0.13vw;
  z-index: 0;
  ${media.tablet} {
  }
  ${media.mobile} {
  }
  ${media.fullWidth} {
  }
`
const AltoUnderlay = styled(AltoUnderlaySVG)`
  position: absolute;
  width: 82.88vw;
  height: 8.63vw;
  left: 0;
  top: 0.13vw;
  z-index: 0;

  ${media.tablet} {
  }
  ${media.mobile} {
  }
  ${media.fullWidth} {
  }
`
const BassUnderlay = styled(BassUnderlaySVG)`
  position: absolute;
  width: 82.88vw;
  height: 8.63vw;
  left: 0;
  top: 0.13vw;
  z-index: 0;
  ${media.tablet} {
  }
  ${media.mobile} {
  }
  ${media.fullWidth} {
  }
`

const Year = styled.h4`
  ${text.desktop.bodyM};
  width: 9.19vw;
  text-align: left;
  margin-left: 1.88vw;
  ${media.mobile} {
  }
  ${media.tabletPortrait} {
  }
`

const Movements = styled.div`
  ${text.desktop.bodyL};
  width: 16vw;
  padding-left: 1.25vw;
  ${media.mobile} {
    font-size: 4vw;
  }
  ${media.tabletPortrait} {
    font-size: 20px;
  }
`

const Duration = styled.div`
  ${text.desktop.bodyL};
  width: 9.25vw;
  padding-left: 1.25vw;
  ${media.mobile} {
    font-size: 4.3vw;
    right: 5vw;
    bottom: 5vw;
  }
  ${media.tabletPortrait} {
    font-size: 24px;
    right: 20px;
    bottom: 20px;
  }
`

const Instrumentation = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 17.75vw;
  margin-left: 1.25vw;
`

const Instrument = styled.div`
  ${text.desktop.bodyS};
  height: fit-content;
  color: ${colors.coolWhite};
  background: ${colors.deepPurple};
  border-radius: 0.5vw;
  padding: 0.1vw 0.4vw;
  margin-right: 0.63vw;
  margin-bottom: 0.63vw;
  ${media.mobile} {
    font-size: 2.9vw;
    border-radius: 2.4vw;
    padding: 0.8vw 1vw;
  }
  ${media.tabletPortrait} {
    font-size: 15px;
    border-radius: 8px;
    padding: 4px 5px;
  }
`

const TopLabels = styled.div`
  display: flex;
  width: 100%;
  height: 2.25vw;
  align-items: center;
  margin-bottom: 1.25vw;
  padding: 0 1.88vw;
  ${media.tablet} {
  }
  ${media.mobile} {
  }
  ${media.fullWidth} {
  }
`

const Label = styled.p`
  ${text.desktop.h6};
  color: ${colors.coolWhite};

  :nth-of-type(1) {
    //Title
    width: 18.06vw;
  }
  :nth-of-type(2) {
    //Instruments
    width: 17.75vw;
  }
  :nth-of-type(3) {
    //Year
    width: 9.19vw;
    margin-left: 1.88vw;
  }
  :nth-of-type(4) {
    //Duration
    width: 9.25vw;
  }
  :nth-of-type(5) {
    //Movements
  }

  ${media.tablet} {
  }
  ${media.mobile} {
  }
  ${media.fullWidth} {
  }
`

const More = styled.button<{ borderColor: string }>`
  ${PrimaryButtonStyle};
  color: ${colors.coolWhite};
  border-color: ${props => props.borderColor};
  ${media.tablet} {
  }
  ${media.mobile} {
  }
  ${media.fullWidth} {
  }
`

export default ConcertMusic
