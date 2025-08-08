import React from "react"
import { tickets } from "@/constants/ticket"
import { useNavigate } from "react-router"

import TicketCard from "@/components/ticket-card/ticket-card"

const TicketPage = () => {
  const navigate = useNavigate()

  const handleClick = (bookingId: number) => {
    navigate(`/mypage/tickets/${bookingId}`)
  }
  return (
    <div className="px-160 mb-48">
      <h1 className="title-24-bold pt-48">내 예매 내역</h1>
      <div className="flex flex-col gap-24 py-32">
        {tickets.map((ticket) => {
          return (
            <li
              key={ticket.bookingId}
              onClick={() => handleClick(ticket.bookingId)}
              className="cursor-pointer"
            >
              <TicketCard ticket={ticket} />
            </li>
          )
        })}
      </div>
    </div>
  )
}

export default TicketPage
