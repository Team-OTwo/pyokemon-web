import { useCallback, useEffect, useMemo, useState } from "react"

import { getRedisBookingBySeatClass } from "../../../api/booking/fetchers/get-event-booking"
import { SelectedSeat } from "../../../types/booking"

interface SeatClassSeatNormalProps {
  seats: SelectedSeat[]
  onSeatSelect: (seat: SelectedSeat) => void
  selectedSeat?: SelectedSeat | null
  eventScheduleId: number
  seatGrade: string
}

const SeatClassSeatNormal = ({
  seats,
  onSeatSelect,
  selectedSeat,
  eventScheduleId,
  seatGrade,
}: SeatClassSeatNormalProps) => {
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

  const rows = useMemo(
    () => [...new Set(updatedSeats.map((seat) => seat.row))].sort(),
    [updatedSeats]
  )

  const cols = useMemo(
    () =>
      [...new Set(updatedSeats.map((seat) => seat.col))].sort((a, b) => parseInt(a) - parseInt(b)),
    [updatedSeats]
  )

  const seatMap = useMemo(() => {
    const map = new Map<string, SelectedSeat>()
    updatedSeats.forEach((seat) => {
      map.set(`${seat.row}-${seat.col}`, seat)
    })
    return map
  }, [updatedSeats])

  const getSeatClasses = useCallback(
    (seat: SelectedSeat) => {
      const baseClasses =
        "w-30 h-30 flex items-center justify-center text-xs font-bold transition-all duration-200"

      if (seat.isBooked) {
        return `${baseClasses} bg-white border border-gray-400 cursor-not-allowed`
      }

      if (selectedSeat?.seatId === seat.seatId) {
        return `${baseClasses} bg-primary border-2 border-black cursor-pointer`
      }

      return `${baseClasses} bg-primary border-0 cursor-pointer hover:scale-110`
    },
    [selectedSeat?.seatId]
  )

  const handleSeatClick = useCallback(
    (seat: SelectedSeat) => {
      if (!seat.isBooked) {
        onSeatSelect(seat)
      }
    },
    [onSeatSelect]
  )

  return (
    <div className="flex flex-col items-center p-30 rounded-lg min-h-500 bg-white w-full h-full overflow-hidden">
      <h2 className="text-gray-700 text-2xl font-bold m-0">좌석 배치도 - {seatGrade}</h2>
      <div className="flex flex-col gap-5 pt-6 w-full max-w-full pt-50">
        {rows.map((row) => (
          <div key={row} className="flex gap-5 w-full justify-center">
            {cols.map((col) => {
              const seat = seatMap.get(`${row}-${col}`)
              if (!seat) return null

              return (
                <button
                  key={col}
                  className={getSeatClasses(seat)}
                  onClick={() => handleSeatClick(seat)}
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

export default SeatClassSeatNormal
