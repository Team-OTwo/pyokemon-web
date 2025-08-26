import { useState } from "react"
import type { Swiper as SwiperType } from "swiper"
import { Autoplay, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import Banner1 from "@/assets/images/Banner1.png"
import Banner2 from "@/assets/images/Banner2.png"
import Banner3 from "@/assets/images/Banner3.png"
import Banner4 from "@/assets/images/Banner4.png"
import Banner5 from "@/assets/images/Banner5.png"
import Banner6 from "@/assets/images/Banner6.png"
import Banner7 from "@/assets/images/Banner7.png"
import Banner8 from "@/assets/images/Banner8.png"
import Banner9 from "@/assets/images/Banner9.png"
import Banner10 from "@/assets/images/Banner10.png"

const bannerData = [
  { id: 1, image: Banner9 },
  { id: 2, image: Banner2 },
  { id: 3, image: Banner3 },
  { id: 4, image: Banner4 },
  { id: 5, image: Banner5 },
  { id: 6, image: Banner6 },
  { id: 7, image: Banner7 },
  { id: 8, image: Banner8 },
  { id: 9, image: Banner1 },
  { id: 10, image: Banner10 },
]

const Banner = () => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const handleSlideChange = (swiper: SwiperType) => setActiveIndex(swiper.realIndex)
  const handleThumbnailClick = (index: number) => swiperInstance?.slideToLoop(index)

  return (
    <div className="w-full">
      <div className="relative w-full overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination]}
          loop={true}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          pagination={{ el: ".banner-pagination", clickable: true }}
          onSwiper={setSwiperInstance}
          onSlideChange={handleSlideChange}
          className="w-full pointer-events-none"
        >
          {bannerData.map((banner) => (
            <SwiperSlide key={banner.id}>
              <img
                src={banner.image}
                alt={`Banner ${banner.id}`}
                className="w-full h-auto object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="banner-pagination absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3" />

        <div className="absolute bottom-30 left-1/2 transform -translate-x-1/2 flex justify-center space-x-10 px-4 z-10">
          {bannerData.map((banner, index) => (
            <div
              key={banner.id}
              className={`flex-shrink-0 cursor-pointer transition-all duration-300 transform ${
                activeIndex === index ? "border-2 border-white rounded-lg" : ""
              }`}
              onClick={() => handleThumbnailClick(index)}
            >
              <img
                src={banner.image}
                alt={`Banner ${banner.id}`}
                className="w-46 h-46 object-cover rounded-lg shadow-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Banner
