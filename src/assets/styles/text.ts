import media from "./media"
import colors from "styles/colors"

const mainStyles = {
  headings: `font-family: "Nixie One";
    font-style: normal;
    font-weight: normal;
    line-height: 100%;
    letter-spacing: -0.02em;`,
  body: `
    font-family: "Maven Pro";
font-style: normal;
font-weight: normal;
line-height: 140%;
letter-spacing: -0.02em;
    `,
}

const text = {
  fullWidth: {
    h1: `
       ${mainStyles.headings};
       font-size: 96px;
       `,
    h2: `
       ${mainStyles.headings};
       font-size: 80px;
       `,
    h3: `
       ${mainStyles.headings};
       font-size: 64px;
       `,
    h4: `
       ${mainStyles.headings};
       font-size: 48px;
       `,
    h5: `
       ${mainStyles.headings};
       font-size: 36px;
       `,
    h6: `
       ${mainStyles.headings};
       font-size: 24px;
       `,
    bodyL: `
       ${mainStyles.body};
       font-size: 36px;
       `,
    bodyM: `
       ${mainStyles.body};
       font-size: 24px;
       `,
    bodyS: `
       ${mainStyles.body};
       font-size: 18px;
       `,
    bodyXS: `
       ${mainStyles.body};
       font-size: 12px;
       `,
  },
  desktop: {
    h1: `
       ${mainStyles.headings};
       font-size: 6vw;
       `,
    h2: `
       ${mainStyles.headings};
       font-size: 5vw;
       `,
    h3: `
       ${mainStyles.headings};
       font-size: 4vw;
       `,
    h4: `
       ${mainStyles.headings};
       font-size: 3vw;
       `,
    h5: `
       ${mainStyles.headings};
       font-size: 2.25vw;
       `,
    h6: `
       ${mainStyles.headings};
       font-size: 1.5vw;
       `,
    bodyL: `
       ${mainStyles.body};
       font-size: 2.25vw;
       `,
    bodyM: `
       ${mainStyles.body};
       font-size: 1.5vw;
       `,
    bodyS: `
       ${mainStyles.body};
       font-size: 1.13vw;
       `,
    bodyXS: `
       ${mainStyles.body};
       font-size: 0.75vw;
       `,
  },
  tablet: {
    h1: `
      ${mainStyles.headings};
      font-size: 9.38vw;
      `,
    h2: `
      ${mainStyles.headings};
      font-size: 7.81vw;
      `,
    h3: `
      ${mainStyles.headings};
      font-size: 6.25vw;
      `,
    h4: `
      ${mainStyles.headings};
      font-size: 4.69vw;
      `,
    h5: `
      ${mainStyles.headings};
      font-size: 3.52vw;
      `,
    h6: `
      ${mainStyles.headings};
      font-size: 2.34vw;
      `,
    bodyL: `
      ${mainStyles.body};
      font-size: 3.52vw;
      `,
    bodyM: `
      ${mainStyles.body};
      font-size: 2.34vw;
      `,
    bodyS: `
      ${mainStyles.body};
      font-size: 1.76vw;
      `,
    bodyXS: `
      ${mainStyles.body};
      font-size: 1.17vw;
      `,
  },
  mobile: {
    h1: `
      ${mainStyles.headings};
      font-size: 11.21vw;
      `,
    h2: `
      ${mainStyles.headings};
      font-size: 9.35vw;
      `,
    h3: `
      ${mainStyles.headings};
      font-size: 7.48vw;
      `,
    h4: `
      ${mainStyles.headings};
      font-size: 5.61vw;
      `,
    h5: `
      ${mainStyles.headings};
      font-size: 4.21vw;
      `,
    h6: `
      ${mainStyles.headings};
      font-size: 2.8vw;
      `,
    bodyL: `
      ${mainStyles.body};
      font-size: 4.21vw;
      `,
    bodyM: `
      ${mainStyles.body};
      font-size: 2.8vw;
      `,
    bodyS: `
      ${mainStyles.body};
      font-size: 2.1vw;
      `,
    bodyXS: `
      ${mainStyles.body};
      font-size: 1.87vw;
      `,
  },
}

export default text
