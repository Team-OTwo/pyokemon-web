import React, { useState } from "react"
import { format } from "date-fns"
import { IoStar, IoStarOutline } from "react-icons/io5"
import { useParams } from "react-router"

import Button from "@/components/ui/button"
import GenreBadge from "@/components/ui/genre-badge"

import { event } from "../constants/event"

const EventDetailPage = () => {
  const { id } = useParams()
  const [isMarked, setIsMarked] = useState(true)
  const isOpen = false

  const handleMarkClick = () => {
    setIsMarked(!isMarked)
  }

  return (
    <div className="px-120 py-32 relative flex">
      <div className="w-full">
        {/* Title */}
        <div className="mb-16">
          <GenreBadge genre={event.genre} />
          <div className="flex gap-16 items-center mt-16">
            <div onClick={handleMarkClick}>
              {isMarked ? (
                <IoStar className="text-primary w-20 h-20" />
              ) : (
                <IoStarOutline className="text-gray-500 w-20 h-20" />
              )}
            </div>
            <h1 className="head2">{event.title}</h1>
          </div>
        </div>

        {/* event */}
        {/* info */}
        <div className="flex gap-24 mb-36">
          <img
            src={event.thumbnail_url}
            alt="thumbnail"
            width="320"
            height="420"
            className="rounded-lg object-cover"
          />
          <div className="flex gap-12">
            <ul className="w-90 flex flex-col gap-16">
              <li>장소</li>
              <li>일시</li>
              <li>연령</li>
              <li>등급 및 가격</li>
            </ul>

            <ul className="flex flex-col gap-16">
              <li>{event.venue_name}</li>
              <li>{format(new Date(event.start_date), "yyyy.MM.dd")}</li>
              <li>{event.age_limit}세</li>
              <li>
                <ul className="text-gray-700">
                  <li>
                    VIP <span className="font-bold text-black">198,000원</span>
                  </li>
                  <li>
                    R <span className="font-bold text-black">178,000원</span>
                  </li>
                  <li>
                    A <span className="font-bold text-black">148,000원</span>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <hr />

        <div className="h-600 py-24">{event.description}</div>
      </div>

      <div className="w-480 bg-white">
        {/* book */}
        <div className="w-320 fixed right-80 rounded-lg">
          <div className="border-1 border-primary rounded-lg text-center flex flex-col justify-center items-center bg-white py-24 w-320 h-374 mb-32">
            <h3>티켓 오픈 일정</h3>
            <h1 className="text-primary text-5xl font-bold py-32">D-10</h1>
            <p>티켓 오픈</p>
            <p className="text-gray-700">{event.ticket_open_at}</p>
          </div>
          {isOpen && <Button text="예매하기" />}
        </div>
      </div>
    </div>
  )
}

export default EventDetailPage
