import React, { useState } from "react"
import { useGetEventListQuery } from "@/api/event/queries/get-event-list-query"
import { GENRE_LIST, GENRE_MAP } from "@/constants/genre"
import { useSearchParams } from "react-router"

import GenreBadge from "@/components/ui/genre-badge"
import Pagination from "@/components/ui/pagination"
import EventPreviewCard from "@/components/event-preview-card/event-preview-card"

import LoadingPage from "./loading-page"

const EventListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const type = searchParams.get("type") ?? ""
  const page = Number(searchParams.get("page") ?? "1")
  const genre = GENRE_MAP[type] ?? ""

  const { data: eventList, isLoading, error } = useGetEventListQuery(genre, page)

  const handlePageChange = (newPage: number) => {
    setSearchParams({ type, page: newPage.toString() })
  }

  const handleGenreClick = (newType: string) => {
    const currentType = searchParams.get("type") ?? ""
    const nextParams = new URLSearchParams(searchParams)

    if (newType === "") {
      nextParams.delete("type")
    } else if (newType === currentType) {
      nextParams.delete("type")
    } else {
      nextParams.set("type", newType)
    }

    // 장르 바뀌면 페이지도 초기화
    nextParams.delete("page")

    setSearchParams(nextParams)
  }

  if (isLoading || !eventList) return <LoadingPage />
  if (error) return <p>에러 발생!</p>

  return (
    <div className="px-160 mb-48">
      <h1 className="title-24-bold pt-48">공연 둘러보기</h1>

      {/* filtering */}
      <ul className="flex gap-12 py-24 flex-wrap">
        {GENRE_LIST.map((genre) => {
          const isActive = type === genre.type
          return (
            <li key={genre.title} onClick={() => handleGenreClick(genre.type)}>
              <GenreBadge genre={genre.title} gray={!isActive} />
            </li>
          )
        })}
      </ul>

      {/* event */}
      <div className="grid grid-cols-3 gap-24">
        {eventList.map((event, i) => {
          return <EventPreviewCard key={i} event={event} />
        })}
      </div>

      <div className="flex justify-center mt-12">
        <Pagination
          current={page}
          total={eventList[0]?.total ?? 0}
          pageSize={9}
          onChange={(p) => handlePageChange(p)}
        />
      </div>
    </div>
  )
}

export default EventListPage
