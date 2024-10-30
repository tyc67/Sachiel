import 'swiper/css'

import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import type { FollowingCollection } from '@/types/profile'

import CollectionsCarouselElement from './collections-carousel-element'
type CollectionsCarouselProps = {
  followingCollection: FollowingCollection
}
import { FreeMode } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper/types'

import Icon from '@/components/icon'
import useWindowDimensions from '@/hooks/use-window-dimension'

const CollectionsCarousel = ({
  followingCollection,
}: CollectionsCarouselProps) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null)
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)
  const { width: screenWidth } = useWindowDimensions()
  console.log({ screenWidth }, screenWidth >= 960)
  const updateNavigationState = () => {
    if (swiperInstance) {
      setIsBeginning(swiperInstance.isBeginning)
      setIsEnd(swiperInstance.isEnd)
    }
  }
  return (
    <>
      <section className="flex items-center justify-between bg-white md:bg-primary-700-dark md:p-10 md:pb-1">
        <p className="list-title px-5 pt-4 text-primary-700 md:p-0">精選集錦</p>
        <div className="hidden items-center md:flex md:gap-1">
          <button onClick={() => swiperInstance?.slidePrev()}>
            <Icon
              size="xl"
              iconName={
                isBeginning ? 'icon-chevron-left-disable' : 'icon-chevron-left'
              }
            />
          </button>
          <button onClick={() => swiperInstance?.slideNext()}>
            <Icon
              size="xl"
              iconName={
                isEnd ? 'icon-chevron-right-disable' : 'icon-chevron-right'
              }
            />
          </button>
        </div>
      </section>
      <div className="flex h-fit w-full flex-col justify-center bg-white pl-5 pt-3 sm:px-10 md:bg-primary-700-dark">
        <Swiper
          spaceBetween={20}
          slidesPerView="auto"
          className="flex w-full md:!pb-4"
          onSlideChange={() => updateNavigationState()}
          onSwiper={(swiper) => {
            setSwiperInstance(swiper)
            updateNavigationState()
          }}
          onReachBeginning={() => setIsBeginning(true)}
          onReachEnd={() => setIsEnd(true)}
          modules={[FreeMode]}
          breakpoints={{
            // Mobile and tablet
            0: {
              slidesPerView: 'auto',
              spaceBetween: 12,
              freeMode: true,
            },
            // Desktop
            960: {
              slidesPerView: 4,
              spaceBetween: 20,
              freeMode: false,
              slidesPerGroup: 4,
            },
          }}
        >
          {followingCollection?.map((data, index) => (
            <SwiperSlide
              key={index}
              className="!h-auto !w-auto md:!w-[23%] md:!max-w-[150px] md:drop-shadow lg:!w-1/5 lg:!max-w-[164px]" // This is important for proper sizing
            >
              <CollectionsCarouselElement data={data} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  )
}

export default CollectionsCarousel
