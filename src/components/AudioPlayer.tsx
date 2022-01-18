import React, {
  useEffect,
  useRef,
  useState,
  useContext,
  forwardRef,
  useCallback,
} from "react"
import styled from "styled-components"
import text from "assets/styles/text"
import colors from "assets/styles/colors"
import gsap from "gsap"
import media from "assets/styles/media"
import { MobileContext, AudioPlayerContext } from "components/layout"
import { StaticQuery, graphql } from "gatsby"
import { ReactComponent as PlayButtonSVG } from "assets/svg/playButton.svg"
import { ReactComponent as PauseButtonSVG } from "assets/svg/pauseButton.svg"

type AudioElementProps = {
  audio: string
  myKey: string
  getRef: any
}

export const AudioPlayerElement: React.FC<AudioElementProps> = ({
  audio,
  myKey,
  getRef,
}) => {
  const player = useRef<HTMLAudioElement>(null)
  const [check, setCheck] = useState<boolean>(false)

  useEffect(() => {
    if (player.current) {
      getRef(player.current)
    }
  }, [myKey, check])

  return (
    <Player
      className={`audio_${myKey}`}
      src={audio}
      ref={player}
      onLoadedMetadata={() => setCheck(!check)}
      preload="metadata"
      playsInline
      controls
    />
  )
}

type Props = {}
type ActiveTrack = {
  audioRef: React.SetStateAction<HTMLAudioElement | null>
  title: string
  year: string
}
const AudioPlayer: React.FC<Props> = () => {
  const playList = useRef(null)
  const [playPushed, setPlayPushed] = useState(false)
  const mobile = useContext(MobileContext)
  const [canProgress, setCanProgress] = useState<boolean>(false)
  const shouldAutoPlay = useRef(false)
  const playTrack = useRef(true)
  const [player, setPlayer] = useState<HTMLAudioElement | null>(null)
  const importedRef = useContext(AudioPlayerContext).activeTracks?.audioRef
  const title = useContext(AudioPlayerContext).activeTracks?.title
  const year = useContext(AudioPlayerContext).activeTracks?.year
  const setActiveTracks = useContext(AudioPlayerContext).setActiveTracks
  const row = useRef<HTMLDivElement | null>(null)
  const [timeRemaining, setTimeRemaining] = useState("0:00")
  const [progressCheck, setProgressCheck] = useState<number>(0)
  const progress = useRef<HTMLDivElement | null>(null)
  const progressChecked = useRef<number>(1)

  useEffect(() => {
    if (player) {
      player.addEventListener("durationchange", getDuration)
      player.addEventListener("timeupdate", getDuration)
      player.addEventListener("ended", handleEnd)
      setCanProgress(true)
      setPlayPushed(true)
      progressChecked.current = 1
      return () => {
        player.removeEventListener("durationchange", getDuration)
        player.removeEventListener("timeupdate", getDuration)
        player.removeEventListener("ended", handleEnd)
      }
    }
  }, [player])

  useEffect(() => {
    setPlayer(importedRef)

    return () => {
      setPlayer(null)
    }
  }, [importedRef])

  const getDuration = () => {
    if (player) {
      const time =
        //@ts-ignore
        Math.floor(player.duration) -
        //@ts-ignore
        Math.floor(player.currentTime)
      const timeRemainingFormat = returnTimeString(time)
      setTimeRemaining(timeRemainingFormat)
      progressChecked.current = progressChecked.current + 1

      if (progressChecked.current < 4) {
        console.log("wth", progressChecked.current)
        setProgressCheck(time)
      }
    }
  }

  const handleClick = (e: any) => {
    setPlayPushed(!playPushed)
    playTrack.current = !playTrack.current
    if (playTrack.current) {
      //@ts-ignore
      player.play()
      setCanProgress(true)
    } else {
      //@ts-ignore
      player.pause()
      setCanProgress(false)
    }
  }

  const returnTimeString = (time: number) => {
    return `${Math.floor(time / 60)}:${
      time < 10
        ? `0${time}`
        : time % 60 < 10
        ? `0${time % 60}`
        : time % 60
        ? time % 60
        : "00"
    }`
  }
  const handleRowClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    handleProgress(e)
  }

  const handleProgress = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (row.current && player) {
      const width = row.current.getBoundingClientRect().width
      const x = e.clientX - row.current.getBoundingClientRect().left

      const newTime = Math.floor((x / width) * player.duration)

      player.currentTime = newTime

      setProgressCheck(newTime)
    }
  }

  useEffect(() => {
    if (player) {
      console.log("jumping here")
      const tl = gsap.timeline({
        paused: true,

        onUpdate: () => {
          if (player) {
            const time = player.currentTime
            const duration = player.duration
            const percentage = `${(time / duration).toFixed(4)}`

            gsap.set(progress.current, { scaleX: percentage, ease: "none" })
          }
        },
      })
      tl.to(progress.current, { duration: player.duration }, 0)

      if (canProgress) {
        tl.play()
      } else {
        const time = player.currentTime
        const duration = player.duration
        const percentage = `${(time / duration).toFixed(4)}`
        gsap.set(progress.current, { scaleX: percentage, ease: "none" })
        tl.pause()
      }
    }
  }, [canProgress, progressCheck])
  const handleEnd = () => {
    if (setActiveTracks) {
      setActiveTracks({ audioRef: null, title: "", year: "" })
    }
  }

  return (
    <Playlist activeTrack={player ? true : false} ref={playList}>
      <PlayBack>
        <Play
          aria-label="play and pause button"
          // onTouchStart={(e) => handleClick(e)}
          onClick={e => handleClick(e)}
          play={playPushed}
        >
          <PauseButton />
          <PlayButton />
        </Play>
      </PlayBack>
      <Track activeTrack={player ? true : false}>
        <Row1
          className={`media-track_row`}
          ref={row}
          onClick={e => {
            handleRowClick(e)
          }}
        >
          <Text>
            {title} ({year})
          </Text>
          <Text>{timeRemaining}</Text>
          <ProgressInner className={`media__progress`} ref={progress} />
        </Row1>
      </Track>
    </Playlist>
  )
}

const Playlist = styled.div<{ activeTrack: boolean }>`
  position: fixed;
  width: 22.5vw;
  height: 8vw;
  min-height: 8vw;
  right: 0;
  bottom: 0;
  opacity: 1;
  z-index: 10000;
  border: 0.1vw solid rgba(219, 219, 219, 0.15);
  /* card Shadow */
  background: radial-gradient(
    87.7% 87.7% at 14.86% 8.6%,
    rgba(0, 186, 227, 0.6) 0%,
    rgba(9, 45, 56, 0.65) 32.81%,
    rgba(21, 111, 131, 0.7) 78.1%,
    rgba(2, 209, 255, 0.75) 100%
  );
  border: 1px solid #000000;
  box-sizing: border-box;
  border-radius: 5px;
  box-shadow: 10px 10px 10px 5px rgba(0, 0, 0, 0.25);
  border-radius: 0.3vw;
  transform: scaleY(${({ activeTrack }) => (activeTrack ? 1 : 0)});
  transition: transform 0.3s;
  ${media.mobile} {
    position: absolute;
    width: 94vw;
    height: 145vw;
    left: auto;
    top: auto;
    margin: 0 3vw;
  }
  ${media.tabletPortrait} {
    width: 486px;
    height: 750px;

    margin: 0 15px;
  }
`

const Text = styled.div`
  ${text.desktop.bodyS};
  width: 19.3vw;
  position: relative;
  z-index: 3;
  -webkit-user-select: none;
  user-select: none;
  ${media.mobile} {
    font-size: 4.3vw;
  }
  ${media.tabletPortrait} {
    font-size: 22px;
  }
`

const PlayBack = styled.div`
  position: absolute;
  width: 21vw;
  height: 3.2vw;
  left: 0.7vw;
  top: 0.5vw;
  background: #000000;
  border-radius: 0.3vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1vw;

  ${media.mobile} {
    width: 79vw;
    height: 22.5vw;
    left: 2.7vw;
    top: 2.7vw;
    padding: 0 4.1vw;
    align-items: flex-start;
  }
  ${media.tabletPortrait} {
    width: 409px;
    height: 116px;
    left: 14px;
    top: 14px;
    padding: 0 21px;
  }
`

const PlayButton = styled(PlayButtonSVG)`
  opacity: 1;
  position: relative;
  width: 1.2vw;
  height: 1.4vw;
  transition: 0.4s;
  ${media.tablet} {
  }
  ${media.mobile} {
    width: 8vw;
    height: 8vw;
    margin-left: 1vw;
  }
  ${media.tabletPortrait} {
    width: 41px;
    height: 41px;
    margin-left: 5px;
  }
`

const PauseButton = styled(PauseButtonSVG)`
  opacity: 1;
  position: absolute;
  width: 2vw;
  height: 2vw;
  top: 0.2vw;
  left: 0.2vw;
  transition: 0.4s;
  ${media.tablet} {
  }
  ${media.mobile} {
    width: 10vw;
    height: 10vw;
    left: 2vw;
    top: 2vw;
  }
  ${media.tabletPortrait} {
    width: 51px;
    height: 51px;
    left: 10px;
    top: 10px;
  }
`
const Play = styled.button<{ play: boolean }>`
  position: relative;
  width: 2.5vw;
  height: 2.5vw;
  border-radius: 100%;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${colors.formSkinPurprle};

  ${media.hover} {
    :hover {
      ${PlayButton}, ${PauseButton} {
        transform: scale(0.8);
        transition: 0.4s;
      }
    }
  }

  ${PlayButton} {
    opacity: ${props => (props.play ? 0 : 1)};
  }

  ${PauseButton} {
    opacity: ${props => (props.play ? 1 : 0)};
  }

  ${media.mobile} {
    width: 14.5vw;
    height: 14.5vw;
    margin-top: 4vw;
    margin-left: 1vw;
  }
  ${media.tabletPortrait} {
    width: 75px;
    height: 75px;
    margin-top: 21px;
    margin-left: 5px;
  }
`

const ProgressInner = styled.div`
  width: 100%;
  height: 100%;

  position: absolute;
  left: 0;
  top: 0;
  z-index: 0;
  background: linear-gradient(
    to right,
    #ff4f9d 18.14%,
    rgba(32, 242, 255, 0.78) 78.65%
  );
  transform: scaleX(0);
  transform-origin: 0% 0%;
`

const Track = styled.div<{ activeTrack: boolean }>`
  ${text.desktop.bodyS};
  width: 94%;
  height: 2vw;
  cursor: pointer;
  transition: 0.3s;
  margin: 4.5vw auto 0;
  opacity: ${({ activeTrack }) => (activeTrack ? 1 : 0.01)};
  transition: 0.3s;
  ${media.hover} {
    :hover {
      ${Text} {
        color: ${colors.coolPurple};
        transition: 0.3s;
      }
    }
  }

  ${media.mobile} {
    height: 10vw;
  }
  ${media.tabletPortrait} {
    height: 51px;
  }
`

const Row1 = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  z-index: 1;
  background: #00000090;
  padding: 0 0.6vw 0;
  ${Text} {
    width: fit-content;
    transition: 0.3s;
    color: ${colors.coolWhite};
    line-height: 200%;
  }
`

const Player = styled.audio`
  height: 0;
  width: 0;
  position: absolute;
  padding: 0;
  display: none;
`

export default AudioPlayer
