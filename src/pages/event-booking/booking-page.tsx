import React, { useCallback, useState } from "react"
import { useParams } from "react-router"

import { getEventBooking, getSeat_class } from "../../api/booking/fetchers/get-event-booking"
import Footer from "../../components/footer"
import Header from "../../components/header"
import { Booking_sidebar, Seat_class } from "../../types/booking"
import BookingSidebar from "./_component/booking_sidebar"
import SeatClassSeat from "./_component/seat_class_seat"
import SeatingChart from "./_component/seating_chart"

const BookingPage: React.FC = () => {
  const { id } = useParams()
  const [selectedGrade, setSelectedGrade] = useState<string>("")
  const [selectedSeat, setSelectedSeat] = useState<Seat_class | null>(null)
  const [bookingData, setBookingData] = useState<Booking_sidebar | null>(null)
  const [seatsData, setSeatsData] = useState<Seat_class[]>([])
  const [loading, setLoading] = useState(false)

  const fetchBookingData = useCallback(async (eventId: string) => {
    if (!eventId) return

    setLoading(true)
    try {
      const eventScheduleId = BigInt(eventId)
      const data = await getEventBooking(eventScheduleId)
      setBookingData(data)
    } catch (error) {
      console.error("Failed to fetch booking data:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchSeatsData = useCallback(async (eventId: string, seatGrade: string) => {
    if (!eventId || !seatGrade) return

    try {
      const eventScheduleId = BigInt(eventId)
      const data: Seat_class[] = await getSeat_class(eventScheduleId, seatGrade)
      setSeatsData(data)
    } catch (error) {
      console.error("Failed to fetch seats data:", error)
    }
  }, [])

  const handleSeatGradeSelect = useCallback(
    async (grade: string) => {
      setSelectedGrade(grade)
      setSelectedSeat(null)

      if (id) {
        await fetchSeatsData(id, grade)
      }
    },
    [id, fetchSeatsData]
  )

  const handleSeatSelect = useCallback((seat: Seat_class) => {
    setSelectedSeat(seat)
  }, [])

  const handlePayment = useCallback(() => {
    if (selectedSeat && id) {
      alert(
        `결제 진행: ${selectedSeat.seatGrade}-${selectedSeat.row}열-${selectedSeat.col} (${selectedSeat.seatId}번 좌석)`
      )
    }
  }, [selectedSeat, id])

  const handleInitialLoad = useCallback(async () => {
    if (id && !bookingData) {
      await fetchBookingData(id)
    }
  }, [id, bookingData, fetchBookingData])

  if (id && !bookingData && !loading) {
    handleInitialLoad()
  }

  if (loading || !bookingData) {
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
    <div className="min-h-screen bg-gray-950 text-white">
      <main className="flex pr-20 min-h-[calc(100vh-280px)]">
        <div className="flex-1">
          {!selectedGrade ? (
            <SeatingChart onSeatGradeSelect={handleSeatGradeSelect} />
          ) : (
            <SeatClassSeat
              seatGrade={selectedGrade}
              seats={seatsData}
              onSeatSelect={handleSeatSelect}
              selectedSeat={selectedSeat}
            />
          )}
        </div>

        <div className="w-350">
          <BookingSidebar
            bookingData={bookingData}
            selectedSeat={selectedSeat}
            onPayment={handlePayment}
          />
        </div>
      </main>
    </div>
  )
}

export default BookingPage
