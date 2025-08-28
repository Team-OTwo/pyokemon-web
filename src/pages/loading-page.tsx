import React, { useEffect, useState } from "react"

import loadingBall from "../assets/images/loadingBall.svg"

const LoadingPage = ({ full }: { full?: boolean }) => {
  const [dots, setDots] = useState("")

  const height = full ? "h-full" : "h-560"

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""))
    }, 500)
    return () => clearInterval(interval)
  }, [])
  return (
    <div className={`flex justify-center items-center w-full ${height}`}>
      <div>
        <img src={loadingBall} alt="" className="w-80 h-80 animate-spin-pause" />
        <p className="text-16-semibold mt-16 text-center">Loading{dots}</p>
      </div>
    </div>
  )
}

export default LoadingPage
