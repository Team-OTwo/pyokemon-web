import React, { useState } from "react"
import { useParams } from "react-router"

import GenreBadge from "@/components/common/GenreBadge"

import { event } from "../utils/event"

const EventDetailPage = () => {
  const { id } = useParams()

  return (
    <div className="px-60 py-32">
      {/* Title */}
      <div className="mb-16">
        <GenreBadge genre={event.genre} />
        <div className="flex gap-16 items-center mt-16">
          <span className="text-gray-500">☆</span>
          <h1 className="head2">{event.title}</h1>
        </div>
      </div>

      {/* event */}
      <div className="flex mb-24">
        {/* info */}
        <div className="flex gap-24">
          <img
            src={event.thumbnail_url}
            alt="thumbnail"
            width="320"
            height="420"
            className="rounded-lg object-cover"
          />
          <div className="flex gap-12">
            <ul className="w-90">
              <li>장소</li>
              <li>기간</li>
              <li>연령</li>
              <li>등급 및 가격</li>
            </ul>

            <ul>
              <li>{event.venue_name}</li>
              <li>
                {event.start_date} - {event.end_date}
              </li>
              <li>{event.age_limit}</li>
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

        {/* book */}
        <div></div>
      </div>
      <hr />
    </div>
  )
}

export default EventDetailPage
