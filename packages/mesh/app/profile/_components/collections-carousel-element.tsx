import React from 'react'

import ImageWithFallback from '@/app/_components/image-with-fallback'
import { ImageCategory } from '@/constants/fallback-src'
import type { FollowingCollection } from '@/types/profile'

type CollectionsCarouselElementProps = {
  data: NonNullable<FollowingCollection>[0]
}

const CollectionsCarouselElement = ({
  data,
}: CollectionsCarouselElementProps) => {
  const { heroImage, title, creator, picksCount } = data
  return (
    <div className="flex h-full w-[150px] flex-col rounded border bg-white md:w-full">
      <div className="relative aspect-[2] w-full">
        <ImageWithFallback
          alt={`${title}'s cover image`}
          fallbackCategory={ImageCategory.STORY}
          src={heroImage?.urlOriginal ?? ''}
          className="inset-0 size-full rounded-t"
          fill
        />
      </div>
      <section className="flex h-auto grow flex-col px-3 py-2">
        <div className="h-full flex-col justify-between">
          <p className="caption-1 text-primary-500">@{creator?.customId}</p>
          <p className="subtitle-2 pb-3 text-primary-700">{title}</p>
        </div>
        <p className="footnote pb-2 text-primary-600">
          <span className="font-medium text-primary-700">{picksCount}</span>精選
        </p>
      </section>
    </div>
  )
}

export default CollectionsCarouselElement
