import { useCallback, useEffect, useMemo, useState } from "react"

import { getRedisBookingBySeatClass } from "../../../api/booking/fetchers/get-event-booking"
import { SelectedSeat } from "../../../types/booking"

interface SeatClassSeatBProps {
  seats: SelectedSeat[]
  onSeatSelect: (seat: SelectedSeat) => void
  selectedSeat?: SelectedSeat | null
  eventScheduleId: number
  seatGrade: string
}

const SeatClassSeatB = ({
  seats,
  onSeatSelect,
  selectedSeat,
  eventScheduleId,
  seatGrade,
}: SeatClassSeatBProps) => {
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

  const allRows = useMemo(
    () => [...new Set(updatedSeats.map((seat) => seat.row))].sort(),
    [updatedSeats]
  )

  const aToIRows = useMemo(
    () => allRows.filter((row) => ["A", "B", "C", "D", "E", "F", "G", "H", "I"].includes(row)),
    [allRows]
  )

  const jToORows = useMemo(
    () => allRows.filter((row) => ["J", "K", "L", "M", "N", "O"].includes(row)),
    [allRows]
  )

  const maxCols = useMemo(() => {
    return Math.max(...updatedSeats.map((seat) => parseInt(seat.col)))
  }, [updatedSeats])

  const getSeatForPosition = useCallback(
    (row: string, col: number) => {
      return updatedSeats.find((seat) => seat.row === row && parseInt(seat.col) === col)
    },
    [updatedSeats]
  )

  return (
    <div className="flex flex-col items-center p-30 rounded-lg min-h-500 bg-white w-full h-full overflow-hidden">
      <h2 className="text-gray-700 text-2xl font-bold m-0">좌석 배치도 - {seatGrade}</h2>
      <div className="flex flex-col gap-5 pt-50 w-full overflow-x-auto">
        {aToIRows.map((row) => {
          const rowSeats = updatedSeats
            .filter((seat) => seat.row === row)
            .sort((a, b) => parseInt(a.col) - parseInt(b.col))

          const first7Seats = rowSeats.slice(0, 7)
          const last7Seats = rowSeats.slice(-7)

          return (
            <div key={row} className="flex gap-5 justify-center min-w-max">
              <div className="flex gap-5">
                {first7Seats.map((seat) => (
                  <button
                    key={`${seat.row}-${seat.col}`}
                    className={getSeatClasses(seat)}
                    onClick={() => handleSeatClick(seat)}
                    disabled={seat.isBooked}
                  />
                ))}
              </div>

              <div className="flex gap-5">
                {Array.from({ length: 12 }, (_, index) => (
                  <div key={`empty-${row}-${index}`} className="w-30 h-30 bg-white" />
                ))}
              </div>

              <div className="flex gap-5">
                {last7Seats.map((seat) => (
                  <button
                    key={`${seat.row}-${seat.col}`}
                    className={getSeatClasses(seat)}
                    onClick={() => handleSeatClick(seat)}
                    disabled={seat.isBooked}
                  />
                ))}
              </div>
            </div>
          )
        })}

        {jToORows.map((row) => {
          const rowSeats = updatedSeats
            .filter((seat) => seat.row === row)
            .sort((a, b) => parseInt(a.col) - parseInt(b.col))

          return (
            <div key={row} className="flex gap-5 justify-center min-w-max">
              {rowSeats.map((seat) => (
                <button
                  key={`${seat.row}-${seat.col}`}
                  className={getSeatClasses(seat)}
                  onClick={() => handleSeatClick(seat)}
                  disabled={seat.isBooked}
                />
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SeatClassSeatB
