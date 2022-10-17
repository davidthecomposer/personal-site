import React, { useEffect, useState } from "react"
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
  const [wrapper, setWrapper] = useState<HTMLElement | null>(null)

  useEffect(() => {
    if (wrapper) {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: wrapper, start: "top bottom" },
      })

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
      return () => {
        tl.kill()
      }
    }
  }, [wrapper])

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
    <Wrapper ref={ref => setWrapper(ref)}>
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
      <SVGWrapper>
        <svg
          viewBox="0 0 869 321"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="dav-sig-1"
            d="M571.635 204.719C567.598 212.286 563.491 219.794 560.362 227.797C559.69 229.514 558.785 235.492 557.047 237.04C551.336 242.127 567.618 225.963 572.435 220.023C574.13 217.934 580.74 206.085 578.517 213.654C577.629 216.679 572.499 239.973 579.16 235.845C590.823 228.62 597.382 216.409 606.57 206.673C611.246 201.718 606.167 211.025 605.928 211.715C603.606 218.413 602.418 225.384 601.059 232.318C599.391 240.824 614.208 222.02 616.185 219.839C619.414 216.277 622.294 212.474 625.445 208.86C628.094 205.822 625.306 214.977 625.208 215.982C624.49 223.348 628.001 214.591 626.816 222.621C623.674 243.93 618.291 264.603 615.924 286.045C614.068 302.861 618.136 288.493 620.097 280.507C628.115 247.87 637.278 215.535 643.455 182.471C647.478 160.942 642.173 178.505 640.556 189.068C639.904 193.33 639.375 218 639.909 217.292C654.942 197.344 664.649 171.673 677.522 150.226C691.415 127.079 703.858 104.396 711.427 78.391C724.063 34.9737 664.913 161.624 667.575 206.765C668.432 221.278 670.779 222.172 681.559 211.776C689.616 204.006 696.507 194.891 703.004 185.806C704.823 183.261 709.675 173.121 707.88 182.87C706.7 189.276 704.879 196.429 705.533 203.005C706.34 211.117 719.981 194.193 720.621 193.458C724.766 188.698 734.963 172.683 731.247 177.785C726.457 184.364 722.386 192.202 720.197 200.044C713.976 222.325 726.729 211.838 738.16 201.346C761.14 180.253 781.482 151.489 787.766 120.328C788.576 116.311 789.377 72.6208 780.479 81.29C757.322 103.852 748.97 140.454 749.259 171.428C749.467 193.704 755.855 229.527 780.77 237.895C805.031 246.043 831.254 199.475 838.559 183.072C851.807 153.324 852.611 118.799 841.296 88.0472C839.705 83.7216 837.358 77.2397 832.545 83.4255C815.266 105.628 806.03 139.325 801.436 166.345C796.012 198.241 799.941 231.034 816.512 259.204C822.264 268.984 828.145 272.024 835.823 263.693C840.392 258.734 841.659 252.368 840.749 245.895"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            className="dav-sig-2"
            d="M70.2762 114.741C64.8629 136.603 60.673 158.793 60.2469 181.381C60.1436 186.856 59.2026 192.407 62.2527 196.982"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            className="dav-sig-3"
            d="M-24 134.8C68.0187 97.2077 158.777 57.4911 257.826 42.8636C271.613 40.8276 311.779 30.3096 296.495 55.9019C284.915 75.2918 269.972 93.0843 255.932 110.618C219.076 156.642 181.235 201.809 145.162 248.466C144.563 249.241 88.4226 321.533 88.3292 321.347"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            className="dav-sig-4"
            d="M230.746 190.967C223.239 200.654 223.662 202.227 231.749 193.084C240.384 183.323 234.38 190.189 235.093 195.536C235.673 199.887 245.405 189.208 245.902 191.858C247.266 199.135 243.081 204.034 255.486 195.87C279.447 180.1 293.539 154.977 306.078 129.899C312.285 117.485 321.16 92.7641 305.633 118.644C286.655 150.273 279.024 186.205 273.539 222.392C270.962 239.39 268.858 257.062 268.858 274.322C268.858 276.157 270.183 270.9 270.864 269.196"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            className="dav-sig-5"
            d="M315 92.2238C340.01 61.9488 366.819 27.4149 400.672 6.55191C401.524 6.02687 415.431 -3.23516 415.79 1.19742C417.346 20.3873 406.188 47.8524 402.719 66.2388C389.248 137.634 373.67 211.818 378.939 284.828C379.361 290.678 387.361 329.896 380.199 304.829"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            className="dav-sig-6"
            d="M470.91 29.8594C450.349 103.539 434.017 183.376 442.72 260.26C443.619 268.199 440.329 287.031 447.603 283.725C449.512 282.857 450.78 266.865 451.067 265.142"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            className="dav-sig-7"
            d="M337.678 222.62C378.844 208.719 416.583 188.594 453.744 166.082C467.771 157.586 480.871 148.431 496.423 143.247"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            className="dav-sig-8"
            d="M603.226 162.471C603.226 127.124 608.496 82.5834 590.155 50.6567C572.073 19.1801 551.773 26.8555 531.255 52.3891C498.569 93.0656 487.89 158.317 499.601 208.142C507.203 240.487 531.536 265.236 552.201 290.034"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </SVGWrapper>
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

export const DavidSig = styled(props => <DavidSigSVG {...props} />)`
  width: 54.3vw;
  height: 20.1vw;
  position: absolute;
  left: 0;
  top: 3.1vw;
  z-index: 0;
  opacity: 0.03;

  z-index: 0;
`

const SVGWrapper = styled.div`
  position: absolute;

  svg {
    width: 54.3vw;
    height: 20.1vw;
    position: absolute;
    left: 0;
    top: 3.1vw;
    z-index: 0;
    opacity: 0.03;

    z-index: 0;
  }
`
