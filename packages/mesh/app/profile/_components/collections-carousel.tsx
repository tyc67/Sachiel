import 'swiper/css'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import type { FollowingCollection } from '@/types/profile'

import CollectionsCarouselElement from './collections-carousel-element'
type CollectionsCarouselProps = {
  followingCollection: FollowingCollection
}
import { FreeMode } from 'swiper/modules'

// import Icon from '@/components/icon'

const CollectionsCarousel = ({
  followingCollection,
}: CollectionsCarouselProps) => {
  return (
    <>
      <section className="flex items-center justify-between bg-white">
        <p className="list-title px-5 pt-4 text-primary-700">精選集錦</p>
        {/* <Icon size="m" iconName="icon-chevron-left" /> */}
      </section>
      <div className="flex h-fit w-full flex-col justify-center bg-white pl-5 pt-3 sm:px-10">
        <Swiper
          spaceBetween={12}
          freeMode={true}
          slidesPerView={'auto'}
          className="flex w-full"
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
          modules={[FreeMode]}
        >
          {followingCollection?.map((data, index) => (
            <SwiperSlide key={index} className="!h-auto !w-fit">
              <CollectionsCarouselElement data={data} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  )
}

export default CollectionsCarousel
