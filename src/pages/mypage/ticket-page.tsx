import React from "react"
import { tickets } from "@/constants/ticket"

import TicketCard from "@/components/ticket-card/ticket-card"

const TicketPage = () => {
  return (
    <div className="px-160 mb-48">
      <h1 className="title-24-bold pt-48">내 예매 내역</h1>
      <div className="flex flex-col gap-24">
        {tickets.map((ticket) => {
          return (
            <li key={ticket.bookingId}>
              <TicketCard ticket={ticket} />
            </li>
          )
        })}
      </div>
    </div>
  )
}

export default TicketPage
