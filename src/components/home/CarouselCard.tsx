import React from "react"

const CarouselCard = () => {
  return (
    <div className="relative rounded-lg aspect-[3/4] flex flex-col justify-end overflow-hidden w-full">
      <img
        src="https://ticketimage.interpark.com/Play/image/large/25/25009134_p.gif"
        alt="img"
        className="object-cover w-full h-full"
      />

      {/* text */}
      <div className="p-24 z-1 text-white bg-gradient-to-b from-black/0 to-black/75 absolute bottom-0 left-0">
        <h1 className="text-2xl font-semibold pb-12">BLACKPINK WORLD TOUR 2025 IN GOYANG</h1>
        <p className="text-sm font-semibold">고양 스타디움</p>
        <p className="text-sm">2025.07.05 - 2025.07.06</p>
      </div>
    </div>
  )
}

export default CarouselCard
