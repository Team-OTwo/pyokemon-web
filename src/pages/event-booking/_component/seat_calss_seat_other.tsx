import { useCallback, useEffect, useMemo, useState } from "react"
import { IoArrowBack } from "react-icons/io5"

import { getRedisBookingBySeatClass } from "../../../api/booking/fetchers/get-event-booking"
import { SelectedSeat } from "../../../types/booking"

const SeatClassSeatOther = ({
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
        return `${baseClasses} bg-white border-1 border-gray-500 cursor-not-allowed`
      }

      if (selectedSeat?.seatId === seat.seatId) {
        return `${baseClasses} bg-primary border-3 border-black cursor-pointer`
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

  const renderBSeats = useCallback(() => {
    if (seatGrade !== "B") return null

    const aToFSeats = updatedSeats.filter((seat) =>
      ["A", "B", "C", "D", "E", "F", "G", "H", "I"].includes(seat.row)
    )
    const gToMSeats = updatedSeats.filter((seat) =>
      ["J", "K", "L", "M", "N", "O"].includes(seat.row)
    )

    const aToFRows = [...new Set(aToFSeats.map((seat) => seat.row))].sort()
    const gToMRows = [...new Set(gToMSeats.map((seat) => seat.row))].sort()

    return (
      <div className="flex flex-col gap-10 pt-40">
        <div className="flex flex-col gap-10">
          {aToFRows.map((row) => {
            const rowSeats = aToFSeats
              .filter((seat) => seat.row === row)
              .sort((a, b) => parseInt(a.col) - parseInt(b.col))

            const first7Seats = rowSeats.slice(0, 7)
            const last7Seats = rowSeats.slice(-7)

            return (
              <div key={row} className="flex gap-10 items-center">
                {first7Seats.map((seat) => (
                  <button
                    key={`${seat.row}-${seat.col}`}
                    className={getSeatClasses(seat)}
                    onClick={() => handleSeatClick(seat)}
                    disabled={seat.isBooked}
                  />
                ))}
                <div className="w-470" />
                {last7Seats.map((seat) => (
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

        <div className="flex flex-col gap-10">
          {gToMRows.map((row) => {
            const rowSeats = gToMSeats
              .filter((seat) => seat.row === row)
              .sort((a, b) => parseInt(a.col) - parseInt(b.col))

            return (
              <div key={row} className="flex gap-10 items-center">
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
  }, [seatGrade, updatedSeats, getSeatClasses, handleSeatClick])

  const renderNormalSeats = useCallback(() => {
    if (seatGrade === "B") return null

    return (
      <div className="flex flex-col gap-10 mt-30">
        {rows.map((row) => (
          <div key={row} className="flex gap-10 items-center">
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
    )
  }, [seatGrade, rows, cols, seatMap, getSeatClasses, handleSeatClick])

  return (
    <div className="flex flex-col items-center p-30 rounded-lg min-h-500 bg-white h-full mr-20">
      <h2 className="text-gray-700 text-2xl font-bold m-0">좌석 배치도 - {seatGrade}</h2>
      {renderBSeats()}
      {renderNormalSeats()}
    </div>
  )
}

export default SeatClassSeatOther
