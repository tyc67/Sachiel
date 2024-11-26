'use client'

import { socialPageAvatarLayer } from '@/constants/z-index'
import { usePickersModal } from '@/context/pickers-modal'
import { useUser } from '@/context/user'
import { type DisplayPicks } from '@/hooks/use-display-picks'

import type { RingColor } from './avatar'
import Avatar from './avatar'
import StoryCommentCount from './story-comment-count'
import StoryPickCount from './story-pick-count'

export default function StoryPickInfo({
  displayPicks,
  pickCount,
  maxCount = 4,
  commentCount = 0,
  ringColor = 'white',
  storyId,
}: {
  displayPicks: DisplayPicks
  pickCount: number
  maxCount?: number
  commentCount?: number
  ringColor?: RingColor
  storyId: string
}) {
  const { openPickersModal } = usePickersModal()
  const { user } = useUser()
  const designedMaxCount = 4
  if (!Array.isArray(displayPicks)) return <></>
  if (displayPicks?.length < designedMaxCount) {
    maxCount = displayPicks?.length || 0
  }
  const isSinglePickByCurrentUser =
    displayPicks.length === 1 && displayPicks[0].member.id === user.memberId

  return (
    <div className="footnote flex items-center gap-2 text-primary-500">
      {!!displayPicks.length && (
        <div className="flex -space-x-1">
          {displayPicks?.slice(0, maxCount).map((data, index) => (
            <div
              key={data.member?.id + data.member?.customId + index}
              style={{ zIndex: socialPageAvatarLayer[index] }}
            >
              <Avatar
                src={data.member?.avatar ?? ''}
                size="m"
                ringColor={ringColor}
              />
            </div>
          ))}
        </div>
      )}
      <div className="flex items-center">
        <StoryPickCount
          picksCount={pickCount}
          onClickDisplayPicker={() =>
            openPickersModal({ displayPicks, storyId })
          }
          disabled={isSinglePickByCurrentUser}
        />
      </div>
      {!!commentCount && (
        <div className="ml-[2px] flex items-center">
          <StoryCommentCount commentsCount={commentCount} />
        </div>
      )}
    </div>
  )
}
