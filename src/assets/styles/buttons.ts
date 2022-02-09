import text from "./text"
import media from "./media"
import colors from "assets/styles/colors"

export const PrimaryButtonStyle = `
width: 7.5vw;
height: 7.5vw;

appearance: none;
-webkit-appearance: none;
${text.desktop.bodyS};
border: 1px solid ${colors.buttonGrey};

${media.mobile} {
    font-size: 4.3vw;
    width: 29vw;
    height: 9.7vw;
    border-radius: 1.4vw;
}
${media.tablet} {
   
    border-radius: 8px;
}
`
