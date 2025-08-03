import React from "react"

interface ButtonProps {
  text: string
  border?: boolean
  borderColor?: string
  small?: boolean
  color?: string
  bgColor?: string
  onClick?: () => void
  icon?: React.ReactNode
}

// color : 글자 색
// border button이면 border, borderColor, color 넣어줘야함

const colorMap: Record<string, string> = {
  primary: "primary",
  "primary-dark": "primary-dark",
  white: "white",
  black: "black",
  error: "error",
  "gray-300": "gray-300",
  "gray-500": "gray-500",
  "gray-700": "gray-700",
}

const getColorClass = (prefix: string, color?: string) => {
  if (!color || !colorMap[color]) return ""
  return `${prefix}-${colorMap[color]}`
}

const Button: React.FC<ButtonProps> = ({
  text,
  small = false,
  border = false,
  borderColor = "primary",
  color = "white",
  bgColor = "primary",
  onClick,
  icon,
}) => {
  const textColorClass = getColorClass("text", color)
  const bgColorClass = getColorClass("bg", bgColor)
  const borderColorClass = getColorClass("border", borderColor)

  const baseStyle =
    "rounded-lg h-51 flex justify-center items-center cursor-pointer hover:opacity-80 text-16-semibold "

  const sizeStyle = small ? "px-24" : "w-320"
  const borderStyle = border ? `border-1 ${borderColorClass}` : ""

  const className = [baseStyle, sizeStyle, textColorClass, bgColorClass, borderStyle]
    .filter(Boolean)
    .join(" ")

  return (
    <button className={className} onClick={onClick}>
      {icon && <span className="mr-6">{icon}</span>}
      {text}
    </button>
  )
}

export default Button
