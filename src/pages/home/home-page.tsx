import { useGetEventToBeOpenedQuery } from "@/api/event/queries/get-event-list-query"

import EventPreviewCard from "@/components/event-preview-card/event-preview-card"

import Carousel from "./_component/carousel"

function HomePage() {
  const { data: eventList, isLoading, error } = useGetEventToBeOpenedQuery()

  if (isLoading) return <div>Loading...</div>
  if (error) return <p>에러 발생!</p>

  return (
    <div className="px-160">
      <section className="mb-24">
        <h1 className="title-24-bold py-32">오늘 오픈 티켓</h1>
        <Carousel />
      </section>

      <section className="mb-48">
        <h1 className="title-24-bold py-32">오픈 예정</h1>
        {!eventList || eventList.length === 0 ? (
          <p>오늘 오픈 예정 이벤트가 없습니다.</p>
        ) : (
          <div className="grid grid-cols-3 gap-24">
            {eventList.map((event, i) => (
              <EventPreviewCard key={i} event={event} openAt={true} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default HomePage
