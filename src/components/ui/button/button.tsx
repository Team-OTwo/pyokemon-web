import React from "react"

interface ButtonProps {
  text: string
  border?: boolean
  small?: boolean
  onClick?: () => void
}
const Button: React.FC<ButtonProps> = ({ text, border, small, onClick }) => {
  const baseStyle =
    "rounded-lg h-51 flex justify-center items-center cursor-pointer hover:opacity-80 "
  const sizeStyle = small ? "px-24 " : "w-320 "
  const style = border
    ? "bg-white border-1 border-primary text-primary"
    : "bg-primary border-1 border-primary text-white"
  return (
    <button className={baseStyle + sizeStyle + style} onClick={onClick}>
      {text}
    </button>
  )
}

export default Button
