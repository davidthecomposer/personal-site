const cinqSouvenirsPDF =
  require("assets/scores/Chamber/Cinq-Souvenirs.pdf").default
const dialoguesPDF = require("assets/scores/Chamber/Dialogues.pdf").default
const etchingsPDF = require("assets/scores/Chamber/Etchings.pdf").default
const neonGamesPDF = require("assets/scores/Chamber/Neon-Games.pdf").default
const pierrotPDF =
  require("assets/scores/Chamber/Pierrot-Miniatures.pdf").default
const starCrossedPDF = require("assets/scores/Chamber/Star-Crossed.pdf").default
const terminalLightPDF =
  require("assets/scores/Orchestral/Terminal-Light-StonyBrook.pdf").default
const terminalNightPDF =
  require("assets/scores/Orchestral/Terminal-Night-StonyBrook.pdf").default
const baudelairePDF =
  require("assets/scores/VocalChoral/3-Songs-Baudelaire.pdf").default
const kingsPrayerPDF =
  require("assets/scores/VocalChoral/A-King's-Prayer.pdf").default
const comeComePDF =
  require("assets/scores/VocalChoral/Come-Come-Ye-Saints.pdf").default
const crystalGazerPDF =
  require("assets/scores/VocalChoral/Crystal-Gazer.pdf").default
const habitPDF = require("assets/scores/VocalChoral/Habit.pdf").default
const iHeardPDF =
  require("assets/scores/VocalChoral/I-Heard-the-Bells.pdf").default
const iwonder2008PDF =
  require("assets/scores/VocalChoral/I-Wonder-as-I-Wander-2008.pdf").default
const iWonder2018PDF =
  require("assets/scores/VocalChoral/I-Wonder-as-I-Wander-2018.pdf").default
const oComePDF =
  require("assets/scores/VocalChoral/O-Come-O-Come-Emanuel.pdf").default
const silentNightPDF =
  require("assets/scores/VocalChoral/Silent-Night.pdf").default
const thereWillPDF =
  require("assets/scores/VocalChoral/There-Will-come-soft-Rains.pdf").default
const clarinet = require("assets/scores/Solo/Clarinet.pdf").default

const copernicusPdf =
  require("assets/scores/Solo/Copernicus-Etudes.pdf").default

const jupiter =
  require("assets/audio/concert-music/Solo/Copernicus/Jupiter.mp3").default
const neptune =
  require("assets/audio/concert-music/Solo/Copernicus/Neptune.mp3").default
const uranus =
  require("assets/audio/concert-music/Solo/Copernicus/Uranus.mp3").default
const mars =
  require("assets/audio/concert-music/Solo/Copernicus/Mars.mp3").default
const mercury =
  require("assets/audio/concert-music/Solo/Copernicus/Mercury.mp3").default
const pluto =
  require("assets/audio/concert-music/Solo/Copernicus/Pluto.mp3").default
const saturn =
  require("assets/audio/concert-music/Solo/Copernicus/Saturn.mp3").default
const venus =
  require("assets/audio/concert-music/Solo/Copernicus/Venus.mp3").default
const earth =
  require("assets/audio/concert-music/Solo/Copernicus/Earth.mp3").default

const aftermath =
  require("assets/audio/concert-music/Vocal/Aftermath.mp3").default

const iHeardTheBells =
  require("assets/audio/concert-music/Vocal/iHeardTheBells.mp3").default

const oCome = require("assets/audio/concert-music/Vocal/oCome.mp3").default

const iWonder = require("assets/audio/concert-music/Vocal/iWonder.mp3").default

const morning = require("assets/audio/concert-music/Solo/morning.mp3").default

const midday = require("assets/audio/concert-music/Solo/midday.mp3").default

const night = require("assets/audio/concert-music/Solo/night.mp3").default

const theme =
  require("assets/audio/concert-music/Chamber/Dialogues/Theme.mp3").default
const vari1 =
  require("assets/audio/concert-music/Chamber/Dialogues/var1.mp3").default
const vari2 =
  require("assets/audio/concert-music/Chamber/Dialogues/var2.mp3").default
const vari3 =
  require("assets/audio/concert-music/Chamber/Dialogues/var3.mp3").default
const vari4 =
  require("assets/audio/concert-music/Chamber/Dialogues/var4.mp3").default
const vari5 =
  require("assets/audio/concert-music/Chamber/Dialogues/var5.mp3").default
const starcrossed =
  require("assets/audio/concert-music/Chamber/Star-Crossed.mp3").default

const neonGames =
  require("assets/audio/concert-music/Chamber/neon-games-sample.mp3").default
const original =
  require("assets/audio/concert-music/Chamber/etchings/original.mp3").default
const shrinkWrapped =
  require("assets/audio/concert-music/Chamber/etchings/shrinkWrapped.mp3").default
const antithesis =
  require("assets/audio/concert-music/Chamber/etchings/antithesis.mp3").default
const retro =
  require("assets/audio/concert-music/Chamber/etchings/retro.mp3").default
const smooth =
  require("assets/audio/concert-music/Chamber/etchings/smooth.mp3").default
const sporadic =
  require("assets/audio/concert-music/Chamber/etchings/sporadic.mp3").default
const coda =
  require("assets/audio/concert-music/Chamber/etchings/coda.mp3").default
const enterrement =
  require("assets/audio/concert-music/Chamber/enterrement-catholique.mp3").default

const vocalPieces = [
  {
    title: "#unfilt{her}ed",
    key: "song-cycle",
    year: "2021",
    description:
      "I encountered a local writer who was doing some instagram-type daily posting of poems as a writing exercise. After some discussions with the author we agreed that I would take 6-7 of the ones that I found most intriguing and set them to music for Mezzo-Soprano through the intermediary of Opera Contempo. The plan is to feature them in a recital hosted by Opera Contempo during the end of 2021",
    movements: [
      { name: "I always Write About You", audio: "", initialTime: "3:22" },
      { name: "...", audio: "", initialTime: "3:22" },
      { name: "Shelf Life", audio: "", initialTime: "3:22" },
      { name: "Herding Cats", audio: "", initialTime: "3:22" },
      { name: "An Effort", audio: "", initialTime: "3:22" },
      { name: "Time", audio: "", initialTime: "3:22" },
    ],
    instrumentation: ["Solo Piano", "Mezzo-Soprano"],
    scoreSample: [""],
    duration: "~20",
  },
  {
    title: "Habit",
    key: "habit",
    year: "2014",
    description:
      "I approached Jenny Campbell with the desire to work on a group of art songs regarding addiction. She had been working with people who suffered from addiction and was able to incorporate a lot of elements from that into this work. The work spirals through the different stages of addiction",
    movements: [
      { name: "Aftermath", audio: aftermath, initialTime: "3:22" },
      { name: "Fantasy", audio: "", initialTime: "3:22" },
      { name: "Seduction", audio: "", initialTime: "3:22" },
      { name: "The Want", audio: "", initialTime: "3:22" },
      { name: "Sacrament", audio: "", initialTime: "3:22" },
      { name: "Mourning the Morning", audio: "", initialTime: "3:22" },
    ],
    instrumentation: ["Solo Piano", "Soprano"],
    scoreSample: [habitPDF],
    duration: "21'",
  },
  {
    title: "I Wonder as I Wander",
    key: "copernicus",
    year: "2018",
    description:
      "An arrangement of the popular Christian/American folk song. This is the second arrangement of it that I have done. I was asked to do this for a performance by a family member. It sticks to traditional tonalities much more than some of my other pieces.",
    movements: [
      { name: "I Wonder as I Wander", audio: "", initialTime: "3:22" },
    ],
    instrumentation: ["Solo Piano", "High Voice"],
    scoreSample: [iWonder2018PDF],
    duration: "4'",
  },
  {
    title: "Silent Night",
    key: "silent-night",
    year: "2016",
    description:
      "This was originally written for a Soprano acquaintance I new in New York. It engages in a highly coloristic treatment of the piece, although it retains a thoroughly tonal feel throughout. I borrowed some elements from film score studies that I had been undergoing at the time",
    movements: [{ name: "Silent Night", audio: "", initialTime: "3:22" }],
    instrumentation: ["Solo Piano", "High Voice"],
    scoreSample: [silentNightPDF],
    duration: "4'",
  },

  {
    title: "Come, Come ye Saints",
    key: "come-come",
    year: "2018",
    description:
      "Another arrangement requested by a family member. This one attempts to expand the harmonic and emotional language of a song that often is incredibly staid and conservative when arranged. I attempted to play a lot with the context behind the writing of the actual text",
    movements: [
      { name: "Come, Come ye Saints", audio: "", initialTime: "3:22" },
    ],
    instrumentation: ["Solo Piano", "Baritone/Med Voice"],
    scoreSample: [comeComePDF],
    duration: "4'",
  },
  {
    title: "3 Christmas Songs",
    key: "3-christmas-songs",
    year: "2008",
    description:
      "These were written as part of my undergraduate music recital way back in 2008. I was just developing a style but these were probably some of the standout exercises from that period. My vocal professor at the time agreed to perform them for the concert. ",
    movements: [
      { name: "I Wonder", audio: iWonder, initialTime: "3:22" },
      { name: "O Come", audio: oCome, initialTime: "3:22" },
      { name: "I Heard The Bells", audio: iHeardTheBells, initialTime: "3:22" },
    ],
    instrumentation: ["Solo Piano", "Tenor"],
    scoreSample: [iwonder2008PDF, oComePDF, iHeardPDF],
    duration: "~10'",
  },

  {
    title: "3 Songs on a Poem by Baudelaire",
    key: "3-songs-Baud",
    year: "2008",
    description:
      "Another vocal work that was written just before my composition recital. My good friend asked for a piece, and this particular poem by Baudelaire struck me as a fun surrealistic way to explore some early 20th century french styles that I enjoyed at the time. I believe this piece doubled as a final project for an arts retrospective course as well",
    movements: [
      { name: "Un", audio: "", initialTime: "3:22" },
      { name: "Deux", audio: "", initialTime: "3:22" },
      { name: "Trois", audio: "", initialTime: "3:22" },
    ],
    instrumentation: ["Solo Piano", "Tenor"],
    scoreSample: [baudelairePDF],
    duration: "~7'",
  },
  {
    title: "Crystal Gazer",
    key: "crystal-gazer",
    year: "2007",
    description:
      "One of the first art songs I attempted to write. I was struck by the evocative imagery of the text, and also had heard about the untimely death of the author. This pushed me to attempt to write a haunting, somber piece playing on that context. Whether I was successful or not is up to interpretation",
    movements: [{ name: "Crystal Gazer", audio: "", initialTime: "3:22" }],
    instrumentation: ["Solo Piano", "Tenor"],
    scoreSample: [crystalGazerPDF],
    duration: "~3'",
  },
]

const soloPieces = [
  {
    title: "Copernicus Etudes",
    key: "copernicus",
    year: "2020",
    description:
      "These Piano Etudes are a collection of works that I have written, revised, and added to over the last decade or so. sometime in 2020 I think I was finally happy enough with them to call them finished. Each piece explores different principles of modern compositional practices and ideas while loosely tying into some kind of theme around one of the planet's (or dwarf planets - sorry, Pluto) geology, features, or position in the solar system.",
    movements: [
      { name: "Jupiter", audio: jupiter, initialTime: "3:45" },
      { name: "Neptune", audio: neptune, initialTime: "3:45" },
      { name: "Uranus", audio: uranus, initialTime: "3:45" },
      { name: "Mars", audio: mars, initialTime: "3:45" },
      { name: "Mercury", audio: mercury, initialTime: "3:45" },
      { name: "Pluto", audio: pluto, initialTime: "3:45" },
      { name: "Saturn", audio: saturn, initialTime: "3:45" },
      { name: "Venus", audio: venus, initialTime: "3:45" },
      { name: "Earth", audio: earth, initialTime: "3:45" },
    ],
    instrumentation: ["Solo Piano"],
    scoreSample: [copernicusPdf],
    duration: "28'",
  },
  {
    title: "Three Pieces for Clarinet",
    key: "3-pieces-clarinet-piano",
    year: "2008",
    description:
      "This is a piece that I wrote for my undergraduate composition recital. It was my first time writing for clarinet and is both short and incredibly conservative. At the time I had just started studying modern music.",
    movements: [
      { name: "Morning", audio: morning, initialTime: "3:45" },
      { name: "Afternoon", audio: midday, initialTime: "3:45" },
      { name: "Night", audio: night, initialTime: "3:45" },
    ],
    instrumentation: ["Solo Piano", "Bb Clarinet"],
    scoreSample: [clarinet],
    duration: "8'",
  },
]

const orchestralPieces = [
  {
    title: "Cycle",
    key: "cycle",
    year: "2017-",
    description:
      "This piece is still in progress. It is a large scale orchestral work depicting the water cycle.",
    movements: [
      { name: "Fly", audio: "", initialTime: "10:45" },
      { name: "Float", audio: "", initialTime: "10:45" },
      { name: "Fall", audio: "", initialTime: "10:45" },
      { name: "Flow", audio: "", initialTime: "10:45" },
    ],
    instrumentation: ["3333", "4331", "Timpani", "Piano", "Harp", "Strings"],
    scoreSample: [""],
    duration: "~30'",
  },
  {
    title: "Terminal",
    key: "terminal",
    year: "2010",
    description:
      "A two movement work exploring the contrasts between light and dark. It was the piece I wrote as a requirement of my MM degree.",
    movements: [
      { name: "Terminal Night", audio: "", initialTime: "10:45" },
      { name: "Terminal Light", audio: "", initialTime: "10:45" },
    ],
    instrumentation: ["3333", "4331", "Timpani", "Piano", "Harp", "Strings"],
    scoreSample: [terminalNightPDF, terminalLightPDF],

    duration: "18'",
  },
]

const chamberPieces = [
  {
    title: "Dialogues",
    key: "dialogues",
    year: "2017",
    description:
      "A set of miniature variations on a theme. They are inspired by memorable conversations that I've had throughout my life.",
    movements: [
      { name: "Theme", audio: theme, initialTime: "0:45" },
      { name: "I", audio: vari1, initialTime: "10:45" },
      { name: "II", audio: vari2, initialTime: "10:45" },
      { name: "III", audio: vari3, initialTime: "10:45" },
      { name: "IV", audio: vari4, initialTime: "10:45" },
      { name: "V", audio: vari5, initialTime: "10:45" },
    ],
    instrumentation: ["Piano", "Violin", "Bb Clarinet"],
    scoreSample: [dialoguesPDF],

    duration: "6'",
  },
  {
    title: "Star-Crossed",
    key: "star-crossed",
    year: "2016",
    description:
      "A short piece that came about with my growing interest in film, perspective, and dance",
    movements: [
      { name: "Star-Crossed", audio: starcrossed, initialTime: "6:45" },
    ],
    instrumentation: ["Solo Piano", "Oboe", "Violin", "ViolonCello"],
    scoreSample: [starCrossedPDF],

    duration: "6'",
  },
  {
    title: "Neon Games (Excerpt)",
    key: "neon-games",
    year: "2015",
    description:
      "I was offered the chance to write a piece for a crossover trio who enjoyed a mix of Jazz and classical music. This piece was the result of that experiment. There are sections of improvisation mixed with colorful crunchy harmonies with a minimalist feel",
    movements: [{ name: "Neon Games", audio: neonGames, initialTime: "9:35" }],
    instrumentation: ["Flute", "Alto Sax", "Piano"],
    scoreSample: [neonGamesPDF],
    duration: "9'",
  },
  {
    title: "Etchings",
    key: "etchings",
    year: "2013",
    description:
      "Another set of variations on a theme. This time for woodwind quintet and percussion. This is one of the few works I've written in which I extensively used serial techniques throughout.",
    movements: [
      { name: "Original", audio: original, initialTime: "9:35" },
      { name: "Shrink-Wrapped", audio: shrinkWrapped, initialTime: "9:35" },
      { name: "Antithesis", audio: antithesis, initialTime: "9:35" },
      { name: "Sporadic", audio: sporadic, initialTime: "9:35" },
      { name: "Smooth", audio: smooth, initialTime: "9:35" },
      { name: "Retro", audio: retro, initialTime: "9:35" },
      { name: "Coda", audio: coda, initialTime: "9:35" },
    ],
    instrumentation: ["flute", "Oboe", "Bb Clarinet", "Bassoon", "Percussion"],
    scoreSample: [etchingsPDF],
    duration: "14'",
  },
  {
    title: "Pierrot Miniatures",
    key: "pierrot",
    year: "2009",
    description:
      "An early, and fairly quirky set of short pieces depicting a mythical hero named Pierrot Lunaire. Each piece was an exploration of a different 20th century compositional technique.",
    movements: [
      { name: "Pierrot - Serpent à Sonnettes", audio: "", initialTime: "9:35" },
      { name: "Dansez avec Pierrot", audio: "", initialTime: "9:35" },
      {
        name: "Un gros mouvement de (pier)eau, provoqué",
        audio: "",
        initialTime: "9:35",
      },
      { name: "Berceuse pour Pierrot", audio: "", initialTime: "9:35" },
      { name: "Petit Pierrot", audio: "", initialTime: "9:35" },
    ],
    instrumentation: [
      "Piccolo/Flute/Alto Flute",
      "Bb/Bass Clarinet",
      "ViolonCello",
      "Violin",
      "Piano",
    ],
    scoreSample: [pierrotPDF],
    duration: "8'",
  },
  {
    title: "Cinq Souvenirs",
    key: "cinq",
    year: "2007",
    description:
      "Five memories of two years spent in France (and Belgium) set for String quartet.",
    movements: [
      { name: "Le Premier Matin", audio: "", initialTime: "9:35" },
      { name: "Sur les Collines à Velo", audio: "", initialTime: "9:35" },
      {
        name: "Au Divinité'",
        audio: "",
        initialTime: "9:35",
      },
      {
        name: "Enterrement Catholique",
        audio: enterrement,
        initialTime: "9:35",
      },
      { name: "Au Fin d'Hiver", audio: "", initialTime: "9:35" },
    ],
    instrumentation: ["String Quartet"],
    scoreSample: [cinqSouvenirsPDF],
    duration: "20'",
  },
]

const choralPieces = [
  {
    title: "There Will Come Soft Rains",
    key: "soft-rains",
    year: "2017",
    description:
      "This was originally written a a choral piece targeting a highschool or college level choir. It was never performed, and turned out to be quite a bit more difficult that I had first envisioned. It uses some indeterminism to create the organic feeling of a rainstorm throughout",
    movements: [
      {
        name: "There Will Come Soft Rains",
        audio: "",
        initialTime: "4:35",
      },
    ],
    instrumentation: ["SSSSAAAATTTTBBBB"],
    scoreSample: [thereWillPDF],
    duration: "5'",
  },

  {
    title: "A King's Prayer",
    key: "kings-prayer",
    year: "2010",
    description:
      "A supplication to the divine. A Plea to know the unknowable. From a text in the BOM",
    movements: [
      {
        name: "A King's Prayer",
        audio: "",
        initialTime: "4:35",
      },
    ],
    instrumentation: ["SSAATTBB"],
    scoreSample: [kingsPrayerPDF],
    duration: "5'",
  },

  {
    title: "Homeward Bound",
    key: "home-ward-bound",
    year: "2008",
    description: "An arrangement of the well-known American folk song.",
    movements: [
      {
        name: "Homeward Bound",
        audio: "",
        initialTime: "4:35",
      },
    ],
    instrumentation: ["SATB", "Piano"],
    scoreSample: [""],
    duration: "6'",
  },
]

const tableOfContents = [
  ["Copernicus Etudes", "Three Pieces for Clarinet"],
  [
    "Song Cycle (unnamed)",
    "Habit",
    "I Wonder as I Wander",
    "Silent Night",
    "Come, Come ye Saints",
    "3 Christmas Songs",
    "3 Songs on a Poem by Baudelaire",
    "Crystal Gazer",
  ],
  ["Cycle", "Terminal"],
  [
    "Dialogues",
    "Star-Crossed",
    "Neon Games",
    "Etchings",
    "Pierrot Miniatures",
    "Cinq Souvenirs",
  ],
  ["There Will Come Soft Rains", "A King's Prayer", "Homeward Bound"],
]

export const concertPieces = [
  {
    nexTitle: "Solo Music",
    tabName: "Solo",
    playList: tableOfContents[0],
    allPieces: soloPieces,
    colors: {
      background: `linear-gradient(90deg, rgba(12, 117, 111, 0.69) 0.79%, rgba(12, 117, 111, 0.21) 98.19%)`,
      button: `#0C756F`,
    },
  },
  {
    nexTitle: "Vocal Music",
    tabName: "Vocal",
    playList: tableOfContents[1],
    allPieces: vocalPieces,
    colors: {
      background: `linear-gradient(90.05deg, rgba(115, 117, 12, 0.42) 2.37%, rgba(115, 117, 12, 0.42) 2.38%, rgba(170, 173, 10, 0.105) 98.45%);`,
      button: `#D7DB02`,
    },
  },
  {
    nexTitle: "Orchestral Music",
    tabName: "Orchestral",
    playList: tableOfContents[2],
    allPieces: orchestralPieces,
    colors: {
      background: `linear-gradient(90deg, rgba(182, 130, 30, 0.69) 0%, rgba(178, 127, 27, 0.0790625) 99.39%, rgba(235, 158, 10, 0) 112.25%, rgba(177, 126, 27, 0) 112.25%);`,
      button: `#B17E1B`,
    },
  },
  {
    nexTitle: "Chamber Music",
    tabName: "Chamber",
    playList: tableOfContents[3],
    allPieces: chamberPieces,
    colors: {
      background: `linear-gradient(90deg, rgba(27, 69, 177, 0.71) 0%, rgba(27, 69, 177, 0.23) 100%);`,
      button: `#1B45B1`,
    },
  },
  {
    nexTitle: "Choral Music",
    tabName: "Choral",
    playList: tableOfContents[4],
    allPieces: choralPieces,
    colors: {
      background: `linear-gradient(90deg, rgba(174, 27, 177, 0.71) 0%, rgba(138, 27, 177, 0.23) 100%);`,
      button: `#9C1BB1`,
    },
  },
]
