import React from "react"
import styled from "styled-components"
import colors from "../../assets/styles/colors"
import text from "assets/styles/text"
import media from "assets/styles/media"

// import useAnimationFrame useMedia  from "utils/Hooks";

type props = {
  onClick?: any
  children: any
  borderColor?: string
  backgroundColor?: string
  bGOpacity?: number | string
  limit?: boolean | undefined
  disabled?: boolean
}

const MainButton: React.FC<props> = ({
  onClick,
  children,
  borderColor,
  backgroundColor,
  bGOpacity,
  limit,
  disabled,
}) => {
  return (
    <Button
      borderColor={borderColor}
      onClick={onClick}
      bGOpacity={bGOpacity || "00"}
      limit={limit}
      disabled={disabled}
    >
      <span>{children}</span>
      <BG bGColor={backgroundColor ? backgroundColor : colors.buttonGrey} />
    </Button>
  )
}

export default MainButton

const BG = styled.div<{ bGColor: string }>`
  position: absolute;

  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: ${props => props.bGColor};
  z-index: 0;
  opacity: 0.3;
  transform: scale(0);
  transform-origin: 50% 50%;
  transition: 0.3s;
  border-radius: 100%;
  ${media.tablet} {
  }
  ${media.mobile} {
  }
  ${media.fullWidth} {
  }
`

const Button = styled.button<{
  borderColor?: string
  bGOpacity: any
  limit: boolean | undefined
  disabled?: boolean
}>`
  position: relative;
  width: 7.5vw;
  height: 7.5vw;
  ${text.desktop.bodyS};
  color: ${colors.coolWhite};
  appearance: none;
  -webkit-appearance: none;
  background: ${props => `#000000${props.bGOpacity}`};

  span {
    position: relative;
    z-index: 1;
  }
  border: 0.1vw solid
    ${props => (props.borderColor ? props.borderColor : colors.buttonGrey)};

  border-radius: 100%;
  overflow: hidden;
  appearance: none;
  transition-timing-function: cubic-bezier(0.7, 0, 0.2, 1);
  z-index: 8;
  border-width: min(1px);
  box-sizing: border-box;
  border-radius: 7.5vw;
  text-align: center;

  cursor: pointer;
  ${media.hover} {
    :hover {
      background: transparent;
      transition: 0.4s;
      ${BG} {
        transform: scale(1);
      }
    }
  }

  ${media.tablet} {
  }

  ${media.fullWidth} {
    ${props =>
      props.limit &&
      `
          width: 120px;
  height: 120px;
    `};
  }
  ${media.mobile} {
    width: 20vw;
    height: 20vw;
    border-radius: 20vw;
    ${text.mobile.bodyM};
  }
`
