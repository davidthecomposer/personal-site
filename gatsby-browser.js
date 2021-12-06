import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin"
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin"
import ScrollToPlugin from "gsap/ScrollToPlugin"
import { CustomEase } from "gsap/CustomEase"

gsap.registerPlugin(
  ScrollTrigger,
  DrawSVGPlugin,
  ScrollToPlugin,
  MorphSVGPlugin,
  CustomEase
)
