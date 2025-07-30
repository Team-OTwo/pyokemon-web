import React, { useState } from "react"
import { differenceInCalendarDays, format, isBefore, parseISO } from "date-fns"
import { ko } from "date-fns/locale"
import Calendar from "react-calendar"

import Button from "@/components/ui/button"

import "react-calendar/dist/Calendar.css"
import "./calendar.css"

import { useEventStore } from "@/store/event/event-store"
import { useNavigate } from "react-router"

const BookingSidebar = () => {
  const navigate = useNavigate()
  const { event } = useEventStore()

  if (!event) {
    return <div>Loading...</div> // 로딩 중 UI
  }

  const today = new Date()
  const ticketOpenAt = parseISO(event.ticketOpenAt)
  const diffDays = differenceInCalendarDays(ticketOpenAt, today)
  const isOpen = isBefore(new Date(), ticketOpenAt) === false

  const handleClickBooking = () => {
    navigate(`/event/booking/${event.eventScheduleId}`)
  }

  return (
    <article className="w-480">
      <div className="w-320 fixed right-80 rounded-lg">
        {isOpen ? (
          <div>
            <Calendar value={event.eventDate} onClickDay={() => {}} locale="en-US" />
            <Button text="예매하기" onClick={handleClickBooking} />
          </div>
        ) : (
          // 오픈 일정

          <div className="border-1 border-gray-300 rounded-lg text-center bg-white p-24 w-320 mb-32 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.10)]">
            <div className="flex items-center mb-12 gap-12">
              <h3 className="font-bold text-lg">오픈 일정</h3>
              <span className="text-primary font-semibold py-4 px-12 rounded-lg bg-primary/20 text-sm">
                D-{diffDays}
              </span>
            </div>
            <h1 className="text-primary font-semibold text-lg py-24 border-1 border-primary rounded-lg">
              {format(event.ticketOpenAt, "yyyy.MM.dd (iii) hh:mm", { locale: ko })}
            </h1>
          </div>
        )}
      </div>
    </article>
  )
}

export default BookingSidebar
