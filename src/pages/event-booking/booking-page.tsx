import { useState } from "react"
import { useParams } from "react-router"

import {
  useGetEventBookingQuery,
  useGetSeatClassQuery,
} from "../../api/booking/queries/use-get-event-booking-query"
import Footer from "../../components/footer"
import Header from "../../components/header"
import { Seat_class } from "../../types/booking"
import BookingSidebar from "./_component/booking_sidebar"
import SeatClassSeat from "./_component/seat_class_seat"
import SeatingChart from "./_component/seating_chart"

const BookingPage = () => {
  const { id } = useParams()
  const eventId = id || ""
  const [selectedGrade, setSelectedGrade] = useState<string>("")
  const [selectedSeat, setSelectedSeat] = useState<Seat_class | null>(null)
  const { data: bookingData, isLoading: isBookingLoading } = useGetEventBookingQuery(
    Number(eventId)
  )
  const { data: seatsData, isLoading: isSeatsLoading } = useGetSeatClassQuery(
    Number(eventId),
    selectedGrade
  )

  const handleSeatGradeSelect = (grade: string) => {
    setSelectedGrade(grade)
    setSelectedSeat(null)
  }
  const handleSeatSelect = (seat: Seat_class) => {
    setSelectedSeat(seat)
  }
  const handlePayment = () => {
    if (selectedSeat && eventId) {
      alert(
        `결제 진행: ${selectedSeat.seatGrade}-${selectedSeat.row}열-${selectedSeat.col} (${selectedSeat.seatId}번 좌석)`
      )
    }
  }

  const isLoading = isBookingLoading || (selectedGrade && isSeatsLoading)
  if (isLoading) {
    return (
      <div className="min-h-screen bg-l text-white">
        <Header />
        <main className="flex items-center justify-center min-h-[calc(100vh-280px)]">
          <div className="text-xl">로딩 중...</div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="flex pr-20 min-h-[calc(100vh-280px)]">
        <div className="flex-1">
          {!selectedGrade ? (
            <SeatingChart onSeatGradeSelect={handleSeatGradeSelect} />
          ) : (
            <SeatClassSeat
              seatGrade={selectedGrade}
              seats={seatsData || []}
              onSeatSelect={handleSeatSelect}
              selectedSeat={selectedSeat}
            />
          )}
        </div>

        <div className="w-350">
          {bookingData && (
            <BookingSidebar
              bookingData={bookingData}
              selectedSeat={selectedSeat}
              onPayment={handlePayment}
            />
          )}
        </div>
      </main>
    </div>
  )
}

export default BookingPage
