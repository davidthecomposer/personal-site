import React, {
  useEffect,
  useState,
  useRef,
  useContext,
  useCallback,
} from "react"
import { MobileContext } from "components/layout"
import styled from "styled-components"
import media from "styles/media"
import colors from "styles/Colors"
import gsap from "gsap"
import { Heading1 } from "styles/text"
import { ReactComponent as DavidSigSVG } from "assets/svg/davidSig.svg"
import { ReactComponent as DavidInitialsSVG } from "assets/svg/logoT.svg"
import { useHistory } from "react-router-dom"

const Header: React.FC<{}> = () => {
  const mobile = useContext(MobileContext)
  // const tablet = useContext(TabletContext);
  const history = useHistory().location
  const [role, setRole] = useState("")

  const name = useRef(null)
  const line = useRef(null)
  const myRole = useRef(null)
  const navLinks = useRef(null)
  const wrapper = useRef(null)
  const [display, setDisplay] = useState(true)
  const [navOpen, setNavOpen] = useState(true)
  const navIsOpen = useRef(true)
  const [initial, setInitial] = useState(true)

  const pressed = useRef(false)

  useEffect(() => {
    const pathname = location.pathname

    if (pathname) {
      if (pathname === "/") {
        setDisplay(true)
        setRole("composer")
      } else if (pathname === "/music") {
        setRole("composer")
      } else {
        setDisplay(false)
        setRole("developer")
      }
    }
  }, [history])

  useEffect(() => {
    if (mobile && !initial) {
      const tl = gsap.timeline()

      if (!navOpen) {
        tl.to(
          wrapper.current,
          { width: "96vw", duration: 0, background: "rgba(0,0,0,0.5)" },
          0
        ).to(
          ".header__link",
          {
            opacity: 1,
            stagger: 0.05,
            reversed: true,
            duration: 0.2,
            ease: "power1.inOut",
          },
          0
        )
      } else {
        tl.to(
          ".header__link",
          {
            opacity: 0,
            stagger: 0.05,

            duration: 0.2,
            ease: "power1.inOut",
          },
          0
        )
          .to(wrapper.current, { width: "12vw", duration: 0 }, 0.4)
          .to(
            wrapper.current,
            { background: "rgba(0,0,0,0)", duration: 0.2 },
            0.4
          )
      }
    }
  }, [navOpen, mobile, initial])

  const handleClick = () => {
    if (!mobile) {
      setNavOpen(true)
      navIsOpen.current = true
      pressed.current = true
    } else {
      setNavOpen(!navOpen)
    }
  }

  useEffect(() => {
    const tl = gsap.timeline({
      onStart: () => (mobile ? null : setInitial(false)),
    })
    if (!mobile) {
      gsap.set(line.current, { scaleY: 0, opacity: 0 })
      tl.to(
        line.current,
        { scaleY: 1, opacity: 1, duration: 0.6, ease: "power1.inOut" },
        0
      )
        .to(name.current, { left: 0, duration: 1.3, ease: "power1.inOut" }, 0.3)

        .to(
          myRole.current,
          { left: "1.3vw", duration: 0.8, ease: "power1.inOut" },
          0.7
        )
        .to(
          ".header__link",
          { opacity: 1, stagger: 0.15, duration: 0.4, ease: "power1.inOut" },
          1
        )
    } else {
      if (initial) {
        gsap.set(line.current, { scaleY: 0, opacity: 0 })
        tl.to(
          line.current,
          { scaleY: 1, duration: 0.6, opacity: 1, ease: "power1.inOut" },
          0
        )
          .to(
            name.current,
            { left: 0, duration: 1.3, ease: "power1.inOut" },
            0.3
          )

          .to(
            myRole.current,
            { left: "1.3vw", duration: 0.8, ease: "power1.inOut" },
            0.7
          )
          .to(
            [name.current, line.current, myRole.current],
            { scaleY: 0, duration: 0.3 },
            1.5
          )
          .to(
            ".header__link",
            {
              opacity: 1,
              stagger: 0.05,
              duration: 0.2,
              ease: "power1.inOut",
            },
            1.5
          )
          .to(
            ".header__link",
            {
              opacity: 0,
              stagger: 0.05,
              duration: 0.2,
              ease: "power1.inOut",
            },
            2
          )
          .to(
            wrapper.current,
            {
              width: "12vw",
              duration: 0.4,
              onComplete: () => setInitial(false),
            },
            2.3
          )
      }
    }
  }, [mobile, initial])

  const handleScroll = useCallback(() => {
    if (!mobile) {
      if (window.scrollY > 0) {
        if (navIsOpen.current) {
          gsap.to(line.current, {
            scaleY: 0,
            opacity: 0,
            duration: 0.3,
            ease: "power1.inOut",
            onStart: () => {
              navIsOpen.current = false
              setNavOpen(false)
            },
          })
        }
      } else {
        gsap.to(line.current, {
          scaleY: 1,
          opacity: 1,
          duration: 0.3,
          ease: "power1.inOut",
          onStart: () => {
            navIsOpen.current = true
            setNavOpen(true)
          },
        })
      }
    } else {
      setNavOpen(true)
    }
  }, [mobile])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [handleScroll])

  useEffect(() => {
    if (!mobile) {
      if (!initial) {
        const ready =
          !gsap.isTweening(".music__nav-btn") &&
          !gsap.isTweening(".header_link")
        if (!ready) {
          gsap.getTweensOf(".music__nav-btn").forEach(tween => {
            tween.kill()
          })
          gsap.getTweensOf(".header__link").forEach(tween => {
            tween.kill()
          })
          gsap.getTweensOf(".titleWrapper").forEach(tween => {
            tween.kill()
          })
        }

        if (navOpen) {
          if (!ready) {
            gsap.set(".music__nav-btn", { opacity: 1, zIndex: 10 })
            gsap.set(".header__link", { opacity: 0, zIndex: 0 })
            gsap.set(wrapper.current, {
              width: mobile ? "20vw" : "4vw",
              duration: 0,
            })
          }
          const tl = gsap.timeline()

          tl.to(".music__nav-btn", { opacity: 0, zIndex: 0, duration: 0.3 }, 0)
            .to(
              wrapper.current,
              {
                width: "96vw",
                duration: 0,
              },
              0
            )
            .to(
              ".titleWrapper",
              {
                width: "58vw",
                duration: 0,
              },
              0
            )
            .to(
              ".header__link",
              {
                opacity: 1,
                stagger: 0.1,
                duration: 0.2,
                reversed: true,
                ease: "power1.inOut",
                onComplete: () => {
                  gsap.set(".header__link", { zIndex: 10 })
                },
              },
              0
            )
        } else {
          if (!ready) {
            gsap.set(".header__link", { opacity: 0, zIndex: 10 })
            gsap.to(".music__nav-btn", {
              opacity: 1,
              zIndex: 10,
              duration: 0.3,
            })
            gsap.to(wrapper.current, {
              width: mobile ? "20vw" : "4vw",
              duration: 0,
            })
          } else {
            if (pressed.current) {
              gsap.set(".header__link", { opacity: 0, zIndex: 10 })
              gsap.to(".music__nav-btn", {
                opacity: 1,
                zIndex: 10,
                duration: 0.3,
              })
              gsap.to(".titleWrapper", {
                width: "56vw",
                duration: 0,
              })
              gsap.to(wrapper.current, {
                width: mobile ? "20vw" : "4vw",
                duration: 0,
                delay: 0.4,
              })
              gsap.to(".titleWrapper", {
                width: "0",
                duration: 0,
                delay: 0.4,
              })
              pressed.current = false
            }
            const tl1 = gsap.timeline()
            tl1
              .to(
                ".music__nav-btn",
                {
                  opacity: 1,
                  zIndex: 10,
                  duration: 0.7,
                  onComplete: () => {
                    gsap.set(".header__link", { zIndex: 0 })
                  },
                },
                0.22
              )
              .fromTo(
                ".david_sig",
                { drawSVG: "0,0" },
                {
                  drawSVG: "100%, 0",
                  stagger: 0.05,
                  duration: 0.05,

                  ease: "power1.inOut",
                },
                0.22
              )
              .to(
                ".header__link",
                {
                  opacity: 0,
                  stagger: 0.05,
                  duration: 0.2,
                  ease: "power1.inOut",
                },
                0
              )
              .to(
                wrapper.current,
                { width: mobile ? "20vw" : "4vw", duration: 0 },
                0.3
              )
              .to(
                ".titleWrapper",
                {
                  width: "0",
                  duration: 0,
                },
                0.3
              )
          }
        }
      }
    }
  }, [navOpen, initial, mobile])

  const handleLinkClick = (sectionID: string) => {
    gsap.to(window, { duration: 0.2, scrollTo: sectionID })
  }

  return (
    <Wrapper
      ref={wrapper}
      willDisplay={display}
      open={navOpen && !pressed.current}
    >
      <TitleWrapper className="titleWrapper">
        <TitleContainer open={navOpen && !pressed.current}>
          <Title ref={name}>David Campbell</Title>
        </TitleContainer>
        <Line ref={line} open={navOpen} initial={initial} />
        <RoleContainer open={navOpen && !pressed.current}>
          <Role ref={myRole}>{role}</Role>
        </RoleContainer>
      </TitleWrapper>
      <NavLinks
        ref={navLinks}
        open={navOpen && !pressed.current}
        initial={initial}
      >
        <Link
          open={navOpen}
          className="header__link"
          onClick={() => handleLinkClick("#media-music")}
        >
          Media
        </Link>
        <Link
          open={navOpen}
          className="header__link"
          onClick={() => handleLinkClick("#Concert-Music")}
        >
          Concert
        </Link>
        <Link
          open={navOpen}
          className="header__link"
          onClick={() => handleLinkClick("#news")}
        >
          News
        </Link>
        <Link
          open={navOpen}
          className="header__link"
          onClick={() => handleLinkClick("#about")}
        >
          About
        </Link>
        <Link
          open={navOpen}
          className="header__link"
          onClick={() => handleLinkClick("#connect")}
        >
          Connect
        </Link>
      </NavLinks>
      <NavBtn
        aria-label="open navigation"
        className="music__nav-btn"
        onClick={handleClick}
        open={navOpen && initial}
      >
        {!mobile ? <DavidSig /> : <DavidInitials />}
      </NavBtn>
    </Wrapper>
  )
}

export default Header

const Wrapper = styled.nav<{ willDisplay: boolean; open: boolean }>`
  position: fixed;
  height: 6vw;
  box-sizing: border-box;
  display: ${props => (props.willDisplay ? "flex" : "none")};
  justify-content: space-between;
  align-items: center;
  padding: 0.5vw 2vw;
  z-index: 1000;
  right: 0;
  top: 0;
  ${media.mobile} {
    height: 19.3vw;
  }

  ${media.tabletPortrait} {
    height: 100px;
  }
`

const TitleWrapper = styled.div`
  display: flex;
  ${Heading1};
  color: ${colors.brightPurple};
  align-items: center;
  width: 58vw;
  height: 5vw;

  ${media.mobile} {
    position: absolute;
    font-size: 7vw;
    height: 100%;
    width: 90vw;
  }
  ${media.tabletPortrait} {
    position: absolute;
    font-size: 54px;
    width: 691px;
  }

  ${media.fullWidth} {
    width: 60vw;
  }
`

const Line = styled.div<{ open: boolean; initial: boolean }>`
  height: 4.3vw;
  background: ${colors.brightPurple};
  width: 0.2vw;

  transform: scaleY(${props => (props.initial ? 0 : props.open ? 1 : 0)});
  opacity: 1;

  transform-origin: "50% 50%";
  margin-top: 0.8vw;

  ${media.mobile} {
    height: 8vw;
    margin-top: 1vw;
    width: 0.6vw;
  }
  ${media.tabletPortrait} {
    height: 33px;
    margin-top: 4px;
    width: 2px;
  }
`

const TitleContainer = styled.div<{ open: boolean }>`
  position: relative;
  overflow: hidden;
  padding-right: 1.3vw;
  width: 37vw;
  height: 4.3vw;
  transform: scaleY(${props => (props.open ? 1 : 0)});
  opacity: ${props => (props.open ? 1 : 0)};
  transition: transform 0.3s 0.1s, opacity 0.5s;
  display: flex;
  flex-direction: column;

  ${media.mobile} {
    transform: none;
    height: 7vw;
    width: 55vw;
  }

  ${media.tabletPortrait} {
    transform: none;
    height: 54px;
    width: 400px;
  }

  ${media.fullWidth} {
    width: 38vw;
  }
`

const Title = styled.h1`
  position: absolute;
  width: 100%;
  letter-spacing: -0.05em;
  color: ${colors.brightPurple};
  left: 100%;
`

const RoleContainer = styled.div<{ open: boolean }>`
  position: relative;
  overflow: hidden;
  height: 2vw;
  padding-left: 1.3vw;
  width: 11vw;
  margin-top: 0.8vw;
  transform: scaleY(${props => (props.open ? 1 : 0)});
  opacity: ${props => (props.open ? 1 : 0)};
  transition: transform 0.3s 0.2s, opacity 0.5s;

  ${media.mobile} {
    height: 4vw;
    width: 20vw;
    padding-left: 2vw;
  }
  ${media.tabletPortrait} {
    height: 17px;
    width: 83px;
    padding-left: 8px;
  }
`

const Role = styled.span`
  font-size: 2vw;
  position: absolute;
  letter-spacing: 0;
  left: -100%;
  ${media.mobile} {
    font-size: 4vw;
  }
  ${media.tabletPortrait} {
    font-size: 17px;
  }
`

const DavidSig = styled(DavidSigSVG)`
  width: 100%;
  height: 100%;
`

const Link = styled.a<{ open: boolean }>`
  ${Heading1}
  color: ${colors.coolWhite};
  font-size: 1.1vw;
  margin-right: 1.3vw;
  cursor: pointer;
  opacity: 0;
  ${media.fullWidth} {
    font-size: 1.1vw;
  }
  ${media.mobile} {
    font-size: 3.9vw;
    opacity: 0;
  }
  ${media.tabletPortrait} {
    font-size: 16px;
    opacity: 0;
  }
`

const NavBtn = styled.button<{ open: boolean }>`
  width: 6vw;
  height: 6vw;
  position: absolute;
  right: 1vw;
  top: 0.5vw;
  z-index: 0;
  appearance: none;
  -webkit-appearance: none;
  outline: none;
  border: 0.2vw solid ${colors.dullerTeal};
  border-radius: 100%;
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 0;
  color: ${colors.coolWhite};
  transition: transform 0.4s;
  svg {
    path {
      transition: 0.4s;
    }
  }
  ${media.hover} {
    :hover {
      color: ${colors.coolWhite};
      transform: scale(1.2);
      transform-origin: "0% 100%";
      transition: 0.4s;
      svg {
        path {
          stroke: currentColor;
          transition: 0.4s;
        }
      }
    }
  }

  ${media.mobile} {
    width: 15vw;
    height: 15vw;
    top: 2vw;
    right: 0.5vw;
    opacity: ${props => (props.open ? 0 : 1)};
  }
  ${media.tabletPortrait} {
    width: 77px;
    height: 77px;
    top: 10px;
    right: 2px;
  }
`

const NavLinks = styled.div<{ open: boolean; initial: boolean }>`
  display: flex;
  width: 26vw;
  position: relative;
  transition: opacity 0.8s, width 0.3s 0.4s, border 0.6s;
  transform-origin: ${props => (!props.open ? "50% 50%" : "right")};
  height: 2.5vw;
  align-items: flex-end;
  overflow: hidden;
  transition: 0.4s;
  padding: 0 0 1vw 1.3vw;
  margin-top: 1vw;

  ${Link}:nth-child(even) {
    :hover {
      transform: skew(5deg, -5deg);
      color: ${colors.brightPurple};
      transition: 0.3s;
    }
  }
  ${Link}:nth-child(odd) {
    :hover {
      transform: skew(-5deg, 5deg);
      color: ${colors.brightPurple};
      transition: 0.3s;
    }
  }

  ${media.mobile} {
    width: fit-content;
    height: auto;
  }
  ${media.fullWidth} {
  }
`

const DavidInitials = styled(DavidInitialsSVG)`
  ${media.mobile} {
    width: 12vw;
    height: 12vw;
  }
  ${media.mobile} {
    width: 50px;
    height: 50px;
  }
`
