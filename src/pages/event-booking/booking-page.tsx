import { useCallback, useEffect, useMemo, useState } from "react"
import { usePostPaymentInitiateMutation } from "@/api/payment/queries/get-payments-query"
import { getTossClientKey } from "@/constants/env"
import { loadTossPayments } from "@tosspayments/payment-sdk"
import { useParams } from "react-router"
import Swal from "sweetalert2"

import { postReidsBookiing } from "../../api/booking/fetchers/post-event-booking"
import {
  useGetEventBookingQuery,
  useGetEventSeatGradeQuery,
} from "../../api/booking/queries/use-get-event-booking-query"
import { usePostEventBookingQuery } from "../../api/booking/queries/use-post-event-booking-query"
import { useGetEventDetailQuery } from "../../api/event/queries/use-get-event-detail-query"
import { useEventStore } from "../../store/event/event-store"
import { SelectedSeat } from "../../types/booking"
import LoadingPage from "../loading-page"
import BookingSidebar from "./_component/booking_sidebar"
import SeatClassSeat from "./_component/seat_class_seat"
import SeatClassSeatB from "./_component/seat-class-seat-b"
import SeatClassSeatNormal from "./_component/seat-class-seat-normal"

const BookingPage = () => {
  const { id } = useParams()
  const eventId = Number(id) || 0
  const { event: storeEvent, setEvent } = useEventStore()
  const [selectedGrade, setSelectedGrade] = useState<string>("VIP")
  const [selectedSeat, setSelectedSeat] = useState<SelectedSeat | null>(null)
  const [isPaymentLoading, setIsLoading] = useState(false)

  const { mutateAsync: initiatePayment } = usePostPaymentInitiateMutation()
  const { mutate: postBooking, isPending: isBookingPending } = usePostEventBookingQuery()
  const { data: eventDetail, isLoading: isEventDetailLoading } = useGetEventDetailQuery(eventId)
  const { data: bookingData, isLoading: isBookingLoading } = useGetEventBookingQuery(eventId)
  const { data: seats, isLoading: isSeatIdsLoading } = useGetEventSeatGradeQuery(
    eventId,
    selectedGrade
  )

  const event = useMemo(() => {
    return storeEvent || eventDetail
  }, [storeEvent, eventDetail])

  useEffect(() => {
    if (eventDetail && !storeEvent) {
      setEvent(eventDetail)
    }
  }, [eventDetail, storeEvent, setEvent])

  const handleSeatGradeSelect = useCallback((grade: string) => {
    setSelectedGrade(grade)
    setSelectedSeat(null)
  }, [])

  const handleSeatSelect = useCallback((seat: SelectedSeat) => {
    setSelectedSeat(seat)
  }, [])

  const handleBackToSeatingChart = useCallback(() => {
    setSelectedGrade("")
    setSelectedSeat(null)
  }, [])

  const selectedSeatPrice = useMemo(() => {
    if (!selectedSeat || !bookingData) return 0
    const gradeInfo = bookingData.find((g) => g.seatGrade === selectedSeat.seatGrade)
    return gradeInfo?.price || 0
  }, [selectedSeat, bookingData])

  const showErrorAlert = useCallback((title: string, message?: string) => {
    Swal.fire({
      icon: "error",
      title,
      text: message,
      confirmButtonText: "확인",
      confirmButtonColor: "var(--color-primary)",
    })
  }, [])

  const showWarningAlert = useCallback((title: string) => {
    Swal.fire({
      icon: "warning",
      title,
      confirmButtonText: "확인",
      confirmButtonColor: "var(--color-primary)",
    })
  }, [])

  const handlePaymentClick = useCallback(async () => {
    if (isPaymentLoading) return

    if (!selectedSeat) {
      showWarningAlert("좌석을 선택해주세요!")
      return
    }

    if (!event?.tenantId) {
      showErrorAlert("예매 정보를 불러올 수 없습니다.", "이전 페이지로 돌아가서 다시 시도해주세요.")
      return
    }

    setIsLoading(true)

    try {
      await postReidsBookiing(eventId, selectedSeat.seatId)

      postBooking(
        {
          eventScheduleId: eventId,
          seatId: selectedSeat.seatId,
          tenantId: Number(event.tenantId),
        },
        {
          onSuccess: async (bookingResponse) => {
            const res = await initiatePayment({
              payment: {
                bookingId: bookingResponse.bookingId,
                orderId: `ORDER_${Date.now()}_${Math.floor(Math.random() * 100000)}`,
                amount: selectedSeatPrice,
                method: "카드",
              },
              eventScheduleId: eventId,
            })
            const { orderId, amount } = res
            const tossPayments = await loadTossPayments(getTossClientKey())
            await tossPayments.requestPayment("카드", {
              amount,
              orderId,
              orderName: `${selectedSeat.seatGrade}석 예매`,
              customerName: "홍길동",
              successUrl: `${window.location.origin}/user/paymentSuccess`,
              failUrl: `${window.location.origin}/event/booking/${id}`,
            })
          },
          onError: (error) => {
            console.error("예매 API 오류:", error)
            showErrorAlert("예매 실패", "잠시 후 다시 시도해주세요.")
          },
        }
      )
    } catch (error) {
      console.error("Redis HOLD 또는 토스 결제 오류:", error)
      showErrorAlert("결제 실패", "잠시 후 다시 시도해주세요.")
    } finally {
      setIsLoading(false)
    }
  }, [
    isPaymentLoading,
    selectedSeat,
    event?.tenantId,
    eventId,
    selectedSeatPrice,
    id,
    postReidsBookiing,
    postBooking,
    initiatePayment,
    showErrorAlert,
    showWarningAlert,
  ])

  const isLoading = useMemo(
    () =>
      isBookingLoading ||
      isEventDetailLoading ||
      (selectedGrade && isSeatIdsLoading) ||
      isBookingPending,
    [isBookingLoading, isEventDetailLoading, selectedGrade, isSeatIdsLoading, isBookingPending]
  )

  if (isLoading) {
    return <LoadingPage />
  }

  return (
    <div className="bg-black/90">
      <main className="flex gap-20 w-full px-160 overflow-hidden p-20">
        <div className="flex-[3] min-w-0">
          {!selectedGrade ? (
            <SeatClassSeat
              seatGrade=""
              seats={[]}
              onSeatSelect={handleSeatSelect}
              selectedSeat={selectedSeat}
              eventScheduleId={eventId}
            />
          ) : selectedGrade === "VIP" ? (
            <SeatClassSeat
              seatGrade={selectedGrade}
              seats={seats || []}
              onSeatSelect={handleSeatSelect}
              selectedSeat={selectedSeat}
              eventScheduleId={eventId}
            />
          ) : selectedGrade === "B" ? (
            <SeatClassSeatB
              seats={seats || []}
              onSeatSelect={handleSeatSelect}
              selectedSeat={selectedSeat}
              eventScheduleId={eventId}
              seatGrade={selectedGrade}
            />
          ) : (
            <SeatClassSeatNormal
              seats={seats || []}
              onSeatSelect={handleSeatSelect}
              selectedSeat={selectedSeat}
              eventScheduleId={eventId}
              seatGrade={selectedGrade}
            />
          )}
        </div>

        {bookingData && (
          <div className="flex-[1]">
            <BookingSidebar
              bookingData={bookingData}
              selectedSeat={selectedSeat}
              onPayment={handlePaymentClick}
              eventScheduleId={eventId}
              onSeatGradeSelect={handleSeatGradeSelect}
              selectedGrade={selectedGrade}
            />
          </div>
        )}
      </main>
    </div>
  )
}

export default BookingPage
