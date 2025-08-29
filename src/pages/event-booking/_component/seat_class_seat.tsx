import { useEffect, useState } from "react"
import { IoArrowBack } from "react-icons/io5"

import { getRedisBookingBySeatClass } from "../../../api/booking/fetchers/get-event-booking"
import { SelectedSeat } from "../../../types/booking"

const SeatClassSeat = ({
  seatGrade,
  seats,
  onSeatSelect,
  selectedSeat,
  eventScheduleId,
  onBackToSeatingChart,
}: {
  seatGrade: string
  seats: SelectedSeat[]
  onSeatSelect: (seat: SelectedSeat) => void
  selectedSeat?: SelectedSeat | null
  eventScheduleId: number
  onBackToSeatingChart: () => void
}) => {
  const [updatedSeats, setUpdatedSeats] = useState<SelectedSeat[]>(seats)

  useEffect(() => {
    const fetchSeatStatus = async () => {
      try {
        const redisData = await getRedisBookingBySeatClass(eventScheduleId, seatGrade)
        const updatedSeatsData = seats.map((seat) => ({
          ...seat,
          isBooked: redisData[seat.seatId.toString()] !== "",
        }))

        setUpdatedSeats(updatedSeatsData)
      } catch (error) {
        console.error("Failed to fetch seat status:", error)
        setUpdatedSeats(seats)
      }
    }

    fetchSeatStatus()
  }, [eventScheduleId, seats, seatGrade])

  const rows = [...new Set(updatedSeats.map((seat) => seat.row))].sort()
  const cols = [...new Set(updatedSeats.map((seat) => seat.col))].sort(
    (a, b) => parseInt(a) - parseInt(b)
  )
  const seatMap = new Map<string, SelectedSeat>()
  updatedSeats.forEach((seat) => {
    seatMap.set(`${seat.row}-${seat.col}`, seat)
  })

  const getSeatClasses = (seat: SelectedSeat) => {
    const baseClasses =
      "w-40 h-40 flex items-center justify-center text-xs font-bold transition-all duration-200"

    if (seat.isBooked) {
      return `${baseClasses} bg-white border-0 cursor-not-allowed`
    }

    if (selectedSeat?.seatId === seat.seatId) {
      return `${baseClasses} bg-primary border-3 border-black cursor-pointer`
    }

    return `${baseClasses} bg-primary border-0 cursor-pointer hover:scale-110`
  }

  return (
    <div className="flex flex-col items-center gap-30 p-30 rounded-lg min-h-500">
      <div className="flex items-center justify-center gap-20 w-full relative">
        <button
          onClick={onBackToSeatingChart}
          className="absolute left-0 flex items-center justify-center w-32 h-32 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <IoArrowBack size={20} />
        </button>
        <h2 className="text-gray-700 text-2xl font-bold m-0">좌석 배치도 - {seatGrade}</h2>
      </div>

      <div className="flex flex-col gap-15 bg-gray-500 p-50 pl-10 pt-20 rounded-lg">
        <div className="flex gap-20 mb-1 items-center">
          <div className="w-40 h-8"></div>
          {cols.map((col) => (
            <div
              key={col}
              className="w-40 h-20 flex items-center justify-center text-white text-xs font-bold"
            >
              {col.padStart(2, "0")}
            </div>
          ))}
        </div>

        {rows.map((row) => (
          <div key={row} className="flex gap-20 items-center">
            <div className="w-40 h-40 flex items-center justify-center text-white text-sm font-bold mr-1">
              {row}
            </div>
            {cols.map((col) => {
              const seat = seatMap.get(`${row}-${col}`)
              if (!seat) {
                return <div key={col} className="w-10 h-10" />
              }
              return (
                <button
                  key={col}
                  className={getSeatClasses(seat)}
                  onClick={() => !seat.isBooked && onSeatSelect(seat)}
                  disabled={seat.isBooked}
                />
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SeatClassSeat
