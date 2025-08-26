import React from "react"
import { useGetMyBookingsQuery } from "@/api/mypage/queries/use-get-my-bookings-query"
import { IoTicketOutline } from "react-icons/io5"
import { useNavigate, useSearchParams } from "react-router"

import { Ticket } from "@/types/ticket"
import Button from "@/components/ui/button"
import Pagination from "@/components/ui/pagination"
import TicketCard from "@/components/ticket-card/ticket-card"

import ErrorPage from "../error-page"
import LoadingPage from "../loading-page"

const MyBookingsPage = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Number(searchParams.get("page") ?? "1")

  const { data, isLoading, error } = useGetMyBookingsQuery(page - 1)

  const handleClick = (bookingId: number) => {
    navigate(`/mypage/bookings/${bookingId}`)
  }

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() })
  }

  if (isLoading) {
    return <LoadingPage />
  }

  if (error) {
    return <ErrorPage />
  }

  return (
    <div className="px-160 mb-48">
      <h1 className="title-24-bold pt-48 flex items-center gap-12">
        <IoTicketOutline className="text-black" />
        예매 내역
      </h1>

      {!data || data === "" ? (
        <>
          <p className="text-center py-120 text-gray-500">예매 내역이 없습니다.</p>
          <div className="w-full flex justify-center items-center">
            <Button
              text="공연 예매하러 가기"
              border
              borderColor="primary"
              bgColor="white"
              color="primary"
              onClick={() => navigate("/event")}
            />
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-24 py-32">
            {data.content.map((booking: Ticket) => {
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

          <div className="flex justify-center">
            <Pagination
              current={data.page + 1}
              total={data.totalCount}
              pageSize={10}
              onChange={(p) => handlePageChange(p)}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default MyBookingsPage
