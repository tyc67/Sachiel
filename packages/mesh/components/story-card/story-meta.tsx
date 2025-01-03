import { useEffect, useState } from 'react'

import { getStoryCommentCount } from '@/app/actions/story'
import { useCommentCount } from '@/context/comment-count'
import { displayTimeFromNow } from '@/utils/story-display'

import Icon from '../icon'

export default function StoryMeta({
  storyId,
  publishDate,
  paywall,
  fullScreenAd,
  showCommentCount = true,
}: {
  storyId: string
  publishDate: string
  paywall: boolean
  fullScreenAd: string
  showCommentCount?: boolean
}) {
  const { interactedComments, updateCommentsCount } = useCommentCount()
  const [displayCommentsCount, setDisplayCommentsCount] = useState(0)

  useEffect(() => {
    const getCommentCount = async () => {
      const count = await getStoryCommentCount(storyId)
      if (count !== undefined && count !== null) {
        setDisplayCommentsCount(count)
      }
    }
    getCommentCount()
  }, [storyId])

  useEffect(() => {
    if (interactedComments.includes(storyId)) {
      setDisplayCommentsCount((prev) => prev + 1)
      updateCommentsCount(storyId, 'decrement')
    }
  }, [interactedComments, storyId, updateCommentsCount])

  return (
    <div className="flex items-center text-primary-500">
      {showCommentCount ? (
        <>
          <Icon iconName="icon-chat-bubble" size="s" />
          <div className="pl-0.5">{displayCommentsCount}</div>
          <Icon iconName="icon-dot" size="s" />
        </>
      ) : null}
      <div>
        <span>{publishDate ? displayTimeFromNow(publishDate) : null}</span>
      </div>
      {paywall && (
        <div className="flex items-center">
          <Icon iconName="icon-dot" size="s" />
          付費文章
        </div>
      )}
      {fullScreenAd && fullScreenAd !== 'none' && (
        <div className="flex items-center">
          <Icon iconName="icon-dot" size="s" />
          蓋板廣告
        </div>
      )}
    </div>
  )
}
