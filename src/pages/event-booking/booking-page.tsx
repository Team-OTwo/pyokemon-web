import { useState } from "react"
import { getTossClientKey } from "@/constants/env"
import { loadTossPayments } from "@tosspayments/payment-sdk"
import { useParams } from "react-router"
import Swal from "sweetalert2"

import {
  useGetEventBookingQuery,
  useGetSeatClassQuery,
} from "../../api/booking/queries/use-get-event-booking-query"
import { usePostEventBookingQuery } from "../../api/booking/queries/use-post-event-booking-query"
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
  const [isPaymentLoading, setIsLoading] = useState(false)
  const { mutate: postBooking, isPending: isBookingPending } = usePostEventBookingQuery()
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

  interface PaymentRequest {
    bookingId: number
    orderId: string
    amount: number
    method: string
    accountId: number
  }

  interface PaymentResponse {
    orderId: string
    amount: number
  }

  const mutateAsync = async (data: PaymentRequest): Promise<PaymentResponse> => {
    return { orderId: data.orderId, amount: data.amount }
  }

  const handlePaymentClick = async () => {
    if (isPaymentLoading) return
    setIsLoading(true)
    if (!selectedSeat) {
      Swal.fire({
        icon: "warning",
        title: "좌석을 선택해주세요!",
        confirmButtonText: "확인",
        confirmButtonColor: "var(--color-primary)",
      })
      setIsLoading(false)
      return
    }

    try {
      postBooking(
        {
          eventScheduleId: Number(eventId),
          seatId: selectedSeat.seatId,
        },
        {
          onSuccess: async (bookingResponse) => {
            const res = await mutateAsync({
              bookingId: bookingResponse.bookingId,
              orderId: `ORDER_${Date.now()}_${Math.floor(Math.random() * 100000)}`,
              amount: getSelectedSeatPrice(),
              method: "카드",
              accountId: 1,
            })
            const { orderId, amount } = res
            const tossPayments = await loadTossPayments(getTossClientKey())
            await tossPayments.requestPayment("카드", {
              amount,
              orderId,
              orderName: `${selectedSeat.seatGrade}석 예매`,
              customerName: "홍길동",
              successUrl: `${window.location.origin}/user/paymentSuccess`,
              failUrl: `${window.location.origin}/event/booking/${eventId}`,
            })
          },
          onError: (error) => {
            console.error("예매 API 오류:", error)
            Swal.fire("예매 실패", "잠시 후 다시 시도해주세요.", "error")
          },
        }
      )
    } catch (error) {
      console.error("토스 결제 오류:", error)
      Swal.fire("결제 실패", "잠시 후 다시 시도해주세요.", "error")
    } finally {
      setIsLoading(false)
    }
  }

  const isLoading = isBookingLoading || (selectedGrade && isSeatsLoading) || isBookingPending
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
    <div className="min-h-screen bg-white text-gray-700">
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
              onPayment={handlePaymentClick}
            />
          )}
        </div>
      </main>
    </div>
  )
}

export default BookingPage
