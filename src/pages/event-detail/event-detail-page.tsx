import React, { useEffect, useState } from "react"
import { useGetEventBookingQuery } from "@/api/booking/queries/use-get-event-booking-query"
import { useGetEventDetailQuery } from "@/api/event/queries/use-get-event-detail-query"
import { useEventStore } from "@/store/event/event-store"
import { format } from "date-fns"
import { IoStar, IoStarOutline } from "react-icons/io5"
import { useParams } from "react-router"

import GenreBadge from "@/components/ui/genre-badge"

import BookingSidebar from "./_component/booking-sidebar"

interface SeatPrice {
  seatGrade: string
  price: number
  remainingSeats?: number
}

const EventDetailPage = () => {
  const { eventId } = useParams()
  const [isMarked, setIsMarked] = useState(true)

  const handleMarkClick = () => {
    setIsMarked(!isMarked)
  }
  const { data: event, isLoading } = useGetEventDetailQuery(Number(eventId))
  const { data: booking } = useGetEventBookingQuery(event?.eventScheduleId ?? 1)
  const prices = booking?.remainingSeatsByGrade

  const { setEvent } = useEventStore()

  useEffect(() => {
    if (event) {
      setEvent(event)
    }
  }, [event, setEvent])

  if (isLoading) {
    return <div>loading...</div>
  }

  if (!event || !prices) {
    return <div>존재하지 않는 공연입니다.</div> // 로딩 중 UI
  }

  return (
    <div className="px-120 py-32 relative flex">
      <article className="w-full">
        {/* Title */}
        <div className="mb-16">
          <GenreBadge genre={event.genre} />
          <div className="flex gap-16 items-center mt-16">
            <div onClick={handleMarkClick}>
              {isMarked ? (
                <IoStar className="text-primary w-20 h-20" />
              ) : (
                <IoStarOutline className="text-gray-500 w-20 h-20" />
              )}
            </div>
            <h1 className="head2">{event.title}</h1>
          </div>
        </div>

        {/* event */}
        {/* info */}
        <div className="flex gap-24 mb-36">
          <img
            src={event.thumbnailUrl}
            alt="thumbnail"
            width="320"
            height="420"
            className="rounded-lg object-cover"
          />
          <div className="flex gap-12">
            <ul className="w-90 flex flex-col gap-16">
              <li>장소</li>
              <li>일시</li>
              <li>연령</li>
              <li>등급 및 가격</li>
            </ul>

            <ul className="flex flex-col gap-16">
              <li>{event.venueName}</li>
              <li>{format(new Date(event.eventDate), "yyyy.MM.dd")}</li>
              <li>{event.ageLimit}세</li>
              <li>
                <ul className="text-gray-700">
                  {prices
                    .filter((price: SeatPrice) => price.price != 0)
                    .map((price: SeatPrice) => {
                      return (
                        <li key={price.seatGrade}>
                          {price.seatGrade}{" "}
                          <span className="font-bold text-black">
                            {price.price.toLocaleString()}원
                          </span>
                        </li>
                      )
                    })}
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <hr />

        <div className="h-600 py-24">{event.description}</div>
      </article>

      <BookingSidebar />
    </div>
  )
}

export default EventDetailPage
