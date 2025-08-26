import React from "react"
import { useGetSavedEventQuery } from "@/api/event/queries/use-get-saved-event-query"
import { IoBookmarkOutline } from "react-icons/io5"
import { useNavigate, useSearchParams } from "react-router"

import { EventType } from "@/types/event"
import Button from "@/components/ui/button"
import Pagination from "@/components/ui/pagination"
import EventPreviewCard from "@/components/event-preview-card"

import ErrorPage from "../error-page"
import LoadingPage from "../loading-page"

const SavedEventPage = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Number(searchParams.get("page") ?? "1")

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() })
  }

  const { data, isLoading, error } = useGetSavedEventQuery(page)

  if (isLoading) {
    return <LoadingPage />
  }

  if (error) {
    return <ErrorPage />
  }

  return (
    <div className="px-160 mb-48">
      <h1 className="title-24-bold pt-48 flex items-center gap-12">
        <IoBookmarkOutline className="text-black" />
        관심 공연
      </h1>

      {!data || data.length === 0 ? (
        <div>
          <p className="text-center py-120 text-gray-500">관심 공연이 없습니다.</p>
          <div className="w-full flex justify-center items-center">
            <Button
              text="공연 둘러보기"
              border
              borderColor="primary"
              bgColor="white"
              color="primary"
              onClick={() => navigate("/event")}
            />
          </div>
        </div>
      ) : (
        <>
          <div>
            <div className="grid grid-cols-3 gap-24 py-32">
              {data.map((event: EventType, i: number) => {
                return <EventPreviewCard key={i} event={event} />
              })}
            </div>
          </div>

          <div className="flex justify-center mt-12">
            <Pagination
              current={page}
              total={data[0]?.total ?? 0}
              pageSize={9}
              onChange={(p) => handlePageChange(p)}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default SavedEventPage
