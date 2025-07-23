import React from "react"
import { eventList } from "@/constants/event"
import { useSearchParams } from "react-router"

import EventPreviewCard from "@/components/event-preview-card/event-preview-card"

const EventListPage = () => {
  const [searchParams] = useSearchParams()

  const typeMap: Record<string, string> = {
    concert: "콘서트",
    musical: "뮤지컬",
    classic: "클래식",
    exhibition: "행사",
    play: "연극",
    sports: "스포츠",
  }

  const type = searchParams.get("type")
  const typeName = typeMap[type ?? ""] ?? ""

  return (
    <div className="px-60 mb-48">
      <h1 className="head1 py-32 text-center">{typeName} 둘러보기</h1>
      <div className="grid grid-cols-4 gap-24">
        {eventList.map((event, i) => {
          return <EventPreviewCard key={i} event={event} openAt={true} />
        })}
      </div>
    </div>
  )
}

export default EventListPage
