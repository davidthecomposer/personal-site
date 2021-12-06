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
    img: [flatline, flatlineM],

    video: false,
    music:
      "The continuous rhythmic pulse in the background drives the music forward, but also mimics the nervous energy and action of the machinery in this imagined scene.",
    story:
      "An ambulance drives down the road. Inside, a woman huddles over her partner in an ambulance as paramedics attempt to revive him. As the mechanical rhythm of the machinery fighting to keep him alive ticks away almost unnoticed in the background, she has a series of flashbacks of their life together, and the events that lead to this moment. Then the machinery starts to die down as his breathing slows",
    audio: flatlineMP3,
    id: 0,
  },
  {
    title: "Rescue",
    img: [rescue, rescueM],
    video: false,
    music:
      "The piece uses a lot of percussive sounds and techniques including rips, bartok pizz, ethnic percussion hits, and a ton of ostinato combined with flowing, energetic themes in the strings and brass. Finally, the lush counterpoint in the string section near the end adds context and a moment of repose when the danger has been averted.",
    story:
      "A hero is desperately searching for someone important to him. After cresting a hill he spots an enemy who has abducted the one he cares about. He chases after, faces off with, and rescues the prisoner. As they flee to safety together time seems to slow as they gaze into each others eyes and realize the deep connection they have. ",
    audio: rescueMP3,
    id: 1,
  },
  {
    title: "Mischievous Endeavors",
    img: [mischeivous, mischeivousM],
    video: false,
    music:
      "The solo violin here lends a lot of expressive energy to a precocious and wide-ranging melody. Some fun details include the use of saxophones, muted brass, and vibes to adda bit of attitude and  silliness to the timbres",
    story:
      "Children and crayons. Two completely wholesome things that when combined can wreak havoc. Mom thought it was safe to leave little Johnny alone to 'make his drawings'. While she was away he took it upon himself to redecorate in an awe-inspiring display of mischief combined with a wanton disregard for principles of interior design. As he was finishing his pièce de résistance she abruptly returned. ",
    audio: mischeivousMP3,
    id: 2,
  },
  {
    title: "Turning Point",
    img: [turningPoint, turningPointM],
    video: false,
    music:
      "The violin and cello interplay as separate voices warring for control of the narrative. These represent the light and dark sides of the character. The accompaniment in the supporting strings add weight to the emotions being expressed, while the piano punctuates the passage of time.",
    story:
      "A woman sits alone in a room overlooking the city late at night. She is clearly troubled and on the precipice of a huge decision with massive moral implications. The light and dark impulses make their arguments as she considers. Will she finally give in to temptation or remember what once made her human? By the end of the scene we still don't know. Or do we?",
    audio: turningPointMP3,
    id: 3,
  },
  {
    title: "After",
    img: [after, afterM],
    video: false,
    music:
      "juxtaposing an almost baroque harmonic structure with rock and roll instruments seemed like a fun way to enliven both. This piece was originally written to be the intro to a video series of speculative dystopian fiction",
    story:
      "We open on a view of an abandoned city street.  It is eerily silent with clear signs of overgrowth and devastation. It seems that it has been some time since life as we know it existed here. as the camera pans up and we can see the whole city not a person can be found amongst the rubble. Far in the distance a single column of smoke lifts above the morning haze.",
    audio: afterMP3,
    id: 4,
  },
  {
    title: "Redemption",
    img: [redemption, redemptionM],
    video: false,
    music:
      "Some of the more interesting musical ideas here come at the beginning. I tried to create the feel of something tentative, and delicate. Something that feels like it could stop at any moment. Then as the main theme plays I wanted to produce an outpouring of unbridled emotion. Finally, an ending that evokes the beginning, but with more calm clarity.",
    story:
      "The setting is an idyllic mid spring morning. In a quiet park two people long estranged finally come to an understanding and begin to knit their broken lives and relationship together. as the music continues to swell to greater and greater heights the release of years of sadness, longing and finally forgiveness becomes overwhelming. They finally understand and are understood.",
    audio: redemptionMP3,
    id: 5,
  },
  {
    title: "StarLight, StarFlight",
    img: [starlight, starlightM],
    video: false,
    music:
      "I wanted to create a sense of an arrival as the ship comes into view while still having a feel of the expanse of space. The little melody on the piccolo right near the end of the piece is used as a theme in the next piece and expanded to become the main theme. The use of strings, harp, harmonics, and some subtle synth sounds add a feel of scope and scale",
    story:
      "A set of travelers leave the atmosphere for the first time. They are headed toward a gigantic generation ship that will carry them out into the stars. As the shuttle slowly approaches this incredible feat of human ingenuity and wonder, it takes a tour around what will be their new home. Near the end of the piece the earth comes back into view and they realize that this might be the last time they ever see humanity's first home again.",
    audio: starlightMP3,
    id: 6,
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
    id: 7,
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
    id: 8,
  },
  {
    title: "Force Of Nature",
    img: [forceOfNature, forceOfNatureM],

    video: false,
    music:
      "I think some of the more effective things here were the subtle use of brass portamento, gongs, and the transition from smooth powerful homophony to chaotic indeterminism.",
    story:
      "The skies are dark and foreboding. In the far distance something is approaching. It is miles away but is clearly massive in both scale and power. As it approaches like the lead edge of a storm front the observers can see that what seemed to be a cohesive cloud is actually a cacophony of violence and chaos. Then the front edge hits.",
    audio: forceOfNatureMP3,
    id: 9,
  },
]
