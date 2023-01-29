import React, { useEffect, useState, useContext, useMemo } from "react"
import styled from "styled-components"
import MainButton from "components/buttons/MainButton"
import text from "assets/styles/text"
import colors from "assets/styles/colors"
import gsap from "gsap"
import media from "assets/styles/media"
import { MobileContext } from "components/ContextStore"
import { IntroAnimationContext } from "pages/music"

import { navigate } from "gatsby"
import shadows from "assets/styles/shadows"
import { GatsbyImage } from "gatsby-plugin-image"

const Hero: React.FC<{ mobile: boolean; data: any }> = ({ data }) => {
  const [carouselWrapper, setCarouselWrapper] = useState<HTMLDivElement | null>(
    null
  )
  const [activeSlide, setActiveslide] = useState(0)
  const intro = useContext(IntroAnimationContext)
  const maxSlides = 5
  const mobile = useContext(MobileContext)
  const fakeNews = data.filter((news: any, i: number) => i < maxSlides - 1)

  useEffect(() => {
    if (carouselWrapper) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: carouselWrapper,
          toggleActions: "play pause resume none",
        },
        onComplete: () => setActiveslide(nextSlide),
      })
      const lastActive =
        activeSlide === 0 ? fakeNews.length - 1 : activeSlide - 1
      const nextSlide =
        activeSlide === fakeNews.length - 1 ? 0 : activeSlide + 1

      tl.to(
        `.slide_${activeSlide}`,
        {
          stagger: 0.35,
          opacity: 1,
          zIndex: 2,
          duration: 0.7,
          ease: "power2.inOut",
        },
        0.2
      )
        .to(
          `.slide_${lastActive}`,
          {
            stagger: 0.2,
            opacity: 0,
            duration: 0.3,
            zIndex: 1,
            ease: "power1.inOut",
          },
          0
        )
        .to(
          ".active-slide-num",
          {
            color: colors.activeTeal,
            opacity: 1,
            duration: 6.01,
            ease: "power1.inOut",
          },
          0
        )
        .to(".total-slide-num", { opacity: 1, duration: 0.5 }, 0)
        .to(
          ".active-slide-num",
          {
            color: colors.coolWhiteLight,
            opacity: 0,
            duration: 0.4,
            ease: "power1.inOut",
          },
          6.01
        )
        .to(
          ".slide_line",
          {
            scaleY: 1,
            scaleX: mobile ? 1 : 0,

            duration: 6,
          },
          0.1
        )
        .to(
          ".slide_line",
          {
            scaleY: mobile ? 1 : 0,
            scaleX: mobile ? 0 : 1,
            duration: 0.4,
          },
          6.2
        )

      return () => {
        tl.kill()
      }
    }
  }, [activeSlide, intro, carouselWrapper])

  const slides = useMemo(
    () =>
      fakeNews.map((news: any, i: number) => {
        console.log(news)
        return (
          <Slide key={`music_slide${i}`}>
            {news.audio && <audio src={news.audio} preload="none" />}
            {news.video && <video src={news.audio} preload="none" />}
            <Title className={`slide_${i}`}>{news.title}</Title>
            <MainImage
              className={`slide_${i}`}
              image={news.image[0].gatsbyImageData}
              alt={news.title}
            />
          </Slide>
        )
      }),
    [fakeNews]
  )

  const handleButton = (isNews: boolean, link: string) => {
    if (isNews) {
      navigate(`/news/${link}`)
    } else {
      window.open(link, "_blank")
    }
  }

  const buttons = fakeNews.map((news: any, i: number) => {
    return (
      <BtnWrap className={`slide_${i}`} key={`button_${i}`}>
        <MainButton
          onClick={() => handleButton(news.news, news.slug)}
          borderColor={colors.dullerTeal}
          backgroundColor={colors.activeTeal}
          limit
        >
          {news.buttonText}
        </MainButton>
      </BtnWrap>
    )
  })

  return (
    <Wrapper id="music-hero">
      <Carousel ref={ref => setCarouselWrapper(ref)}>
        <CarouselLine className="carousel_line1" top />
        <LeftPanel>
          <VertLine className="carousel_vert" />
          <LineTracker>
            <SlideNumber activeNumber={true} className="active-slide-num">
              0{activeSlide + 1}
            </SlideNumber>
            <Line className="slide_line" />
            <SlideNumber className="total-slide-num">
              0{fakeNews.length}
            </SlideNumber>
          </LineTracker>
          {buttons}
        </LeftPanel>
        {slides}
        <CarouselLine className="carousel_line2" />
      </Carousel>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  padding: 12vw 0 0 0;
  position: relative;
  box-sizing: border-box;
  height: 62.5vw;
  ${media.fullWidth} {
    padding-top: 160px;
  }
  ${media.mobile} {
    width: 100%;
    overflow: hidden;
    padding: 15vw 0 58.1vw 0;
    height: 120.19vw;
  }
  ${media.tablet} {
    padding: 10vw 0 39.2vw 0;
  }
`

const CarouselLine = styled.div<{ top?: boolean | undefined }>`
  position: absolute;
  left: 0;
  width: 100%;
  transform: scaleX(0);
  height: 5px;
  background: ${colors.carouselTealDull};
  top: ${props => props.top && 0};
  bottom: ${props => !props.top && 0};
  transform-origin: ${props => (props.top ? "100% 100%" : "0% 0%")};

  ${media.mobile} {
    display: none;
  }
`

const Carousel = styled.div`
  width: 100%;
  height: 45.63vw;
  max-width: 1600px;
  max-height: 730px;
  position: relative;
  margin: 3.13vw auto 0;
  padding: 1.44vw 8.44vw 2.81vw 0;

  ${media.mobile} {
    width: 90%;
    height: 80vw;
    margin: 15vw auto 0;
  }
  ${media.fullWidth} {
    padding: 23.04px 135.04px 44.96px 0;
  }
`

const Slide = styled.div`
  width: 72.5vw;
  height: 41.38vw;
  position: absolute;
  top: 1.44vw;
  left: 18.94vw;

  ${media.mobile} {
    width: 100%;
    height: auto;
    left: 0;
    top: auto;
  }
  ${media.fullWidth} {
    width: 1160px;
    height: 662.08px;
    position: absolute;
    top: 23.04px;
    left: 303.04px;
  }
`

const Title = styled.h4`
  ${text.desktop.h4};
  color: ${colors.coolWhite};
  width: 100%;
  text-align: center;

  margin-bottom: 1vw;
  opacity: 0;

  ${media.mobile} {
    ${text.mobile.h4};
    margin-bottom: 4vw;
  }
  ${media.fullWidth} {
    ${text.fullWidth.h4};
    margin-bottom: 28px;
  }
`

const MainImage = styled(GatsbyImage)`
  width: 72.5vw;
  height: 36.63vw;
  border-radius: 1.205vw;
  opacity: 0;
  ${shadows.light};
  ${media.tablet} {
  }
  ${media.mobile} {
    width: 100%;
    height: auto;
  }
  ${media.fullWidth} {
    width: 1160px;
    height: 586px;
  }
`

const VertLine = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 4px;
  height: 100%;
  transform: scaleY(0);
  transform-origin: 0% 0%;
`

const LeftPanel = styled.div`
  width: 10.44vw;
  height: 40vw;
  position: absolute;
  left: 0;
  top: 2.81vw;

  ${media.mobile} {
    width: 100%;
    bottom: 0;
    top: auto;
    height: 16vw;
  }
  ${media.fullWidth} {
    width: 167.04px;
    height: 640px;
    top: 44.96px;
  }
`

const BtnWrap = styled.div`
  position: absolute;
  left: 1.31vw;
  bottom: 0;
  opacity: 0;
  z-index: 0;

  ${media.mobile} {
    top: 2vw;
    bottom: auto;
  }
`

const SlideNumber = styled.div<{ activeNumber?: boolean }>`
  ${text.desktop.bodyL};
  color: ${colors.coolWhiteLight};
  opacity: 0;

  ${media.mobile} {
    ${text.mobile.bodyL};
  }
  ${media.fullWidth} {
    ${text.fullWidth.bodyL};
  }
`

const LineTracker = styled.div`
  position: absolute;
  left: 3.75vw;
  top: 2.25vw;
  width: 2.75vw;
  height: 12vw;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${media.mobile} {
    flex-direction: row-reverse;
    right: 4.67vw;
    left: auto;
    top: 0;
    width: 30.36vw;
    height: 100%;
  }
  ${media.fullWidth} {
    left: 60px;
    top: 36px;
    width: 44px;
    height: 192px;
  }
`

const Line = styled.div`
  width: 1px;
  height: 6.25vw;
  background: ${colors.carouselTeal};

  transform: scaleY(0);
  transform-origin: 100% 100%;

  ${media.mobile} {
    width: 20vw;
    height: 1px;
    transform: scaleY(1);
    transform: scaleX(0);
    transform-origin: 0% 0%;
    margin: 0 2vw;
  }
  ${media.fullWidth} {
    height: 100px;
  }
`

export default Hero
