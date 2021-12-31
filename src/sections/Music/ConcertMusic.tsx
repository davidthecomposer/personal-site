import React, { useRef, useEffect, useState, useCallback } from "react"
import styled from "styled-components"
import text from "styles/text"
import colors from "styles/Colors"
import media from "styles/media"
import ContactForm from "components/ContactForm"
import concertMusicBG from "assets/images/concertMusic.jpg"
import concertMusicBGM from "assets/images/concertMusicM.jpg"
import { navigate } from "gatsby"
import { ReactComponent as TrebleUnderlaySVG } from "assets/svg/trebleUnderlay.svg"
import { ReactComponent as AltoUnderlaySVG } from "assets/svg/altoUnderlay.svg"
import { ReactComponent as BassUnderlaySVG } from "assets/svg/bassUnderlay.svg"
import MainButton from "components/buttons/MainButton"
import SectionHeaders from "components/textElements/SectionHeaders"
import { gatsbyImageIsInstalled } from "gatsby-plugin-image/dist/src/components/hooks"

type props = {
  mobile: boolean
  data: any
  tags: any
}

const ConcertMusic: React.FC<props> = ({ mobile, data, tags }) => {
  const [enter, setEnter] = useState(false)
  const musicBook = useRef(null)
  const cta = useRef(null)
  const [searchValue, setSearchValue] = useState("")
  const [filterValue, setFilterValue] = useState("")
  const lastSearchValue = useRef("")
  const allTags = useRef([...tags, "All"])

  const filters = allTags.current.map((filter: string, i: number) => {
    return (
      <FilterButton onClick={() => setFilterValue(filter)} key={`filter-${i}`}>
        {filter}
      </FilterButton>
    )
  })

  // const allConcert = data.map((genre: any, index: number) => {
  //   const { nexTitle, playList, allPieces, tabName } = genre

  //   const {
  //     title,
  //     year,
  //     movements,
  //     instrumentation,
  //     duration,
  //     key,
  //     ensemble: { backgroundColor, button, ensembleName },
  //   } = genre

  //   const allInstrumentation = instrumentation.map((ins: any, i: any) => {
  //     return <Instrument key={`${key}-inst-${i}`}>{ins}</Instrument>
  //   })

  //   return (
  //     <PieceCard key={key} bGColor={backgroundColor}>
  //       <PieceTitle>{title}</PieceTitle>
  //       <Instrumentation>{allInstrumentation}</Instrumentation>
  //       <Year>{year}</Year>
  //       <Duration>{duration}</Duration>
  //       <Movements>{movements.length}</Movements>
  //       <MainButton backgroundColor={button} borderColor={button}>
  //         More
  //       </MainButton>
  //       {index % 3 === 0 ? (
  //         <BassUnderlay />
  //       ) : index % 2 === 0 ? (
  //         <AltoUnderlay />
  //       ) : (
  //         <TrebleUnderlay />
  //       )}
  //     </PieceCard>
  //   )
  // })

  const renderPieces = (data: any) => {
    return data.map((genre: any, index: number) => {
      const { nexTitle, playList, allPieces, tabName } = genre

      const {
        title,
        year,
        movements,
        instrumentation,
        duration,
        key,
        ensemble: { backgroundColor, button, ensembleName },
      } = genre

      const allInstrumentation = instrumentation.map((ins: any, i: any) => {
        return <Instrument key={`${key}-inst-${i}`}>{ins}</Instrument>
      })

      return (
        <PieceCard key={key} bGColor={backgroundColor}>
          <PieceTitle>{title}</PieceTitle>
          <Instrumentation>{allInstrumentation}</Instrumentation>
          <Year>{year}</Year>
          <Duration>{duration}</Duration>
          <Movements>{movements.length}</Movements>
          <MainButton
            backgroundColor={button}
            borderColor={button}
            onClick={() => navigate(`/music/${key}`)}
          >
            More
          </MainButton>
          {index % 3 === 0 ? (
            <BassUnderlay />
          ) : index % 2 === 0 ? (
            <AltoUnderlay />
          ) : (
            <TrebleUnderlay />
          )}
        </PieceCard>
      )
    })
  }

  const filterPieces = useCallback(
    (pieces: any) => {
      let newArticles = [...pieces]

      if (searchValue && searchValue !== lastSearchValue.current) {
        if (filterValue !== "All") {
          setFilterValue("All")
        }
        lastSearchValue.current = searchValue
        newArticles = pieces.filter((piece: any) => {
          let myTags = piece?.instrumentation?.join(" ").toLowerCase()
          console.log(myTags, "tags")
          if (
            piece.ensemble.ensembleName
              .toLowerCase()
              .includes(searchValue.toLowerCase())
          ) {
            return piece
          }
          if (piece.title.toLowerCase().includes(searchValue.toLowerCase())) {
            return piece
          }
          if (piece.year.toLowerCase().includes(searchValue.toLowerCase())) {
            return piece
          }
          if (myTags.includes(searchValue.toLowerCase())) {
            return piece
          }
        })
      } else if (filterValue) {
        console.log("filtering")
        newArticles = pieces.filter((piece: any) => {
          if (filterValue === "All") {
            return piece
          } else {
            return piece.ensemble.ensembleName === filterValue
          }
        })
      }

      return newArticles
    },
    [searchValue, filterValue]
  )

  let filteredPieces = filterPieces(data)
  let renderedPieces = renderPieces(filteredPieces)

  return (
    <Wrapper id="Concert-Music">
      <SectionHeaders text="Concert Music" classRoot="concert-header" />

      <MobileWrapper className="mobile__wrapper">
        <SearchBar>
          <Filters>{filters}</Filters>
          <SearchWrapper>
            <Label>Search:</Label>
            <Search
              value={searchValue}
              onChange={e => {
                setSearchValue(e.target.value)
              }}
            />
          </SearchWrapper>
        </SearchBar>
        <ConcertPiecesContainer ref={musicBook}>
          <TopLabels>
            <Label>Title</Label>
            <Label>Instruments</Label>
            <Label>Year</Label>
            <Label>Duration</Label>
            <Label>Movements</Label>
          </TopLabels>
          {renderedPieces}
        </ConcertPiecesContainer>
      </MobileWrapper>
      <BottomSection>
        <CTA ref={cta} enter={enter}>
          <Row>
            <HeadLine>Want to Collaborate?</HeadLine>
            <MainButton
              onClick={() => {
                setEnter(mobile ? !enter : true)
              }}
              backgroundColor={colors.storyBlue}
              borderColor={colors.coolWhiteLight}
            >
              GET IN <br /> TOUCH
            </MainButton>
          </Row>
          <Text>
            I am always on the lookout for passionate musicians, or music lovers
            who are looking to collaborate on or commission art music. If you
            are an author, musician or patron looking for new music send me a
            message and let's create something amazing!
          </Text>
        </CTA>
        <ContactForm
          setEnter={setEnter}
          enter={enter}
          leftVal={mobile ? "100%" : "63.4vw"}
          topVal={mobile ? "0" : "2vw"}
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
  color: ${colors.coolWhite};
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
  ${text.desktop.h3};
  color: ${colors.coolWhite};
  width: 26vw;
  margin-bottom: 1.7vw;

  ${media.mobile} {
    font-size: 8.7vw;
  }
  ${media.tabletPortrait} {
    font-size: 45px;
  }
`

const BottomSection = styled.div`
  position: relative;
  height: 31.25vw;
  margin-bottom: 9.38vw;
  ${media.mobile} {
  }
  ${media.tabletPortrait} {
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
  width: 100%;
  height: 8.75vw;
  display: flex;
  align-items: center;
  color: ${colors.coolWhite};
  background: ${props => props.bGColor};
  opacity: 0.8;
  transition: 0.4s;


  ${media.hover} {
    :hover {
      opacity: 1;
    svg {
      path {
          stroke-opacity: 0.2;
          fill-opacity: 0.2;
          transition: 0.4s;
        }

    }

    }
  }
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
  path {
    transition: 0.4s;
  }
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
  path {
    transition: 0.4s;
  }
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
  path {
    transition: 0.4s;
  }
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

const SearchBar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 87.5vw;
  height: 4.38vw;
  border: 0.31vw solid #344546;
  box-sizing: border-box;
  align-items: center;
  border-radius: 0.25vw;
  margin: 6.25vw auto 0;
  ${media.tablet} {
  }
  ${media.mobile} {
  }
  ${media.fullWidth} {
  }
`

const Filters = styled.div`
  ${media.tablet} {
  }
  ${media.mobile} {
  }
  ${media.fullWidth} {
  }
`

const Search = styled.input`
  background: transparent;
  border: none;
  border-bottom: 2px solid #ffffff;
  outline: none;
  ${text.desktop.h6};
  margin-right: 1.88vw;
  height: 2.5vw;
  caret-color: ${colors.coolWhiteLight};
  color: ${colors.coolWhite};

  ${media.tablet} {
  }
  ${media.mobile} {
  }
  ${media.fullWidth} {
  }
`

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;

  ${Label} {
    width: fit-content;
    margin-right: 0.63vw;
  }

  ${media.tablet} {
  }
  ${media.mobile} {
  }
  ${media.fullWidth} {
  }
`

const FilterButton = styled.button`
  position: relative;
  width: auto;
  margin-right: 1.88vw;
  ${text.desktop.h6};
  color: ${colors.coolWhite};
  appearance: none;
  -webkit-appearance: none;
  background: transparent;

  border: none;

  appearance: none;
  transition: 0.4s;
  transition-timing-function: cubic-bezier(0.7, 0, 0.2, 1);
  z-index: 8;

  box-sizing: border-box;
  cursor: pointer;
  ${media.hover} {
    :hover {
      color: ${colors.storyBlue};
    }
  }

  ${media.tablet} {
  }
  ${media.mobile} {
  }
  ${media.fullWidth} {
  }
`
export default ConcertMusic
