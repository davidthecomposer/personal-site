import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { PrimaryButtonStyle } from "styles/Buttons"
import colors from "styles/Colors"
import text from "styles/text"
import twitter from "assets/svg/twitterIcon.svg"
import linkedin from "assets/svg/linkedIcon.svg"
import facebook from "assets/svg/facebookIcon.svg"
import media from "styles/media"
import gsap from "gsap"
import { ReactComponent as NewsCardBGSVG } from "assets/images/newsCardBG.svg"
import { ReactComponent as SmallArrowSVG } from "assets/svg/smallArrow.svg"
import NewsStories from "data/NewsStories"
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from "react-share"

type props = {
  mobile: boolean
  pageContext: any
}

const NewsExpanded: React.FC<props> = ({ pageContext, mobile }) => {
  const header = useRef(null)
  const mainText = useRef<HTMLDivElement>(null)
  const [contentHeight, setActiveContentHeight] = useState(0)
  const [activeCard, setActiveCard] = useState(-1)
  const [textHeight, setTextHeight] = useState(0)
  const { articleBlurb, contributors, mainImages, title } = pageContext.newsItem
  const shareButtons = [
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
  ]

  const shareLinks = [facebook, twitter, linkedin]

  const handleExpandCard = (number: number, className: string) => {
    const el = document.querySelector(`.${className}`)
    if (el) {
      setActiveContentHeight(el.clientHeight)

      activeCard === number ? setActiveCard(-1) : setActiveCard(number)
    }
  }

  useEffect(() => {
    if (mainText.current) {
      setTextHeight(mainText.current.clientHeight + 100)
    }
  }, [])

  const allContributors = contributors.map((con: any, i: number) => {
    const { bio, mainImages, name, socialLinks } = con
    console.log(bio)
    return (
      <Contributor
        key={`${title}-cont-${i}`}
        activeCard={activeCard === i}
        leftOffset={17.4 * i}
        textHeight={textHeight}
        hiddenCard={activeCard !== i && activeCard !== -1}
      >
        <MainCard activeCard={activeCard === i}>
          <Name>{name}</Name>
          <Image
            src={mobile ? mainImages[1].file.url : mainImages[0].file.url}
            alt={
              mobile ? mainImages[1].file.fileName : mainImages[0].file.fileName
            }
          />
          <Links>
            <LinkInner>
              {socialLinks.map((link: any, i: number) => {
                return (
                  <a
                    key={`half-link-${i}`}
                    href={link.url}
                    className="share_links"
                  >
                    <img src={link.iconImage.file.url} alt="link name" />
                  </a>
                )
              })}
            </LinkInner>
          </Links>

          <MoreBtn onClick={() => handleExpandCard(i, `content-${i}`)}>
            {activeCard === i ? "BACK" : "ABOUT"}
          </MoreBtn>
        </MainCard>
        <Content activeCard={activeCard === i} className={`content-${i}`}>
          <ContributorTitle>{name}</ContributorTitle>
          <ContributorBio>{bio.bio}</ContributorBio>
        </Content>
      </Contributor>
    )
  })

  return (
    <NewsStory>
      <TitleContainer>
        <Header>{title}</Header>
        <HeaderLine />
      </TitleContainer>
      <MainImage
        src={mobile ? mainImages[1].file.url : mainImages[0].file.url}
        alt={mobile ? mainImages[1].file.fileName : mainImages[0].file.fileName}
      />
      <BottomContainer>
        <Sticky>
          <MoreBtn
            onClick={() => {
              console.log("yeah")
            }}
          >
            Back
          </MoreBtn>
          <Links>
            {shareButtons.map((link, i) => {
              return (
                <a key={`half-link-${i}`} href={"/"} className="share_links">
                  <img src={shareLinks[i]} alt="link name" />
                </a>
              )
            })}
          </Links>
          <Line />
          <ShareText>Share</ShareText>
        </Sticky>
        <Column>
          <Text ref={mainText} collapse={activeCard !== -1}>
            {articleBlurb.articleBlurb}
          </Text>
          <Contributors>{allContributors}</Contributors>
        </Column>
      </BottomContainer>
    </NewsStory>
  )
}

const Header = styled.h2`
  ${text.desktop.h1};
  color: ${colors.headlineWhite};

  position: absolute;
  width: 100%;
  text-align: right;

  ${media.mobile} {
    transform: translate(8.5vw, 110%);
    font-size: 13.3vw;
  }
  ${media.tabletPortrait} {
    transform: translate(44px, 110%);
    font-size: 69px;
  }
`

const HeaderLine = styled.div`
  width: 82.4vw;
  height: 0.3vw;
  margin-left: 5.6vw;
  background: ${colors.headlineWhite};
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

const NewsStory = styled.section`
  width: 100%;
  position: relative;
  overflow: hidden;
  height: auto;
  min-height: 100vh;
  background: ${colors.deepPurple};
  padding: 6.25vw 7.75vw;
  ${media.mobile} {
    width: 100%;
    height: 146.1vw;
    margin-bottom: 30vw;
  }
  ${media.tabletPortrait} {
    width: 517px;
    height: 756px;
    margin-bottom: 155px;
  }
`

const TitleContainer = styled.div`
  width: 100%;
  height: 7vw;
  position: relative;
  margin-top: 0;
  margin-bottom: 1.9vw;

  ${media.mobile} {
    margin-bottom: 6vw;
  }
  ${media.tabletPortrait} {
    margin-bottom: 31px;
  }
`

const Text = styled.p<{ collapse: boolean }>`
  width: 100%;
  ${text.desktop.bodyM};
  color: ${colors.coolWhite};
  transform: scaleY(${props => (props.collapse ? 0 : 1)});
  transition: 0.5s;
  opacity: ${props => (props.collapse ? 0 : 1)};

  ${media.mobile} {
  }
  ${media.tabletPortrait} {
  }
`

const MainImage = styled.img`
  width: 100%;
  height: 29.56vw;
  object-fit: cover;
  margin-bottom: 6.25vw;
  ${media.mobile} {
    width: 94.4vw;
    height: 57.2vw;
  }
  ${media.tabletPortrait} {
    width: 492px;
    height: 298px;
  }
`

const Back = styled.button<{ layout?: boolean }>`
  ${PrimaryButtonStyle};
  padding: 0 0.7vw;
  width: 11.9vw;
  border-color: #73d1ef;
  z-index: 5;
  position: absolute;
  top: 0.5vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    width: fit-content;
  }

  ${media.mobile} {
    top: 9.3vw;
    left: auto;
    right: 3vw;
    width: 29vw;
    text-align: right;
  }
  ${media.tabletPortrait} {
    top: 49px;
    width: 150px;
    height: 50px;
    font-size: 22px;
    right: 40px;
  }
`

const More = styled.div<{ layout: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 100%;
  top: 0;
  ${Back} {
    right: ${props => (props.layout ? "auto" : "0")};
  }

  ${media.mobile} {
    ${Back} {
      right: 3vw;
    }
  }
  ${media.tabletPortrait} {
    ${Back} {
      right: 40px;
    }
  }
`

const Sticky = styled.div`
  display: inline-block;
  position: sticky;
  top: 50vw;
  left: 0;
  width: 11.63vw;
  height: 14.38vw;
  background: linear-gradient(
    180deg,
    rgba(22, 98, 84, 0.24) 0%,
    rgba(172, 160, 243, 0.07) 100%
  );
  border-radius: 0.38vw;
  padding: 0.81vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${media.tablet} {
  }
  ${media.mobile} {
  }
  ${media.fullWidth} {
  }
`

const MoreBtn = styled.button`
  ${PrimaryButtonStyle};
  width: 7.5vw;
  height: 7.5vw;
  border-color: ${colors.headlineWhite};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colors.coolWhite};
  background: rgba(231, 216, 164, 0.19);
  ${media.mobile} {
    padding: 0 1vw;
    left: 0;
    margin-right: 0;
    position: absolute;
  }
  ${media.tabletPortrait} {
    width: 150px;
    height: 50px;
    font-size: 22px;
    padding: 0 5px;
    left: 0;
    margin-right: 0;
  }
`

const Line = styled.div`
  width: 8.06vw;
  height: 0.13vw;
  margin-left: 1.88vw;
  background: ${colors.headlineWhite};
  opacity: 0.23;
  border-radius: 3px;
  ${media.tablet} {
  }
  ${media.mobile} {
  }
  ${media.fullWidth} {
  }
`

const ShareText = styled.p`
  ${text.desktop.bodyM};
  color: ${colors.headlineWhite};
  width: 100%;
  text-align: right;
  ${media.tablet} {
  }
  ${media.mobile} {
  }
  ${media.fullWidth} {
  }
`

const Links = styled.div`
  height: 2.13vw;

  width: 10vw;

  z-index: 5;
  position: relative;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0.63vw 0;
  .share_links {
    position: relative;
    margin-right: 0.6vw;
    opacity: 1;
    z-index: -1;
    width: 2vw;
    height: 2vw;
    img {
      width: 100%;
      height: 100%;
    }
  }

  ${media.tablet} {
  }
  ${media.mobile} {
  }
  ${media.tabletPortrait} {
  } ;
`

const BottomContainer = styled.div`
  display: flex;
  position: relative;

  ${media.tablet} {
  }
  ${media.mobile} {
  }
  ${media.fullWidth} {
  }
`

const Column = styled.div`
  margin-left: 5vw;
  width: 71vw;

  ${media.tablet} {
  }
  ${media.mobile} {
  }
  ${media.fullWidth} {
  }
`

const Contributor = styled.div<{
  activeCard: boolean
  leftOffset: number
  textHeight: number
  hiddenCard: boolean
}>`
  position: absolute;
  display: flex;
  padding-top: 1.44vw;
  width: ${props => (props.activeCard ? "71.88vw" : "16.06vw")};
  height: 38vw;
  left: ${props => (props.activeCard ? 0 : props.leftOffset)}vw;
  top: ${props => (props.activeCard ? -props.textHeight : 0)}px;
  z-index: ${props => (props.activeCard ? 20 : 0)};
  overflow: hidden;
  background: ${props =>
    props.activeCard ? colors.deepPurple : "transparent"};
  transition: 0.5s;
  transform: scale(${props => (props.hiddenCard ? 0 : 1)});
  opacity: ${props => (props.hiddenCard ? 0 : 1)};
  ${media.tablet} {
  }
  ${media.mobile} {
  }
  ${media.fullWidth} {
  }
`
const LinkInner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-around;

  ${media.tablet} {
  }
  ${media.mobile} {
  }
  ${media.fullWidth} {
  }
`
const Name = styled.p`
  ${text.desktop.bodyM};
  position: absolute;
  width: 100%;
  text-align: center;
  height: 2.88vw;
  top: -1.44vw;
  left: 0;
  opacity: 0;
  background: linear-gradient(
    180deg,
    #17161b 0%,
    rgba(0, 0, 0, 0.08) 99.99%,
    rgba(196, 196, 196, 0.16) 100%
  );
  z-index: 10;
  transition: 0.4s;
  color: ${colors.coolWhite};
  ${media.tablet} {
  }
  ${media.mobile} {
  }
  ${media.fullWidth} {
  }
`

const MainCard = styled.div<{ activeCard: boolean }>`
  width: 16.06vw;

  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  ${Links} {
    margin: 1vw 0;
    transform: scaleY(${props => (props.activeCard ? 1 : 0)});
    overflow: hidden;
    transition: 0.4s;
  }

  ${media.hover} {
    :hover {
      ${Links} {
        transform: scaleY(1);
        transition: 0.4s;
      }
      ${Name} {
        opacity: ${props => (!props.activeCard ? 1 : 0)};
        transition: 0.4s;
      }
    }
  }

  ${media.tablet} {
  }
  ${media.mobile} {
  }
  ${media.fullWidth} {
  }
`

const Image = styled.img`
  width: 16.06vw;
  height: 23.75vw;
  position: relative;
  border-radius: 0.38vw;
  ${media.tablet} {
  }
  ${media.mobile} {
  }
  ${media.fullWidth} {
  }
`

const Contributors = styled.div`
  position: relative;
  display: flex;
  margin-top: 6.25vw;
  height: 38vw;
  ${media.tablet} {
  }
  ${media.mobile} {
  }
  ${media.fullWidth} {
  }
`

const Content = styled.div<{ activeCard: boolean }>`
  position: absolute;
  width: 53.56vw;
  left: 18.31vw;
  top: 0;
  color: ${colors.coolWhite};
  opacity: ${props => (props.activeCard ? 1 : 0)};
  transition: 0.3s;
  ${media.tablet} {
  }
  ${media.mobile} {
  }
  ${media.fullWidth} {
  }
`

const ContributorTitle = styled.h3`
  width: 100%;
  ${text.desktop.h5};
  text-transform: uppercase;
  margin-bottom: 1.25vw;
  ${media.tablet} {
  }
  ${media.mobile} {
  }
  ${media.fullWidth} {
  }
`

const ContributorBio = styled.div`
  width: 100%;
  ${text.desktop.bodyM};
  ${media.tablet} {
  }
  ${media.mobile} {
  }
  ${media.fullWidth} {
  }
`

export default NewsExpanded
