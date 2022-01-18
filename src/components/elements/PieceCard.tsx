import React, {
  useEffect,
  useRef,
  useCallback,
  useContext,
  useState,
} from "react"
import styled from "styled-components"
import text from "assets/styles/text"
import { MobileContext } from "components/layout"
import colors from "assets/styles/colors"
import media from "assets/styles/media"
import MainButton from "components/buttons/MainButton"
import { AudioPlayerElement } from "components/AudioPlayer"
import { navigate } from "gatsby"
import { ReactComponent as TrebleUnderlaySVG } from "assets/svg/trebleUnderlay.svg"
import { ReactComponent as AltoUnderlaySVG } from "assets/svg/altoUnderlay.svg"
import { ReactComponent as BassUnderlaySVG } from "assets/svg/bassUnderlay.svg"
import { AudioPlayerContext } from "components/layout"

type Props = {
  myKey: string
  title: string
  allInstrumentation: string[]
  year: string
  duration: string
  movementNumber: string
  button: string
  audio: string
  index: number
  backgroundColor: string
}

const ConcertPiece: React.FC<Props> = ({
  myKey,
  title,
  allInstrumentation,
  year,
  duration,
  movementNumber,
  button,
  audio,
  index,
  backgroundColor,
}) => {
  const value = useContext(AudioPlayerContext)
  const buttons = useRef<HTMLDivElement>(null)
  const [audioRef, setAudioRef] = useState<HTMLAudioElement>()

  const handlePlay = () => {
    if (value.setActiveTracks && audioRef) {
      audioRef.play()
      value.setActiveTracks({ audioRef: audioRef, title: title, year: year })
      //going to need to send in an object with anmy nmeeded Data (title image audioRef, composer etc)
    }
  }

  return (
    <PieceCard bGColor={backgroundColor}>
      <PieceTitle>{title}</PieceTitle>
      <Instrumentation>{allInstrumentation}</Instrumentation>
      <Year>{year}</Year>
      <Duration>{duration}</Duration>
      <Movements>{movementNumber}</Movements>
      <Buttons ref={buttons}>
        <MainButton
          backgroundColor={button}
          borderColor={button}
          onClick={() => navigate(`/music/${myKey}`)}
          limit
        >
          More
        </MainButton>
        {audio && movementNumber == "1" && (
          <>
            <MainButton
              backgroundColor={button}
              borderColor={button}
              onClick={handlePlay}
              limit
            >
              Play
            </MainButton>

            <AudioWrapper>
              <AudioPlayerElement
                myKey={myKey}
                getRef={setAudioRef}
                audio={audio}
              />
            </AudioWrapper>
          </>
        )}
      </Buttons>
      {index % 3 === 0 ? (
        <BassUnderlay />
      ) : index % 2 === 0 ? (
        <AltoUnderlay />
      ) : (
        <TrebleUnderlay />
      )}
    </PieceCard>
  )
}

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
  padding: 0 1.19vw 0 2.19vw;
 
  
  ${media.fullWidth} {
    height: 140px;
    border-radius: 8px;
  margin-bottom: 20px;
  padding: 0 19px 0 35px;
  }
`
const PieceTitle = styled.h3`
  ${text.desktop.h5};
  width: 16vw;
  text-align: left;

  ${media.fullWidth} {
    ${text.fullWidth.h5};
    width: 256px;
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

  ${media.fullWidth} {
    width: 1326px;
    height: 138px;
    left: 0;
    top: 2px;
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

  ${media.fullWidth} {
    width: 1326px;
    height: 138px;
    left: 0;
    top: 2px;
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
    width: 1326px;
    height: 138px;
    left: 0;
    top: 2px;
  }
`

const Year = styled.h4`
  ${text.desktop.bodyM};
  width: 10vw;
  text-align: left;
  margin-left: 1.88vw;
  ${media.mobile} {
  }
  ${media.tabletPortrait} {
  }
  ${media.fullWidth} {
    ${text.fullWidth.bodyM};
    margin-left: 0;
    width: 160px;
  }
`

const Movements = styled.div`
  ${text.desktop.bodyM};
  width: 5vw;
  padding-left: 1.25vw;

  ${media.fullWidth} {
    ${text.fullWidth.bodyM};
    width: 147px;

    padding-left: 0;
  }
`

const Duration = styled.div`
  ${text.desktop.bodyM};
  width: 9vw;
  padding-left: 0;

  ${media.fullWidth} {
    ${text.fullWidth.bodyM};
    width: 144px;
    padding-left: 0;
  }
`

const Instrumentation = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 17.75vw;
  margin-left: 1.25vw;
  ${media.fullWidth} {
    width: 284px;
    margin-left: 20px;
  }
`
const Buttons = styled.div`
  width: 17.5vw;
  display: flex;
  justify-content: space-around;
  margin-left: 1.5vw;

  ${media.fullWidth} {
    width: 280px;
    margin-left: 24px;
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

export default ConcertPiece
