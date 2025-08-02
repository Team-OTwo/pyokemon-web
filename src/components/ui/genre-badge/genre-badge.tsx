import React from "react"

const GenreBadge = ({ genre }: { genre: string }) => {
  return (
    <div className="py-6 px-16 rounded-full bg-primary/20 text-center text-primary-dark justify-center items-center inline text-14-semibold">
      {genre}
    </div>
  )
}

export default GenreBadge
