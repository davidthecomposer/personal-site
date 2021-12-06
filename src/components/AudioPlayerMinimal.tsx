import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { Body1 } from "styles/text"
import colors from "styles/Colors"
import media from "styles/media"
import gsap from "gsap"
import { ReactComponent as PlayButtonSVG } from "assets/svg/playButton.svg"
import { ReactComponent as PauseButtonSVG } from "assets/svg/pauseButton.svg"

type Props = {
  track: string
  title: string
  initialTime: string
  id: number
}

const AudioPlayerMinimal: React.FC<Props> = ({
  track,
  title,
  initialTime,
  id,
}) => {
  const [playing, setPlaying] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState("0:00")
  const shouldAutoPlay = useRef(false)
  const row = useRef<HTMLDivElement>(null)
  const player = useRef<HTMLAudioElement>(null)
  const progress = useRef<HTMLDivElement>(null)
  const [progressPos, setProgressPos] = useState(0)
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

  const handleProgress = (e: any) => {
    if (row.current && player.current && track !== "") {
      const width = row.current.getBoundingClientRect().width
      const x = e.clientX - row.current.getBoundingClientRect().left

      const newTime = Math.floor((x / width) * player.current.duration)

      player.current.currentTime = newTime

      setProgressPos(newTime)
    }
  }

  useEffect(() => {
    if (player.current && track) {
      const tl = gsap.timeline({
        paused: true,

        onUpdate: () => {
          if (player.current) {
            const time = player.current.currentTime
            const duration = player.current.duration
            const percentage = `${(time / duration).toFixed(4)}`

            gsap.set(progress.current, { scaleX: percentage, ease: "none" })
          }
        },
      })
      tl.to(
        progress.current,
        { opacity: 1, duration: player?.current.duration },
        0
      )

      if (playing) {
        player.current.play()
        tl.play()
      } else {
        const time = player.current.currentTime
        const duration = player.current.duration
        const percentage = `${(time / duration).toFixed(4)}`
        gsap.set(progress.current, { scaleX: percentage, ease: "none" })
        player.current.pause()
        tl.pause()
      }
    }
  }, [playing, track, progressPos])

  const handleEnd = () => {
    if (player.current) {
      player.current.currentTime = 0
      player.current.pause()
    }
    if (!shouldAutoPlay.current) {
      setPlaying(false)
    }
  }

  const handleClick = (e: any) => {
    e.stopPropagation()
    setPlaying(!playing)
  }

  const getDuration = () => {
    if (player.current) {
      const time =
        //@ts-ignore
        Math.floor(player.current.duration) -
        //@ts-ignore
        Math.floor(player.current.currentTime)
      const timeRemainingFormat = returnTimeString(time)
      setTimeRemaining(timeRemainingFormat)
    }
  }

  return (
    <Track>
      <Player
        onDurationChange={getDuration}
        onTimeUpdate={getDuration}
        onEnded={handleEnd}
        src={track}
        ref={player}
        muted={false}
        preload="metadata"
        playsInline
      />
      <Row1 ref={row} playing={playing} onClick={handleProgress}>
        <Text playing={playing}>{`${id + 1}. ${title}`}</Text>
        {track && (
          <>
            <Play
              aria-label="play and pause button"
              onClick={e => handleClick(e)}
              play={playing}
            >
              <PauseButton />
              <PlayButton />
            </Play>
            <Progress ref={progress} playing={playing}></Progress>
          </>
        )}
        <TextTime playing={playing}>{timeRemaining}</TextTime>
      </Row1>
    </Track>
  )
}

const Text = styled.div<{ playing: boolean }>`
  ${Body1};
  position: relative;
  margin-left: 2.5%;
  z-index: 0;
  color: ${props => (props.playing ? colors.deepPurple : "black")};
  font-size: clamp(16px, 18px, 20px);
  pointer-events: none;
  ${media.mobile} {
    font-size: clamp(16px, 3.4vw, 18px);
  }
  ${media.tabletPortrait} {
    font-size: 17px;
  }
`

const TextTime = styled.div<{ playing: boolean }>`
  ${Body1};
  position: absolute;
  right: 2.5%;
  opacity: ${props => (props.playing ? 1 : 0)};
  transition: opacity 0.4s;
  z-index: 0;
  color: ${colors.deepPurple};
  pointer-events: none;
  ${media.mobile} {
    font-size: 3.4vw;
  }
  ${media.tabletPortrait} {
    font-size: 17px;
  }
`

const PlayButton = styled(PlayButtonSVG)`
  opacity: 1;
  position: relative;
  width: 1vw;
  height: 0.7vw;
  margin-left: 0.1vw;
  ${media.tablet} {
  }
  ${media.mobile} {
    width: 2.4vw;
    height: 2.4vw;
  }
  ${media.tabletPortrait} {
    width: 12px;
    height: 12px;
  }
`

const Row1 = styled.div<{ playing: boolean }>`
  display: flex;
  justify-content: space-between;
  position: relative;
  z-index: 1;
  width: 90%;
  height: 1.3vw;
  margin-bottom: 0.7vw;
  /* background: ${props => (props.playing ? "#00000095" : "none")}; */
  background: transparent;
  align-items: center;

  ${media.mobile} {
    height: 8vw;
  }
  ${media.tabletPortrait} {
    height: 41px;
  }
`

const PauseButton = styled(PauseButtonSVG)`
  opacity: 1;
  position: absolute;
  width: 1vw;
  height: 1.2vw;
  ${media.mobile} {
    width: 4vw;
    height: 4vw;
  }
  ${media.tabletPortrait} {
    width: 12px;
    height: 12px;
  }
`
const Play = styled.button<{ play: boolean }>`
  position: absolute;

  left: ${props => (props.play ? "102%" : "calc(100% - 2vw)")};
  transition: left 0.5s;
  width: 1.4vw;
  height: 1.4vw;
  border-radius: 100%;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${colors.formSkinPurprle};
  z-index: 5;
  ${PlayButton} {
    opacity: ${props => (props.play ? 0 : 1)};
  }

  ${PauseButton} {
    opacity: ${props => (props.play ? 1 : 0)};
  }
  ${media.mobile} {
    width: 7vw;
    height: 7vw;
    left: ${props => (props.play ? "102%" : "calc(100% - 10vw)")};
  }
  ${media.tabletPortrait} {
    width: 36px;
    height: 36px;
    left: ${props => (props.play ? "102%" : "calc(100% - 51px)")};
  }
`

const Track = styled.div`
  ${Body1};
  width: 100%;

  cursor: pointer;
  transition: 0.3s;
  ${media.hover} {
    transition: 0.3s;
    :hover {
      ${Text} {
        color: #242424;
        transition: 0.3s;
      }
    }
  }
`

const Progress = styled.div<{ playing: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 3;
  /* opacity: ${props => (props.playing ? 1 : 0)}; */
  /* background: linear-gradient(
    #0d4e62 6.72% rgba(29, 79, 135, 0.9446) 29.69% rgba(21, 87, 130, 0.9009)
      47.65% rgba(5, 87, 113, 0.83) 91.15%
  ); */
  background: linear-gradient(to right, #5b186190, #3f829c9b);
  transform: scaleX(0);
  transform-origin: 0% 0%;
`

const Player = styled.audio`
  height: 0;
  width: 0;
  position: relative;
  padding: 0;
  display: none;
`

export default AudioPlayerMinimal
