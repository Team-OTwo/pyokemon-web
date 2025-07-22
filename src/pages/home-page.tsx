import { eventList, eventRank } from "@/utils/event"
import { Box } from "@mui/material"

import Dashboard from "@/components/dashboard/dashboard"
import EventPreviewCard from "@/components/event/EventPreviewCard"
import Footer from "@/components/footer"
import Carousel from "@/components/home/Carousel"

function HomePage() {
  const today = new Date()
  return (
    <div className="px-60">
      <section className="mb-24">
        <h1 className="head1 py-24">오늘 오픈 티켓</h1>
        <Carousel />
      </section>

      <section className="mb-48">
        <h1 className="head1 py-24">실시간 랭킹</h1>
        <div className="grid grid-cols-4 gap-24">
          {eventRank.map((event, i) => {
            return <EventPreviewCard key={i} rank={i + 1} event={event} />
          })}
        </div>
      </section>

      <hr />

      <section className="mb-48">
        <h1 className="head1 py-24">오픈 예정</h1>
        <div className="grid grid-cols-4 gap-24">
          {eventList.map((event, i) => {
            return <EventPreviewCard key={i} event={event} openAt={true} />
          })}
        </div>
      </section>
    </div>
  )
}

export default HomePage
