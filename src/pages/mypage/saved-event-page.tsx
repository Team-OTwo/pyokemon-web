import React from "react"
import { useGetSavedEventQuery } from "@/api/event/queries/use-get-saved-event-query"

import { EventType } from "@/types/event"
import Pagination from "@/components/ui/pagination"
import EventPreviewCard from "@/components/event-preview-card"

const SavedEventPage = () => {
  const { data, isLoading } = useGetSavedEventQuery()
  if (isLoading) {
    return <div>loading...</div>
  }
  return (
    <div className="px-160 mb-48">
      <h1 className="title-24-bold pt-48">내 관심 공연</h1>
      <div>
        <div className="grid grid-cols-3 gap-24 py-32">
          {data.map((event: EventType, i: number) => {
            return <EventPreviewCard key={i} event={event} />
          })}
        </div>
      </div>

      {/* <Pagination
        current={page}
        total={eventList[0]?.total ?? 0}
        pageSize={9}
        onChange={(p) => handlePageChange(p)}
      /> */}
    </div>
  )
}

export default SavedEventPage
