import React, { useEffect, useState } from "react"
import { useGetEventBookingQuery } from "@/api/booking/queries/use-get-event-booking-query"
import { postSavedEvent } from "@/api/event/fetchers/post-saved-event"
import { useGetEventDetailQuery } from "@/api/event/queries/use-get-event-detail-query"
import { useEventStore } from "@/store/event/event-store"
import { format } from "date-fns"
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5"
import { useNavigate, useParams } from "react-router"

import Button from "@/components/ui/button"
import GenreBadge from "@/components/ui/genre-badge"

interface SeatPrice {
  seatGrade: string
  price: number
  remainingSeats?: number
}

const EventDetailPage = () => {
  const navigate = useNavigate()
  const { eventId } = useParams()
  const [isMarked, setIsMarked] = useState<boolean | null>(null)

  const handleMarkClick = () => {
    setIsMarked(!isMarked)
    postSavedEvent(Number(eventId))
  }
  const { data: event, isLoading } = useGetEventDetailQuery(Number(eventId))
  const { data: booking } = useGetEventBookingQuery(event?.eventScheduleId ?? 1)
  const prices = booking?.remainingSeatsByGrade

  const { setEvent } = useEventStore()

  useEffect(() => {
    if (event) {
      setIsMarked(event.saved ?? false)
      setEvent(event)
    }
  }, [event, setEvent])

  if (isLoading) {
    return <div>loading...</div>
  }

  if (!event || !prices) {
    return <div>존재하지 않는 공연입니다.</div> // 로딩 중 UI
  }

  const handleClickBooking = () => {
    navigate(`/event/booking/${event.eventScheduleId}`)
  }

  return (
    <div className="px-160 py-64">
      <section className="flex gap-60 mb-60 justify-center">
        <article>
          <img
            src={event.thumbnailUrl}
            alt="thumbnail"
            width="420"
            height="550"
            className="rounded-lg object-cover"
          />
        </article>

        <article className="w-320 min-h-450 flex flex-col justify-between">
          <div>
            <GenreBadge genre={event.genre} />
            <h1 className="title-24-bold pt-16 pb-32">{event.title}</h1>

            {/* info */}
            <div className="flex gap-12">
              <ul className="w-90 flex flex-col gap-16 text-16-bold">
                <li>장소</li>
                <li>일시</li>
                <li>관람연령</li>
                <li>가격</li>
              </ul>

              <ul className="flex flex-col gap-16 text-16-medium">
                <li>{event.venueName}</li>
                <li>{format(new Date(event.eventDate), "yyyy.MM.dd")}</li>
                <li>{event.ageLimit}세</li>
                <li>
                  <ul>
                    {prices
                      .filter((price: SeatPrice) => price.price != 0)
                      .map((price: SeatPrice) => {
                        return (
                          <li key={price.seatGrade}>
                            <p className="flex justify-between w-120">
                              <span className="text-gray-700">{price.seatGrade} </span>
                              {price.price.toLocaleString()}원
                            </p>
                          </li>
                        )
                      })}
                  </ul>
                </li>
              </ul>
            </div>
          </div>

          {/* buttons */}
          <div className="flex flex-col gap-16">
            <Button text="예매하기" onClick={handleClickBooking} />

            <Button
              onClick={handleMarkClick}
              text="관심공연"
              border
              borderColor="gray-300"
              bgColor="white"
              color="gray-700"
              icon={
                isMarked ? (
                  <IoBookmark className="text-primary" />
                ) : (
                  <IoBookmarkOutline className="text-gray-700" />
                )
              }
            />
          </div>
        </article>
      </section>

      <hr />
      <div className="h-600 py-24">
        <h2 className="title-18-bold mb-24">상세 설명</h2>
        {event.description}
      </div>
    </div>
  )
}

export default EventDetailPage
