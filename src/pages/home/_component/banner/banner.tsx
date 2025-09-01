import { useState } from "react"
import type { Swiper as SwiperType } from "swiper"
import { Autoplay, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const bannerData = [
  {
    id: 1,
    image:
      "https://ticketimage.interpark.com/TCMS3.0/NMain/BbannerPC/2506/250610085920_16007528.gif",
  },
  {
    id: 2,
    image:
      "https://ticketimage.interpark.com/TCMS3.0/NMain/BbannerPC/2508/250822034813_25011387.gif",
  },
  {
    id: 3,
    image:
      "https://ticketimage.interpark.com/TCMS3.0/NMain/BbannerPC/2508/250814012045_25005777.gif",
  },
  {
    id: 4,
    image:
      "https://ticketimage.interpark.com/TCMS3.0/NMain/BbannerPC/2508/250827062818_25012012.gif",
  },
  {
    id: 5,
    image:
      "https://ticketimage.interpark.com/TCMS3.0/NMain/BbannerPC/2507/250708011516_25009843.gif",
  },
  {
    id: 6,
    image:
      "https://ticketimage.interpark.com/TCMS3.0/NMain/BbannerPC/2508/250811040307_25011651.gif",
  },
  {
    id: 7,
    image:
      "https://ticketimage.interpark.com/TCMS3.0/NMain/BbannerPC/2508/250812040611_25011068.gif",
  },
  {
    id: 8,
    image:
      "https://ticketimage.interpark.com/TCMS3.0/NMain/BbannerPC/2508/250820060700_25011816.gif",
  },
  {
    id: 9,
    image:
      "https://ticketimage.interpark.com/TCMS3.0/NMain/BbannerPC/2508/250828050802_25012652.gif",
  },
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
