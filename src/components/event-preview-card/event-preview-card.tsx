import React from "react"
import { useNavigate } from "react-router"

import { EventType } from "@/types/event"

interface EventPreviewProps {
  openAt?: boolean
  rank?: number
  event: EventType
}

const EventPreviewCard: React.FC<EventPreviewProps> = ({ openAt, rank, event }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/event/detail/${event.eventId}`)
  }

  return (
    <div className="mb-8" onClick={handleClick}>
      <div className="relative mb-8 aspect-[3/4]">
        <img src={event.thumbnailUrl} alt="img" className="rounded-lg object-cover" />
        {rank && (
          <p className="absolute bottom-24 left-24 text-white text-5xl font-bold [text-shadow:_0px_0px_10px_rgb(0_0_0_/_0.5)]">
            {rank}
          </p>
        )}
      </div>
      {openAt && <p className="text-primary font-semibold">{event.ticketOpenAt}</p>}

      <p className="text-lg font-semibold mb-4">{event.title}</p>
      <p className="text-sm text-gray-700 mb-6">{event.eventDate}</p>

      <div className="py-4 px-16 rounded-full h-25 bg-primary/10 text-center text-sm text-primary border-1 border-primary  justify-center items-center inline">
        {event.genre}
      </div>
    </div>
  )
}

export default EventPreviewCard
