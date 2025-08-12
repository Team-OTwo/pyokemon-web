import React from "react"
import { useNavigate } from "react-router"

import Button from "@/components/ui/button"

import errorBall from "../assets/images/errorBall.svg"
import errorTitle from "../assets/images/errorTitle.svg"

const ErrorPage = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col justify-center items-center w-full h-560 gap-18">
      <img src={errorBall} alt="ball" className="w-80 h-80 mb-16 animate-bounce" />
      <img src={errorTitle} alt="title" />
      <p className="mb-36">앗! 문제가 발생했어요</p>

      <div className="flex gap-24">
        <Button
          text="이전 페이지"
          small
          border
          bgColor="white"
          borderColor="black"
          color="black"
          onClick={() => navigate(-1)}
        />
        <Button text="메인으로" small bgColor="black" onClick={() => navigate("/")} />
      </div>
    </div>
  )
}

export default ErrorPage
