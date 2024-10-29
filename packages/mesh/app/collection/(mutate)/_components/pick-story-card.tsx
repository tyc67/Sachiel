import { forwardRef } from 'react'

import ImageWithFallback from '@/app/_components/image-with-fallback'
import Icon from '@/components/icon'
import { ImageCategory } from '@/constants/fallback-src'
import { displayTimeFromNow } from '@/utils/story-display'

import type { CollectionPickStory } from '../_types/edit-collection'

export default forwardRef(function PickStoryCard(
  {
    isPicked,
    story,
    onClick,
  }: {
    isPicked: boolean
    story: CollectionPickStory
    onClick: () => void
  },
  ref
) {
  return (
    <div
      className="flex w-full cursor-pointer gap-2 pt-5"
      onClick={onClick}
      ref={ref as React.RefObject<HTMLDivElement>}
    >
      <div className="flex size-12 items-center justify-center sm:h-14">
        {isPicked ? (
          <Icon iconName="icon-checkbox-on" size="l" />
        ) : (
          <Icon iconName="icon-checkbox-off" size="l" />
        )}
      </div>
      <div className="flex grow flex-col gap-2 border-b pb-4 sm:pb-5">
        <div className="flex justify-between gap-3">
          <div className="flex flex-col gap-1">
            <div className="subtitle-1 sm:title-2 line-clamp-2 text-primary-700">
              {story?.title ?? ''}
            </div>
            <div className="caption-1 hidden gap-1 text-primary-500 sm:flex">
              {story?.source?.title ? (
                <>
                  <span>{story?.source?.title ?? ''}</span>
                  <Icon iconName="icon-dot" size="s" />
                </>
              ) : null}
              <span>
                {story?.published_date &&
                  displayTimeFromNow(story.published_date)}
              </span>
            </div>
          </div>
          <div className="relative aspect-[2/1] w-24 shrink-0 overflow-hidden rounded-[4px] sm:w-[160px]">
            <ImageWithFallback
              src={story?.og_image ?? ''}
              fallbackCategory={ImageCategory.STORY}
              alt={story?.title ?? ''}
              fill
              style={{
                objectFit: 'cover',
              }}
            />
          </div>
        </div>
        <div className="caption-1 flex gap-1 text-primary-500 sm:hidden">
          {story?.source?.title ? (
            <>
              <span>{story?.source?.title ?? ''}</span>
              <Icon iconName="icon-dot" size="s" />
            </>
          ) : null}
          <span>
            {story?.published_date && displayTimeFromNow(story.published_date)}
          </span>
        </div>
      </div>
    </div>
  )
})
