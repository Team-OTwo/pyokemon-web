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

  const aToFSeats = useMemo(
    () =>
      updatedSeats.filter((seat) =>
        ["A", "B", "C", "D", "E", "F", "G", "H", "I"].includes(seat.row)
      ),
    [updatedSeats]
  )

  const gToMSeats = useMemo(
    () => updatedSeats.filter((seat) => ["J", "K", "L", "M", "N", "O"].includes(seat.row)),
    [updatedSeats]
  )

  const aToFRows = useMemo(
    () => [...new Set(aToFSeats.map((seat) => seat.row))].sort(),
    [aToFSeats]
  )

  const gToMRows = useMemo(
    () => [...new Set(gToMSeats.map((seat) => seat.row))].sort(),
    [gToMSeats]
  )

  return (
    <div className="flex flex-col items-center p-30 rounded-lg min-h-500 bg-white w-full h-full">
      <h2 className="text-gray-700 text-2xl font-bold m-0">좌석 배치도 - {seatGrade}</h2>
      <div className="flex flex-col w-full justify-center gap-5 pt-50">
        {aToFRows.map((row) => {
          const rowSeats = aToFSeats
            .filter((seat) => seat.row === row)
            .sort((a, b) => parseInt(a.col) - parseInt(b.col))

          const first7Seats = rowSeats.slice(0, 7)
          const last7Seats = rowSeats.slice(-7)

          return (
            <div key={row} className="flex justify-between">
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

        {gToMRows.map((row) => {
          const rowSeats = gToMSeats
            .filter((seat) => seat.row === row)
            .sort((a, b) => parseInt(a.col) - parseInt(b.col))

          return (
            <div key={row}>
              <div className="flex gap-5">
                {rowSeats.map((seat) => (
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
      </div>
    </div>
  )
}

export default SeatClassSeatB
