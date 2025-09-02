import { useCallback, useEffect, useMemo, useState } from "react"
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

  const renderSeatRow = (row: string, cols: string[]) => (
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
  )

  const firstHalfCols = useMemo(() => cols.slice(0, 10), [cols])
  const secondHalfCols = useMemo(() => cols.slice(10), [cols])

  return (
    <div className="flex flex-col items-center p-30 rounded-lg min-h-500 bg-white w-full h-full mr-20">
      <h2 className="text-gray-700 text-2xl font-bold m-0">좌석 배치도 - {seatGrade}</h2>

      <div className="flex flex-col pt-30 w-full justify-center">
        <div className="w-full h-100 bg-black rounded-lg flex items-center justify-center mt-50">
          <span className="text-white font-bold text-lg">STAGE</span>
        </div>
        <div className="flex items-center justify-center w-full gap-30 min-w-0">
          <div className="flex flex-col gap-5 min-w-0">
            {rows.map((row) => renderSeatRow(row, firstHalfCols))}
          </div>

          <div className="w-120 h-430 bg-black rounded-b-lg flex items-center justify-center " />

          <div className="flex flex-col gap-5 min-w-0">
            {rows.map((row) => renderSeatRow(row, secondHalfCols))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SeatClassSeat
