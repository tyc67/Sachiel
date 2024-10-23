import Avatar from '@/components/story-card/avatar'
import { socialPageAvatarLayer } from '@/constants/z-index'
import { type UserActionStoryFragment } from '@/graphql/__generated__/graphql'

import CollectionCommentCount from './collection-comment-count'
import CollectionPickCount from './collection-pick-count'

type Picks = UserActionStoryFragment['pick']

export default function CollectionPickInfo({
  displayPicks,
  pickCount,
  maxCount = 4,
  commentCount = 0,
}: {
  displayPicks: Picks
  pickCount: number
  maxCount?: number
  commentCount?: number
}) {
  const designedMaxCount = 4
  if (!Array.isArray(displayPicks)) return <></>
  if (displayPicks?.length < designedMaxCount) {
    maxCount = displayPicks?.length || 0
  }
  return (
    <div className="footnote flex items-center gap-2 text-primary-500">
      {!!displayPicks.length && (
        <div className="flex -space-x-1 overflow-hidden">
          {displayPicks?.slice(0, maxCount).map((data, index) => (
            <div
              key={data.member?.id ?? ''}
              style={{ zIndex: socialPageAvatarLayer[index] }}
            >
              <Avatar src={data.member?.avatar ?? ''} size="m" />
            </div>
          ))}
        </div>
      )}
      <div className="flex items-center">
        <CollectionPickCount picksCount={pickCount} />
      </div>
      {!!commentCount && (
        <div className="ml-[2px] flex items-center">
          <CollectionCommentCount commentsCount={commentCount} />
        </div>
      )}
    </div>
  )
}
