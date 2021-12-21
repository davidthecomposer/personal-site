import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { PrimaryButtonStyle } from "styles/Buttons"
import colors from "styles/Colors"
import text from "styles/text"
import media from "styles/media"
import { graphql, navigate } from "gatsby"
import gsap from "gsap"
import { ReactComponent as NewsCard1BGSVG } from "assets/svg/news1BG.svg"
import { ReactComponent as NewsCard2BGSVG } from "assets/svg/news2BG.svg"
import { ReactComponent as NewsCard3BGSVG } from "assets/svg/news3BG.svg"
import { ReactComponent as NewsCard4BGSVG } from "assets/svg/news4BG.svg"

const News: React.FC<{ data: any }> = ({ data }) => {
  const header = useRef(null)
  const headerLine = useRef(null)
  const [openLink, setOpenLink] = useState("")

  const NewsStories = data.allContentfulAnnouncement.nodes

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
    NewsStories.forEach((item, i) => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: `.newsCard-${i}`, start: "top 60%" },
      })

      tl.from(`.newsCard-${i}`, {
        opacity: 0,
        x: i % 2 === 0 ? "-=2vw" : "+=2vw",
        duration: 0.9,
        ease: "power1.inOut",
      })
    })
  }, [])

  const allNewsItems = NewsStories.map((item, i) => {
    const { articleBlurb, paragraph } = item
    const story = {
      title: item.title,
      blurb: articleBlurb.articleBlurb,
    }
    const pathName = `${story.title.split(" ").join("-")}`.toLowerCase()

    console.log(pathName)

    return (
      <NewsCard key={`newsCard-${i}`}>
        <TitleContainer>
          <NewsTitle>{story.title ? story.title : "no title"}</NewsTitle>
        </TitleContainer>
        <NewsRow>
          <Text>{story.blurb}</Text>
          <ButtonRow>
            <MoreBtn onClick={() => handleMore(`.front-${i}`, `.more-${i}`)}>
              Link Out
            </MoreBtn>
            <MoreBtn onClick={() => navigate(`/news/${pathName}`)}>
              More
            </MoreBtn>
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
  })

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
      <HeaderWrapper>
        <Header ref={header}>News</Header>
        <HeaderLine ref={headerLine} />
      </HeaderWrapper>
      <NewsItemsWrapper>{allNewsItems}</NewsItemsWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  padding: 11.3vw 6.3vw;
  position: relative;
  box-sizing: border-box;
  width: 87.4vw;
  ${media.mobile} {
    width: 100%;
    padding: 0 2.4vw 52.2vw 2.4vw;
  }
  ${media.tabletPortrait} {
    width: 100%;
    padding: 0 12px 270px 12px;
  }
`

const Header = styled.h2`
  ${text.desktop.h1};
  color: ${colors.brightPurple};
  transform: translate(5.6vw, 100%);
  position: absolute;
  width: fit-content;

  ${media.mobile} {
    transform: translate(8.5vw, 110%);
    font-size: 13.3vw;
  }
  ${media.tabletPortrait} {
    transform: translate(44px, 110%);
    font-size: 69px;
  }
`

const NewsCard1BG = styled(NewsCard1BGSVG)`
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 17vw;
  ${media.tablet} {
  }
  ${media.mobile} {
  }
  ${media.fullWidth} {
  }
`
const NewsCard2BG = styled(NewsCard2BGSVG)`
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 17vw;
  ${media.tablet} {
  }
  ${media.mobile} {
  }
  ${media.fullWidth} {
  }
`
const NewsCard3BG = styled(NewsCard3BGSVG)`
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 17vw;
  ${media.tablet} {
  }
  ${media.mobile} {
  }
  ${media.fullWidth} {
  }
`
const NewsCard4BG = styled(NewsCard4BGSVG)`
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 17vw;
  ${media.tablet} {
  }
  ${media.mobile} {
  }
  ${media.fullWidth} {
  }
`

const HeaderLine = styled.div`
  width: 82.4vw;
  height: 0.3vw;
  margin-left: 5.6vw;
  background: ${colors.brightPurple};
  position: absolute;
  bottom: 0;
  transform: scaleX(0);
  transform-origin: 100%;
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

const HeaderWrapper = styled.div`
  position: relative;
  width: 90vw;
  height: 5vw;
  margin-left: 0;
  margin-bottom: 15.4vw;
  overflow: hidden;

  ${media.mobile} {
    height: 14.9vw;
  }
  ${media.tabletPortrait} {
    height: 75px;
  }
`

const NewsCard = styled.div`
  width: 86.17vw;
  position: relative;

  height: 17vw;
  padding: 0 2.25vw 1.25vw 2.25vw;

  margin-bottom: 6.25vw;

  ${media.mobile} {
  }
  ${media.tabletPortrait} {
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
    font-size: 7.2vw;
    :after {
      content: "";
      position: absolute;
      width: 86.2vw;
      height: 0.3vw;

      top: 6.8vw;

      background: #e5fcfa;
      border-radius: 0.3vw;
    }
  }
  ${media.tabletPortrait} {
    font-size: 37px;
    :after {
      content: "";
      position: absolute;
      width: 446px;
      height: 2px;
      top: 35px;
      background: #e5fcfa;
      border-radius: 1px;
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
    margin-bottom: 6vw;
  }
  ${media.tabletPortrait} {
    margin-bottom: 31px;
  }
`

const NewsRow = styled.div`
  display: flex;
  height: 23.5vw;
  justify-content: space-between;

  ${media.mobile} {
    flex-direction: column-reverse;
    height: 100%;
    justify-content: flex-end;
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
    position: absolute;
    bottom: 0;
    left: 0;
    height: 9.7vw;
    margin: 0;
  }
  ${media.tabletPortrait} {
    height: 50px;
  }
`

const Text = styled.div`
  display: flex;
  flex-direction: column;
  width: 62.5vw;
  color: ${colors.coolWhite};
  ${text.desktop.bodyS};
  z-index: 1;
  p:nth-child(1) {
    margin-bottom: 1.3vw;
  }

  ${media.mobile} {
    width: 95.2vw;
    font-size: 3.9vw;
    height: 53vw;
    overflow: hidden;
    padding-top: 3vw;
    padding-bottom: 10vw;
  }
  ${media.tabletPortrait} {
    width: 492px;
    font-size: 20px;
    height: 274px;
    padding-top: 15px;
    padding-bottom: 51px;
  }
`

const MoreBtn = styled.button`
  ${PrimaryButtonStyle};

  border-color: ${colors.buttonGrey};
  color: ${colors.coolWhite};
  position: relative;
  ${media.mobile} {
  }
  ${media.tabletPortrait} {
  }
`

const NewsItemsWrapper = styled.div`
  width: 87.5vw;
  position: relative;
`

export default News
