import SeatingChart from "../../../assets/images/Seating_Chart.png"
import Button from "../../../components/ui/button"
import { EventBookingResponse, SelectedSeat } from "../../../types/booking"

const BookingSidebar = ({
  bookingData,
  selectedSeat,
  onPayment,
}: {
  bookingData: EventBookingResponse[]
  selectedSeat?: SelectedSeat | null
  onPayment: () => void
}) => {
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

  return (
    <div className="bg-gray-100 flex flex-col gap-40 p-15 rounded-lg h-fit">
      <div>
        <h3 className="text-black m-0 mb-4 text-base font-bold">좌석 배치도</h3>
        <div className="w-full h-auto rounded-lg flex items-center justify-center overflow-hidden">
          <img src={SeatingChart} alt="좌석 배치도" className="opacity-60" />
        </div>
      </div>

      <div>
        <h3 className="text-black m-0 mb-4 text-base font-bold border-b border-gray-300 pb-5">
          좌석 등급 / 잔여석
        </h3>
        <div className="flex flex-col gap-7 pt-5">
          {bookingData.map((grade) => (
            <div key={grade.seatGrade} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-10">
                <div className={`w-20 h-20 ${getSeatGradeColor(grade.seatGrade)}`} />
                <span className="font-bold text-black">
                  {grade.seatGrade} {grade.price.toLocaleString()}원
                </span>
              </div>
              <span className="text-gray-700">N석 / {grade.seatCount}석</span>
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

      <div className="mt-auto" onClick={onPayment}>
        <Button text="결제하기" border={false} />
      </div>
    </div>
  )
}

export default BookingSidebar
