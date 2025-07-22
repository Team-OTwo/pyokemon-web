import React, { useEffect, useState } from "react"
import { eventList } from "@/utils/event"
import { Autoplay, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import CarouselCard from "./CarouselCard"

const Carousel = () => {
  const [swiperReady, setSwiperReady] = useState(false)

  useEffect(() => {
    setSwiperReady(true)
  }, [])

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
