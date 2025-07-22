import React from "react"

interface EventPreviewProps {
  openAt?: Date
  rank?: number
}

const EventPreviewCard: React.FC<EventPreviewProps> = ({ openAt, rank }) => {
  const date = openAt ? new Date(openAt) : null

  return (
    <div className="mb-8">
      <div className="relative mb-8 aspect-[3/4]">
        <img
          src="//ticketimage.interpark.com/Play/image/large/25/25008574_p.gif"
          alt="img"
          className="rounded-lg object-cover"
        />

        {rank && (
          <p className="absolute bottom-24 left-24 text-white text-5xl font-bold [text-shadow:_0px_0px_10px_rgb(0_0_0_/_0.5)]">
            {rank}
          </p>
        )}
      </div>
      {openAt && <p className="text-primary font-semibold">07.18(금) 12:00</p>}

      <p className="text-lg font-semibold mb-4">TOMORROW X TOGETHER WORLD TOUR</p>
      <p className="text-sm text-gray-700 mb-6">2025.09.12 - 2025.09.13</p>

      <div className="py-4 px-16 rounded-full h-25 bg-primary/10 text-center text-sm text-primary border-1 border-primary  justify-center items-center inline">
        콘서트
      </div>
    </div>
  )
}

export default EventPreviewCard
