const SeatingChart = ({ onSeatGradeSelect }: { onSeatGradeSelect: (grade: string) => void }) => {
  return (
    <div className="flex flex-col items-center gap-30 p-30 rounded-lg">
      <h2 className="text-white text-2xl font-bold">좌석 배치도</h2>

      <div className="grid grid-cols-5 grid-rows-[auto_auto_auto_auto] gap-15 max-w-4xl w-full relative">
        <div className="rounded-lg col-start-1 row-span-2 bg-gray-500" />

        <div
          className="bg-white col-start-2 col-span-3 row-start-1 rounded-lg flex justify-center items-center min-h-80"
          style={{ marginBottom: "-30px" }}
        >
          <span className="text-black font-bold">STAGE</span>
        </div>

        <div className="rounded-lg col-start-5 row-span-2 bg-gray-500" />

        {/* VIP 좌석 */}
        <div
          className="col-start-2 row-start-2 rounded-lg flex justify-center items-center h-190 bg-primary mt-30"
          onClick={() => onSeatGradeSelect("VIP")}
        >
          <span className="text-white font-bold">VIP</span>
        </div>
        <div className="bg-white col-start-3 row-start-2 rounded-lg flex justify-center items-center min-h-220" />
        <div className="col-start-4 row-start-2 rounded-lg flex justify-center items-center h-190 bg-primary mt-30">
          <span className="text-white font-bold">VIP</span>
        </div>

        {/* R석 */}
        <div className="col-start-2 col-span-3 row-start-3 bg-red-500 rounded-lg flex justify-center items-center min-h-90">
          <span className="text-white font-bold">R</span>
        </div>

        {/* A석 */}
        <div className="col-start-2 col-span-3 row-start-4 bg-green-500 rounded-lg flex justify-center items-center min-h-90">
          <span className="text-white font-bold">A</span>
        </div>

        {/* B석 */}
        <div
          className="col-start-1 row-start-3 row-span-2 bg-blue-400 rounded-lg flex justify-center items-center"
          style={{ marginBottom: "-30px" }}
        >
          <span className="text-white font-bold">B</span>
        </div>
        <div className="col-start-1 col-span-5 bg-blue-400 rounded-lg flex justify-center items-center min-h-100">
          <span className="text-white font-bold">B</span>
        </div>
        <div
          className="col-start-5 row-start-3 row-span-2 bg-blue-400 rounded-lg flex justify-center items-center"
          style={{ marginBottom: "-30px" }}
        >
          <span className="text-white font-bold">B</span>
        </div>
      </div>
    </div>
  )
}

export default SeatingChart
