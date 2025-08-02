import React from "react"
import { differenceInCalendarDays, format, isBefore, parseISO } from "date-fns"
import { ko } from "date-fns/locale"
import { useNavigate } from "react-router"

import { EventType } from "@/types/event"

interface CarouselCardProps {
  event: EventType
}

const CarouselCard: React.FC<CarouselCardProps> = ({ event }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/event/detail/${event.eventId}`)
  }
  return (
    <div
      className="relative rounded-lg aspect-[3/4] flex flex-col justify-end overflow-hidden w-full"
      onClick={handleClick}
    >
      <img src={event.thumbnailUrl} alt="img" className="object-cover w-full h-full" />

      {/* text */}
      <div className="p-24 z-1 text-white bg-gradient-to-b from-black/0 to-black/75 absolute bottom-0 left-0 w-full">
        <h1 className="title-24-bold pb-12">{event.title}</h1>
        <p className="text-16-medium">{event.venueName}</p>
        <p className="text-16-medium">
          {format(event.eventDate, "yyyy.MM.dd (iii)", { locale: ko })}
        </p>
      </div>
    </div>
  )
}

export default CarouselCard
