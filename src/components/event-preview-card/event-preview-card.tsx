import React from "react"
import { differenceInCalendarDays, format, isBefore, parseISO } from "date-fns"
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
      <div className="relative mb-8 aspect-[3/4]">
        <img src={event.thumbnailUrl} alt="img" className="rounded-lg object-cover w-full h-full" />
      </div>
      {openAt && (
        <p className="text-primary-dark text-16-semibold">
          {format(event.ticketOpenAt, "MM.dd (iii) hh:mm", { locale: ko })}
        </p>
      )}

      <p className="title-18-bold mb-4">{event.title}</p>
      <p className="text-gray-700 text-14-medium mb-6">
        {format(event.eventDate, "yyyy.MM.dd (iii)", { locale: ko })}
      </p>
    </div>
  )
}

export default EventPreviewCard
