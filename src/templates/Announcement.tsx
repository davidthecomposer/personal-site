import React, { useEffect, useRef, useState, useContext } from "react"
import styled from "styled-components"
import { PrimaryButtonStyle } from "styles/Buttons"
import colors from "styles/colors"
import text from "styles/text"
import twitter from "assets/svg/twitterIcon.svg"
import linkedin from "assets/svg/linkedIcon.svg"
import facebook from "assets/svg/facebookIcon.svg"
import media from "styles/media"
import gsap from "gsap"
import { navigate } from "gatsby"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"
import { renderRichText } from "gatsby-source-contentful/rich-text"

import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from "react-share"
import MainButton from "components/buttons/MainButton"
import SectionHeaders from "components/textElements/SectionHeaders"
import { MobileContext } from "components/layout"

type props = {
  pageContext: any
}

const NewsExpanded: React.FC<props> = ({ pageContext }) => {
  const mainText = useRef<HTMLDivElement>(null)
  const [contentHeight, setActiveContentHeight] = useState(0)
  const [activeCard, setActiveCard] = useState(-1)
  const [textHeight, setTextHeight] = useState(0)
  const { contributors, mainImages, title, url, order, articleText } =
    pageContext.newsItem
  const shareButtons = [
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
  ]
  const mobile = useContext(MobileContext)
  const options = {
    renderNode: {
      [BLOCKS.HEADING_1]: (n: any, children: any) => (
        <Heading1>{children}</Heading1>
      ),
      [BLOCKS.HEADING_2]: (n: any, children: any) => (
        <Heading2>{children}</Heading2>
      ),
      [BLOCKS.HEADING_3]: (n: any, children: any) => (
        <Heading3>{children}</Heading3>
      ),
      [BLOCKS.HEADING_4]: (n: any, children: any) => (
        <Heading4>{children}</Heading4>
      ),
      [BLOCKS.HEADING_5]: (n: any, children: any) => (
        <Heading5>{children}</Heading5>
      ),
      [BLOCKS.HEADING_6]: (n: any, children: any) => (
        <Heading6>{children}</Heading6>
      ),
      [BLOCKS.PARAGRAPH]: (n: any, children: any) => (
        <Paragraph>{children}</Paragraph>
      ),
      [INLINES.HYPERLINK]: (n: any, children: any) => (
        <ExternalLink
          href={n.data.uri}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </ExternalLink>
      ),
    },
  }

  const shareLinks = [facebook, twitter, linkedin]

  const handleExpandCard = (number: number, className: string) => {
    gsap.to(window, {
      duration: 0.4,
      scrollTo: { y: `#${pageContext.pathName}-bottom` },
    })
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

          <MainButton
            onClick={() => handleExpandCard(i, `content-${i}`)}
            borderColor={colors.coolWhiteLight}
            backgroundColor={colors.activeTeal}
          >
            {activeCard === i ? "BACK" : "ABOUT"}
          </MainButton>
        </MainCard>
        <Content activeCard={activeCard === i} className={`content-${i}`}>
          <ContributorTitle>{name}</ContributorTitle>
          <ContributorBio> {renderRichText(bio, options)}</ContributorBio>
        </Content>
      </Contributor>
    )
  })

  return (
    <NewsStory>
      <SectionHeaders
        small={mobile ? true : false}
        text={title}
        classRoot={`${url}-header`}
      />
      <MainImage
        src={mobile ? mainImages[1].file.url : mainImages[0].file.url}
        alt={mobile ? mainImages[1].file.fileName : mainImages[0].file.fileName}
      />
      <BottomContainer>
        <Sticky className={"sticky"}>
          <MainButton
            onClick={() => {
              navigate("/music")
            }}
            borderColor={colors.coolWhiteLight}
            backgroundColor={colors.activeTeal}
          >
            {activeCard === -1 ? "BACK" : "HOME"}
          </MainButton>
          <Links>
            {shareButtons.map((link, i) => {
              return (
                <a
                  key={`half-link-${i}`}
                  href={"/music"}
                  className="share_links"
                >
                  <img src={shareLinks[i]} alt="link name" />
                </a>
              )
            })}
          </Links>
          <Line />
          <ShareText>Share</ShareText>
        </Sticky>
        <Column id={`${pageContext.pathName}-bottom`}>
          <Text ref={mainText} collapse={activeCard !== -1}>
            {renderRichText(articleText, options)}
          </Text>
          <Contributors>{allContributors}</Contributors>
        </Column>
      </BottomContainer>
    </NewsStory>
  )
}

const NewsStory = styled.section`
  width: 100%;
  position: relative;
  height: auto;
  min-height: 100vh;
  background: ${colors.deepPurple};
  padding: 6.25vw 0;
  ${media.tablet} {
    padding: 6.25vw 0 0 0;
  }
`

const Text = styled.div<{ collapse: boolean }>`
  width: 100%;
  ${text.desktop.bodyM};
  color: ${colors.coolWhite};
  transform: scaleY(${props => (props.collapse ? 0 : 1)});
  transition: 0.5s;
  /* opacity: ${props => (props.collapse ? 0 : 1)}; */
`

const MainImage = styled.img`
  width: 84.56vw;
  height: 29.56vw;
  object-fit: cover;
  display: inline-block;
  position: relative;
  margin: 3.125vw 0 6.25vw 7.25vw;
`

const Sticky = styled.div`
  position: sticky;
  top: 12.5vw;
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

  ${media.fullWidth} {
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
  /* height: 1000px; */
  padding: 0 7.25vw;
  ${media.tablet} {
  }
  ${media.mobile} {
    flex-direction: column-reverse;
  }
`

const Column = styled.div`
  margin-left: 5vw;
  width: 71vw;
  border: 1px solid redl ${media.tablet} {

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

const Heading1 = styled.h1`
  ${text.fullWidth.h1};
  ${media.tablet} {
    ${text.tablet.h1};
  }
`
const Heading2 = styled.h2`
  ${text.fullWidth.h2};
  ${media.tablet} {
    ${text.tablet.h2};
  }
`
const Heading3 = styled.h3`
  ${text.fullWidth.h3};
  ${media.tablet} {
    ${text.tablet.h3};
  }
`
const Heading4 = styled.h4`
  ${text.fullWidth.h4};
  ${media.tablet} {
    ${text.tablet.h4};
  }
`
const Heading5 = styled.h5`
  ${text.fullWidth.h5};
  ${media.tablet} {
    ${text.tablet.h5};
  }
`
const Heading6 = styled.h6`
  ${text.fullWidth.h6};

  ${media.tablet} {
    ${text.tablet.h6};
  }
`
const Paragraph = styled.p`
  ${text.fullWidth.bodyM};
  ${media.tablet} {
    ${text.tablet.bodyS};
  }
`
const ExternalLink = styled.a`
  ${text.fullWidth.bodyM};
  text-decoration: none;
  color: ${colors.activeTeal};
  ${media.tablet} {
    ${text.tablet.bodyS};
  }
`

export default NewsExpanded
