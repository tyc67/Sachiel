'use client'
import Icon from '@/components/icon'
import Avatar from '@/components/story-card/avatar'
import { useCommentClamp } from '@/hooks/use-comment-clamp'
import type { CategoryStory } from '@/types/homepage'

type NonEmptyObject<T> = T extends Record<string, never> ? never : T
type Props = {
  comment: NonEmptyObject<Exclude<CategoryStory['comment'], undefined>>
}

export default function Comment({ comment }: Props) {
  const canToggle = true
  const clampLineCount = 2
  const { needClamp, commentRef, handleToggleClamp } = useCommentClamp(
    clampLineCount,
    canToggle
  )

  return (
    <div className="cursor-pointer rounded-md border-[0.5px] border-primary-200 bg-primary-100 p-3">
      <div className="mb-2 flex justify-between">
        <div className="flex items-center">
          <Avatar
            src={comment.member.avatar}
            size="m"
            ringColor="primary-100"
          />

          <p className="subtitle-2 ml-2 text-primary-700">
            {comment.member.name}
          </p>
          <Icon iconName="icon-dot" size="xxs" />
          <p className="caption-1 text-primary-500">這裡是時間</p>
        </div>

        <div className="flex items-center">
          <p className="caption-1 text-primary-600">{comment.likeCount}</p>
          <button>
            <Icon iconName="icon-heart" size="l" />
          </button>
        </div>
      </div>

      <div className="relative" onClick={handleToggleClamp}>
        <p className="body-3 line-clamp-2 text-primary-600" ref={commentRef}>
          {comment.content}
          {needClamp && (
            <span className="body-3 absolute bottom-0 right-0 bg-gradient-to-r from-transparent from-0% to-primary-100 to-10% pl-4">
              <span className="text-primary-600">... </span>
              <span className="text-primary-400">顯示更多</span>
            </span>
          )}
        </p>
      </div>
    </div>
  )
}
