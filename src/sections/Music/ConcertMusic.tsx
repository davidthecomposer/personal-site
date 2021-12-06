import React, { useRef, useEffect, useState, useCallback } from "react"
import styled from "styled-components"
import {
  Heading1,
  Body1,
  SubHeader,
  SubHeader3,
  Playlist,
  ConcertTitle,
  BodySmall,
} from "styles/text"
import colors from "styles/Colors"
import media from "styles/media"
import ContactForm from "components/ContactForm"
import concertMusicBG from "assets/images/concertMusic.jpg"
import concertMusicBGM from "assets/images/concertMusicM.jpg"
import { PrimaryButtonStyle } from "styles/Buttons"
import { ReactComponent as ButtonArrowSVG } from "assets/svg/buttonArrow.svg"
import { ReactComponent as ScoreIconSVG } from "assets/svg/pdf.svg"
import gsap from "gsap"
import AudioPlayerMinimal from "components/AudioPlayerMinimal"
import { concertPieces } from "data/ConcertPieces"

const MediaMusic: React.FC<{ mobile: boolean }> = ({ mobile }) => {
  const [enter, setEnter] = useState(false)
  const header = useRef(null)
  const headerLine = useRef(null)
  const musicBook = useRef(null)
  const cta = useRef(null)
  const page = useRef(0)
  const [activePage, setActivePage] = useState(0)
  const [activePiece, setActivePiece] = useState(0)

  const handlePageTurn = useCallback(
    (num: number, z: number) => {
      const turnBack = page.current > num || (num === 1 && page.current)
      setActivePage(num)
      setActivePiece(0)

      let pages = []
      for (
        let i = turnBack ? num + 1 : page.current;
        i <= (turnBack ? page.current : num);
        i++
      ) {
        pages.push({
          page: `.page-${i}`,
          toc: `.toc-${i}`,
          pi: `.pieces__info-${i}`,
          front: `.tab-${i}-front`,
          tocWrap: `.toc-wrap-${i}`,
          piWrap: `.pieces__info-wrap-${i}`,
          z: turnBack ? concertPieces.length - i : i,
        })
      }

      if (turnBack) {
        pages = pages.reverse()
      }

      const turnPage = (
        pageClass: string,
        toc: string,
        pi: string,
        delay: number,
        z: number,
        front: string,
        tocWrap: string,
        piWrap: string
      ) => {
        const tl = gsap.timeline({
          onComplete: () => {
            page.current = num
          },
        })
        tl.to(
          pageClass,
          {
            rotateY: turnBack ? 0 : 180,
            duration: 0.8,

            ease: "power1.inOut",
          },
          0 + delay
        )
          .to(pageClass, { zIndex: z, duration: 0 }, 0.5 + delay)
          .to(
            front,
            { opacity: turnBack ? 1 : mobile ? 1 : 0, duration: 0.2 },
            0.2 + delay
          )
          .to(toc, { zIndex: turnBack ? 0 : 1, duration: 0 }, 0.3 + delay)

          .to(pi, { zIndex: turnBack ? 1 : 0, duration: 0 }, 0.3 + delay)
          .to(
            tocWrap,
            { opacity: turnBack ? 0 : 1, duration: turnBack ? 0.6 : 0.6 },
            0.2 + delay
          )

          .to(
            piWrap,
            { opacity: turnBack ? 1 : 0, duration: turnBack ? 0.6 : 0.6 },
            0.2 + delay
          )

        return tl
      }

      pages.forEach((animation, i) => {
        turnPage(
          animation.page,
          animation.toc,
          animation.pi,
          0.3 * i,
          animation.z,
          animation.front,
          animation.tocWrap,
          animation.piWrap
        )
      })
    },
    [mobile]
  )

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

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: musicBook.current, start: "top 90%" },
    })

    tl.from(musicBook.current, {
      x: "+=3vw",
      y: "+=3vw",
      opacity: 0,
      duration: 1.5,
      ease: "power1.inOut",
      onComplete: () => {
        handlePageTurn(0, concertPieces.length)
      },
    })
  }, [handlePageTurn])

  useEffect(() => {
    if (mobile) {
      gsap.to(".mobile__wrapper", { duration: 0.6, scrollTo: { x: "max" } })
    }
  }, [mobile, activePiece])

  useEffect(() => {
    if (mobile) {
      gsap.to(".mobile__wrapper", { duration: 0.6, scrollTo: { x: "0" } })
    }
  }, [mobile, activePage])

  const allButtons = concertPieces.map((piece, index) => {
    const { tabName } = piece
    if (index < concertPieces.length - 1) {
      return (
        <PageTab
          key={`${tabName}-mobile-btn`}
          activeTab={activePage === index}
          className={`tab-${index}-front`}
          onClick={() => {
            handlePageTurn(index, concertPieces.length - index)
          }}
          yOffset={index}
        >
          {tabName}
        </PageTab>
      )
    } else {
      return null
    }
  })

  const allConcert = concertPieces.map((genre, index) => {
    const { nexTitle, playList, allPieces, tabName } = genre

    const allPlaylist =
      playList &&
      playList.map((piece, i) => {
        return (
          <Piece
            activePiece={activePiece === i && activePage === index}
            onClick={() => setActivePiece(i)}
            key={`${nexTitle}-piece-${i}`}
          >{`${i + 1}. ${piece}`}</Piece>
        )
      })
    const pieceTemplates =
      allPieces &&
      allPieces.map((piece: any, i: number) => {
        const {
          title,
          year,
          description,
          movements,
          instrumentation,
          scoreSample,
          duration,
          key,
          cover,
        } = piece

        const allMovements = movements.map((mvt: any, i: number) => {
          return (
            <AudioPlayerMinimal
              key={`${key}-mvt-${i}`}
              track={mvt.audio}
              title={mvt.name}
              initialTime={mvt.initialTime}
              id={i}
            />
          )
        })

        const allInstrumentation = instrumentation.map((ins: any, i: any) => {
          return <Instrument key={`${key}-inst-${i}`}>{ins}</Instrument>
        })

        return (
          <InfoWrapper key={title} visible={activePiece === i}>
            <PieceTitle>{title}</PieceTitle>
            {!cover && (
              <>
                <Underline />
                <Year>{year}</Year>

                <BigColumn>
                  <Description>{description}</Description>
                  <InfoColumn>
                    <ScoreSample>
                      <SmallTitle>Score: </SmallTitle>
                      {scoreSample.map((sample: string, i: number) => {
                        if (sample !== "") {
                          return (
                            <a
                              href={sample}
                              key={`sample-${i}`}
                              target="__blank"
                              rel="noopener noreferrer"
                              aria-label="pdf download of score"
                            >
                              <ScoreIcon />
                            </a>
                          )
                        } else return null
                      })}
                    </ScoreSample>

                    <Column>
                      <SmallTitle>Instrumentation: </SmallTitle>
                      <Instrumentation>{allInstrumentation}</Instrumentation>
                    </Column>
                  </InfoColumn>
                  <Movements>
                    <SmallTitle>Movements: </SmallTitle>
                    {allMovements}
                  </Movements>
                </BigColumn>
              </>
            )}
            {duration && <Duration>{duration}</Duration>}
          </InfoWrapper>
        )
      })

    return (
      <FrontAndBackPage
        className={`page-${index}`}
        key={`${nexTitle}-${index}`}
        z={concertPieces.length - index}
      >
        <PiecesInfo className={`pieces__info-${index}`}>
          <PiecesInfoWrap className={`pieces__info-wrap-${index}`}>
            {pieceTemplates}
          </PiecesInfoWrap>
        </PiecesInfo>

        <TableOfContents className={`toc-${index}`}>
          <TOCWrap className={`toc-wrap-${index}`}>
            <Genre>{nexTitle}</Genre>
            {allPlaylist}
          </TOCWrap>
          {tabName && !mobile && (
            <>
              <PageTab
                activeTab={activePage === index}
                className={`tab-${index}-front`}
                onClick={() => {
                  handlePageTurn(index, concertPieces.length - index)
                }}
                yOffset={index}
              >
                {tabName}
              </PageTab>
              <PageTabBack
                activeTab={activePage === index}
                className={`tab-${index}-back`}
                onClick={() => {
                  handlePageTurn(index, concertPieces.length - index)
                }}
                yOffset={index}
              >
                <span>{tabName}</span>
              </PageTabBack>
            </>
          )}
        </TableOfContents>
      </FrontAndBackPage>
    )
  })

  return (
    <Wrapper id="Concert-Music">
      <HeaderWrapper>
        <Header ref={header}>Concert Music</Header>
        <HeaderLine ref={headerLine} />
      </HeaderWrapper>
      {mobile && <MobileControls>{allButtons}</MobileControls>}
      <MobileWrapper className="mobile__wrapper">
        <MusicBook ref={musicBook}>{allConcert}</MusicBook>
      </MobileWrapper>
      <MobileWrapper1>
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
      </MobileWrapper1>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  height: 139.6vw;
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
  height: 5vw;
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
  ${Heading1};
  color: ${colors.brightPurple};
  transform: translate(-5.6vw, 100%);
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
  background: ${colors.brightPurple};
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
const MobileControls = styled.div`
  ${media.mobile} {
    display: flex;
    flex-wrap: wrap;
    width: 89.4vw;
    margin-left: 6.8vw;
    justify-content: center;
    margin-top: 24.2vw;
  }

  ${media.tabletPortrait} {
    width: 462px;
    margin-left: 35px;
    margin-top: 125px;
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
  ${Body1};
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
  ${SubHeader};
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

const MobileWrapper1 = styled.div`
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

const FrontAndBackPage = styled.div<{ z: number }>`
  position: absolute;
  left: 32.2vw;
  top: 0;
  perspective: 200vw;
  transform: rotateY(0);
  transform-origin: left;
  transform-style: flat;
  width: 32.2vw;
  height: 46.6vw;
  z-index: ${props => props.z};
  border: none;

  ${media.mobile} {
    width: 87vw;
    height: 127.1vw;
    left: auto;
  }
  ${media.tabletPortrait} {
    width: 450px;
    height: 657px;
  }
`

const TableOfContents = styled.div`
  position: absolute;
  width: 32.2vw;
  height: 46.6vw;
  left: 0;
  top: 0;

  z-index: 0;
  transform: rotateY(0);
  transform-origin: left;

  background: linear-gradient(
    187.02deg,
    #f9f9f8 8.67%,
    #e0e0e0 30.13%,
    #fafafa 50.52%,
    #e3e3e3 87.66%
  );
  border: 0.1vw solid #f0f0f0;
  box-sizing: border-box;
  padding: 2.5vw 0 0 3.1vw;

  ${media.mobile} {
    width: 87vw;
    height: 127.1vw;
    padding: 2.4vw 0 0 9.2vw;
  }
  ${media.tabletPortrait} {
    width: 450px;
    height: 657px;
    padding: 12px 0 0 47px;
  }
`

const PiecesInfo = styled.div`
  position: absolute;
  width: 32.2vw;
  height: 46.6vw;
  transform: rotateY(0);
  transform-origin: left;
  left: 0;
  top: 0;
  z-index: 1;
  background: linear-gradient(
    91.3deg,
    #dbdbdb 4.24%,
    #f5f5f5 32.97%,
    #ffffff 91.8%
  );
  border: 0 solid #f0f0f0;
  box-sizing: border-box;
  padding: 3.6vw 2.3vw 2.3vw 2.4vw;
  ${media.mobile} {
    width: 100%;
    height: 100%;
    padding-left: 4.8vw;
  }
  ${media.tabletPortrait} {
    padding-left: 25px;
  }
`

const MusicBook = styled.div`
  position: absolute;
  width: 71.5vw;
  height: 47vw;
  left: 14.3vw;
  top: 40.3vw;

  ${media.mobile} {
    position: relative;
    top: 0;
    left: 90.3vw;
    width: 87vw;
    height: 127.1vw;
    margin-right: 7vw;
  }
  ${media.tabletPortrait} {
    left: 467px;
    width: 450px;
    height: 657px;
    margin-right: 36px;
  }
`

const PageTab = styled.button<{ yOffset: number; activeTab: boolean }>`
  width: 8vw;
  height: 3.1vw;
  ${Body1};
  position: absolute;
  background: linear-gradient(
    ${props =>
      props.activeTab
        ? `270deg, #17161b 10.32%, #fefefe 88.1%, #fefefe00 100%`
        : `270deg, #F4F4F4 10.32%, #F4F4F4 88.1%, #fefefe00 100%`}
  );
  border-radius: 10% 15% 15% 10% / 10% 48% 40% 10%;
  right: -7.1vw;
  top: ${props => props.yOffset * 2.6 + 3.6}vw;
  color: ${props => (props.activeTab ? "#f8ffce" : "#2e2e2e")};
  opacity: 1;
  box-shadow: 0px 0.5vw 0.3vw rgba(0, 0, 0, 0.25);
  z-index: 1;

  ${media.mobile} {
    position: relative;
    background: transparent;
    appearance: none;
    -webkit-appearance: none;
    ${Body1};
    border: 0.1vw solid white;
    border-width: min(2px);
    box-sizing: border-box;
    font-size: 4.3vw;
    height: 9.7vw;
    width: 24.2vw;
    border-radius: 1.4vw;
    box-shadow: none;
    top: auto;
    right: auto;
    color: ${props => (props.activeTab ? "#f8ffce" : "#d6fff6")};
    border-color: ${colors.activeTeal};
    margin-right: 5.6vw;
    margin-top: 4.8vw;
  }
  ${media.tabletPortrait} {
    ${Body1};
    border: 2px solid white;
    border-width: min(2px);

    border-radius: 2px;
    font-size: 22px;
    height: 50px;
    border-radius: 8px;
    width: 125px;

    margin-right: 29px;
    margin-top: 25px;
  }
`

const PageTabBack = styled.button<{ yOffset: number; activeTab: boolean }>`
  width: 8vw;
  height: 3.1vw;
  position: absolute;
  ${Body1};
  background: linear-gradient(
    ${props =>
      props.activeTab
        ? `270deg, #17161b 10.32%, #fefefe 88.1%, #fefefe00 100%`
        : `270deg, #F4F4F4 10.32%, #F4F4F4 88.1%, #fefefe00 100%`}
  );
  border-radius: 10% 15% 15% 10% / 10% 48% 40% 10%;
  right: -7.1vw;
  top: ${props => props.yOffset * 2.6 + 3.6}vw;
  color: ${props => (props.activeTab ? "#f8ffce" : "#2e2e2e")};
  opacity: 1;
  z-index: 0;

  span {
    position: absolute;
    top: 0.9vw;
    transform: rotateY(180deg);
    transform-origin: "50% 50%";
    right: 1.9vw;
  }
  ::after {
    content: "";

    position: absolute;
    top: 0;
    right: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    box-shadow: 0.6vw -0.5vw 0.8vw -0.4vw rgba(0, 0, 0, 0.25);
    -webkit-box-shadow: 0.6vw -0.5vw 0.8vw -0.4vw rgba(0, 0, 0, 0.25);
    border-radius: 0 15% 15% 10% / 10% 48% 40% 10%;
  }
  ${media.mobile} {
    display: none;
  }
`

const TOCWrap = styled.div`
  transform: rotateY(180deg);
  transform-origin: "50% 50%";
  position: absolute;
  right: 4.9vw;
`

const PiecesInfoWrap = styled.div``

const Piece = styled.p<{ activePiece: boolean }>`
  ${Playlist};
  margin-bottom: 2vw;
  cursor: pointer;
  position: relative;
  width: fit-content;
  transition: 0.1s;
  :after {
    content: "";
    width: 100%;
    position: absolute;
    left: 0;
    bottom: -5px;
    background: ${colors.deepPurple};
    opacity: 0.5;
    height: 3px;
    border-radius: 3px;
    transform: scaleX(${props => (props.activePiece ? 1 : 0)});
    transition: 0.3s;
    transform-origin: 0% 0%;
  }
  ${media.mobile} {
    font-size: 3.9vw;
    padding-bottom: 4vw;
    margin-bottom: 0;
    :after {
      bottom: auto;
      top: 6vw;
    }
  }
  ${media.tabletPortrait} {
    font-size: 20px;
    padding-bottom: 21px;
    margin-bottom: 0;
    :after {
      bottom: auto;
      top: 30px;
    }
  }
`

const Genre = styled.h2`
  ${ConcertTitle};
  margin-bottom: 2.1vw;
`

const InfoWrapper = styled.div<{ visible: boolean }>`
  position: absolute;
  opacity: ${props => (props.visible ? 1 : 0)};
  z-index: ${props => (props.visible ? 10 : 0)};
  transition: opacity 0.4s z-index 0.1s 0.5s;
  width: 27.5vw;
  height: 40.7vw;

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
  ${ConcertTitle};
  font-size: 1.8vw;
  text-align: left;

  ${media.mobile} {
  }
  ${media.tabletPortrait} {
    font-size: 26px;
  }
`

const Column = styled.div`
  width: 60%;

  ${media.tablet} {
  }
  ${media.mobile} {
  }
  ${media.fullWidth} {
  }
`

const Underline = styled.div`
  width: 25.7vw;
  height: 0.1vw;
  min-height: 2px;
  margin-left: 1.8vw;
  background: #272737;
  opacity: 0.75;
  border-radius: 0.1vw;

  ${media.mobile} {
    width: 69.6vw;
    height: 0.4vw;
    margin-left: 4.6vw;
  }
  ${media.tabletPortrait} {
    width: 360px;
    height: 2px;
    margin-left: 24px;
  }
`

const Year = styled.h4`
  ${SubHeader3};
  width: 100%;
  text-align: right;
  margin-top: 0.2vw;
  margin-bottom: 2vw;

  ${media.mobile} {
    margin-top: 2vw;
  }
  ${media.tabletPortrait} {
    margin-top: 10px;
    font-size: 18px;
  }
`

const Description = styled.p`
  ${BodySmall};
  margin-bottom: 1.4vw;
  color: #17161b95;

  ${media.mobile} {
    height: auto;
    font-size: 16px;
    margin-bottom: 4.8vw;
  }
  ${media.tabletPortrait} {
    height: auto;
    font-size: 20px;
    margin-bottom: 25px;
  }
`

const BigColumn = styled.div`
  position: absolute;
  top: 6vw;
  left: 2vw;
  width: 96%;
  padding-right: 3%;
  display: flex;
  flex-direction: column;

  overflow-y: scroll;
  overflow-x: hidden;
  height: 32vw;
  border: none;
  outline: none;
  ${media.mobile} {
    height: 80%;
    top: 15%;
  }
  ${media.tabletPortrait} {
    width: 90%;
  }
`

const Movements = styled.div`
  ${BodySmall};
  width: 90%;
  margin-left: 0;
  ${media.mobile} {
    font-size: 4vw;
  }
  ${media.tabletPortrait} {
    font-size: 20px;
  }
`

const InfoColumn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  ${media.mobile} {
  }
  ${media.tabletPortrait} {
  }
`
const ScoreSample = styled.div`
  width: 7.5vw;
  margin-bottom: 2.1vw;
  margin-right: 5%;
  ${media.mobile} {
    width: 38vw;
    display: flex;
  }
  ${media.tabletPortrait} {
    width: 196px;
  }
`

const Duration = styled.div`
  ${BodySmall};
  font-size: 2.1vw;
  color: #17161b95;
  position: absolute;
  right: 0;
  bottom: 0;

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
`

const Instrument = styled.div`
  ${BodySmall};
  margin-bottom: 0.2vw;
  margin-right: 0.6vw;
  color: ${colors.coolWhite};
  background: ${colors.deepPurple};
  border-radius: 0.5vw;
  padding: 0.1vw 0.4vw;

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

const ScoreIcon = styled(ScoreIconSVG)`
  width: 2.4vw;
  height: 2.4vw;

  transition: 0.3s;
  ${media.hover} {
    :hover {
      transform: scaleX(1.3);
      transition: 0.3s;
    }
  }
  ${media.mobile} {
    width: 6.8vw;
    height: 6.8vw;
    margin-left: 3.6vw;
  }
  ${media.tabletPortrait} {
    width: 35px;
    height: 35px;
    margin-left: 19px;
  }
`

const SmallTitle = styled.div`
  ${Playlist};
  color: black;
  margin-bottom: 0.8vw;

  ${media.mobile} {
    font-size: 3.9vw;
  }
  ${media.tabletPortrait} {
    font-size: 20px;
  }
`

export default MediaMusic
