import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useContext,
} from "react"
import styled from "styled-components"
import text from "assets/styles/text"
import colors from "assets/styles/colors"
import media from "assets/styles/media"
import ContactForm from "components/ContactForm"
import concertMusicBG from "assets/images/concertMusic.jpg"
import concertMusicBGM from "assets/images/concertMusicM.jpg"
import MainButton from "components/buttons/MainButton"
import SectionHeaders from "components/textElements/SectionHeaders"

import PieceCard from "components/elements/PieceCard"

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

  const renderPieces = (data: any) => {
    return data
      .sort((a: any, b: any) => b.year - a.year)
      .map((genre: any, index: number) => {
        const {
          title,
          year,
          movements,
          instrumentation,
          duration,
          key,
          audio,
          ensemble: { backgroundColor, button, ensembleName },
        } = genre

        const allInstrumentation = instrumentation.map((ins: any, i: any) => {
          return <Instrument key={`${key}-inst-${i}`}>{ins}</Instrument>
        })
        const movementNumber = movements ? movements.length : 1

        return (
          <PieceCard
            myKey={key}
            title={title}
            allInstrumentation={allInstrumentation}
            year={year}
            duration={duration}
            movementNumber={movementNumber}
            button={button}
            audio={audio?.file.url}
            backgroundColor={backgroundColor}
            index={index}
          />
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
              limit
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
  padding: 15.4vw 0 0 0;
  background-size: cover;
  position: relative;
  box-sizing: border-box;
  background-image: url(${concertMusicBG});

  /* -webkit-transform: translate3d(0, 0, 0);
  -webkit-transform-style: preserve-3d;
  -webkit-backface-visibility: hidden; */

  ${media.fullWidth} {
    padding: 246px 0 0 0;
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
`

const Text = styled.div`
  ${text.desktop.bodyS};
  width: 19.3vw;
  color: ${colors.coolWhite};
  ${media.mobile} {
    font-size: 3.9vw;
    width: 81.6vw;
  }

  ${media.fullWidth} {
    ${text.fullWidth.bodyS};
    width: 309px;
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
    height: 317px;
    left: 101px;
    top: 32px;
    z-index: 3;

    ${Text} {
      width: 576px;
    }
  }
`

const HeadLine = styled.h3`
  ${text.desktop.h3};
  color: ${colors.coolWhite};
  width: 26vw;
  margin-bottom: 1.7vw;

  ${media.fullWidth} {
    ${text.fullWidth.h3};
    width: 416px;
    margin-bottom: 27.2px;
  }
`

const BottomSection = styled.div`
  position: relative;
  height: 31.25vw;
  margin-bottom: 9.38vw;

  ${media.fullWidth} {
    height: 500px;
    margin-bottom: 150px;
  }
`

const ConcertPiecesContainer = styled.div`
  position: relative;
  width: 87.5vw;
  padding: 2.25vw;
  background: rgba(23, 27, 28, 0.73);
  border-radius: 0.25vw;
  margin: 3.38vw auto 19.44vw;

  ${media.fullWidth} {
    width: 1400px;
    padding: 36px;
    background: rgba(23, 27, 28, 0.73);
    border-radius: 4px;
    margin: 54px auto 311px;
  }
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

  ${media.fullWidth} {
    ${text.fullWidth.bodyS};
    border-radius: 8px;
    padding: 1.6px 6.4px;
    margin-right: 10.08px;
    margin-bottom: 10.08px;
  }
`

const TopLabels = styled.div`
  display: flex;
  width: 100%;
  height: 2.25vw;
  align-items: center;
  margin-bottom: 1.25vw;
  padding: 0 1.88vw;

  ${media.fullWidth} {
    height: 36px;
    margin-bottom: 20px;
    padding: 0 30.08px;
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
    :nth-of-type(1) {
      //Title
      width: 256px;
    }
    :nth-of-type(2) {
      //Instruments
      width: 284px;
    }
    :nth-of-type(3) {
      //Year
      width: 147.04px;
    }
    :nth-of-type(4) {
      //Duration
      width: 148px;
    }
    :nth-of-type(5) {
      //Movements
    }
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

  ${media.fullWidth} {
    width: 1400px;
    height: 70px;
    border: 5px solid #344546;

    border-radius: 4px;
    margin: 100px auto 0;
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
    ${text.fullWidth.h6};
    margin-right: 30.08px;
    height: 40px;
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

  ${media.fullWidth} {
    ${text.fullWidth.h6};
    margin-right: 30.08px;
  }
`

export default ConcertMusic
