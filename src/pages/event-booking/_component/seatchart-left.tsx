import booking from "@/assets/images/booking.png"

const SeatChartLeft = () => {
  const createSeatBlock = (rows: number, cols: number, color: string) => {
    const seats = []
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        seats.push(<div key={`${i}-${j}`} className={`w-22 h-22 ${color}`} />)
      }
    }
    return seats
  }

  return (
    <div className="w-1200 flex justify-end">
      <div className="absolute right-580">
        <img src={booking} className="w-1400 h-820 scale-x-[-1]" />
      </div>
      <div className="flex ">
        <div className="relative pr-50">
          <div className="flex flex-col gap-30 mt-65">
            <div className="grid grid-cols-10 gap-5">
              {createSeatBlock(8, 10, "bg-orange-500")}{" "}
            </div>
            <div className="grid grid-cols-10 gap-5">
              {createSeatBlock(8, 10, "bg-orange-500")}{" "}
            </div>
            <div className="grid grid-cols-10 gap-5">
              {createSeatBlock(8, 10, "bg-orange-500")}{" "}
            </div>
          </div>
        </div>
        <div className="w-30 h-720 bg-gray-300 relative mt-50" />
        <div className="relative pr-50">
          <div className="flex flex-col gap-30 m-40">
            <div className="grid grid-cols-10 gap-5 mt-10">
              {createSeatBlock(6, 10, "bg-green-500")}{" "}
            </div>
            <div className="grid grid-cols-10 gap-5">{createSeatBlock(6, 10, "bg-green-500")} </div>
            <div className="grid grid-cols-10 gap-5">{createSeatBlock(6, 10, "bg-green-500")} </div>
            <div className="grid grid-cols-10 gap-5">{createSeatBlock(6, 10, "bg-green-500")} </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SeatChartLeft
