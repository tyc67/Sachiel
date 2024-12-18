'use client'

import { useMemo } from 'react'

import { socialPageAvatarLayer } from '@/constants/z-index'
import { usePickersModal } from '@/context/pickers-modal'
import { useUser } from '@/context/user'
import { type DisplayPicks } from '@/hooks/use-display-picks'
import { CommentObjective, PickObjective } from '@/types/objective'

import Icon from '../icon'
import type { RingColor } from '../story-card/avatar'
import Avatar from '../story-card/avatar'
import ObjectiveCommentCount from './objective-comment-count'
import ObjectivePickCount from './objective-pick-count'

export default function ObjectivePickInfo({
  displayPicks,
  pickCount,
  maxCount = 4,
  showCommentCount = false,
  commentCount = 0,
  ringColor = 'white',
  objectiveId,
  pickObjective = PickObjective.Story,
}: {
  displayPicks: DisplayPicks
  pickCount: number
  maxCount?: number
  showCommentCount?: boolean
  commentCount?: number
  ringColor?: RingColor
  objectiveId: string
  pickObjective?: PickObjective
}) {
  const { openPickersModal } = usePickersModal()
  const { user } = useUser()
  const designedMaxCount = 4

  const commentObjective = useMemo(() => {
    switch (pickObjective) {
      case PickObjective.Story:
        return CommentObjective.Story
      case PickObjective.Collection:
        return CommentObjective.Collection
      default:
        return CommentObjective.Story
    }
  }, [pickObjective])

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
      <div className="flex flex-row">
        <div className="flex items-center">
          <ObjectivePickCount
            picksCount={pickCount}
            onClickDisplayPicker={() =>
              openPickersModal({
                displayPicks,
                objectiveId: objectiveId,
                pickObjective,
              })
            }
            disabled={isSinglePickByCurrentUser}
          />
        </div>
        {showCommentCount && (
          <>
            <Icon iconName="icon-dot" size="xs" />
            <div className="flex items-center">
              <ObjectiveCommentCount
                commentsCount={commentCount}
                commentObjective={commentObjective}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
