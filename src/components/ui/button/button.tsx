import React from "react"

interface ButtonProps {
  text: string
  border?: boolean
}
const Button: React.FC<ButtonProps> = ({ text, border }) => {
  const baseStyle = "rounded-lg w-320 h-50 flex justify-center items-center "
  const style = border
    ? "bg-white border-1 border-primary text-primary"
    : "bg-primary border-1 border-primary text-white"
  return <button className={baseStyle + style}>{text}</button>
}

export default Button
