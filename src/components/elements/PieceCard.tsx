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
  const mobile = useContext(MobileContext)
  const handlePlay = () => {
    if (value.setActiveTracks && audioRef) {
      audioRef.play()
      value.setActiveTracks({ audioRef: audioRef, title: title, year: year })
      //going to need to send in an object with anmy nmeeded Data (title image audioRef, composer etc)
    }
  }

  return (
    <PieceCard bGColor={backgroundColor}>
      {mobile && (
        <TopLabels>
          <Label>Title</Label>
          <Label>Instruments</Label>
          <Label>Year</Label>
          <Label>Duration</Label>
          <Label>Movements</Label>
        </TopLabels>
      )}
      <MobileWrapper>
        <PieceTitle>{title}</PieceTitle>
        <Instrumentation>{allInstrumentation}</Instrumentation>
        <Year>{year}</Year>
        <Duration>{duration}</Duration>
        <Movements>{movementNumber}</Movements>
      </MobileWrapper>
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
  ${media.mobile} {
    height: 60vw;
    padding: 4vw;
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
  ${media.mobile} {
    ${text.mobile.h5};
    height: 20%;
    margin: 0;
    width: 100%;
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
  ${media.tablet} {
  }
  ${media.mobile} {
    width: 100%;
    height: 100%;
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
  ${media.tablet} {
  }
  ${media.mobile} {
    width: 100%;
    height: 100%;
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

  ${media.fullWidth} {
    width: 1326px;
    height: 138px;
    left: 0;
    top: 2px;
  }
  ${media.tablet} {
  }
  ${media.mobile} {
    width: 100%;
    height: 100%;
  }
`

const Year = styled.h4`
  ${text.desktop.bodyM};
  width: 10vw;
  text-align: left;
  margin-left: 1.88vw;

  ${media.fullWidth} {
    ${text.fullWidth.bodyM};
    margin-left: 0;
    width: 160px;
  }
  ${media.mobile} {
    ${text.mobile.bodyM};
    height: 15%;
    margin: 0;
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
  ${media.mobile} {
    ${text.mobile.bodyM};
    height: 15%;
    margin: 0;
    padding: 0;
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
  ${media.mobile} {
    ${text.mobile.bodyM};
    height: 15%;
    margin: 0;
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
  ${media.mobile} {
    width: 100%;
    height: 25%;
    margin: 0;
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
  ${media.mobile} {
    position: absolute;
    z-index: 100;
    right: 6vw;
    bottom: 6vw;
    height: 20vw;
    width: 50%;

    margin: 0;
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

const TopLabels = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  ${media.tablet} {
  }
  ${media.mobile} {
  }
  ${media.fullWidth} {
  }
`

const MobileWrapper = styled.div`
  display: flex;
  ${media.tablet} {
  }
  ${media.mobile} {
    flex-direction: column;
    height: 100%;
    margin-left: 8vw;
    width: 70%;
  }
`

const Label = styled.p`
  ${media.tablet} {
  }
  ${media.mobile} {
    ${text.mobile.h6};
    height: 15%;
    :nth-of-type(1) {
      height: 20%;
    }
    :nth-of-type(2) {
      height: 25%;
    }
  }
`

export default ConcertPiece
