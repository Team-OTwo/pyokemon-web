const SeatChartMain = () => {
  const createSeatBlock = (rows: number, cols: number) => {
    const seats = []
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        seats.push(<div key={`${i}-${j}`} className="w-22 h-22 bg-purple-500" />)
      }
    }
    return seats
  }

  return (
    <div className="w-1200 flex-col items-center p-20 bg-white rounded-lg left-160">
      <div className="flex flex-col items-center gap-8 relative">
        <div className="w-600 h-110 bg-black flex items-center justify-center">
          <span className="text-white font-bold text-lg">STAGE</span>
        </div>
        <div className="absolute top-110 left-1/2 transform -translate-x-1/2 w-110 h-330 bg-black" />
        <div className="absolute top-440 left-1/2 transform -translate-x-1/2 w-250 h-110 bg-black" />
      </div>

      <div className="flex flex-col items-center gap-8 relative">
        <div className="flex gap-12">
          <div className="grid grid-cols-10 gap-5 mr-140 mt-20">{createSeatBlock(10, 11)}</div>

          <div className="grid grid-cols-10 gap-5 mt-20">{createSeatBlock(10, 11)}</div>
        </div>

        <div className="grid grid-cols-15 gap-5 mt-140">{createSeatBlock(20, 6)}</div>
      </div>
    </div>
  )
}

export default SeatChartMain
