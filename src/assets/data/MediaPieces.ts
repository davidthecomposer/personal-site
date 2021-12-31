import flatline from "assets/images/flatline.jpg"
import after from "assets/images/after.jpg"
import forceOfNature from "assets/images/forceOfNature.jpg"
import mischeivous from "assets/images/mischeivous.jpg"
import redemption from "assets/images/redemption.jpg"
import rescue from "assets/images/rescue.jpg"
import starFlight from "assets/images/starFlight.jpg"
import starlight from "assets/images/starlight.jpg"
import turningPoint from "assets/images/turningPoint.jpg"
import loveStory from "assets/images/loveStory.jpg"
import flatlineM from "assets/images/flatlineM.jpg"
import afterM from "assets/images/afterM.jpg"
import forceOfNatureM from "assets/images/forceOfNatureM.jpg"
import mischeivousM from "assets/images/mischeivousM.jpg"
import redemptionM from "assets/images/redemptionM.jpg"
import rescueM from "assets/images/rescueM.jpg"
import starFlightM from "assets/images/starFlightM.jpg"
import starlightM from "assets/images/starlightM.jpg"
import turningPointM from "assets/images/turningPointM.jpg"
import loveStoryM from "assets/images/loveStoryM.jpg"

const flatlineMP3 = require("assets/audio/flatLine.mp3").default
const forceOfNatureMP3 = require("assets/audio/forceOfNature.mp3").default
const loveStoryMP3 = require("assets/audio/loveStory.mp3").default
const mischeivousMP3 = require("assets/audio/mischeivous.mp3").default
const redemptionMP3 = require("assets/audio/redemption.mp3").default
const rescueMP3 = require("assets/audio/rescue.mp3").default
const afterMP3 = require("assets/audio/rockIntro.mp3").default
const starlightMP3 = require("assets/audio/starlightStarbright.mp3").default
const starFlightMP3 = require("assets/audio/starflightStarbright.mp3").default
const turningPointMP3 = require("assets/audio/turningPoint.mp3").default

export const mediaPieces = [
  {
    title: "Flatline",
    video: false,
    audio: flatlineMP3,
    key: 0,
  },
  {
    title: "Rescue",
    video: false,
    audio: rescueMP3,
    key: 1,
  },
  {
    title: "Mischievous Endeavors",
    video: false,
    audio: mischeivousMP3,
    key: 2,
  },
  {
    title: "Turning Point",
    video: false,
    audio: turningPointMP3,
    key: 3,
  },
  {
    title: "After",
    video: false,
    audio: afterMP3,
    key: 4,
  },
  {
    title: "Redemption",
    video: false,
    audio: redemptionMP3,
    key: 5,
  },
  {
    title: "StarLight, StarFlight",
    img: [starlight, starlightM],
    video: false,
    audio: starlightMP3,
    key: 6,
  },
  {
    title: "Starflight, Starbright",
    img: [starFlight, starFlightM],
    video: false,
    music:
      "The choir was used to play off the immense sense of wonder and awe one might find when encountering something almost beyond understanding. I heavily processed the choir sounds during the last section of the piece to add to the sense of strangeness amidst the beauty of the main content.",
    story:
      "Our crew has been on a journey in hibernation for hundreds of years. As they wake up they are greeted by a view of dancing stars and twinkling lights as the engine progresses them toward their destination. As they approach the massive event horizon they are overpowered by a mix of awe, dread, and wonder. Small pieces of debris fly around them almost playfully as they slowly descend through to what lies beyond.",
    audio: starFlightMP3,
    key: 7,
  },
  {
    title: "Music for a Love Story",
    img: [loveStory, loveStoryM],
    video: false,
    music:
      "The music is unapologetically lyrical and simple. I tried to add as much color in the harmonies as I thought would be appropriate. The main little theme repeats over and over again through all instruments. I think that the soulful sound of the clarinet was a good choice as lead instrument here.",
    story:
      "A melancholy theme that touches on the kind of love that grows from long shared experience and sacrifice. A quiet montage of small kindnesses on a journey much nearer the end than the beginning.",
    audio: loveStoryMP3,
    key: 8,
  },
  {
    title: "Force Of Nature",
    img: [forceOfNature, forceOfNatureM],
    video: false,
    audio: forceOfNatureMP3,
    key: 9,
  },
]
