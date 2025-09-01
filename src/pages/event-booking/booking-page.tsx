import React from "react"

import BookingSidebar from "./_component/booking-sidebar"
import SeatChartBack from "./_component/seatchart-back"
import SeatChartLeft from "./_component/seatchart-left"
import SeatChartMain from "./_component/seatchart-main"
import SeatChartRight from "./_component/seatchart-right"

const BookingPage = () => {
  return (
    <div className="min-h-screen bg-gray-700 p-50 pl-160 pr-160">
      <div className="flex gap-30">
        <SeatChartBack />
        <BookingSidebar />
      </div>
    </div>
  )
}

export default BookingPage
