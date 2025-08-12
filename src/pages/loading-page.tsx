import React, { useEffect, useState } from "react"

import loadingBall from "../assets/images/loadingBall.svg"

const LoadingPage = () => {
  const [dots, setDots] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""))
    }, 500)
    return () => clearInterval(interval)
  }, [])
  return (
    <div className="flex justify-center items-center w-full h-560">
      <div>
        <img src={loadingBall} alt="" className="w-80 h-80 animate-spin-pause" />
        <p className="text-16-semibold mt-16 text-center">Loading{dots}</p>
      </div>
    </div>
  )
}

export default LoadingPage
