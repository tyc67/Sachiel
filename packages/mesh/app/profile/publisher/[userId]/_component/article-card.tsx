import Image from 'next/image'

import Icon from '@/components/icon'
import StoryMeta from '@/components/story-card/story-meta'
import StoryPickButton from '@/components/story-card/story-pick-button'
import StoryPickInfo from '@/components/story-card/story-pick-info'
import { type GetMemberProfileQuery } from '@/graphql/__generated__/graphql'

type Member = GetMemberProfileQuery['member']
type PickList = NonNullable<Member>['picks']
export type StoryItem = NonNullable<PickList>[number]['story']
type ArticleCardProps = {
  data: NonNullable<StoryItem>
  isLast: boolean
}

const ArticleCard = ({ data, isLast }: ArticleCardProps) => {
  return (
    <>
      <section className="hidden md:block md:aspect-[2/1] md:w-full md:overflow-hidden md:rounded-t-md">
        <Image
          src={data.og_image || '/images/default-story-image.webP'}
          alt={`${data.title}'s story conver image`}
          width={96}
          height={48}
          className="h-full w-full object-cover"
        />
      </section>
      <div
        className={`flex flex-col p-5 after:absolute after:bottom-1 after:h-[1px] after:w-[calc(100%-40px)] after:bg-[rgba(0,0,0,0.1)] md:line-clamp-3 md:pt-[12px] md:after:hidden ${
          isLast && 'after:hidden'
        }`}
      >
        <section className="mb-1 flex items-center justify-between">
          <p className="caption-1 leading-[18px] text-primary-500">
            {(data.source && data.source.title) ?? ''}
          </p>
          <Icon iconName="icon-more-horiz" size="l" />
        </section>
        <section className="mb-2 flex items-start justify-between sm:gap-10">
          <div className="flex h-full flex-col justify-between">
            <p className="body-2 mb-2 w-full leading-6 sm:mb-1 sm:line-clamp-2 lg:line-clamp-3 lg:min-h-[72px]">
              {data.title}
            </p>
            <span className=" *:caption-1 *:leading-[18px] *:text-primary-500">
              <StoryMeta
                commentCount={data.commentCount || 0}
                publishDate={data.published_date}
                paywall={data.paywall || false}
                fullScreenAd={data.full_screen_ad || ''}
              />
            </span>
          </div>
          <div className="relative ml-3 aspect-[2/1] min-w-24 overflow-hidden rounded border-[0.5px] border-primary-200 sm:w-40 sm:min-w-40 md:hidden">
            <Image
              src={data.og_image || '/images/default-story-image.webP'}
              alt={`${data.title}'s story conver image`}
              fill
              className="object-cover"
            />
          </div>
        </section>
        <section className="mt-4 grid grid-cols-3">
          <div className="col-span-2">
            <StoryPickInfo
              displayPicks={data.pick}
              pickCount={data.pickCount || 0}
              maxCount={4}
            />
          </div>
          <div className="place-self-end">
            <StoryPickButton isStoryPicked={false} storyId={data.id} />
          </div>
        </section>
      </div>
    </>
  )
}

export default ArticleCard
