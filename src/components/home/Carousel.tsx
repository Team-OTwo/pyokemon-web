import React, { useEffect, useState } from "react"
import { Autoplay, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import CarouselCard from "./CarouselCard"

const Carousel = () => {
  const cards = new Array(9).fill(null) // 9개 카드

  const [swiperReady, setSwiperReady] = useState(false)

  useEffect(() => {
    setSwiperReady(true)
  }, [])

  return (
    <div className="">
      <Swiper
        modules={[Pagination, Autoplay]}
        loop={true}
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
        {cards.map((_, i) => (
          <SwiperSlide key={i}>
            <CarouselCard />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* <div className="grid grid-cols-3 gap-32 mb-36 h-full">
        <CarouselCard />
        <CarouselCard />
        <CarouselCard />
      </div> */}
      {/* 
      <div className="flex gap-8 justify-center">
        <div className="rounded-full w-10 h-10 bg-gray-300"></div>
        <div className="rounded-full w-10 h-10 bg-gray-300"></div>
        <div className="rounded-full w-10 h-10 bg-gray-300"></div>
      </div> */}

      <div className="custom-pagination mt-24 flex justify-center gap-8" />
    </div>
  )
}

export default Carousel
