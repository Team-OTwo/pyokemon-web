import React from "react"

interface InputProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  type?: "text" | "password" | "email" | "tel" | "date"
  disabled?: boolean
  error?: boolean
  className?: string
  onBlur?: () => void
}

const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  onChange,
  type = "text",
  disabled = false,
  error = false,
  className = "",
  onBlur,
}) => {
  const baseStyle =
    "w-320 h-51 px-16 rounded-lg border-1 text-16-regular outline-none transition-colors"

  const defaultStyle = "bg-white border-gray-300 text-black placeholder-gray-400"
  const errorStyle = "border-error"
  const disabledStyle = "bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed"

  const getStyleClass = () => {
    if (disabled) return `${baseStyle} ${disabledStyle}`
    if (error) return `${baseStyle} ${defaultStyle} ${errorStyle}`
    return `${baseStyle} ${defaultStyle}`
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled && onChange) {
      onChange(e.target.value)
    }
  }

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      onBlur={onBlur}
      disabled={disabled}
      className={`${getStyleClass()} ${className}`}
    />
  )
}

export default Input
