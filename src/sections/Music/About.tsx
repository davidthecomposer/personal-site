import React, { useEffect, useRef } from "react"
import styled from "styled-components"
import text from "styles/text"
import colors from "styles/Colors"
import media from "styles/media"
import davidHuge from "images/davidHuge.jpg"
import davidHugeM from "images/davidHugeM.jpg"
import davidAbout from "images/davidAbout.jpg"
import davidAboutM from "images/davidAboutM.jpg"
// import { PrimaryButtonStyle } from "styles/Buttons";
// import { ReactComponent as ButtonArrowSVG } from "assets/svg/buttonArrow.svg";
// import { ReactComponent as ScoreIconSVG } from "assets/svg/scoreIcon.svg";
import gsap from "gsap"
import SectionHeaders from "components/textElements/SectionHeaders"

const About: React.FC<{ mobile: boolean }> = ({ mobile }) => {
  const header = useRef(null)
  const headerLine = useRef(null)
  const davidImage = useRef(null)
  const teal = useRef(null)
  const grey = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ scrollTrigger: "#about" })

    tl.to(".about-bg-cover", { opacity: 0, duration: 2 }, 1)
      .to(
        ".about-images",
        { opacity: 1, stagger: mobile ? 0.1 : 0.5, duration: mobile ? 0.3 : 4 },
        mobile ? 0 : 1
      )
      .to(".about-text", { opacity: 1, duration: 1.5 }, 1)
  }, [mobile])

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: mobile ? ".about-text" : davidImage.current,
        scrub: true,
      },
    })
    if (!mobile) {
      tl.from(
        ".about-text",
        {
          yPercent: 30,
          xPercent: -3,
          ease: "none",
        },
        0
      )
        .to(
          teal.current,
          {
            yPercent: 135,
            xPercent: 20,
            ease: "none",
          },
          0
        )
        .to(
          grey.current,
          {
            yPercent: -20,
            xPercent: -40,
            ease: "none",
          },
          0
        )
    } else {
      const tabletPortrait =
        window.innerWidth > 767 &&
        window.innerWidth <= 1200 &&
        window.innerHeight > window.innerWidth

      tl.to(davidImage.current, { opacity: 0.02, duration: 2 }, 0)
        .to(
          grey.current,
          {
            y: tabletPortrait ? "2152px" : "390vw",
            x: "-=40%",
            ease: "none",
            duration: 7,
          },
          1.25
        )
        .to(
          teal.current,
          {
            y: tabletPortrait ? "3032px" : "560vw",
            x: "+=10%",
            ease: "none",
            duration: 9.25,
          },
          0.5
        )
        .to(davidImage.current, { opacity: 1, x: "+=8%", duration: 3 }, 7)
        .to(
          grey.current,
          {
            y: tabletPortrait ? "2774px" : "510vw",
            ease: "none",
            duration: 1.5,
          },
          8
        )
    }
  }, [mobile])

  return (
    <Wrapper id="about">
      <SectionHeaders text="About" classRoot="about-header" />

      <DavidImage
        src={mobile ? davidAboutM : davidAbout}
        alt="David Campbell image"
        className="about-images"
        ref={davidImage}
      />
      <Teal className="about-images" ref={teal} />
      <Grey className="about-images" ref={grey} />

      <Text className="about-text">
        <p>
          Hello! I’m David and I create music. On this site you can see a
          selection of some of my work. I plan on continuing to update this site
          as I continue to search for and participate in new and interesting
          projects. There is something so fascinating to me about the process of
          building something out of nothing other than notes, rhythms,
          creativity, and imagination. I’ve spent half of my life now studying
          and trying to perfect the craft of that process, but I still find it
          awe-inspiring just how many possibilities and new ways of creating
          sound exist in the world. I feel like I’ve just scratched the surface
          of what’s possible.
        </p>
        <p>
          Over the years I’ve had the chance to learn about music and the art of
          music composition with formal study at Southern Utah University,
          Western Washington University, and Stony Brook University where I had
          the privilege to study with composers whose music and knowledge I
          greatly admire including Hal Campbell, Keith Bradshaw, Leslie Sommer,
          Roger Briggs, Sheila Silver, and Perry Goldstein. Their lessons and
          the knowledge gained through studying great and obscure composers has
          helped shape my own musical voice.
        </p>
        <p>
          My current skill set includes arranging, composition in any style,
          sound editing, virtual instrument mockups, conducting, vocal
          performance, and a little bit of piano. I have the ability and skill
          to create extremely high level professional music for media projects.
          I love to mix musical styles and find the challenge of fitting music
          to film or other media to be exhilarating and energizing. I love
          working with the technology of music production. Most of all I love to
          collaborate and learn about the perspectives of other creative people.
          I am in awe of the talents of filmmakers who conceive of and execute
          an artistic vision. I love good acting and interesting stories. It’s
          so rewarding to help enhance all of those elements with my own art. I
          am flexible, easy to work with, and generally a positive force in any
          endeavour.
        </p>
        <p>
          I continue to seek out projects in the contemporary art music sphere
          where I can be a little bit more experimental and have an outlet for
          that part of my musical expression. I am currently working on projects
          in that realm and hope to continue always having an art music project
          that I’m working on. I am a board member and composer-in-residence for
          Opera Contempo, whose mission is to promote new works , new voices,
          and new interpretations of Opera for our times. I love writing new
          music for talented solo performers, small or large ensembles. I think
          having a foot in both musical worlds keeps my ideas fresh and my
          skills sharp. I often find myself borrowing from contemporary
          classical styles or injecting ideas that I encounter writing media
          music into my art music compositions. I take a great sense of
          professional pride in the quality of the music that I produce
          regardless of style.
        </p>
        <p>
          Other than music I currently have a day job as a front end developer.
          I find many analogues to music composition in software development,
          and believe strongly that learning to code has helped improve my
          ability to write music as well as given me another outlet to design,
          create, and challenge myself. This site is one of my development
          projects! My hobbies include attending concerts, theatre, interesting
          art exhibits, painting, writing, sports of all kinds, weight-lifting,
          outdoors activities, and dancing the night away with friends. I
          currently live in Salt Lake City, UT, but love to travel.
        </p>
        <p>
          Thanks for visiting. I hope that you will listen to some of the music
          and get in touch with me if you have questions or want to create
          something amazing together.
        </p>
      </Text>
      <CoverDiv className="about-bg-cover" />
    </Wrapper>
  )
}

const Wrapper = styled.section`
  height: 168.5vw;
  padding: 15.4vw 0 14vw 0;
  background-size: cover;
  position: relative;
  box-sizing: border-box;
  background-image: url(${davidHuge});

  ${media.mobile} {
    height: 740vw;
    padding: 0 2.4vw 60vw;
    background-image: url(${davidHugeM});
    background-position: 50% 50%;
  }
  ${media.tabletPortrait} {
    width: 100%;
    height: 3967px;
    padding: 0 12px 310px;
  }
`

const Text = styled.div`
  ${text.desktop.bodyS};
  color: ${colors.coolWhite};
  position: absolute;
  width: 36.5vw;
  height: 75.6vw;
  left: 56.9vw;
  top: 60vw;
  opacity: 0;
  z-index: 3;
  ::first-letter {
    font-size: 5vw;
  }
  p {
    margin-bottom: 0.4vw;
    ::first-line {
      margin-left: 2vw;
    }
  }
  ${media.mobile} {
    font-size: 3.9vw;
    width: 95.2vw;
    height: auto;
    left: 3.9vw;
    top: 168.8vw;
  }
  ${media.tabletPortrait} {
    font-size: 20px;
    width: 492px;
    height: auto;
    left: 20px;
    top: 874px;
  }
`

const Teal = styled.div`
  position: absolute;
  width: 48.5vw;
  height: 55.7vw;
  left: 38.6vw;
  top: 31.9vw;
  opacity: 0;
  background: rgba(115, 209, 239, 0.15);
  z-index: 1;
  ${media.tablet} {
  }
  ${media.mobile} {
    position: absolute;
    width: 75.6vw;
    height: 118.1vw;
    left: 2.4vw;
    top: 28vw;
  }
  ${media.tabletPortrait} {
    width: 391px;
    height: 611px;
    left: 12px;
    top: 145px;
  }
`

const Grey = styled.div`
  position: absolute;
  width: 49.1vw;
  height: 68.9vw;
  left: 22.3vw;
  top: 48.3vw;
  opacity: 0;
  background: #1f1f20;
  z-index: 2;

  ${media.mobile} {
    width: 65.2vw;
    height: 107.5vw;
    left: 29.2vw;
    top: 61.6vw;
  }
  ${media.tabletPortrait} {
    width: 337px;
    height: 556px;
    left: 151px;
    top: 319px;
  }
`

const DavidImage = styled.img`
  position: sticky;
  /* position: -webkit-sticky; */
  display: block;
  width: 36.9vw;
  height: 52.6vw;
  left: 13.2vw;
  top: 5vw;
  margin-top: 44.7vw;
  opacity: 0;
  z-index: 3;
  ${media.tablet} {
  }
  ${media.mobile} {
    position: sticky;
    width: 54.1vw;
    height: 86.7vw;
    top: 60vw;
    left: 15vw;
    opacity: 1;
  }
  ${media.tabletPortrait} {
    width: 280px;
    height: 449px;
    top: 310px;
    left: 77px;
  }
`

const CoverDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: black;
`

export default About
