import media from "./media";
import colors from "./Colors";

export const Heading1 = `font-family: "Julius Sans One";
 font-size: 5vw;
  `;
export const SlideHeading = `
font-family: Julius Sans One;
font-style: normal;
font-weight: normal;
font-size: 4.4vw;
line-height: 100%;
letter-spacing: -0.02em;
color: #E5FCFA;

`;

export const MetroHeading32 = `
font-family: Metrophobic;
font-style: normal;
font-weight: normal;
font-size: 2vw;
line-height: 100%;
letter-spacing: -0.02em;
color: #E5FCFA;

`;

export const Body1 = `
font-family: Metrophobic;
font-style: normal;
font-weight: normal;
font-size: 1.1vw;
line-height: 150%;
letter-spacing: -0.02em;

color: ${colors.coolWhite};
`;

export const BodySmall = `
font-family: Metrophobic;
font-style: normal;
font-weight: normal;
font-size: 0.9vw;
line-height: 150%;
letter-spacing: -0.02em;

color: black;
`;

export const SubHeader = `
font-family: Julius Sans One;
font-style: normal;
font-weight: normal;
font-size: 4vw;
line-height: 100%;
letter-spacing: -0.02em;
color: #E5FCFA;
`;

export const SubHeader2 = `
font-family: Julius Sans One;
font-style: normal;
font-weight: normal;
font-size: 3vw;
line-height: 100%;
letter-spacing: -0.02em;
color: #E5FCFA;
`;

export const FooterSubHeader = `
font-family: Julius Sans One;
font-style: normal;
font-weight: normal;
font-size: 2.3vw;
line-height: 100%;
letter-spacing: -0.02em;
`;

export const SubHeader3 = `
font-family: Julius Sans One;
font-style: normal;
font-weight: 300;
font-size: 1.3vw;
line-height: 100%;
letter-spacing: -0.02em;
color: black;
${media.mobile} {
    font-size: 3.4vw;
}
`;

export const FormLabel = `
font-family: Metrophobic;
font-style: normal;
font-weight: normal;
font-size: 1.3vw;

line-height: 200%;
/* identical to box height, or 40px */

letter-spacing: -0.02em;

color: #FFCEF8;
${media.fullWidth} {
    font-size: max(24px);
}
`;

export const Playlist = `
font-family: Metrophobic;
font-style: normal;
font-weight: normal;
font-size: 1.1vw;
line-height: 150%;
letter-spacing: -0.02em;
color: rgba(23, 22, 27, 0.7);

${media.mobile} {
    font-size: 3.4vw;
}
`;

export const ConcertTitle = `
font-family: Metrophobic;
font-style: normal;
font-weight: normal;
text-align: center;
font-size: 3.1vw;
line-height: 150%;
letter-spacing: -0.02em;
color: rgba(23, 22, 27, 0.7);
${media.mobile} {
    font-size: 5.3vw;
}
${media.tabletPortrait} {
    font-size: 30px;
}
`;
