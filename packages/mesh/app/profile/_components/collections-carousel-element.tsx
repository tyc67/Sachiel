import Link from 'next/link'
import React from 'react'

import ImageWithFallback from '@/app/_components/image-with-fallback'
import Icon from '@/components/icon'
import { ImageCategory } from '@/constants/fallback-src'
import type { FollowingCollection } from '@/types/profile'

type CollectionsCarouselElementProps = {
  data: NonNullable<FollowingCollection>[0]
}

const CollectionsCarouselElement = ({
  data,
}: CollectionsCarouselElementProps) => {
  const { heroImage, title, creator, picksCount, id } = data
  return (
    <Link href={`/collection/${id}`}>
      <div className="flex h-full w-[150px] flex-col rounded border bg-white md:w-full">
        <div className="relative aspect-[2] w-full">
          <ImageWithFallback
            alt={`${title}'s cover image`}
            fallbackCategory={ImageCategory.STORY}
            src={heroImage?.urlOriginal ?? ''}
            className="inset-0 size-full rounded-t"
            fill
          />
          <div className="absolute right-[6px] top-2 flex items-center rounded-md bg-black/50 px-[6px] py-[2.5px]">
            <Icon iconName="icon-collection-folder" size="xs" />
            <span className="caption-2 text-white">集錦</span>
          </div>
        </div>
        <section className="flex h-auto grow flex-col px-3 py-2">
          <div className="h-full flex-col justify-between">
            <p className="caption-1 text-primary-500">@{creator?.customId}</p>
            <p className="subtitle-2 pb-3 text-primary-700">{title}</p>
          </div>
          <p className="footnote pb-2 text-primary-600">
            <span className="font-medium text-primary-700">{picksCount}</span>
            精選
          </p>
        </section>
      </div>
    </Link>
  )
}

export default CollectionsCarouselElement
