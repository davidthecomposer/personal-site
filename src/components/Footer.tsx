import React, { useEffect } from "react"
import styled from "styled-components"
import media from "../assets/styles/media"
import colors from "../assets/styles/colors"
import gsap from "gsap"
import text from "../assets/styles/text"
// import twitter from "assets/svg/twitterIcon.svg";
import instagram from "assets/svg/instagramIcon.svg"
import web from "assets/svg/webIcon.svg"
import facebook from "assets/svg/facebookIcon.svg"
import linkedIn from "assets/svg/linkedIcon.svg"
import youtube from "assets/svg/youtube.svg"
import code from "assets/svg/codeIcon.svg"
import music from "assets/svg/soundIcon.svg"
import { ReactComponent as DavidSigSVG } from "assets/svg/davidSig2.svg"
const Footer: React.FC<{}> = () => {
  useEffect(() => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: ".dav-sig-1" } })

    tl.fromTo(
      ".dav-sig-2",
      { drawSVG: "0 0" },
      { drawSVG: "0 100%", duration: 0.2 },
      0
    )
      .fromTo(
        ".dav-sig-3",
        { drawSVG: "0 0" },
        { drawSVG: "0 100%", duration: 0.3 },
        0.2
      )
      .fromTo(
        ".dav-sig-4",
        { drawSVG: "0 0" },
        { drawSVG: "0 100%", duration: 0.4 },
        0.5
      )
      .fromTo(
        ".dav-sig-5",
        { drawSVG: "0 0" },
        { drawSVG: "0 100%", duration: 0.2 },
        1
      )
      .fromTo(
        ".dav-sig-6",
        { drawSVG: "0 0" },
        { drawSVG: "0 100%", duration: 0.2 },
        1.2
      )
      .fromTo(
        ".dav-sig-7",
        { drawSVG: "0 0" },
        { drawSVG: "0 100%", duration: 0.1 },
        1.4
      )
      .fromTo(
        ".dav-sig-8",
        { drawSVG: "0 0" },
        { drawSVG: "0 100%", duration: 0.3 },
        1.5
      )
      .fromTo(
        ".dav-sig-1",
        { drawSVG: "0 0" },
        { drawSVG: "0% 100%", duration: 0.8 },
        1.9
      )
  }, [])

  const socials = [
    // { icon: twitter, name: "twitter icon", link: "" },
    {
      icon: facebook,
      name: "facebook icon",
      link: "https://www.facebook.com/david_the_composer/",
    },
    {
      icon: instagram,
      name: "instagram icon",
      link: "https://www.instagram.com/david_the_composer/",
    },
    { icon: web, name: "web icon", link: "/" },
    {
      icon: linkedIn,
      name: "linkedIn icon",
      link: "https://www.linkedin.com/in/dhcampbell/",
    },
  ]

  const links = [
    {
      icon: music,
      name: "davidhalcampbell.com/music",
      link: "/music",
    },
    {
      icon: code,
      name: "davidhalcampbell.com/developer",
      link: "/developer",
    },
    {
      icon: youtube,
      name: "Youtube Channel",
      link: "https://www.youtube.com/channel/UCRBQPl7AraFVqO92zWR4iWw",
    },
  ]

  const allLinks = links.map((link, i) => {
    return (
      <OutBoundLink key={`link-${i}`} href={link.link}>
        <img src={link.icon} alt={`${link.name}-icon and link`} />
        <LinkText>{link.name}</LinkText>
      </OutBoundLink>
    )
  })

  const allSocials = socials.map((social, i) => {
    return (
      <a key={i} href={social.link}>
        <img src={social.icon} alt="social icon" />
      </a>
    )
  })

  return (
    <Wrapper>
      <BuildColumn>
        <Title>I Create </Title>
        <Text>
          Whether it is composing music, developing websites, or cultivating
          relationships with other creative people I am genuinly happiest
          working on projects and creating something that I hope resonates with
          others. If you want to join me on that journey please consider
          following my social media or getting in touch!
        </Text>
        <Email>
          <a
            href="mailto:composer@davidhalcampbell.com"
            rel="noreferrer noopener"
            target="__blank"
          >
            composer@davidhalcampbell.com
          </a>
          <a
            href="mailto:developer@davidhalcampbell.com"
            rel="noreferrer noopener"
            target="__blank"
          >
            developer@davidhalcampbell.com
          </a>
        </Email>
      </BuildColumn>
      <SocialColumn>
        <FooterSub>Social</FooterSub>
        <HeaderLine />
        <Socials>{allSocials}</Socials>
        <FooterSub>Links</FooterSub>
        <HeaderLine />
        {allLinks}
      </SocialColumn>
      <DavidSig />
    </Wrapper>
  )
}

export default Footer

const Wrapper = styled.footer`
  position: relative;
  height: 30.9vw;
  width: 100%;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 4.1vw 2.3vw;
  z-index: 999;
  right: 0;
  box-sizing: border-box;
  background: linear-gradient(
    128.33deg,
    #2c354b 11.05%,
    rgba(44, 47, 78, 0.895521) 23.42%,
    rgba(42, 19, 90, 0.41) 90.48%
  );
  ${media.mobile} {
    height: auto;
    padding: 12.6vw 2.4vw 6vw;
    flex-direction: column;
    justify-content: flex-start;
  }
`

const BuildColumn = styled.div`
  width: 44.3vw;
  position: relative;
  z-index: 2;
  ${media.tablet} {
  }
  ${media.mobile} {
    width: 87.2vw;
    margin-left: 3vw;
    margin-bottom: 12vw;
  }
`

const Title = styled.h3`
  ${text.desktop.h2};
  margin-bottom: 3.1vw;
  color: ${colors.coolWhite};
  ${media.tablet} {
  }
  ${media.mobile} {
    font-size: 8.7vw;
  }
`

const Text = styled.p`
  ${text.desktop.bodyS};
  color: ${colors.coolWhite};
  position: relative;
  width: 100%;
  margin-bottom: 3.1vw;
  ${media.tablet} {
  }
  ${media.mobile} {
    font-size: 3.9vw;
    width: 86vw;
  }
`

const Email = styled.div`
  ${text.desktop.bodyS};
  text-decoration: none;
  color: ${colors.coolPurple};
  display: flex;
  flex-direction: column;
  a {
    color: ${colors.coolPurple};
    transition: 0.5s;
    ${media.hover} {
      :hover {
        color: ${colors.dullTeal};
        transition: 0.5s;
      }
    }
  }

  ${media.mobile} {
    font-size: 3.9vw;
    a {
      margin-top: 3vw;
    }
  }
`

const FooterSub = styled.h4`
  ${text.desktop.h6};
  text-align: right;
  color: ${colors.coolWhite};
  ${media.tablet} {
  }
  ${media.mobile} {
    font-size: 7.2vw;
  }
`

const Socials = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 3.8vw;
  a {
    ${media.hover} {
      :hover {
        transform: rotate(360deg);

        transition: 0.3s;
      }
    }
    margin-right: 1.3vw;
    img {
      width: 2vw;
      height: 2vw;
    }
  }

  ${media.mobile} {
    margin-bottom: 16vw;
    a {
      margin-right: 8.5vw;
      img {
        width: 7.7vw;
        height: 7.7vw;
      }
    }
  }
`

const HeaderLine = styled.div`
  position: relative;

  height: 0.2vw;

  background: ${colors.skyBlue};
  margin: 0.3vw 1.8vw 1.8vw 0;
  border-radius: 0.3vw;

  ${media.mobile} {
    width: 91.3vw;
    height: 0.5vw;
    margin: 0.5vw 3.9vw 7.2vw 0;
  }
`

const SocialColumn = styled.div`
  width: 28.2vw;

  ${FooterSub}:nth-of-type(2) {
    text-align: left;
  }

  ${HeaderLine}:nth-of-type(3) {
    margin-right: 0;
    margin-left: 2vw;
    color: white;
  }
  ${media.mobile} {
    width: 100%;
  }
`

const OutBoundLink = styled.a`
  ${text.desktop.bodyS};
  color: ${colors.coolWhite};
  display: flex;
  margin-left: 9.9vw;
  align-items: center;
  margin-bottom: 0.5vw;
  cursor: pointer;
  transition: 0.5s;
  img {
    width: 1.6vw;
    height: 1.3vw;
    transition: 0.5s;
  }
  ${media.hover} {
    :hover {
      color: ${colors.dullTeal};
      transition: 0.5s;
      img {
        transform: scale(1.2);
        transform-origin: "100% 0%";
        transition: 0.5s;
      }
    }
  }

  ${media.mobile} {
    font-size: 3.9vw;
    margin-bottom: 4.8vw;
    img {
      width: 6.3vw;
      height: 4.8vw;
    }
  }
`

const LinkText = styled.p`
  margin-left: 15px;
  text-decoration: none;
`

const DavidSig = styled(DavidSigSVG)`
  width: 54.3vw;
  height: 20.1vw;
  position: absolute;
  left: 0;
  top: 3.1vw;
  z-index: 0;
  opacity: 0.03;

  z-index: 0;
`
