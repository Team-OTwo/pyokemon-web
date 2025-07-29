import React from "react"

import SeatingChart from "../../../assets/images/Seating_Chart.png"
import Button from "../../../components/ui/button"
import { Booking_sidebar, Seat_class } from "../../../types/booking"

interface BookingSidebarProps {
  bookingData: Booking_sidebar
  selectedSeat?: Seat_class | null
  onPayment: () => void
}

const BookingSidebar: React.FC<BookingSidebarProps> = ({
  bookingData,
  selectedSeat,
  onPayment,
}) => {
  const getSeatGradeColor = (grade: string) => {
    switch (grade) {
      case "VIP":
        return "bg-primary"
      case "R":
        return "bg-red-500"
      case "A":
        return "bg-green-500"
      case "B":
        return "bg-blue-500"
      default:
        return "bg-gray-600"
    }
  }

  const getSelectedSeatPrice = () => {
    if (!selectedSeat) return 0
    const gradeInfo = bookingData.remainingSeatsByGrade.find(
      (grade) => grade.seatGrade === selectedSeat.seatGrade
    )
    return gradeInfo?.price || 0
  }

  return (
    <div className="bg-white flex flex-col gap-40 p-15 bg-gray-900 rounded-lg h-fit">
      {/* Seat chart Map */}
      <div>
        <h3 className="text-black m-0 mb-4 text-base font-bold">좌석 배치도</h3>
        <div className="h-200 bg-black rounded-lg flex items-center justify-center overflow-hidden">
          <img src={SeatingChart} alt="좌석 배치도" className="opacity-60" />
        </div>
      </div>

      {/* Seat Grade Information */}
      <div>
        <h3 className="text-black m-0 mb-4 text-base font-bold border-b border-gray-300 pb-5">
          좌석 등급 / 잔여석
        </h3>
        <div className="flex flex-col gap-7 pt-5">
          {bookingData.remainingSeatsByGrade.map((grade) => (
            <div key={grade.seatGrade} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-10">
                <div className={`w-20 h-20 ${getSeatGradeColor(grade.seatGrade)}`} />
                <span className="font-bold text-black">
                  {grade.seatGrade} {grade.price.toLocaleString()}원
                </span>
              </div>
              <span className="text-gray-700">{grade.remainingSeats}석 / 120석</span>
            </div>
          ))}
        </div>
      </div>

      {/* Selection Information */}
      <div>
        <h3 className="text-black m-0 mb-4 text-base font-bold border-b border-gray-300 pb-5">
          선택
        </h3>
        <div className="pt-5 flex flex-col gap-10 p-10 bg-gray-100 rounded-md">
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-bold text-sm">좌석 등급</span>
            <span className="text-black font-bold text-sm">{selectedSeat?.seatGrade || "-"}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-bold text-sm">좌석 번호</span>
            <span className="text-black font-bold text-sm">
              {selectedSeat
                ? `${selectedSeat.seatGrade}-${selectedSeat.row}열-${selectedSeat.col.padStart(2, "0")}`
                : "-"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-bold text-sm">가격</span>
            <span className="text-black font-bold text-sm">
              {getSelectedSeatPrice().toLocaleString()}원
            </span>
          </div>
        </div>
      </div>

      {/* Payment Button */}
      <div className="mt-auto" onClick={onPayment}>
        <Button text="결제하기" border={false} />
      </div>
    </div>
  )
}

export default BookingSidebar
