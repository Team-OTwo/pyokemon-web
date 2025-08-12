import React, { useEffect, useState } from "react"
import { useGetEventOpenTodayQuery } from "@/api/event/queries/get-event-list-query"
import { eventList } from "@/constants/event"
import ErrorPage from "@/pages/error-page"
import LoadingPage from "@/pages/loading-page"
import { Autoplay, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import CarouselCard from "../carousel-card/carousel-card"

const Carousel = () => {
  const [swiperReady, setSwiperReady] = useState(false)
  const { data: eventList, isLoading, error } = useGetEventOpenTodayQuery()

  useEffect(() => {
    setSwiperReady(true)
  }, [])

  if (isLoading) return <LoadingPage />
  if (error) return <ErrorPage />
  if (!eventList || eventList.length === 0) return <p>오늘 오픈한 이벤트가 없습니다.</p>

  return (
    <div className="">
      <Swiper
        modules={[Pagination, Autoplay]}
        loop={false}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ el: ".custom-pagination", clickable: true }}
        slidesPerView={3}
        slidesPerGroup={3}
        spaceBetween={32}
        className="pb-0"
      >
        {eventList.map((event, i) => (
          <SwiperSlide key={i}>
            <CarouselCard event={event} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="custom-pagination mt-24 flex justify-center gap-8" />
    </div>
  )
}

export default Carousel
