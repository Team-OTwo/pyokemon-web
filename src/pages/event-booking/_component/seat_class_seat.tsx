import React, { useState } from "react"

import { Seat_class } from "../../../types/booking"

interface SeatClassSeatProps {
  seatGrade: string
  seats: Seat_class[]
  onSeatSelect: (seat: Seat_class) => void
  selectedSeat?: Seat_class | null
}

const SeatClassSeat: React.FC<SeatClassSeatProps> = ({
  seatGrade,
  seats,
  onSeatSelect,
  selectedSeat,
}) => {
  const [hoveredSeat, setHoveredSeat] = useState<Seat_class | null>(null)

  const rows = [...new Set(seats.map((seat) => seat.row))].sort()
  const cols = [...new Set(seats.map((seat) => seat.col))].sort((a, b) => parseInt(a) - parseInt(b))

  const getSeatByPosition = (row: string, col: string) => {
    return seats.find((seat) => seat.row === row && seat.col === col)
  }

  const isSeatSelected = (seat: Seat_class) => {
    return selectedSeat?.seatId === seat.seatId
  }

  const getSeatClasses = (seat: Seat_class) => {
    const baseClasses =
      "w-40 h-40 flex items-center justify-center text-xs font-bold transition-all duration-200"

    if (isSeatSelected(seat)) {
      return `${baseClasses} bg-primary border-3 border-black cursor-pointer`
    }

    if (seat.booked) {
      return `${baseClasses} bg-white border-0 text-gray-400 cursor-not-allowed`
    }

    return `${baseClasses} bg-primary border-0 cursor-pointer hover:scale-110`
  }

  return (
    <div className="flex flex-col items-center gap-30 p-30 rounded-lg min-h-[500px]">
      <h2 className="text-white text-2xl font-bold m-0">좌석 배치도 - {seatGrade}</h2>

      <div className="flex flex-col gap-15 bg-gray-500 p-10 rounded-lg">
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
              const seat = getSeatByPosition(row, col)
              if (!seat) {
                return <div key={col} className="w-10 h-10"></div>
              }

              return (
                <button
                  key={col}
                  className={getSeatClasses(seat)}
                  onClick={() => !seat.booked && onSeatSelect(seat)}
                  onMouseEnter={() => setHoveredSeat(seat)}
                  onMouseLeave={() => setHoveredSeat(null)}
                  disabled={seat.booked}
                ></button>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SeatClassSeat
