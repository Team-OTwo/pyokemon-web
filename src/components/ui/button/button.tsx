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

const getColorStyle = (type: "text" | "bg" | "border", color?: string) => {
  if (!color) return {}

  const colorMap: Record<string, string> = {
    primary: "var(--color-primary)",
    "primary-dark": "var(--color-primary-dark)",
    white: "var(--color-white)",
    black: "var(--color-black)",
    error: "var(--color-error)",
    success: "var(--color-success)",
    "gray-300": "var(--color-gray-300)",
    "gray-500": "var(--color-gray-500)",
    "gray-700": "var(--color-gray-700)",
  }

  const colorValue = colorMap[color]
  if (!colorValue) return {}

  if (type === "text") {
    return { color: colorValue }
  } else if (type === "bg") {
    return { backgroundColor: colorValue }
  } else if (type === "border") {
    return { borderColor: colorValue }
  }

  return {}
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
  const textStyle = getColorStyle("text", color)
  const bgStyle = getColorStyle("bg", bgColor)
  const borderStyle = border
    ? {
        border: "1px solid",
        ...getColorStyle("border", borderColor),
      }
    : {}

  const baseStyle =
    "rounded-lg h-51 flex justify-center items-center cursor-pointer hover:opacity-80 text-16-semibold "

  const sizeStyle = small ? "px-24" : "w-320"

  const className = [baseStyle, sizeStyle].join(" ")
  const style = { ...textStyle, ...bgStyle, ...borderStyle }

  return (
    <button className={className} style={style} onClick={onClick}>
      {icon && <span className="mr-6">{icon}</span>}
      {text}
    </button>
  )
}

export default Button
