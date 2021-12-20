import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { PrimaryButtonStyle } from "styles/Buttons"
import colors from "styles/Colors"
import { Heading1, Body1, SubHeader2 } from "styles/text"
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

const News: React.FC<{ mobile: boolean }> = ({ mobile }) => {
  const header = useRef(null)
  const headerLine = useRef(null)
  const [openLink, setOpenLink] = useState("")

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
    const {
      title,
      mainImages,
      paragraph,
      paragraph1,
      moreTitle,
      layout,
      share,
      links1,
      links2,
      moreImage1,
      moreImage2,
      moreText1,
      moreText2,
    } = item

    return (
      <NewsCard key={`news-card${i}`} className={`newsCard-${i}`}>
        <Front className={`front-${i}`}>
          <TitleContainer>
            <NewsTitle>{title}</NewsTitle>
          </TitleContainer>
          <NewsRow>
            <Text>
              {paragraph && <p>{paragraph}</p>}
              {paragraph1 && <p>{paragraph1}</p>}
            </Text>
            <MainImage
              src={mobile ? mainImages[1] : mainImages[0]}
              alt={item.title}
            />
          </NewsRow>
          <ButtonRow>
            <MoreBtn onClick={() => handleMore(`.front-${i}`, `.more-${i}`)}>
              <span>More</span>
              <SmallArrow />
            </MoreBtn>
            <Share
              onClick={() =>
                setOpenLink(openLink === `share-${i}` ? "" : `share-${i}`)
              }
              open={openLink === `share-${i}`}
            >
              <span>Share </span>
              <FacebookShareButton
                url={"https://www.davidhalcampbell.com/music#news"}
                quote={share}
                className="share_links"
              >
                <img src={facebook} alt="facebook" />
              </FacebookShareButton>
              <TwitterShareButton
                url={"https://www.davidhalcampbell.com/music#news"}
                title={share}
                className="share_links"
              >
                <img src={twitter} alt="twitter" />
              </TwitterShareButton>
              <LinkedinShareButton
                url={"https://www.davidhalcampbell.com/music#news"}
                source={"https://www.davidhalcampbell.com/music#news"}
                summary={share}
                className="share_links"
              >
                <img src={linkedin} alt="linkedin" />
              </LinkedinShareButton>
            </Share>
          </ButtonRow>
        </Front>
        <More className={`more-${i}`} layout={layout === "full"}>
          <TitleContainer>
            <NewsTitle>{moreTitle}</NewsTitle>
          </TitleContainer>
          <Back
            onClick={() => handleBack(`.front-${i}`, `.more-${i}`)}
            layout={layout === "full"}
          >
            <SmallArrow />
            <span>Back</span>
          </Back>
          {!layout && (
            <RowNoLayout>
              <Half>
                <MoreText>{moreText1}</MoreText>
                <MoreImage
                  src={mobile ? moreImage1[1] : moreImage1[0]}
                  alt={`${moreTitle}-1`}
                />
                {mobile && (
                  <MoreBtn
                    onClick={() => handleMore(`.front-${i}`, `.more-${i}`)}
                  >
                    <span>More</span>
                    <SmallArrow />
                  </MoreBtn>
                )}
                <Links
                  onClick={() =>
                    setOpenLink(openLink === `link-${i}` ? "" : `link-${i}`)
                  }
                  open={openLink === `link-${i}`}
                >
                  <span>Links</span>
                  {links1.map((link, i) => {
                    return (
                      <a
                        key={`half-link-${i}`}
                        href={link.link}
                        className="share_links"
                      >
                        <img src={link.icon} alt="link name" />
                      </a>
                    )
                  })}
                </Links>
              </Half>
              <Half1>
                {mobile && (
                  <TitleContainer>
                    <NewsTitle>{moreTitle}</NewsTitle>
                  </TitleContainer>
                )}
                <MoreImage
                  src={mobile ? moreImage2[1] : moreImage2[0]}
                  alt={`${moreTitle}-2`}
                />
                <MoreText>{moreText2}</MoreText>
                {mobile && (
                  <Back onClick={() => handleBack(`.front-${i}`, `.more-${i}`)}>
                    <SmallArrow />
                    <span>Back</span>
                  </Back>
                )}
                <Links
                  onClick={() =>
                    setOpenLink(openLink === `link-${i}` ? "" : `link-${i}`)
                  }
                  open={openLink === `link-${i}`}
                >
                  <span>Links</span>
                  {links2.map((link, i) => {
                    return (
                      <a
                        key={`half1-link-${i}`}
                        href={link.link}
                        className="share_links"
                      >
                        <img src={link.icon} alt="link name" />
                      </a>
                    )
                  })}
                </Links>
              </Half1>
            </RowNoLayout>
          )}
          {layout === "full" && (
            <Row>
              <Full>
                <MoreImage
                  src={mobile ? moreImage1[1] : moreImage1[0]}
                  alt={`${moreTitle}`}
                />
                <MoreText>{moreText1}</MoreText>
                <Links
                  onClick={() =>
                    setOpenLink(openLink === `link-${i}` ? "" : `link-${i}`)
                  }
                  open={openLink === `link-${i}`}
                >
                  <span>Links</span>
                  {links1.map((link: any, i: number) => {
                    return (
                      <a
                        key={`link-full-link-${i}`}
                        href={link.link}
                        className="share_links"
                      >
                        <img src={link.icon} alt="link name" />
                      </a>
                    )
                  })}
                </Links>
              </Full>
            </Row>
          )}
        </More>
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

  const handleBack = (activeClass: string, inActiveClass: string) => {
    gsap.to(activeClass, {
      x: "+=101%",
      duration: 0.5,
      ease: "Power1.out",
      delay: 0.3,
    })
    gsap.to(inActiveClass, {
      x: "+=100%",
      duration: 0.5,
      ease: "Power1.out",
    })
  }

  return (
    <Wrapper id="news">
      <HeaderWrapper>
        <Header ref={header}>News</Header>
        <HeaderLine ref={headerLine} />
      </HeaderWrapper>
      <NewsItemsWrapper>{allNewsItems}</NewsItemsWrapper>
      <NewsCardBG />
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
  ${Heading1};
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

const NewsCardBG = styled(NewsCardBGSVG)`
  width: 1000px height 200px;
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
  width: 81.8vw;
  position: relative;
  overflow: hidden;
  height: 38vw;

  margin-bottom: 11.3vw;

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

const Front = styled.div`
  position: absolute;
  width: 100%;
  height: 31.9vw;
  left: 0;
  top: 0;

  ${media.mobile} {
    height: 100%;
  }
`

const NewsTitle = styled.h3`
  position: absolute;
  top: 0;

  ${SubHeader2};
  width: 100%;
  text-align: right;

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
  height: 3vw;
  position: relative;
  margin-top: 0.3vw;
  margin-bottom: 1.9vw;

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
  height: 2.6vw;
  position: relative;
  margin-top: 0.6vw;
  display: flex;

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
  width: 40.5vw;
  ${Body1};
  font-size: 1.3vw;
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

const MainImage = styled.img`
  width: 38.9vw;
  height: 23.5vw;

  ${media.mobile} {
    width: 94.4vw;
    height: 57.2vw;
  }
  ${media.tabletPortrait} {
    width: 492px;
    height: 298px;
  }
`

const SmallArrow = styled(SmallArrowSVG)`
  width: 1.7vw;
  height: 1vw;
  transition: 0.4s;
  transform: translateX(0);
  ${media.mobile} {
    position: relative;
    width: 6.8vw;
    height: 2.2vw;
    margin-left: 0.7vw;
  }
  ${media.tabletPortrait} {
    width: 35px;
    height: 11px;
    margin-left: 4px;
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

const MoreBtn = styled.button`
  ${PrimaryButtonStyle};
  padding-left: 0.7vw;
  width: 11.9vw;
  margin-right: 1.3vw;
  border-color: ${colors.brightPurple};
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${SmallArrow} {
    transform: rotate(180deg);
  }

  padding-right: 0.7vw;
  span {
    margin-left: 1vw;
    margin-right: 1vw;
  }
  ${media.mobile} {
    padding: 0 1vw;
    left: 0;
    margin-right: 0;
    position: absolute;
    ${SmallArrow} {
      margin-right: 1vw;
    }
    span {
      margin-left: 1vw;
    }
  }
  ${media.tabletPortrait} {
    width: 150px;
    height: 50px;
    font-size: 22px;
    padding: 0 5px;
    left: 0;
    margin-right: 0;
    ${SmallArrow} {
      margin-right: 5px;
    }
    span {
      margin-left: 5px;
    }
  }
`

const RowNoLayout = styled.div`
  position: relative;
  display: flex;
  height: 28.3vw;
  width: 100%;
  justify-content: space-between;

  ${media.mobile} {
    width: 200%;
    height: 100%;
  }
`

const Row = styled.div`
  position: relative;
  display: flex;
  height: 28.3vw;
  width: 100%;
  justify-content: space-between;
`

const MoreImage = styled.img`
  width: 16.1vw;
  height: 23.8vw;
  border-radius: 2%;

  ${media.mobile} {
    width: 46.1vw;
    height: 56.3vw;
  }
  ${media.tabletPortrait} {
    width: 239px;
    height: 291px;
  }
`

const MoreText = styled.div`
  ${Body1};
  a {
    color: ${colors.activeTeal};
  }
  p {
    margin-bottom: 0.6vw;
  }

  ${media.mobile} {
    p {
      font-size: 3.9vw;
    }
  }
  ${media.tabletPortrait} {
    p {
      font-size: 20px;
    }
  }
`

const Links = styled.div<{ open: boolean }>`
  ${PrimaryButtonStyle};
  height: 2.5vw;
  padding: 0.2vw 0 0.3vw 0.7vw;
  width: 11.9vw;
  border-color: ${colors.brightPurple};
  z-index: 5;
  position: relative;
  bottom: 0;
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: flex-end;
  span {
    position: absolute;
    left: 1vw;
  }
  transition: 0.5s;
  .share_links {
    position: relative;
    margin-right: 0.6vw;
    opacity: 0;
    z-index: -1;
    width: 2vw;
    height: 2vw;
    img {
      width: 100%;
      height: 100%;
    }
    ${media.hover} {
      :hover {
        transform: rotateZ(360deg);
        transition: 0.3s;
        transform-origin: 50% 50%;
      }
    }
  }
  ${media.hover} {
    :hover {
      width: 16.1vw;
      opacity: 0.5s;
      .share_links {
        opacity: 1;
        z-index: 2;
        transition: opacity 0.4s z-index 0.4s 0.4s;
      }
    }
  }
  ${media.tablet} {
    width: ${props => (props.open ? "15vw" : "11.9vw")};
    .share_links {
      width: 20px;
      height: 20px;
      img {
        width: 100%;
        height: 100%;
      }
      opacity: ${props => (props.open ? 1 : 0)};
      z-index: ${props => (props.open ? 2 : -1)};
      transform: scale(${props => (props.open ? 1 : 0)});
    }
  }
  ${media.mobile} {
    width: ${props => (props.open ? "50vw" : "30vw")};
    .share_links {
      width: 30px;
      height: 40px;
      img {
        width: 100%;
        height: 100%;
      }
      opacity: ${props => (props.open ? 1 : 0)};
      z-index: ${props => (props.open ? 2 : -1)};
      transform: scale(${props => (props.open ? 1 : 0)});
    }
  }
  ${media.tabletPortrait} {
    width: ${props => (props.open ? "259px" : "155px")};
    .share_links {
      width: 30px;
      height: 40px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    height: 50px;
    font-size: 22px;
  }
`

const Share = styled(Links)<{ open: boolean }>`
  border-color: #73d1ef;

  ${media.hover} {
    :hover {
      width: 15vw;
      opacity: 0.5s;
      .share_links {
        opacity: 1;
        z-index: 2;
        transition: opacity 0.4s z-index 0.4s 0.4s;
      }
    }
  }
  ${media.mobile} {
    span {
      margin-right: 1.2vw;
    }
  }
  ${media.tabletPortrait} {
    span {
      margin-right: 6px;
    }
  }
`

const NewsItemsWrapper = styled.div`
  width: 100%;
  position: relative;
  ${MoreBtn} {
    ${media.hover} {
      :hover {
        ${SmallArrow} {
          transform: rotate(180deg) translateX(-0.3vw);
          transition: 0.4s;
        }
      }
    }
  }
  ${NewsCard}:nth-child(odd) {
    margin-left: 5.7vw;
    ${media.mobile} {
      margin-left: 0;

      ${Share} {
        margin-left: 33vw;
      }
    }
    ${media.tabletPortrait} {
      margin-left: 173px;
      ${Share} {
        margin-left: 171px;
      }
    }

    ${More} {
      ${NewsTitle} {
        text-align: left;
        ::after {
          left: 3vw;
        }
      }
    }
  }

  ${NewsCard}:nth-child(even) {
    ${media.mobile} {
      margin-left: 0;
      ${Share} {
        margin-left: auto;
        margin-right: 33vw;
      }
      ${MoreBtn} {
        right: 0;
        left: auto;
      }
    }
    ${media.tabletPortrait} {
      margin-left: 30px;
      ${Share} {
        margin-right: 171px;
      }
    }
    ${NewsRow} {
      flex-direction: row-reverse;
      ${media.mobile} {
        flex-direction: column-reverse;
      }
    }
    ${NewsTitle} {
      text-align: left;
      ::after {
        left: 3vw;
      }
    }
    ${ButtonRow} {
      flex-direction: row-reverse;
      ${media.mobile} {
        right: 0;
        left: auto;
      }
    }
    ${MoreBtn} {
      text-align: right;
      padding-left: 0;
      padding-right: 0.7vw;
      margin-left: 1.3vw;
      margin-right: 0;
      ${media.hover} {
        :hover {
          ${SmallArrow} {
            transform: rotate(180deg) translateX(-0.3vw);
            transition: 0.4s;
          }
        }
      }
    }
    ${Links} {
      border-color: #73d1ef;
      padding-right: 0.7vw;
      text-align: right;
      z-index: 5;
      flex-direction: row-reverse;
      span {
        left: auto;
        right: 1vw;
      }

      a {
        margin-left: 0.6vw;
        margin-right: 0;
      }
    }
    ${More} {
      ${NewsTitle} {
        text-align: right;
        ::after {
          left: auto;
          right: 3vw;
        }
      }
    }
  }

  ${media.mobile} {
    margin-top: 16.9vw;
  }
  ${media.tabletPortrait} {
    margin-top: 87px;
  }
`

const Half = styled.div`
  width: 38.7vw;
  height: 100%;
  position: relative;
  ${MoreText} {
    position: absolute;
    left: 17.6vw;
    top: -0.5vw;
    width: 21.1vw;
  }
  ${Links} {
    position: absolute;
    bottom: 0;
    border-color: ${colors.brightPurple};
  }
  ${media.mobile} {
    width: 95.2vw;
    display: flex;
    flex-direction: column-reverse;
    justify-content: flex-end;
    ${MoreImage} {
      width: 33.3vw;
      height: 47.3vw;
    }
    ${MoreText} {
      font-size: 3.9vw;
      line-height: 150%;

      position: relative;
      width: 93vw;
      top: auto;
      left: auto;
      height: 74.6vw;
      padding-bottom: 10vw;
      padding-top: 2.4vw;
    }
    ${Links} {
      top: 38vw;
      left: 35vw;
      bottom: auto;
    }
    ${MoreBtn} {
      left: auto;
      right: 3vw;
      top: 12vw;
    }
  }
  ${media.tabletPortrait} {
    width: 492px;
    ${MoreImage} {
      width: 172px;
      height: 245px;
    }
    ${MoreText} {
      font-size: 20px;

      width: 481px;
      height: 386px;
      padding-bottom: 51px;
      padding-top: 12px;
    }
    ${Links} {
      top: 196px;
      left: 181px;
    }
    ${MoreBtn} {
      right: 15px;
      top: 62px;
    }
    ${Back} {
      right: 60px;
    }
  }
`
const Half1 = styled.div`
  position: relative;
  width: 38.7vw;
  height: 100%;

  ${MoreText} {
    margin-top: -0.5vw;
    height: 26.2vw;
  }
  ${Links} {
    position: absolute;
    right: 0;
    border-color: #73d1ef;
    padding-right: 0.7vw;
    text-align: right;
    z-index: 5;
    flex-direction: row-reverse;
    span {
      right: 1vw;
    }
    a {
      margin-left: 0.6vw;
      margin-right: 0;
    }
  }
  ${MoreImage} {
    float: left;
    margin-bottom: 0;
    margin-top: 4.4vw;
    padding-right: 1.9vw;
    shape-outside: padding-box;
    z-index: -1;
  }

  ${media.mobile} {
    width: 95.2vw;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    ${TitleContainer} {
      position: absolute;
      top: -10vw;
      left: 0;
    }
    ${MoreText} {
      font-size: 3.9vw;
      line-height: 150%;

      position: relative;
      width: 93vw;
      top: auto;
      left: auto;
      height: 74.6vw;
      padding-bottom: 10vw;
      padding-top: 2.4vw;
    }

    ${MoreImage} {
      float: none;
      position: relative;
      margin-top: 0;

      width: 137.9px;
      height: 195.8px;
    }
    ${Links} {
      top: 38vw;
      left: 35vw;
      bottom: auto;
      span {
        right: 1vw;
        left: auto;
      }
    }
    ${Back} {
      position: absolute;
      left: auto;
      right: 3vw;
      top: 0;
    }
  }
  ${media.tabletPortrait} {
    width: 492px;

    ${TitleContainer} {
      position: absolute;
      top: -51px;
    }
    ${MoreText} {
      font-size: 20px;

      width: 481px;

      height: 386px;
      padding-bottom: 51px;
      padding-top: 12px;
    }

    ${MoreImage} {
      width: 172px;
      height: 245px;
    }
    ${Links} {
      top: 196px;
      left: 181px;
    }
    ${Back} {
      right: 15px;
    }
  }
`

const Full = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  ${MoreImage} {
    width: 39.1vw;
    height: 24.9vw;
    margin-right: 2.5vw;
  }

  ${Links} {
    position: absolute;
    bottom: 0;
    left: 0;
  }
  ${MoreText} {
    width: 25.3vw;
    font-size: 1.1vw;
    p {
      font-size: 1.1vw;
    }
  }

  ${media.mobile} {
    flex-direction: column;

    height: 144.9vw;

    ${MoreImage} {
      width: 59.9vw;
      height: 38.2vw;
      margin-right: 0;
      margin-bottom: 12.1vw;
    }
    ${MoreText} {
      font-size: 3.9vw;
      position: relative;
      width: 87vw;
      height: 67.4vw;

      padding-bottom: 10vw;
      padding-top: 2.4vw;
      top: auto;
      left: auto;
      p {
        font-size: 3.9vw;
        line-height: 150%;
      }
    }
    ${Links} {
      position: absolute;
      top: 41vw;
      left: 0;
    }
  }
  ${media.tabletPortrait} {
    height: 750px;

    ${MoreImage} {
      width: 310px;
      height: 197px;
      margin-bottom: 62px;
    }
    ${MoreText} {
      font-size: 20px;
      width: 450px;
      height: 349px;
      padding-bottom: 51px;
      padding-top: 12px;
      p {
        font-size: 20px;
      }
    }
    ${Links} {
      top: 212px;
    }
    ${Back} {
      right: 15px;
    }
  }
`

export default News
