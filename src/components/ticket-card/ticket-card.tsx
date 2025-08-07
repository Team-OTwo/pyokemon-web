import React from "react"
import { format } from "date-fns"
import { ko } from "date-fns/locale"

import { Ticket } from "@/types/ticket"

interface TicketCardProps {
  ticket: Ticket
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket }) => {
  return (
    <div className="shadow-container w-full p-24 rounded-lg h-200">
      <div className="flex justify-between h-full">
        <div className="flex gap-24">
          {/* img */}
          <img
            src={ticket.thumbnailUrl}
            alt="img"
            className="w-120 object-cover rounded-lg border-1 border-gray-100"
          />
          <div>
            <h3 className="title-18-bold mb-8">{ticket.eventTitle}</h3>
            <p className="text-16-bold text-gray-700">
              {format(ticket.eventDate, "yyyy.MM.dd(iii) hh:mm", { locale: ko })}
            </p>
            <p className="text-6-medium text-gray-700">{ticket.venueName}</p>
          </div>
        </div>

        <div className="flex flex-col justify-between text-end">
          <p className="text-16-medium text-primary">{ticket.status}</p>
          <p className="title-18-bold">{ticket.totalPrice.toLocaleString()}원</p>
        </div>
      </div>
    </div>
  )
}

export default TicketCard
