import { useState } from "react"
import { usePostPaymentInitiateMutation } from "@/api/payment/queries/get-payments-query"
import { getTossClientKey } from "@/constants/env"
import { loadTossPayments } from "@tosspayments/payment-sdk"
import { useParams } from "react-router"
import Swal from "sweetalert2"

import {
  useGetEventBookingQuery,
  useGetEventSeatGradeQuery,
} from "../../api/booking/queries/use-get-event-booking-query"
import { usePostEventBookingQuery } from "../../api/booking/queries/use-post-event-booking-query"
import { useEventStore } from "../../store/event/event-store"
import { SelectedSeat } from "../../types/booking"
import LoadingPage from "../loading-page"
import BookingSidebar from "./_component/booking_sidebar"
import SeatClassSeat from "./_component/seat_class_seat"
import SeatingChart from "./_component/seating_chart"

const BookingPage = () => {
  const { id } = useParams()
  const eventId = id || ""
  const { event } = useEventStore()
  const [selectedGrade, setSelectedGrade] = useState<string>("")
  const [selectedSeat, setSelectedSeat] = useState<SelectedSeat | null>(null)
  const [isPaymentLoading, setIsLoading] = useState(false)
  const { mutateAsync: initiatePayment } = usePostPaymentInitiateMutation()
  const { mutate: postBooking, isPending: isBookingPending } = usePostEventBookingQuery()
  const { data: bookingData, isLoading: isBookingLoading } = useGetEventBookingQuery(
    Number(eventId)
  )
  const { data: seats, isLoading: isSeatIdsLoading } = useGetEventSeatGradeQuery(
    Number(eventId),
    selectedGrade
  )

  const handleSeatGradeSelect = (grade: string) => {
    setSelectedGrade(grade)
    setSelectedSeat(null)
  }
  const handleSeatSelect = (seat: SelectedSeat) => {
    setSelectedSeat(seat)
  }

  const getSelectedSeatPrice = () => {
    if (!selectedSeat || !bookingData) return 0

    const gradeInfo = bookingData.find((g) => g.seatGrade === selectedSeat.seatGrade)

    return gradeInfo?.price || 0
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
    if (!event?.tenantId) {
      Swal.fire({
        icon: "error",
        title: "예매 정보를 불러올 수 없습니다.",
        text: "이전 페이지로 돌아가서 다시 시도해주세요.",
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
          tenantId: Number(event.tenantId),
        },
        {
          onSuccess: async (bookingResponse) => {
            const res = await initiatePayment({
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

  const isLoading = isBookingLoading || (selectedGrade && isSeatIdsLoading) || isBookingPending
  if (isLoading) {
    return <LoadingPage />
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
              seats={seats || []}
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
              eventScheduleId={Number(eventId)}
            />
          )}
        </div>
      </main>
    </div>
  )
}

export default BookingPage
