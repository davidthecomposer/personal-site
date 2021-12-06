import React, { useEffect, useState, useRef } from "react"
import styled from "styled-components"
// import { ButtonRegularStyles } from "components/Buttons";
import { SlideHeading, MetroHeading32 } from "styles/text"
// import colors from "styles/Colors";
import gsap from "gsap"
import filmTeaser from "assets/images/davidFilmTeaser.jpg"
import davidSerious from "assets/images/davidSerious.jpg"
import Liz1 from "assets/images/Liz1.jpg"
import mandi1 from "assets/images/mandi1.jpg"
import media from "styles/media"
import davidSkeptic from "assets/images/davidSkeptic.jpg"
import jennyCampbell from "assets/images/jennyTop.jpg"
import oCTLogo from "assets/images/oCTLogo.jpg"
import davidSmile1 from "assets/images/davidSmile1.jpg"
import oCTSeason from "assets/images/oCTSeason.jpg"
import filmTeaserM from "assets/images/davidFilmTeaserM.jpg"
import davidSeriousM from "assets/images/davidSeriousM.jpg"
import Liz1M from "assets/images/Liz1M.jpg"
import mandi1M from "assets/images/mandi1M.jpg"
import davidSkepticM from "assets/images/davidSkepticM.jpg"
import jennyCampbellM from "assets/images/jennyCampbellM.jpg"
import oCTLogoM from "assets/images/oCTLogoM.jpg"
import davidSmile1M from "assets/images/davidSmile1M.jpg"
import oCTSeasonM from "assets/images/oCTSeasonM.jpg"
import { useRectGlow } from "components/Blurs"

const Hero: React.FC<{ mobile: boolean }> = ({ mobile }) => {
  const [next, setNext] = useState(0)
  const initial = useRef(true)
  const ord = useRef(["main1", "ssc", "coc", "cir"])
  const length = useRef(114 - ord.current.length * 7)
  const direction = useRef(true)
  const tealCanvas = useRef(null)
  const tealCanvas1 = useRef(null)
  const yellowCanvas = useRef(null)
  const wrapper = useRef(null)
  const purpleCanvas = useRef(null)
  const redCanvas = useRef(null)
  const purpleCanvas2 = useRef(null)
  const orangeCanvas = useRef(null)
  const wrapper1 = useRef(null)
  const wrapper2 = useRef(null)

  useRectGlow(
    wrapper,
    purpleCanvas,
    0,
    0.1,
    0.56,
    0.5,
    Math.PI / 12,
    "#91199455"
  )
  useRectGlow(
    wrapper,
    tealCanvas,
    0.5,
    0.6,
    0.41,
    0.15,
    Math.PI / 12,
    "#009EA886"
  )

  useRectGlow(
    wrapper,
    redCanvas,
    0.3,
    0.3,
    0.55,
    0.2,
    Math.PI / 12,
    "#FF010188"
  )

  useRectGlow(
    wrapper,
    tealCanvas1,
    0.1,
    0.1,
    0.46,
    0.47,
    Math.PI / 12,
    "#2CBBA1"
  )

  useRectGlow(
    wrapper,
    yellowCanvas,
    0.45,
    0.1,
    0.42,
    0.45,
    Math.PI / 12,
    "#99A43C"
  )

  useRectGlow(
    wrapper2,
    purpleCanvas2,
    0.1,
    0.05,
    0.75,
    0.52,
    Math.PI / 12,
    "#4C2D8F77"
  )

  useRectGlow(
    wrapper2,
    orangeCanvas,
    0.2,
    0.2,
    0.65,
    0.4,
    Math.PI / 12,
    "#BB702C"
  )

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        initial.current = false
        setNext(1)
      },
    })

    tl.to(".hero__counter", { opacity: 1, duration: 5 }, 1.8)
      .to(".slideshow-main1", { y: "-8vw", duration: 1.5 }, 1.8)
      .to(".main1-bg", { opacity: 1, duration: 1.8 }, 1.9)
      .to(".main1-header", { opacity: 1, y: "-=5vw", duration: 1.3 }, 2.2)
      .to(".main1-metro", { opacity: 1, x: "+=5vw", duration: 1.1 }, 2.5)
      .to(".main1-metro", { duration: 6 }, 3)
      .to(
        ".line-0",
        { scaleY: 0.25, transformOrigin: "50% 50%", duration: 2 },
        1.8
      )
      .to(
        ".line-0",
        {
          x: `${length.current}px`,
          duration: 7.2,
          ease: "power2.inOut",
        },
        1.8
      )
      .to(".line-0", { scaleY: 1, transformOrigin: "50% 50%", duration: 2 }, 7)
  }, [])

  useEffect(() => {
    if (!initial.current) {
      const order = ["main1", "ssc", "coc", "cir"]
      const change = !direction.current ? order.length - 1 - next : next
      const slideMove = `${length.current}px`
      const current = order[next]
      const last = order[next === 0 ? order.length - 1 : next - 1]
      const nextSlide = next === order.length - 1 ? 0 : next + 1
      const hasImage = document.querySelector(`.${current}-image`)
      const hadImage = document.querySelector(`.${last}-image`)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#music-hero",
          endTrigger: "#slide__wrapper",
          toggleActions: "play pause play pause",
        },
        onComplete: () => {
          if (nextSlide === 0) {
            direction.current = !direction.current
          }
          setNext(nextSlide)
        },
      })

      tl.to(`.slideshow-${current}`, { y: "-=8vw", duration: 1.5 }, 0)
        .to(
          `.line-${change}`,
          { scaleY: 0.25, transformOrigin: "50% 50%", duration: 2 },
          0
        )
        .to(
          `.line-${change}`,
          {
            x: !direction.current ? "0" : slideMove,
            duration: 7.2,
            ease: "power2.inOut",
          },
          0
        )

        .to(
          `.line-${change}`,
          {
            scaleY: 1,
            transformOrigin: "50% 50%",
            duration: 1,
            ease: "back",
          },
          6.2
        )
        .to(
          `.${current}-bg`,
          { opacity: 1, duration: 4, ease: "power1.inOut" },
          0.1
        )
        .to(
          `.${current}-header`,
          { opacity: 1, y: "-=5vw", duration: 1.3, ease: "power2.inOut" },
          0.3
        )
        .to(
          `.${current}-metro`,
          { opacity: 1, x: "+=5vw", duration: 1.1, ease: "power1.inOut" },
          0.6
        )
        .to(`.${current}-metro`, { duration: 6 }, 0.9)
        .to(
          [`.${last}-bg`, `.${last}-header`, `.${last}-metro`],
          { opacity: 0, duration: 0.5 },
          0
        )
        .to(
          [
            `.${last}-bg`,
            `.${last}-header`,
            `.${last}-metro`,
            `.slideshow-${last}`,
          ],
          { x: 0, y: 0, duration: 0 },
          0.5
        )

      if (hasImage) {
        gsap.to(`.${current}-image`, {
          opacity: 1,

          stagger: 0.3,
          duration: 0.5,
          delay: 0.5,
        })
        gsap.to(`.${current}-image`, {
          y: "+=5vw",
          stagger: 0.3,
          duration: 1.5,
          delay: 0.5,
        })
      }
      if (hadImage) {
        gsap.to(`.${last}-image`, {
          opacity: 0,
          duration: 0.3,
        })
        gsap.to(`.${last}-image`, { y: "-=5vw", duration: 0, delay: 0.4 })
      }
    }
  }, [next])

  const counters = ord.current.reverse().map((o, i) => {
    const reverse = ord.current.reverse()
    const num = reverse.indexOf(o)

    return (
      <LineUp
        className={`line-${num}`}
        key={`${o}-${i}`}
        active={
          !direction.current
            ? ord.current.length - 1 - next === num
            : next === num
        }
      ></LineUp>
    )
  })

  return (
    <Wrapper id="music-hero">
      <SlideWrapper id="slide__wrapper">
        <Card4 className="slideshow-cir">
          <img
            className="cir-image"
            src={mobile ? davidSmile1M : davidSmile1}
            alt="David Campbell"
          />
          <img
            className="cir-image"
            src={mobile ? oCTSeasonM : oCTSeason}
            alt="oCTSeason"
          />
          <Header className="cir-header">Composer-in-residence</Header>
          <Metro36 className="cir-metro">beginning 2020</Metro36>
          <CanvasGroup ref={wrapper2} className="cir-bg">
            <Canvas ref={orangeCanvas} blur={5} />
            <Canvas ref={purpleCanvas2} blur={4} />
          </CanvasGroup>
        </Card4>
        <Card3 className="slideshow-coc">
          <img
            className="coc-image"
            src={mobile ? davidSkepticM : davidSkeptic}
            alt="David Campbell"
          />
          <img
            className="coc-image"
            src={mobile ? oCTLogoM : oCTLogo}
            alt="Mandi Barrus"
          />
          <img
            className="coc-image"
            src={mobile ? jennyCampbellM : jennyCampbell}
            alt="Jennifer Campbell"
          />

          <Header className="coc-header">Chamber Opera Commission</Header>
          <Metro36 className="coc-metro">Summer 2022</Metro36>
          <CanvasGroup ref={wrapper1} className="coc-bg">
            <Canvas ref={yellowCanvas} blur={5} />
            <Canvas ref={tealCanvas1} blur={4} />
          </CanvasGroup>
        </Card3>

        <Card2 className="slideshow-ssc">
          <img
            className="ssc-image"
            src={mobile ? davidSeriousM : davidSerious}
            alt="David Campbell"
          />
          <img
            className="ssc-image"
            src={mobile ? Liz1M : Liz1}
            alt="Liz Christensen"
          />
          <img
            className="ssc-image"
            src={mobile ? mandi1M : mandi1}
            alt="Mandi Barrus"
          />
          <Header className="ssc-header">Song Cycle Commission</Header>
          <Metro36 className="ssc-metro">Autumn 2021</Metro36>
          <CanvasGroup ref={wrapper} className="ssc-bg">
            <Canvas ref={redCanvas} blur={9} z={3} />
            <Canvas ref={purpleCanvas} blur={3.5} z={2} />
            <Canvas ref={tealCanvas} blur={2.5} z={1} />
          </CanvasGroup>
        </Card2>
        <Card className="slideshow-main1">
          <Header className="main1-header">Flatline</Header>
          <Metro36 className="main1-metro">New Music</Metro36>
          <img
            className="main1-bg"
            src={mobile ? filmTeaserM : filmTeaser}
            alt={"david conducting"}
          />
        </Card>
      </SlideWrapper>
      <Counter className="hero__counter">{counters}</Counter>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  padding: 9vw 0 0 0;
  position: relative;
  box-sizing: border-box;
  ${media.fullWidth} {
    padding-top: 100px;
  }
  ${media.mobile} {
    width: 100%;
    overflow: hidden;
    padding: 15vw 0 58.1vw 0;
  }
  ${media.tabletPortrait} {
    padding: 10vw 0 39.2vw 0;
  }
`

const Canvas = styled.canvas<{ blur: number; z?: number }>`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  right: 0;
  filter: blur(${props => `${props.blur}vw`});
  z-index: ${props => props.z};
`

const CanvasGroup = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  opacity: 0;

  z-index: -1;
  ${media.mobile} {
    width: 100vw;
    height: 200vw;
    left: 0;
    top: 0;
    ${Canvas} {
      filter: blur(25vw);
    }
  }
  ${media.tabletPortrait} {
    width: 67.3vw;
    height: 134.8vw;
    left: 0;
    top: 0;
    ${Canvas} {
      filter: blur(16.9vw);
    }
  }
`

const Header = styled.h2`
  ${SlideHeading};
  position: absolute;
  opacity: 0;
`

const Counter = styled.div`
  width: 120px;
  height: 16px;
  border: 1px solid #8d458620;
  box-sizing: border-box;
  border-radius: 6px;
  bottom: 8.9vw;
  left: 9.2vw;
  position: absolute;
  z-index: 1000;
  display: flex;
  align-items: center;
  opacity: 0;
  ${media.tablet} {
  }
  ${media.mobile} {
    bottom: 52vw;
    left: 5vw;
  }
  ${media.tabletPortrait} {
    bottom: 35vw;
    left: 3.4vw;
  }
  ${media.fullWidth} {
    bottom: 100px;
    left: 147px;
    z-index: 10;
  }
`

const Metro36 = styled.h3`
  ${MetroHeading32};
  position: absolute;
  opacity: 0;
`

const LineUp = styled.div<{ active: boolean }>`
  width: 4px;
  height: 10px;
  margin-left: 3px;
  background: ${props => (props.active ? "#00FACD" : "#00FACD40")};
  transition: 0.4s;
  border-radius: 2px;
`

const Card = styled.div`
  width: 88vw;
  height: 45vw;

  position: absolute;
  left: 6.1vw;
  top: 10.4vw;
  z-index: 1;

  img {
    position: absolute;
    width: 100%;
    top: 0;
    z-index: -1;
    opacity: 0;
  }
  ${Header} {
    width: fit-content;
    bottom: -3.7vw;

    right: 6.9vw;
  }

  ${Metro36} {
    right: 11.9vw;
    bottom: 7.2vw;

    width: fit-content;
  }

  ${media.mobile} {
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    img {
      position: absolute;
      width: 100vw;
      top: 32.9vw;
      z-index: -1;
      opacity: 0;
    }
    ${Header} {
      bottom: 15.5vw;
      font-size: 8.7vw;
      right: 2.4vw;
    }

    ${Metro36} {
      right: auto;
      bottom: auto;
      left: 4.8vw;
      top: 17.9vw;
      font-size: 5.8vw;
      width: fit-content;
    }
  }
  ${media.tabletPortrait} {
    img {
      width: 67.3vw;
      top: 22.1vw;
    }
    ${Header} {
      bottom: auto;
      top: 84.6vw;
      font-size: 5.9vw;
      right: 1.6vw;
    }

    ${Metro36} {
      left: 3.3vw;
      top: 12.1vw;
      font-size: 3.9vw;
    }
  }
  ${media.fullWidth} {
    width: 1408px;
    height: 720px;

    position: absolute;
    left: 98px;
    top: 166px;
    z-index: 1;
    ${Header} {
      width: fit-content;
      bottom: 0;
      font-size: 70px;
      right: 118px;
    }
    img {
      top: -150px;
    }

    ${Metro36} {
      right: 215px;
      bottom: 155px;
      font-size: 32px;
      width: fit-content;
    }
  }
`

const Card2 = styled(Card)`
  ${Header} {
    width: 36vw;
    bottom: 3.1vw;
    left: 5.6vw;
  }

  ${Metro36} {
    left: 0.6vw;
    top: 3.8vw;

    width: fit-content;
  }
  img {
    width: 17.6vw;
    height: 25.3vw;
    box-shadow: 0.6vw 0.6vw 1.6vw 0.7vw rgba(0, 0, 0, 0.25);
    border-radius: 6px;
  }

  img:nth-child(1) {
    z-index: 1;
    left: 29.2vw;
    top: -6.2vw;
  }
  img:nth-child(2) {
    z-index: 3;
    left: 46.4vw;
    top: 4.9vw;
  }
  img:nth-child(3) {
    z-index: 2;
    left: 63.6vw;
    top: -3.1vw;
  }

  ${media.fullWidth} {
    ${Header} {
      width: 576px;
      bottom: 50px;
      left: 90px;
    }

    ${Metro36} {
      left: 10px;
      top: 0;

      width: fit-content;
    }
    img {
      width: 282px;
      height: 405px;
      box-shadow: 10px 10px 26px 11px rgba(0, 0, 0, 0.25);
      border-radius: 6px;
    }

    img:nth-child(1) {
      z-index: 1;
      left: 467px;
      top: -160px;
    }
    img:nth-child(2) {
      z-index: 3;
      left: 742px;
      top: 0px;
    }
    img:nth-child(3) {
      z-index: 2;
      left: 1018px;
      top: -110px;
    }
  }
  ${media.mobile} {
    img {
      width: 33.1vw;
      height: 46.4vw;
      box-shadow: 0.6vw 0.6vw 1.6vw 0.7vw rgba(0, 0, 0, 0.25);
      border-radius: 6px;
    }

    img:nth-child(1) {
      z-index: 1;
      left: 61.1vw;
      top: 58vw;
    }
    img:nth-child(2) {
      z-index: 3;
      left: 8.2vw;
      top: 68.8vw;
    }
    img:nth-child(3) {
      z-index: 2;
      left: 30.2vw;
      top: 25.4vw;
    }
    ${Header} {
      width: 57.5vw;
      bottom: auto;

      left: 5.8vw;
      top: 3.6vw;
    }

    ${Metro36} {
      left: 34.5vw;
      top: 127.5vw;

      width: fit-content;
    }
  }
  ${media.tabletPortrait} {
    img {
      width: 22.3vw;
      height: 31.3vw;
      box-shadow: 0.3vw 0.3vw 0.9vw 0.4vw rgba(0, 0, 0, 0.25);
    }

    img:nth-child(1) {
      left: 41.1vw;
      top: 39.1vw;
    }
    img:nth-child(2) {
      left: 5.5vw;
      top: 46.4vw;
    }
    img:nth-child(3) {
      left: 20.3vw;
      top: 17.1vw;
    }
    ${Header} {
      width: 38.7vw;
      left: 3.9vw;
      top: 2.5vw;
    }

    ${Metro36} {
      left: 23.3vw;
      top: 85.9vw;
    }
  }
`
const Card3 = styled(Card)`
  ${Header} {
    width: 35.4vw;
    right: auto;
    bottom: 2.1vw;
    right: 2.8vw;
  }

  ${Metro36} {
    right: 7.8vw;
    top: 4.2vw;

    width: fit-content;
  }

  img {
    position: absolute;
    width: 17.9vw;
    height: 25.2vw;
    box-shadow: 0.6vw 0.6vw 1.6vw 0.7vw rgba(0, 0, 0, 0.25);
    border-radius: 6px;
  }

  img:nth-child(1) {
    z-index: 1;
    left: 0.2vw;
    top: 6.1vw;
  }
  img:nth-child(2) {
    z-index: 3;
    width: 24.6vw;
    height: 24.6vw;
    left: 17.8vw;
    top: 0.4vw;
  }
  img:nth-child(3) {
    z-index: 2;
    left: 42.2vw;
    top: -5.3vw;
  }

  ${media.fullWidth} {
    ${Header} {
      width: 566px;
      right: auto;
      bottom: 10px;
      right: 45px;
    }

    ${Metro36} {
      right: 140px;
      top: 17px;
    }

    img {
      width: 286px;
      height: 403px;
      box-shadow: 10px 10px 26px 11px rgba(0, 0, 0, 0.25);
    }

    img:nth-child(1) {
      left: 3px;
      top: 48px;
    }
    img:nth-child(2) {
      width: 394px;
      height: 394px;
      left: 285px;
      top: -44px;
    }
    img:nth-child(3) {
      left: 675px;
      top: -135px;
    }
  }
  ${media.mobile} {
    img {
      position: absolute;
      width: 33.1vw;
      height: 46.4vw;
      box-shadow: 0.6vw 0.6vw 1.6vw 0.7vw rgba(0, 0, 0, 0.25);
      border-radius: 6px;
    }

    img:nth-child(1) {
      z-index: 3;
      left: 62.6vw;
      top: 77.1vw;
    }
    img:nth-child(2) {
      z-index: 1;
      width: 56.5vw;
      height: 56.5vw;
      left: 21.7vw;
      top: 25.4vw;
    }
    img:nth-child(3) {
      z-index: 2;
      left: 6vw;
      top: 77.1vw;
    }
    ${Header} {
      width: fit-content;
      top: 6.8vw;
      left: 8.5vw;
      bottom: auto;
      right: auto;
    }

    ${Metro36} {
      right: auto;
      top: auto;
      bottom: 3.9vw;
      left: 29.2vw;
      width: fit-content;
    }
  }
  ${media.tabletPortrait} {
    img {
      width: 22.3vw;
      height: 31.3vw;
      box-shadow: 0.3vw 0.3vw 0.9vw 0.4vw rgba(0, 0, 0, 0.25);
    }

    img:nth-child(1) {
      left: 42.2vw;
      top: 52vw;
    }
    img:nth-child(2) {
      width: 38vw;
      height: 38vw;
      left: 14.6vw;
      top: 17.1vw;
    }
    img:nth-child(3) {
      left: 4vw;
      top: 52vw;
    }
    ${Header} {
      top: 4.6vw;
      left: 5.7vw;
    }

    ${Metro36} {
      bottom: 2.6vw;
      left: 19.7vw;
    }
  }
`
const Card4 = styled(Card)`
  ${Header} {
    left: 5vw;
    top: 8.2vw;
  }

  ${Metro36} {
    right: 9.7vw;
    bottom: 2.5vw;
    width: fit-content;
  }

  img {
    position: absolute;
    box-shadow: 0.6vw 0.6vw 1.6vw 0.7vw rgba(0, 0, 0, 0.25);
    border-radius: 6px;
  }

  img:nth-child(1) {
    z-index: 1;

    width: 20.4vw;
    height: 24.4vw;

    right: 4.7vw;
    top: -0.7vw;
  }
  img:nth-child(2) {
    z-index: 2;
    width: 59.6vw;
    height: 22.5vw;
    top: auto;
    right: auto;
    left: 5vw;
    bottom: 10vw;
  }
  ${media.fullWidth} {
    ${Header} {
      left: 80px;
      top: 100px;
    }

    ${Metro36} {
      right: 155px;
      bottom: 140px;
    }

    img {
      position: absolute;
      box-shadow: 10px 10px 26px 11px rgba(0, 0, 0, 0.25);
      border-radius: 6px;
    }

    img:nth-child(1) {
      z-index: 1;

      width: 326px;
      height: 390px;

      right: 75px;
      top: -111px;
    }
    img:nth-child(2) {
      z-index: 2;
      width: 954px;
      height: 360px;
      top: auto;
      right: auto;
      left: 80px;
      bottom: 260px;
    }
  }
  ${media.mobile} {
    img:nth-child(1) {
      z-index: 1;

      width: 33.1vw;
      height: 46.4vw;
      left: 33.3vw;
      top: 70.8vw;
      right: auto;
    }
    img:nth-child(2) {
      width: 95.2vw;
      height: 36.2vw;
      left: 2.4vw;
      top: 28.5vw;
    }
    ${Header} {
      width: 60.9vw;

      left: 8.5vw;
      top: 6.8vw;
    }

    ${Metro36} {
      width: 56vw;

      left: 29.2vw;
      top: 124.6vw;
    }
  }
  ${media.tabletPortrait} {
    img:nth-child(1) {
      width: 22.3vw;
      height: 31.3vw;
      left: 22.4vw;
      top: 47.7vw;
    }
    img:nth-child(2) {
      width: 64.1vw;
      height: 24.1vw;
      left: 1.6vw;
      top: 19.1vw;
    }
    ${Header} {
      width: 41vw;

      left: 5.7vw;
      top: 4.6vw;
    }

    ${Metro36} {
      width: 37.8vw;

      left: 19.7vw;
      top: 84vw;
    }
  }
`

const SlideWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 53.9vw;
  ${media.fullWidth} {
    height: 776.2px;
    width: 1600px;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 150px;
  }
  ${media.mobile} {
    width: 100%;
    height: 144.9vw;
    top: 15.2vw;
  }

  ${media.tabletPortrait} {
    width: 67.3vw;
    height: 97.7vw;
    top: 10.3vw;
    left: 50%;
    transform: translateX(-50%);
  }
`

export default Hero
