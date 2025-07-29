import React, { useEffect, useState } from "react"
import { useParams } from "react-router"

import Footer from "../../components/footer"
import Header from "../../components/header"
import { MOCK_BOOKING_DATA, MOCK_VIP_SEATS } from "../../constants/booking"
import { Booking_sidebar, Seat_class } from "../../types/booking"
import BookingSidebar from "./_component/booking_sidebar"
import SeatClassSeat from "./_component/seat_class_seat"
import SeatingChart from "./_component/seating_chart"

const BookingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [selectedGrade, setSelectedGrade] = useState<string>("")
  const [selectedSeat, setSelectedSeat] = useState<Seat_class | null>(null)
  const [bookingData, setBookingData] = useState<Booking_sidebar | null>(null)
  const [seatsData, setSeatsData] = useState<Seat_class[]>([])
  const [loading, setLoading] = useState(true)

  // API 호출 함수들
  const fetchBookingData = async (scheduleId: string) => {
    try {
      // TODO: 실제 API 호출로 교체
      // const response = await fetch(`/api/events/booking/${scheduleId}`);
      // const data = await response.json();

      // 목업 데이터 사용
      const mockData = { ...MOCK_BOOKING_DATA, eventScheduleId: parseInt(scheduleId) }
      setBookingData(mockData)
    } catch (error) {
      console.error("Failed to fetch booking data:", error)
    }
  }

  const fetchSeatsData = async (scheduleId: string, seatGrade: string) => {
    try {
      // TODO: 실제 API 호출로 교체
      // const response = await fetch(`/booking/${scheduleId}/${seatGrade}`);
      // const data = await response.json();

      // VIP 좌석 목업 데이터 사용
      setSeatsData(MOCK_VIP_SEATS)
    } catch (error) {
      console.error("Failed to fetch seats data:", error)
    }
  }

  // 컴포넌트 마운트 시 booking 데이터 로드
  useEffect(() => {
    if (id) {
      fetchBookingData(id)
      setLoading(false)
    }
  }, [id])

  // 좌석 등급 선택 시 해당 좌석 데이터 로드
  useEffect(() => {
    if (id && selectedGrade) {
      fetchSeatsData(id, selectedGrade)
    }
  }, [id, selectedGrade])

  const handleSeatGradeSelect = (grade: string) => {
    setSelectedGrade(grade)
    setSelectedSeat(null) // Reset selected seat when changing grade
  }

  const handleSeatSelect = (seat: Seat_class) => {
    setSelectedSeat(seat)
  }

  const handlePayment = () => {
    if (selectedSeat && id) {
      alert(
        `결제 진행: ${selectedSeat.seatGrade}-${selectedSeat.row}열-${selectedSeat.col} (${selectedSeat.seatId}번 좌석)`
      )
      // TODO: 실제 결제 API 호출
    }
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
