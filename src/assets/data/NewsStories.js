import operaNews from "assets/images/operaCommissionNews.jpg"
import songCycleNews from "assets/images/songCycleNews.jpg"
import operaNewsM from "assets/images/operaCommissionNewsM.jpg"
import songCycleNewsM from "assets/images/songCycleNewsM.jpg"
import twitter from "assets/svg/twitterIcon.svg"
import instagram from "assets/svg/instagramIcon.svg"
import linkedin from "assets/svg/linkedIcon.svg"
import web from "assets/svg/webIcon.svg"
import facebook from "assets/svg/facebookIcon.svg"
import liz2 from "assets/images/liz2.png"
import liz2M from "assets/images/liz2M.jpg"
import mandiNews from "assets/images/mandiNews.jpg"
import mandiNewsM from "assets/images/mandiNewsM.jpg"
import jenny from "assets/images/jennySmile.jpg"
import jennyM from "assets/images/jennySmileM.jpg"
import { announceQuery } from "pages/music"
import React from "react"

console.log(announceQuery, "inJS")

const newsItems = [
  {
    title: "Instagram Song Cycle",
    mainImages: [songCycleNews, songCycleNewsM],
    paragraph:
      "I have accepted an offer to compose 6 art songs setting texts from a local author and to be performed and recorded through the auspices of Opera Contempo. 5 of the 6 have been completed.  The texts were part of a set of works published straight to social media by local author Liz Christensen, and will be performed by Mezzo Soprano Mandi Barrus. With the pandemic the timeline for performance changed a bit but we are finalizing performance dates soon. Stay tuned! ",
    paragraph1: "",
    share: "News Item 1 short synopsis",
    links1: [
      {
        icon: linkedin,
        link: "https://www.linkedin.com/in/mandi-barrus-mezzo/",
      },
      { icon: facebook, link: "https://www.facebook.com/mandibarrusmezzo" },
      { icon: instagram, link: "https://www.instagram.com/mandibarrusmezzo" },
    ],
    links2: [
      { icon: instagram, link: "https://www.instagram.com/lizcpoetry/" },
      { icon: web, link: "http://www.lizzylizzyliz.com" },
    ],
    moreTitle: "The Team",
    moreImage1: [mandiNews, mandiNewsM],
    moreText1: [
      "Mezzo-soprano ",
      <a
        key="mandi-1"
        href="http://mandibarrus.com"
        target="__blank"
        rel="noreferrer noopener"
      >
        Mandi Barrus
      </a>,
      " is a musician originally from Seattle, Washington. With her ",
      <a
        key="mandi-2"
        href="https://frontrowreviewersutah.com/?p=8504"
        target="__blank"
        rel="noreferrer noopener"
      >
        "impressive technique and clear tone"
      </a>,
      " . Ms. Barrus' performances are described as ",
      <a
        key="mandi-3"
        href="https://frontrowreviewersutah.com/?p=8504"
        target="__blank"
        rel="noreferrer noopener"
      >
        "a breath of fresh air"
      </a>,
      " and ",
      <a
        key="mandi-4"
        href="https://frontrowreviewersutah.com/?p=3625"
        target="__blank"
        rel="noreferrer noopener"
      >
        "particularly impressive"
      </a>,
      ". She is known for her versatility of performance, with credits in both musical theater (Hale Centre Theatre, Utah Repertory Theatre Company, Centerpoint Legacy Theatre, The Grand Theatre) and opera (Utah Opera, La Musica Lirica, Utah Lyric Opera, Lyric Opera Ensemble, Idaho Falls Opera Theatre). A winner of Utah Opera's AriaFest and of the University of Utah's Concerto Competition, Ms. Barrus holds a Bachelor of Musical Arts degree with a minor in Theatre Arts from BYU-Idaho and a Master of Music degree from the University of Utah",
    ],
    moreText2: [
      <a
        key="liz-1"
        target="__blank"
        rel="noreferrer noopener"
        href="http://www.lizzylizzyliz.com"
      >
        Liz Christensen
      </a>,
      "is the producer and host of both the entertainment podcast ",
      <a
        key="liz-2"
        target="__blank"
        rel="noreferrer noopener"
        href="https://inthetellingpodcast.buzzsprout.com/"
      >
        "In the Telling"
      </a>,
      " and the webseries ",
      <a
        key="liz-3"
        target="__blank"
        rel="noreferrer noopener"
        href="https://www.youtube.com/channel/UCvHO_s9oMYjKv2crN9_tjqA"
      >
        "She Made Me Do It."
      </a>,
      " She is also a playwright, editor, theatre director, choreographer stage and ",
      <a
        key="liz-4"
        target="__blank"
        rel="noreferrer noopener"
        href="https://www.imdb.com/name/nm2296618/?ref_=fn_al_nm_1"
      >
        screen
      </a>,
      " actress, and ",
      <a
        key="liz-5"
        target="__blank"
        rel="noreferrer noopener"
        href="https://www.instagram.com/lizcpoetry/"
      >
        Instagram poet.
      </a>,
      " Her creative work includes nine feature films, three short films, three music videos and over 70 theatrical productions. She is the mother of a teenager and a tween, a caregiver of an elderly parent, and has been married to her college sweetheart for over a decade. She was born and raised along the Wasatch Front and received her BFA from the University of Utah.",
    ],
    moreImage2: [liz2, liz2M],
    moreText2a: "",
  },
  {
    title: 'Chamber Opera : "X"',
    mainImages: [operaNews, operaNewsM],
    paragraph:
      'This chamber opera was originally slated for the spring of this year, but once again the pandemic put everything on pause. The librettist has begun again in earnest to create a piece touching on the intersection of technology and person-hood, power structures and dynamics, and what it means to be alive. The working title is "X" and the protagonist is a sentient AI named model X. I am excited to be moving forward again with this project!',
    paragraph1: "",
    share: "Meet Jenny",

    links1: [
      {
        icon: linkedin,
        link: "https://www.linkedin.com/in/jennifer-campbell-962b3345/",
      },
    ],
    links2: [
      { icon: twitter, link: "" },
      { icon: facebook, link: "" },
      { icon: instagram, link: "" },
      { icon: web, link: "" },
    ],
    moreTitle: "Meet Jenny",
    layout: "full",
    moreImage1: [jenny, jennyM],
    moreImage2: "",
    moreText1: [
      `Jennifer Campbell is a writer with a background in history, journalism
      and video. Her articles have appeared on Faithcounts.org and in Utah
      Stories Magazine. She is currently working on multiple writing projects including a fantasy novel, short stories, and a chamber Opera libretto. When not writing she's busy getting called
      "noob" by her 13-year-old son, escaping to the Uintas and ripping it
      up on the flag football field.`,
    ],
    moreText2: [],
  },
]

export default newsItems
