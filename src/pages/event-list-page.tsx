import React from "react"
import { useGetEventListQuery } from "@/api/event/queries/get-event-list-query"
import { useSearchParams } from "react-router"

import Pagination from "@/components/ui/pagination"
import EventPreviewCard from "@/components/event-preview-card/event-preview-card"

const EventListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const typeMap: Record<string, string> = {
    concert: "콘서트",
    musical: "뮤지컬",
    classic: "클래식",
    exhibition: "행사",
    play: "연극",
    sports: "스포츠",
  }

  const type = searchParams.get("type") ?? "concert"
  const page = Number(searchParams.get("page") ?? "1")
  const genre = typeMap[type ?? ""] ?? "콘서트"
  const { data: eventList, isLoading, error } = useGetEventListQuery(genre, page)

  const goToPage = (newPage: number) => {
    setSearchParams({ type, page: newPage.toString() })
  }

  if (isLoading || !eventList) return <div>Loading...</div>
  if (error) return <p>에러 발생!</p>

  return (
    <div className="px-160 mb-48">
      <h1 className="head1 py-32 text-center">{genre} 둘러보기</h1>
      <div className="grid grid-cols-3 gap-24">
        {eventList.map((event, i) => {
          return <EventPreviewCard key={i} event={event} />
        })}
      </div>

      <div className="flex justify-center mt-12">
        <Pagination
          current={page}
          total={eventList[0]?.total ?? 0}
          pageSize={8}
          onChange={(p) => goToPage(p)}
        />
      </div>
    </div>
  )
}

export default EventListPage
