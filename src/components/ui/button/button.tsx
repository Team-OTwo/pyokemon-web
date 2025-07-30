import React from "react"

interface ButtonProps {
  text: string
  border?: boolean
  onClick?: () => void
}
const Button: React.FC<ButtonProps> = ({ text, border, onClick }) => {
  const baseStyle = "rounded-lg w-320 h-50 flex justify-center items-center cursor-pointer "
  const style = border
    ? "bg-white border-1 border-primary text-primary"
    : "bg-primary border-1 border-primary text-white"
  return (
    <button className={baseStyle + style} onClick={onClick}>
      {text}
    </button>
  )
}

export default Button
