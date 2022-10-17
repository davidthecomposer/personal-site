import React, { useEffect, useState, useRef, useContext } from "react"
import styled from "styled-components"
// import MainButton from "components/buttons/MainButton"
import text from "assets/styles/text"
import colors from "assets/styles/colors"

// import { Canvas, useFrame } from "@react-three/fiber"
// import gsap from "gsap"
import media from "assets/styles/media"
// import { MobileContext, TabletContext } from "components/ContextStore"
// import { shaderMaterial } from "@react-three/drei"
// import { extend } from "@react-three/fiber"
// import { ReactThreeFiber } from "@react-three/fiber"
// import * as THREE from "three"
import Footer from "components/Footer"

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
//       // {...props}
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

const Developer: React.FC<{}> = () => {
  return (
    <Wrapper>
      {/* <ImageMesh /> */}
      <ComingSoon>Coming Soon</ComingSoon>
      <Footer />
    </Wrapper>
  )
}

const Wrapper = styled.main`
  background: #000000;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
`

const ComingSoon = styled.h1`
  ${text.desktop.h1};
  color: ${colors.coolWhite};
  margin-top: 10%;
  ${media.tablet} {
  }
  ${media.mobile} {
  }
  ${media.fullWidth} {
  }
`

export default Developer
