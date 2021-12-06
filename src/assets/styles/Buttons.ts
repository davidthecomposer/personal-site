import { Body1 } from "./text"
import media from "./media"
import colors from "./Colors"

export const PrimaryButtonStyle = `
width: 7.5vw;
height: 2.5vw;
background: transparent;

appearance: none;
-webkit-appearance: none;
${Body1};
border: 0.1vw solid white;
border-width: min(2px);
box-sizing: border-box;
border-radius: 0.5vw;
padding-left: 2.3vw; 
text-align: left;
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
