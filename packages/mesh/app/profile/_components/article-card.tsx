import Link from 'next/link'

import ImageWithFallback from '@/app/_components/image-with-fallback'
import Comment from '@/app/profile/_components/comment'
import StoryMeta from '@/components/story-card/story-meta'
import StoryPickButton from '@/components/story-card/story-pick-button'
import StoryPickInfo from '@/components/story-card/story-pick-info'
import StoryMoreActionButton from '@/components/story-more-action-button'
import { ImageCategory } from '@/constants/fallback-src'
import { CommentProvider } from '@/context/comment'
import { CommentObjective } from '@/types/objective'
import {
  type BookmarkItem,
  type CollectionItem,
  type CommentType,
  type PickListItem,
} from '@/types/profile'

type StoryDataTypes =
  | NonNullable<PickListItem>
  | NonNullable<BookmarkItem>
  | CollectionItem

type ArticleCardProps = {
  storyData: StoryDataTypes
  isLast: boolean
  memberId?: string
  avatar?: string
  name?: string
  shouldShowComment: boolean
}
function hasComment(
  storyData: StoryDataTypes
): storyData is NonNullable<PickListItem> {
  if (!storyData) return false
  return 'comment' in storyData
}
const isStory = (
  data: StoryDataTypes
): data is NonNullable<PickListItem> | NonNullable<BookmarkItem> =>
  data.__typename === 'Story'

const isCollection = (data: StoryDataTypes): data is CollectionItem =>
  data.__typename === 'Collection'
type GetterConfig<T> = {
  story: (data: NonNullable<PickListItem> | NonNullable<BookmarkItem>) => T
  collection: (data: CollectionItem) => T
  default: T
}
const createGetter = <T,>(config: GetterConfig<T>) => {
  return (data: StoryDataTypes): T => {
    if (isStory(data)) return config.story(data)
    if (isCollection(data)) return config.collection(data)
    return config.default
  }
}
const storyGetters = {
  image: createGetter<string>({
    story: (data) => data.og_image ?? '',
    collection: (data) => data.heroImage?.urlOriginal ?? '',
    default: '',
  }),

  source: createGetter<string>({
    story: (data) => data.source?.title ?? '預設媒體',
    collection: () => '',
    default: '預設媒體',
  }),

  sourceId: createGetter<string>({
    story: (data) => data.source?.id ?? '',
    collection: () => '',
    default: '',
  }),

  publishedDate: createGetter<string>({
    story: (data) => data.published_date ?? '',
    collection: (data) => data.updatedAt ?? data.createdAt ?? '',
    default: '',
  }),

  paywall: createGetter<boolean>({
    story: (data) => data.paywall ?? false,
    collection: () => false,
    default: false,
  }),

  fullScreenAd: createGetter<string>({
    story: (data) => data.full_screen_ad ?? '',
    collection: () => '',
    default: '',
  }),

  pickCount: createGetter<number>({
    story: (data) => data.pickCount ?? 0,
    collection: (data) => data.picksCount ?? 0,
    default: 0,
  }),
} as const

const ArticleCard = ({
  storyData,
  isLast,
  memberId,
  avatar = '',
  name,
  shouldShowComment,
}: ArticleCardProps) => {
  /**
   * 此處的gql方法主要有三個：
   * GetMemberProfile 只會取用最新並且是作者的留言（一個）
   * GetVisitorProfile 只會取用最新並且是作者的留言（一個）
   * GetPublisherProfile 不會取用留言，因為Publisher不會顯示留言
   */
  const commentList = (hasComment(storyData) && storyData.comment) || []
  const authorComment =
    commentList.length !== 0
      ? commentList[0]
      : {
          __typename: 'Comment',
          id: '',
          content: '',
          createdAt: '',
          likeCount: 0,
          member: {
            __typename: 'Member',
            id: memberId,
            name,
            avatar,
          },
        }

  const shouldShowSource = !isCollection
  return (
    <>
      <CommentProvider
        initialComments={storyData.comment || []}
        commentObjective={CommentObjective.Story}
        commentObjectiveData={storyData}
      >
        <Link className="md:flex md:w-full" href={`/story/${storyData?.id}`}>
          <section className="relative hidden md:block md:aspect-[2/1] md:w-full md:overflow-hidden md:rounded-t-md">
            <ImageWithFallback
              fallbackCategory={ImageCategory.STORY}
              src={storyGetters.image(storyData)}
              alt={`${storyData?.title}'s story cover image`}
              fill
              className="size-full object-cover"
            />
          </section>
        </Link>
        <div
          className={`flex grow flex-col p-5 after:absolute after:bottom-1 after:h-px after:w-[calc(100%-40px)] after:bg-primary-200 md:line-clamp-3 md:pt-[12px] md:after:hidden ${
            isLast && 'after:hidden'
          } ${
            isCollection(storyData) &&
            'py-[10px] after:hidden sm:p-0 md:justify-between'
          }`}
        >
          <Link
            className="flex h-full grow flex-col"
            href={`/story/${storyData?.id}`}
          >
            {shouldShowSource && (
              <section className="mb-1 flex items-center justify-between">
                <>
                  <p className="caption-1 text-primary-500">
                    {storyGetters.source(storyData)}
                  </p>
                  <StoryMoreActionButton
                    storyId={storyData?.id ?? ''}
                    publisherId={storyGetters.sourceId(storyData)}
                  />
                </>
              </section>
            )}
            <section
              className={`flex ${
                isCollection(storyData)
                  ? 'size-full grow flex-col-reverse justify-end rounded-t border border-b-0 border-primary-200 md:border-0'
                  : 'mb-2 items-start justify-between sm:gap-10'
              }`}
            >
              <div className="flex h-fit flex-col justify-between px-3">
                <p className="body-2 mb-2 w-full sm:mb-1 sm:line-clamp-2 lg:line-clamp-3 lg:min-h-[72px]">
                  {storyData?.title || '預設標題'}
                </p>
                <span className="*:caption-1 *:text-primary-500">
                  <StoryMeta
                    commentCount={storyData?.commentCount || 0}
                    publishDate={storyGetters.publishedDate(storyData)}
                    paywall={storyGetters.paywall(storyData)}
                    fullScreenAd={storyGetters.fullScreenAd(storyData)}
                  />
                </span>
              </div>
              <div
                className={`relative aspect-[2/1] min-w-24 overflow-hidden sm:min-w-40 md:hidden ${
                  isCollection(storyData)
                    ? 'mb-3 rounded-t'
                    : 'ml-3 rounded border-[0.5px] border-primary-200 sm:w-40 md:border-0'
                }`}
              >
                <ImageWithFallback
                  fallbackCategory={ImageCategory.STORY}
                  src={storyGetters.image(storyData)}
                  alt={`${storyData?.title}'s story cover image`}
                  fill
                  className="object-cover"
                />
              </div>
            </section>
            <section
              className={`
                flex justify-between
                ${
                  isCollection(storyData)
                    ? `rounded-b border border-t-0 border-primary-200 px-3 py-4 md:border-0`
                    : ` pt-4`
                }
              `}
            >
              <StoryPickInfo
                displayPicks={storyData?.pick}
                pickCount={storyGetters.pickCount(storyData)}
                maxCount={4}
              />
              <StoryPickButton storyId={storyData?.id} />
            </section>
          </Link>
          {shouldShowComment && (
            <Comment
              data={authorComment as CommentType}
              avatar={avatar}
              clampLineCount={3}
              canToggle={false}
            />
          )}
        </div>
      </CommentProvider>
    </>
  )
}

export default ArticleCard
