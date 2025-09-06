import React, { useEffect, useState } from "react"
import { postSavedEvent } from "@/api/event/fetchers/post-saved-event"
import { useGetEventDetailQuery } from "@/api/event/queries/use-get-event-detail-query"
import { useEventStore } from "@/store/event/event-store"
import { format, isAfter, isBefore, isWithinInterval } from "date-fns"
import { ko } from "date-fns/locale"
import DOMPurify from "dompurify"
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5"
import { useNavigate, useParams } from "react-router"

import { SeatPrice } from "@/types/event"
import Button from "@/components/ui/button"
import GenreBadge from "@/components/ui/genre-badge"

import ErrorPage from "../error-page"
import LoadingPage from "../loading-page"

const EventDetailPage = () => {
  const navigate = useNavigate()
  const { eventId } = useParams()
  const [isMarked, setIsMarked] = useState<boolean | null>(null)

  const handleMarkClick = () => {
    const accessToken = localStorage.getItem("accessToken")
    if (accessToken) {
      setIsMarked(!isMarked)
      postSavedEvent(Number(eventId))
    } else {
      navigate("/login")
    }
  }
  const { data: event, isLoading, error } = useGetEventDetailQuery(Number(eventId))

  const { setEvent } = useEventStore()

  useEffect(() => {
    if (event) {
      setIsMarked(event.saved ?? false)
      setEvent(event)
    }
  }, [event, setEvent])

  if (isLoading) {
    return <LoadingPage />
  }

  if (!event || error) {
    return <ErrorPage />
  }

  if (event.seatPrice?.length == 0) {
    const seatPrice = [
      { className: "VIP", price: 198000 },
      { className: "R", price: 178000 },
      { className: "A", price: 158000 },
      { className: "B", price: 148000 },
    ]
    event.seatPrice = seatPrice
  }

  const handleClickBooking = () => {
    navigate(`/event/booking/${event.eventScheduleId}`)
  }

  const beforeOpen = isAfter(event.ticketOpenAt, new Date())
  const afterEvent = isBefore(event.eventDate, new Date())
  const today = new Date()
  const isOpen = isWithinInterval(today, {
    start: event.ticketOpenAt,
    end: event.eventDate,
  })

  function SafeHtmlComponent(html: string) {
    const safeHtml = DOMPurify.sanitize(html)
    return <div dangerouslySetInnerHTML={{ __html: safeHtml }} />
  }

  return (
    <div className="px-160 py-64">
      <section className="flex gap-100 mb-60 justify-center">
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
                <li>{event.ageLimit === 0 ? "전체 관람가" : event.ageLimit + "세"}</li>
                <li>
                  <ul>
                    {event.seatPrice?.map((price: SeatPrice) => {
                      return (
                        <li key={price.className}>
                          <p className="flex justify-between w-120">
                            <span className="text-gray-700">{price.className} </span>
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
            {beforeOpen && (
              <div>
                <p className="text-center text-primary-dark">
                  {format(event.ticketOpenAt, "yyyy.MM.dd(iii) HH:mm ", { locale: ko })}
                  티켓 오픈!
                </p>
              </div>
            )}
            {afterEvent && (
              <div>
                <p className="text-center text-gray-500">이미 종료된 공연입니다.</p>
              </div>
            )}
            <Button text="예매하기" onClick={handleClickBooking} disabled={!isOpen} />

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
      <div className="py-24">
        <h2 className="title-18-bold mb-24">상세 설명</h2>
        {/* <img src={event.description} alt="" /> */}
        {event.description && SafeHtmlComponent(event.description)}
      </div>
    </div>
  )
}

export default EventDetailPage
