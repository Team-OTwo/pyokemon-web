import { useState } from "react"
import { getTossClientKey } from "@/constants/env"
import { loadTossPayments } from "@tosspayments/payment-sdk"
import { useParams } from "react-router"
import Swal from "sweetalert2"

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

  const getSelectedSeatPrice = () => {
    if (!selectedSeat || !bookingData) return 0

    const gradeInfo = bookingData.remainingSeatsByGrade.find(
      (g: { seatGrade: string; price: number }) => g.seatGrade === selectedSeat.seatGrade
    )

    return gradeInfo?.price || 0
  }

  const handlePaymentClick = async () => {
    if (!selectedSeat) {
      Swal.fire({
        icon: "warning",
        title: "좌석을 선택해주세요!",
        confirmButtonText: "확인",
        confirmButtonColor: "var(--color-primary)",
      })
      return
    }

    try {
      const tossPayments = await loadTossPayments(getTossClientKey())

      await tossPayments.requestPayment("카드", {
        amount: getSelectedSeatPrice(),
        orderId: `ORDER_${Date.now()}`,
        orderName: `${selectedSeat.seatGrade}석 예매`,
        customerName: "홍길동",
        successUrl: `${window.location.origin}/mypage`,
        failUrl: `${window.location.origin}/event/booking/${eventId}`,
      })
    } catch (error) {
      console.error("토스 결제 오류:", error)
      Swal.fire("결제 실패", "잠시 후 다시 시도해주세요.", "error")
    }
  }
  const handlePayment = () => {
    if (selectedSeat && eventId) {
      /*
      alert(
        `결제 진행: ${selectedSeat.seatGrade}-${selectedSeat.row}열-${selectedSeat.col} (${selectedSeat.seatId}번 좌석)`
      )
        */
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
              /*onPayment={handlePayment}*/
              onPayment={handlePaymentClick}
            />
          )}
        </div>
      </main>
    </div>
  )
}

export default BookingPage
