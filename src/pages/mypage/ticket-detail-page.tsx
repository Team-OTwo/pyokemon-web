import React from "react"
import { ticket } from "@/constants/ticket"
import { mapTicketDetailToTicket } from "@/utils/map-ticket"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { IoChevronBackOutline } from "react-icons/io5"
import { useNavigate, useParams } from "react-router"

import Button from "@/components/ui/button"
import TicketCard from "@/components/ticket-card/ticket-card"

const TicketDetailPage = () => {
  const { bookingId } = useParams()
  const navigate = useNavigate()
  const labelStyle = "text-16-medium text-gray-700 w-100"
  const valueStyle = "text-16-medium text-black"
  const seat = `${ticket.seat.className}-${ticket.seat.col}열-${ticket.seat.row}`

  const ticketInfoList = [
    { label: "예매자", value: ticket.user.name },
    { label: "예매번호", value: ticket.bookingId },
    {
      label: "예매일",
      value: format(new Date(ticket.createdAt), "yyyy.MM.dd(iii) HH:mm", { locale: ko }),
    },
    { label: "좌석", value: seat },
  ]

  const paymentInfoList = [
    { label: "결제 수단", value: ticket.payment.method },
    { label: "결제 상태", value: ticket.payment.status },
    {
      label: "결제일",
      value: format(new Date(ticket.payment.paidAt), "yyyy.MM.dd(iii) HH:mm", { locale: ko }),
    },
    { label: "결제 금액", value: ticket.payment.amount.toLocaleString() + "원" },
  ]

  return (
    <div className="px-160 mb-48">
      <h1 className="title-24-bold pt-48 flex items-center gap-12">
        <IoChevronBackOutline
          className="cursor-pointer text-gray-700 hover:bg-gray-100 rounded-sm"
          onClick={() => navigate(-1)}
        />{" "}
        예매 상세
      </h1>
      <div className="my-32">
        <TicketCard ticket={mapTicketDetailToTicket(ticket)} />

        <div className="flex justify-between py-48">
          {/* 예매내역 */}
          <div>
            <h3 className="title-18-bold mb-24">예매 내역</h3>
            <ul className="flex flex-col gap-24">
              {ticketInfoList.map((item, idx) => (
                <li className="flex" key={idx}>
                  <span className={labelStyle}>{item.label}</span>
                  <span className={valueStyle}>{item.value}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 결제내역 */}
          <div className="shadow-container p-24 rounded-lg">
            <h3 className="title-18-bold">결제 내역</h3>
            <ul className="flex flex-col gap-24 my-24">
              {paymentInfoList.map((item, idx) => (
                <li className="flex" key={idx}>
                  <span className={labelStyle}>{item.label}</span>
                  <span className={valueStyle}>{item.value}</span>
                </li>
              ))}
            </ul>
            <Button border borderColor="error" text="예매 취소" bgColor="white" color="error" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketDetailPage
