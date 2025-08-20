import React from "react"
import { useGetMyBookingsQuery } from "@/api/mypage/queries/use-get-my-bookings-query"
import { useNavigate } from "react-router"

import { Ticket } from "@/types/ticket"
import TicketCard from "@/components/ticket-card/ticket-card"

import ErrorPage from "../error-page"
import LoadingPage from "../loading-page"

const MyBookingsPage = () => {
  const navigate = useNavigate()

  const { data, isLoading, error } = useGetMyBookingsQuery()

  const handleClick = (bookingId: number) => {
    navigate(`/mypage/bookings/${bookingId}`)
  }

  if (isLoading || !data) {
    return <LoadingPage />
  }

  if (error) {
    return <ErrorPage />
  }

  return (
    <div className="px-160 mb-48">
      <h1 className="title-24-bold pt-48">내 예매 내역</h1>
      <div className="flex flex-col gap-24 py-32">
        {data.map((booking: Ticket) => {
          return (
            <li
              key={booking.bookingId}
              onClick={() => handleClick(booking.bookingId)}
              className="cursor-pointer"
            >
              <TicketCard ticket={booking} />
            </li>
          )
        })}
      </div>
    </div>
  )
}

export default MyBookingsPage
