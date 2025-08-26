import React from "react"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { useNavigate } from "react-router"

import { EventType } from "@/types/event"

interface EventPreviewProps {
  openAt?: boolean
  event: EventType
}

const EventPreviewCard: React.FC<EventPreviewProps> = ({ openAt, event }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/event/detail/${event.eventId}`)
  }

  return (
    <div className="mb-8" onClick={handleClick}>
      <div className="relative mb-12 aspect-[3/4]">
        <img src={event.thumbnailUrl} alt="img" className="rounded-lg object-cover w-full h-full" />
      </div>
      {openAt && (
        <p className="text-primary-dark text-16-semibold">
          {format(event.ticketOpenAt, "MM.dd (iii) HH:mm", { locale: ko })}
        </p>
      )}

      <p className="title-18-bold mb-4">{event.title}</p>
      <p className="text-16-normal">{event.venueName}</p>
      <p className="text-gray-700 text-16-normal mb-6">
        {format(event.eventDate, "yyyy.MM.dd (iii)", { locale: ko })}
      </p>
    </div>
  )
}

export default EventPreviewCard
