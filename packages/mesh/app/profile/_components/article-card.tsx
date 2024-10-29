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
  if (!storyData) return <></>
  const isCollection = storyData?.__typename === 'Collection'
  const shouldShowSource = !isCollection

  const getOgImage = (data: StoryDataTypes) => {
    if (data.__typename === 'Story') return data.og_image ?? ''
    if (data.__typename === 'Collection')
      return data.heroImage?.urlOriginal ?? ''
    return ''
  }

  const getSource = (data: StoryDataTypes) => {
    if (data.__typename === 'Story') return data.source?.title ?? '預設媒體'
    return ''
  }
  const getSourceId = (data: StoryDataTypes) => {
    if (data.__typename === 'Story') return data.source?.id ?? ''
    return ''
  }

  const getPublishedDate = (data: StoryDataTypes) => {
    if (data.__typename === 'Story') return data?.published_date || ''
    if (data.__typename === 'Collection')
      return (data?.updatedAt || data?.createdAt) ?? ''
    return ''
  }

  const getPayWall = (data: StoryDataTypes) => {
    if (data.__typename === 'Story') return data.paywall ?? false
    return false
  }
  const getFullScreenAd = (data: StoryDataTypes) => {
    if (data.__typename === 'Story') return data.full_screen_ad ?? ''
    return ''
  }
  const getPickCount = (data: StoryDataTypes) => {
    if (data.__typename === 'Story') return data.pickCount ?? 0
    if (data.__typename === 'Collection') return data.picksCount ?? 0
    return 0
  }
  return (
    <>
      <CommentProvider
        initialComments={storyData.comment || []}
        commentObjective={CommentObjective.Story}
        // TODO: check what it use
        commentObjectiveData={storyData}
      >
        <Link href={`/story/${storyData?.id}`}>
          <section className="relative hidden md:block md:aspect-[2/1] md:w-full md:overflow-hidden md:rounded-t-md">
            <ImageWithFallback
              fallbackCategory={ImageCategory.STORY}
              src={getOgImage(storyData)}
              alt={`${storyData?.title}'s story cover image`}
              fill
              className="size-full object-cover"
            />
          </section>
        </Link>
        <div
          className={`flex flex-col p-5 after:absolute after:bottom-1 after:h-px after:w-[calc(100%-40px)] after:bg-primary-200 md:line-clamp-3 md:pt-[12px] md:after:hidden ${
            isLast && 'after:hidden'
          } ${isCollection && 'py-[10px] after:hidden'}`}
        >
          <Link href={`/story/${storyData?.id}`}>
            <section className="mb-1 flex items-center justify-between">
              {shouldShowSource && (
                <>
                  <p className="caption-1 text-primary-500">
                    {getSource(storyData)}
                  </p>
                  <StoryMoreActionButton
                    storyId={storyData?.id ?? ''}
                    publisherId={getSourceId(storyData)}
                  />
                </>
              )}
            </section>
            <section
              className={` ${
                isCollection
                  ? 'flex w-full grow flex-col-reverse rounded border border-b-0 border-primary-200'
                  : 'mb-2 flex items-start justify-between sm:gap-10'
              }`}
            >
              <div className="flex h-full flex-col justify-between px-3">
                <p className="body-2 mb-2 w-full sm:mb-1 sm:line-clamp-2 lg:line-clamp-3 lg:min-h-[72px]">
                  {storyData?.title || '預設標題'}
                </p>
                <span className="*:caption-1 *:text-primary-500">
                  <StoryMeta
                    commentCount={storyData?.commentCount || 0}
                    publishDate={getPublishedDate(storyData)}
                    paywall={getPayWall(storyData)}
                    fullScreenAd={getFullScreenAd(storyData)}
                  />
                </span>
              </div>
              <div
                className={`${
                  isCollection
                    ? 'relative mb-3 aspect-[2/1] min-w-24 overflow-hidden rounded-t sm:w-40 sm:min-w-40 md:hidden'
                    : 'relative ml-3 aspect-[2/1] min-w-24 overflow-hidden rounded border-[0.5px] border-primary-200 sm:w-40 sm:min-w-40 md:hidden'
                }`}
              >
                <ImageWithFallback
                  fallbackCategory={ImageCategory.STORY}
                  src={getOgImage(storyData)}
                  alt={`${storyData?.title}'s story cover image`}
                  fill
                  className="object-cover"
                />
              </div>
            </section>
            <section
              className={
                isCollection
                  ? 'flex justify-between rounded border border-t-0 border-primary-200 px-3 py-4'
                  : 'flex justify-between pt-4'
              }
            >
              <StoryPickInfo
                displayPicks={storyData?.pick}
                pickCount={getPickCount(storyData)}
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
