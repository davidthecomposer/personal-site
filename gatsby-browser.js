import "fonts/reset.css"
import "fonts/typography.css"
import React from "react"
import gsap from "gsap"

import { ScrollTrigger } from "gsap/ScrollTrigger"
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin"
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin"
import ScrollToPlugin from "gsap/ScrollToPlugin"
import { CustomEase } from "gsap/CustomEase"
import ContextStore from "components/ContextStore"

gsap.registerPlugin(
  ScrollTrigger,
  DrawSVGPlugin,
  ScrollToPlugin,
  MorphSVGPlugin,
  CustomEase
)

// export const wrapPageElement = ({ element, props }) => {
//   // props provide same data to Layout as Page element will get
//   // including location, data, etc - you don't need to pass it
//   return <ContextStore {...props}>{element}</ContextStore>
// }
