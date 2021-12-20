import text from "./text"
import media from "./media"
import colors from "./Colors"

export const PrimaryButtonStyle = `
width: 7.5vw;
height: 7.5vw;

appearance: none;
-webkit-appearance: none;
${text.desktop.bodyS};
border: 1px solid ${colors.buttonGrey};
border-width: min(1px);
box-sizing: border-box;
border-radius: 7.5vw;
 background: #00000050;
text-align: center;
cursor: pointer;
${media.mobile} {
    font-size: 4.3vw;
    width: 29vw;
    height: 9.7vw;
    border-radius: 1.4vw;
}
${media.tabletPortrait} {
   
    border-radius: 8px;
}
`
