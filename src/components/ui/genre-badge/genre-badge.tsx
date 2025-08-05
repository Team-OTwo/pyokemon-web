import React from "react"

interface GenreBadgeProps {
  genre: string
  gray?: boolean
}

const GenreBadge: React.FC<GenreBadgeProps> = ({ genre, gray }) => {
  const baseStyle =
    "py-6 px-16 rounded-full text-center justify-center items-center inline text-14-semibold cursor-pointer "
  const grayStyle = gray ? "bg-gray-100 text-gray-700" : "bg-primary/20 text-primary-dark"
  return <div className={baseStyle + grayStyle}>{genre}</div>
}

export default GenreBadge
