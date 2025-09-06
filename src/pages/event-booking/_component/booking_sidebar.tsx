import { useCallback, useEffect, useState } from "react"

import { getRedisBooking } from "../../../api/booking/fetchers/get-event-booking"
import Button from "../../../components/ui/button"
import { EventBookingResponse, SelectedSeat } from "../../../types/booking"

const BookingSidebar = ({
  bookingData,
  selectedSeat,
  onPayment,
  eventScheduleId,
  onSeatGradeSelect,
  selectedGrade,
}: {
  bookingData: EventBookingResponse[]
  selectedSeat?: SelectedSeat | null
  onPayment: () => void
  eventScheduleId: number
  onSeatGradeSelect: (grade: string) => void
  selectedGrade: string
}) => {
  const [availableSeatsByGrade, setAvailableSeatsByGrade] = useState<Record<string, number>>({})

  const fetchAvailableSeats = useCallback(async () => {
    try {
      const redisData = await getRedisBooking(eventScheduleId)
      setAvailableSeatsByGrade(redisData)
    } catch (error) {
      console.error("Failed to fetch available seats:", error)
      setAvailableSeatsByGrade({})
    }
  }, [eventScheduleId])

  useEffect(() => {
    fetchAvailableSeats()
  }, [fetchAvailableSeats])

  const getSeatGradeColor = (grade: string) => {
    switch (grade) {
      case "VIP":
        return "bg-primary-dark"
      case "R":
        return "bg-primary"
      case "A":
        return "bg-primary/50"
      case "B":
        return "bg-primary/20"
      default:
        return "bg-primary"
    }
  }

  const getSelectedSeatPrice = () => {
    if (!selectedSeat) return 0
    const gradeInfo = bookingData.find((grade) => grade.seatGrade === selectedSeat.seatGrade)
    return gradeInfo?.price || 0
  }

  const getAvailableSeatsText = (grade: EventBookingResponse) => {
    const availableCount = availableSeatsByGrade[grade.seatGrade] || 0
    return `${availableCount}석 / ${grade.seatCount}석`
  }

  return (
    <div className="bg-gray-100 flex flex-col gap-30 p-15 rounded-lg h-full">
      <div>
        <h3 className="text-black m-0 mb-4 text-base font-bold">좌석 배치도</h3>
        <div className="w-full h-auto rounded-lg flex items-center justify-center overflow-hidden">
          <div className="grid grid-cols-5 grid-rows-[auto_auto_auto_auto] gap-8 max-w-full w-full relative scale-90">
            <div className="rounded-lg col-start-1 row-span-2 bg-gray-300" />

            <div
              className="bg-black col-start-2 col-span-3 row-start-1 rounded-lg flex justify-center items-center min-h-40"
              style={{ marginBottom: "-20px" }}
            >
              <span className="text-white font-bold text-xs">STAGE</span>
            </div>

            <div className="rounded-lg col-start-5 row-span-2 bg-gray-300" />

            <div
              className={`col-start-2 row-start-2 rounded-lg flex justify-center items-center h-90 bg-primary-dark mt-20 cursor-pointer ${
                selectedGrade === "VIP" ? "border-2 border-primary-dark" : "opacity-50"
              }`}
              onClick={() => onSeatGradeSelect("VIP")}
            >
              <span className="text-white font-bold text-xs">VIP</span>
            </div>
            <div className="bg-black col-start-3 row-start-2 rounded-lg flex justify-center items-center min-h-90" />
            <div
              className={`col-start-4 row-start-2 rounded-lg flex justify-center items-center h-90 bg-primary-dark mt-20 cursor-pointer ${
                selectedGrade === "VIP" ? "border-2 border-primary-dark" : "opacity-50"
              }`}
              onClick={() => onSeatGradeSelect("VIP")}
            >
              <span className="text-white font-bold text-xs">VIP</span>
            </div>

            <div
              className={`col-start-2 col-span-3 row-start-3 bg-primary rounded-lg flex justify-center items-center min-h-40 cursor-pointer ${
                selectedGrade === "R" ? "border-2 border-primary-dark" : "opacity-50"
              }`}
              onClick={() => onSeatGradeSelect("R")}
            >
              <span className="text-white font-bold text-xs">R</span>
            </div>

            <div
              className={`col-start-2 col-span-3 row-start-4 bg-primary/50 rounded-lg flex justify-center items-center min-h-40 cursor-pointer ${
                selectedGrade === "A" ? "border-2 border-primary-dark" : "opacity-50"
              }`}
              onClick={() => onSeatGradeSelect("A")}
            >
              <span className="text-white font-bold text-xs">A</span>
            </div>

            <div
              className={`col-start-1 row-start-3 row-span-2 bg-[#E3F1FF] rounded-lg flex justify-center items-center cursor-pointer ${
                selectedGrade === "B" ? "border-2 border-primary-dark" : "opacity-50"
              }`}
              style={{ marginBottom: "-20px" }}
              onClick={() => onSeatGradeSelect("B")}
            >
              <span className="text-primary-dark font-bold text-xs">B</span>
            </div>
            <div
              className={`col-start-5 row-start-3 row-span-2 bg-[#E3F1FF] rounded-lg flex justify-center items-center cursor-pointer ${
                selectedGrade === "B" ? "border-2 border-primary-dark" : "opacity-50"
              }`}
              style={{ marginBottom: "-20px" }}
              onClick={() => onSeatGradeSelect("B")}
            >
              <span className="text-primary-dark font-bold text-xs">B</span>
            </div>
            <div
              className={`col-start-1 col-span-5 bg-[#E3F1FF] rounded-lg flex justify-center items-center min-h-40 cursor-pointer ${
                selectedGrade === "B" ? "border-2 border-primary-dark" : "opacity-50"
              }`}
              onClick={() => onSeatGradeSelect("B")}
            >
              <span className="text-primary-dark font-bold text-xs">B</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-black m-0 mb-4 text-base font-bold border-b border-gray-300 pb-5">
          좌석 등급 / 잔여석
        </h3>
        <div className="flex flex-col gap-5 pt-5">
          {bookingData.map((grade) => (
            <div
              key={grade.seatGrade}
              className="flex items-center justify-between text-sm cursor-pointer hover:bg-gray-200 p-5 rounded transition-colors"
              onClick={() => onSeatGradeSelect(grade.seatGrade)}
            >
              <div className="flex items-center gap-10">
                <div className={`w-20 h-20 ${getSeatGradeColor(grade.seatGrade)}`} />
                <span className="font-bold text-black">
                  {grade.seatGrade} {grade.price.toLocaleString()}원
                </span>
              </div>
              <span className="text-gray-700">{getAvailableSeatsText(grade)}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-black m-0 mb-4 text-base font-bold border-b border-gray-300 pb-5">
          선택된 좌석
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

      <div className="mt-auto w-full">
        <Button text="결제하기" border={false} size="full" onClick={onPayment} />
      </div>
    </div>
  )
}

export default BookingSidebar
