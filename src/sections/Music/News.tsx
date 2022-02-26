import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { PrimaryButtonStyle } from "styles/buttons"
import colors from "styles/colors"
import text from "styles/text"
import media from "styles/media"
import { graphql, navigate } from "gatsby"
import gsap from "gsap"
import { ReactComponent as NewsCard1BGSVG } from "assets/svg/news1BG.svg"
import { ReactComponent as NewsCard2BGSVG } from "assets/svg/news2BG.svg"
import { ReactComponent as NewsCard3BGSVG } from "assets/svg/news3BG.svg"
import { ReactComponent as NewsCard4BGSVG } from "assets/svg/news4BG.svg"
import MainButton from "components/buttons/MainButton"
import SectionHeaders from "components/textElements/SectionHeaders"

const News: React.FC<{ data: any }> = ({ data }) => {
  const header = useRef(null)
  const headerLine = useRef(null)
  const [openLink, setOpenLink] = useState("")

  const NewsStories = data

  useEffect(() => {
    const tl = gsap.timeline({ scrollTrigger: headerLine.current })

    tl.to(headerLine.current, {
      scale: 1,
      duration: 1,
      ease: "power1.inOut",
    })
      .to(header.current, { y: 0, duration: 0.6 }, 1)
      .to(header.current, { x: 0, duration: 0.6 }, 1.6)
  }, [])

  useEffect(() => {
    NewsStories.forEach((item: any, i: number) => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: `.newsCard-${i}`, start: "top 80%" },
      })

      tl.from(`.newsCard-${i}`, {
        opacity: 0,
        x: i % 2 === 0 ? "-=2vw" : "+=2vw",
        duration: 0.9,
        ease: "power1.inOut",
      })
    })
  }, [])

  const allNewsItems = NewsStories.filter((item: any) => item.news).map(
    (item: any, i: number) => {
      const { articleBlurb, paragraph } = item
      const story = {
        title: item.title,
        blurb: articleBlurb.articleBlurb,
      }
      const pathName = item.url

      return (
        <NewsCard
          className={`newsCard-${i}`}
          key={`newsCard-${i}`}
          reversed={i % 2 !== 0}
        >
          <TitleContainer>
            <NewsTitle>{story.title ? story.title : "no title"}</NewsTitle>
          </TitleContainer>
          <NewsRow>
            <Text>{story.blurb}</Text>
            <ButtonRow>
              <MainButton
                onClick={() => navigate(`/news/${pathName}`)}
                borderColor={colors.dullTeal}
                backgroundColor={colors.inputTeal}
                bGOpacity={"20"}
              >
                More
              </MainButton>
            </ButtonRow>
          </NewsRow>

          {i % 4 === 0 ? (
            <NewsCard4BG />
          ) : i % 3 === 0 ? (
            <NewsCard3BG />
          ) : i % 2 === 0 ? (
            <NewsCard2BG />
          ) : (
            <NewsCard1BG />
          )}
        </NewsCard>
      )
    }
  )

  const handleMore = (activeClass: string, inActiveClass: string) => {
    gsap.to(activeClass, { x: "-=101%", duration: 0.5, ease: "Power1.out" })
    gsap.to(inActiveClass, {
      x: "-=100%",
      duration: 0.5,
      ease: "Power1.out",
      delay: 0.3,
    })
  }

  return (
    <Wrapper id="news">
      <SectionHeaders left text="News" classRoot="news-header" />
      <NewsItemsWrapper>
        {allNewsItems.slice(0, 4)}

        <MainButton
          onClick={() => navigate("/news")}
          borderColor={colors.dullTeal}
          backgroundColor={colors.inputTeal}
          bGOpacity={"20"}
        >
          All News
        </MainButton>
      </NewsItemsWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  padding: 0
  position: relative;
  box-sizing: border-box;
  width: 100%;


  
`

const NewsCard1BG = styled(NewsCard1BGSVG)`
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 17vw;
  opacity: 0.4;
  transition: 0.4s;
  ${media.mobile} {
    transform-origin: 50% 50%;
    height: 60vw;
    transform: scale(2);
  }
`
const NewsCard2BG = styled(NewsCard2BGSVG)`
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 17vw;
  opacity: 0.4;
  transition: 0.4s;
  ${media.mobile} {
    transform-origin: 50% 50%;
    height: 60vw;
    transform: scale(2);
  }
`
const NewsCard3BG = styled(NewsCard3BGSVG)`
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 17vw;
  opacity: 0.4;
  transition: 0.4s;
  ${media.mobile} {
    transform-origin: 50% 50%;
    height: 60vw;
    transform: scale(2);
  }
`
const NewsCard4BG = styled(NewsCard4BGSVG)`
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 17vw;
  opacity: 0.4;
  transition: 0.4s;
  ${media.mobile} {
    transform-origin: 50% 50%;
    height: 60vw;
    transform: scale(2);
  }
`

const NewsTitle = styled.h3`
  position: relative;

  z-index: 3;
  ${text.desktop.h5};
  width: 100%;
  text-align: right;
  color: ${colors.headingWhite};
  :after {
    content: "";
    position: absolute;
    width: 78.8vw;
    height: 0.1vw;
    left: 0;
    top: 3vw;
    background: #e5fcfa;
    border-radius: 0.2vw;
  }
  ${media.mobile} {
    ${text.mobile.h5};
    :after {
      width: 75vw;
      height: 0.2vw;
      left: 0;
      top: 5vw;
      background: #e5fcfa;
      border-radius: 0.2vw;
    }
  }
`
const TitleContainer = styled.div`
  width: 100%;
  height: 6.25vw;
  padding: 0.75vw 0 0 0;
  position: relative;
  color: ${colors.coolWhite};
  ${media.mobile} {
    height: 7vw;
    padding: 1vw 0 0 0;
  }
`

const NewsRow = styled.div`
  display: flex;
  height: 23.5vw;
  justify-content: space-between;

  ${media.mobile} {
    display: flex;
    flex-direction: column;
    height: 80%;
    margin-top: 2.08vw;
    justify-content: space-around;
  }
`

const NewsCard = styled.div<{ reversed: boolean }>`
  width: 86.17vw;
  position: relative;
  height: 17vw;
  padding: 0 2.25vw 1.25vw 2.25vw;
  margin-bottom: 6.25vw;
  overflow: hidden;
  border-radius: 0.38vw;

  ${NewsRow} {
    flex-direction: ${props => (props.reversed ? "row-reverse" : "row")};
  }

  ${NewsTitle} {
    text-align: ${props => (props.reversed ? "left" : "right")};

    :after {
      ${props =>
        props.reversed ? `left: auto; right: 0;` : "right: auto; left: 0;"};
    }
  }

  ${media.hover} {
    :hover {
      svg {
        opacity: 1;
      }
    }
  }
  ${media.mobile} {
    height: 80vw;

    ${NewsRow} {
      flex-direction: ${props =>
        props.reversed ? "column-reverse" : "column"};
    }
  }
`

const ButtonRow = styled.div`
  height: 7.5vw;
  width: 16.25vw;
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;

  ${media.mobile} {
    width: 50%;
    height: fit-content;
  }
`

const Text = styled.div`
  width: 62.5vw;
  height: 9.8vw;
  color: ${colors.coolWhite};
  ${text.desktop.bodyS};
  z-index: 1;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
  ${media.mobile} {
    ${text.mobile.bodyM}
    height: auto;
    width: 100%;
    -webkit-line-clamp: 10;
  }
`

const NewsItemsWrapper = styled.div`
  width: 87.5vw;
  position: relative;
  margin: 12.5vw auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default News
