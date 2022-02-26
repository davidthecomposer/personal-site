import React, { useEffect, useState, useRef, useContext } from "react"
import styled from "styled-components"
import MainButton from "components/buttons/MainButton"
import text from "assets/styles/text"
import colors from "styles/colors"

import { Canvas, useFrame } from "@react-three/fiber"
import gsap from "gsap"
import media from "assets/styles/media"
import { MobileContext, TabletContext } from "components/ContextStore"
import { IntroAnimationContext } from "pages/music"
import { shaderMaterial } from "@react-three/drei"
import { extend } from "@react-three/fiber"
import { ReactThreeFiber } from "@react-three/fiber"
import * as THREE from "three"

import { TLSSocket } from "tls"
import { navigate } from "gatsby"

// const WavyImageMaterial = shaderMaterial(
//   {
//     map: new THREE.Texture(),
//   },
//   `
//   precision mediump float;

// varying vec2 vUv;
// varying float vWave;
// uniform float uTime;

// vec3 mod289(vec3 x) {
//   return x - floor(x * (1.0 / 289.0)) * 289.0;
// }

// vec4 mod289(vec4 x) {
//   return x - floor(x * (1.0 / 289.0)) * 289.0;
// }

// vec4 permute(vec4 x) {
//      return mod289(((x*34.0)+1.0)*x);
// }

// vec4 taylorInvSqrt(vec4 r)
// {
//   return 1.79284291400159 - 0.85373472095314 * r;
// }

// float snoise(vec3 v) {
//   const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
//   const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

//   // First corner
//   vec3 i  = floor(v + dot(v, C.yyy) );
//   vec3 x0 =   v - i + dot(i, C.xxx) ;

//   // Other corners
//   vec3 g = step(x0.yzx, x0.xyz);
//   vec3 l = 1.0 - g;
//   vec3 i1 = min( g.xyz, l.zxy );
//   vec3 i2 = max( g.xyz, l.zxy );

//   //   x0 = x0 - 0.0 + 0.0 * C.xxx;
//   //   x1 = x0 - i1  + 1.0 * C.xxx;
//   //   x2 = x0 - i2  + 2.0 * C.xxx;
//   //   x3 = x0 - 1.0 + 3.0 * C.xxx;
//   vec3 x1 = x0 - i1 + C.xxx;
//   vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
//   vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

//   // Permutations
//   i = mod289(i);
//   vec4 p = permute( permute( permute(
//              i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
//            + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
//            + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

//   // Gradients: 7x7 points over a square, mapped onto an octahedron.
//   // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
//   float n_ = 0.142857142857; // 1.0/7.0
//   vec3  ns = n_ * D.wyz - D.xzx;

//   vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

//   vec4 x_ = floor(j * ns.z);
//   vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

//   vec4 x = x_ *ns.x + ns.yyyy;
//   vec4 y = y_ *ns.x + ns.yyyy;
//   vec4 h = 1.0 - abs(x) - abs(y);

//   vec4 b0 = vec4( x.xy, y.xy );
//   vec4 b1 = vec4( x.zw, y.zw );

//   //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
//   //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
//   vec4 s0 = floor(b0)*2.0 + 1.0;
//   vec4 s1 = floor(b1)*2.0 + 1.0;
//   vec4 sh = -step(h, vec4(0.0));

//   vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
//   vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

//   vec3 p0 = vec3(a0.xy,h.x);
//   vec3 p1 = vec3(a0.zw,h.y);
//   vec3 p2 = vec3(a1.xy,h.z);
//   vec3 p3 = vec3(a1.zw,h.w);

//   // Normalise gradients
//   vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
//   p0 *= norm.x;
//   p1 *= norm.y;
//   p2 *= norm.z;
//   p3 *= norm.w;

//   // Mix final noise value
//   vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
//   m = m * m;
//   return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
//                                 dot(p2,x2), dot(p3,x3) ) );
// }

// void main() {
//   vUv = uv;

//   vec3 pos = position;
//   float noiseFreq = 3.5;
//   float noiseAmp = 0.15;
//   vec3 noisePos = vec3(pos.x * noiseFreq + uTime, pos.y, pos.z);
//   pos.z += snoise(noisePos) * noiseAmp;
//   vWave = pos.z;

//   gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
// }
//   `,
//   `
//   precision mediump float;

//   varying vec2 vUv;
//   varying float vWave;
//   uniform sampler2D uTexture;

//   void main() {
//     float wave = vWave * 0.25;
//     float r = texture2D(uTexture, vUv).r;
//     float g = texture2D(uTexture, vUv).g;
//     float b = texture2D(uTexture, vUv + wave).b;
//     vec3 texture = vec3(r, g, b);
//     gl_FragColor = vec4(texture, 1.);
//   }
//   `
// )

// type WavyImageMaterial = {
//   map: THREE.Texture
// }

// declare global {
//   namespace JSX {
//     interface IntrinsicElements {
//       WavyImageMaterial: ReactThreeFiber.Object3DNode<
//         WavyImageMaterial,
//         typeof WavyImageMaterial
//       >
//     }
//   }
// }

// extend({ WavyImageMaterial })

// const ImageMesh = () => {
//   // This reference will give us direct access to the mesh
//   const mesh = useRef()
//   const [hover, setHover] = useState(false)
//   const [active, setActive] = useState(false)

//   return (
//     <mesh
//       {...props}
//       ref={mesh}
//       scale={active ? 1.5 : 1}
//       onClick={event => setActive(!active)}
//       onPointerOver={event => setHover(true)}
//       onPointerOut={event => setHover(false)}
//     >
//       <planeGeometry args={[4, 0.6, 16, 16]} />
//       <WavyImageMaterial />
//     </mesh>
//   )
// }

const Hero: React.FC<{ mobile: boolean; data: any }> = ({ data }) => {
  const carousel = useRef<HTMLDivElement>(null)
  const [activeSlide, setActiveslide] = useState(0)
  const intro = useContext(IntroAnimationContext)
  const maxSlides = 5
  const tablet = useContext(TabletContext)
  const mobile = useContext(MobileContext)
  const fakeNews = data
    .map((news: any) => {
      return {
        title: news.title,
        image: news.mainImages[0].file.url,
        slug: news.url,
        buttonText: news.buttonText,
        news: news.news,
        audio: "",
        video: "",
      }
    })
    .filter((news: any, i: number) => i < maxSlides - 1)

  useEffect(() => {
    if (carousel.current && !intro) {
      const tl = gsap.timeline({
        paused: true,
        scrollTrigger: {
          trigger: carousel.current,
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
  }, [activeSlide, intro])

  const slides = fakeNews.map((news: any, i: number) => {
    return (
      <Slide key={`music_slide${i}`}>
        {news.audio && <audio src={news.audio} />}
        {news.video && <video src={news.audio} />}
        <Title className={`slide_${i}`}>{news.title}</Title>
        <MainImage className={`slide_${i}`} src={news.image} alt={news.title} />
      </Slide>
    )
  })

  const handleButton = (isNews: boolean, link: string) => {
    if (isNews) {
      navigate(`/news/${link}`)
    } else {
      navigate(link)
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
      <Carousel ref={carousel}>
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
  padding: 9vw 0 0 0;
  position: relative;
  box-sizing: border-box;
  height: 62.5vw;
  ${media.fullWidth} {
    padding-top: 100px;
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
  ${media.fullWidth} {
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

  ${media.tablet} {
  }
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

  ${media.tablet} {
  }
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
  margin-bottom: 1.75vw;
  opacity: 0;
  ${media.tablet} {
  }
  ${media.mobile} {
    ${text.mobile.h4};
    margin-bottom: 4vw;
  }
  ${media.fullWidth} {
    ${text.fullWidth.h4};
    margin-bottom: 28px;
  }
`

const MainImage = styled.img`
  width: 72.5vw;
  height: 36.63vw;

  opacity: 0;
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
  width: 1px;
  height: 100%;
  transform: scaleY(0);
  transform-origin: 0% 0%;
  background: ${colors.buttonGrey};
  ${media.tablet} {
  }
  ${media.mobile} {
  }
  ${media.fullWidth} {
  }
`

const LeftPanel = styled.div`
  width: 10.44vw;
  height: 40vw;
  position: absolute;
  left: 0;
  top: 2.81vw;

  ${media.tablet} {
  }
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

  ${media.tablet} {
  }
  ${media.mobile} {
    top: 2vw;
    bottom: auto;
  }
  ${media.fullWidth} {
  }
`

const SlideNumber = styled.div<{ activeNumber?: boolean }>`
  ${text.desktop.bodyL};
  color: ${colors.coolWhiteLight};
  opacity: 0;

  ${media.tablet} {
  }
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
  ${media.tablet} {
  }
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
  ${media.tablet} {
  }
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
