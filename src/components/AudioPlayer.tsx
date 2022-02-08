import React, { useEffect, useRef, useState, useContext } from "react"
import styled from "styled-components"
import text from "assets/styles/text"
import colors from "styles/colors"
import gsap from "gsap"
import media from "assets/styles/media"
import { MobileContext, AudioPlayerContext } from "components/ContextStore"
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

type ActiveTrack = {
  audioRef: React.SetStateAction<HTMLAudioElement | null>
  title: string
  year: string
}
type Props = {
  activeTracks: any
}

const AudioPlayer: React.FC<Props> = ({ activeTracks }) => {
  const { audioRef, title, year } = activeTracks
  const playList = useRef(null)
  const [playPushed, setPlayPushed] = useState(false)
  const mobile = useContext(MobileContext)
  const [canProgress, setCanProgress] = useState<boolean>(false)
  const shouldAutoPlay = useRef(false)
  const playTrack = useRef(true)
  const [player, setPlayer] = useState<HTMLAudioElement | null>(null)
  const setActiveTracks = useContext(AudioPlayerContext).setActiveTracks
  const row = useRef<HTMLDivElement | null>(null)
  const [timeRemaining, setTimeRemaining] = useState("0:00")
  const [progressCheck, setProgressCheck] = useState<number>(0)
  const progress = useRef<HTMLDivElement | null>(null)
  const progressChecked = useRef<number>(1)
  const lastActive = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (player) {
      player.addEventListener("durationchange", getDuration)
      player.addEventListener("timeupdate", getDuration)
      player.addEventListener("ended", handleEnd)
      player.addEventListener("pause", handlePause)
      setCanProgress(true)
      setPlayPushed(true)
      progressChecked.current = 1
      return () => {
        player.removeEventListener("durationchange", getDuration)
        player.removeEventListener("timeupdate", getDuration)
        player.removeEventListener("ended", handleEnd)
        player.removeEventListener("pause", handlePause)
      }
    }
  }, [player])

  useEffect(() => {
    if (lastActive.current) {
      console.log("importedRef")
      lastActive.current.pause()
    }

    lastActive.current = audioRef
    setPlayer(audioRef)

    return () => {
      setPlayer(null)
    }
  }, [audioRef])

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
        setProgressCheck(time)
      }
    }
  }

  const handleClick = (e: any) => {
    setPlayPushed(!playPushed)
    playTrack.current = !playTrack.current
    if (playTrack.current && player) {
      //@ts-ignore
      player.play()
      setCanProgress(true)
    } else {
      console.log("pause"),
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

  const handlePause = () => {
    console.log("why")
    playTrack.current = !playTrack.current
    setPlayPushed(false)
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

  ${media.tablet} {
    width: 50vw;
    height: 120px;
    right: 10px;
    padding: 10px;
    margin: 0;
  }
  ${media.mobile} {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 16vw;
    left: 0;
    top: auto;
    bottom: 0;
    margin: 0;
    min-height: 6.94vw;
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
  ${media.tablet} {
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

  ${media.tablet} {
    width: 100%;
    position: relative;
    height: 50px;
    left: auto;
    top: auto;
  }
  ${media.mobile} {
    position: relative;
    width: 12vw;
    height: 12vw;
    left: 0;
    top: 0;
    padding: 0;
    align-items: flex-start;
    background: none;
  }
`

const PlayButton = styled(PlayButtonSVG)`
  opacity: 1;
  position: relative;
  width: 100%;
  height: 100%;
  transition: 0.4s;
  ${media.tablet} {
  }
`

const PauseButton = styled(PauseButtonSVG)`
  opacity: 1;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  transition: 0.4s;
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
  -webkit-appearance: none;
  appearance: none;
  border: none;
  outline: none;

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
  ${media.tablet} {
    width: 40px;
    height: 40px;
  }
  ${media.mobile} {
    width: 100%;
    height: 100%;
    margin: 0;
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

  ${media.tablet} {
    ${text.tablet.bodyS};
    height: 50px;
    width: 100%;
    margin: 5px 0 0 0;
  }
  ${media.mobile} {
    height: 10vw;
    width: 80%;
    margin: 0;
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
  ${media.tablet} {
    width: 100%;
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
