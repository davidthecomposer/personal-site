import { useEffect } from "react"

export const useRectGlow = (
  wrapper: any,
  canvas: any,
  posX: number,
  posY: number,
  radX: number,
  radY: number,
  color: string
) => {
  useEffect(() => {
    const draw = () => {
      const { width, height } = wrapper.current.getBoundingClientRect()
      const glow = canvas.current.getContext("2d")
      canvas.current.width = width
      canvas.current.height = height
      glow.fillStyle = color
      glow.beginPath()
      glow.rect(width * posX, height * posY, width * radX, height * radY)
      glow.fill()
    }

    function handleResize() {
      if (wrapper.current) draw()
    }

    handleResize()
    window.addEventListener("resize", () => handleResize())
    return () => window.removeEventListener("resize", () => handleResize())
  })
}
