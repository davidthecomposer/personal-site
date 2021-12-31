import React, { useEffect, useRef } from "react"
import styled from "styled-components"
import colors from "assets/styles/colors"
import text from "assets/styles/text"
import media from "assets/styles/media"
import gsap from "gsap"
// import useAnimationFrame useMedia  from "utils/Hooks";

type props = {
  left?: boolean
  text: string
  classRoot: string
}

const SectionHeaders: React.FC<props> = ({ left, text, classRoot }) => {
  const headerWrapper = useRef<HTMLDivElement>(null)

  const textArray = text.split(" ").map((word, i) => {
    return (
      <span
        key={`${classRoot}-word-${i}`}
        className={`${classRoot}_title_word`}
      >
        {word}
      </span>
    )
  })
  useEffect(() => {
    if (headerWrapper.current) {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: headerWrapper.current, start: "top 90%" },
      })

      tl.to(`.${classRoot}-line`, {
        scale: 1,
        duration: 1,
        ease: "power1.inOut",
      })
        .to(
          `.${classRoot}_title_word`,
          {
            stagger: 0.2,
            y: 0,
            duration: 0.6,
          },
          1
        )
        .to(
          `.${classRoot}_title_word`,
          {
            stagger: { each: 0.2, from: left ? "start" : "end" },
            x: 0,
            duration: 0.6,
          },
          1.6
        )
    }
  }, [])

  return (
    <HeaderWrapper ref={headerWrapper}>
      <Header left={left} className={classRoot}>
        {textArray}
      </Header>
      <HeaderLine left={left} className={`${classRoot}-line`} />
    </HeaderWrapper>
  )
}

export default SectionHeaders

const HeaderWrapper = styled.div`
  position: relative;
  width: 90vw;
  height: 7vw;
  margin-left: 5.6vw;
  overflow: hidden;

  ${media.mobile} {
    height: 29.7vw;
  }
  ${media.tabletPortrait} {
    margin-left: 15px;
    height: 75px;
  }
`

const Header = styled.h2<{ left?: boolean }>`
  ${text.desktop.h1};
  color: ${colors.headlineWhite};
  white-space: pre;
  span {
    transform: translate(${props => (props.left ? "8vw" : "-8vw")}, 115%);
    display: inline-block;
    margin-right: 1.25vw;
  }

  position: absolute;
  width: fit-content;
  right: ${props => (props.left ? "auto" : "0")};
  z-index: 2;

  ${media.mobile} {
  }
  ${media.tabletPortrait} {
  }
`
const HeaderLine = styled.div<{ left?: boolean }>`
  width: 85vw;
  height: 0.31vw;
  left: ${props => (props.left ? "auto" : "0")};
  right: ${props => (props.left ? "0" : "auto")};
  background: ${colors.headlineWhite};
  position: absolute;
  bottom: 0;
  transform: scaleX(0);
  transform-origin: ${props => (props.left ? "100%" : "0")};
  border-radius: 0.3vw;

  ${media.mobile} {
    height: 1vw;
    border-radius: 1vw;
    width: 82vw;
    margin-left: 5vw;
  }
  ${media.tabletPortrait} {
    height: 5px;
    border-radius: 5px;
    width: calc(100% - 26px);
    margin-left: 26px;
  }
`
