import Image from 'next/image'

import StoryMeta from '@/components/story-card/story-meta'
import { type ListStoryFragment } from '@/graphql/__generated__/graphql'

type Story = ListStoryFragment

export default function MostPickedStory({
  story,
  isDesktop,
}: {
  story: Story
  isDesktop: boolean
}) {
  return (
    <section className="bg-primary-100">
      <div className="p-5 md:px-[70px] lg:px-10 lg:py-8">
        <div
          className={`${
            isDesktop ? 'title-1' : 'list-title'
          } text-primary-500 lg:h-8`}
        >
          最多人精選
        </div>
        <article className="mt-3 flex flex-col gap-3 sm:flex-row sm:gap-5 lg:gap-10">
          <div className="relative aspect-[2/1] sm:aspect-square sm:h-[168px] sm:w-[168px] lg:aspect-[2/1] lg:h-[178px] lg:w-[356px] xl:h-[200px] xl:w-[400px]">
            <Image
              className="rounded-md"
              src={story.og_image || '/images/default-story-image.webP'}
              alt={story.title ?? ''}
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="sm:flex sm:flex-1 sm:flex-col sm:justify-between sm:py-2">
            {/* right top section */}
            <div>
              <div className="flex h-6 flex-row items-center justify-between">
                <h4
                  className={`${
                    isDesktop ? 'body-3' : 'footnote'
                  } h-5 text-primary-500 lg:h-auto`}
                >
                  {story.source?.title ?? ''}
                </h4>
                <button>...</button>
              </div>
              <div
                className={`${
                  isDesktop ? 'title-1' : 'title-2'
                } mt-1 text-primary-700`}
              >
                {story.title}
              </div>
              <div className="footnote mt-2">
                <StoryMeta
                  commentCount={story.commentCount ?? 0}
                  publishDate={story.published_date}
                  paywall={story.paywall ?? false}
                  fullScreenAd={story.full_screen_ad ?? ''}
                />
              </div>
            </div>
            {/* right bottom section */}
            <div>
              <div className="mt-4 flex h-8 flex-row justify-between sm:mt-3 lg:mt-[19px] xl:mt-[40px]">
                <div>OOO</div>
                {/* 改成共用元件 */}
                <button>精選</button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
