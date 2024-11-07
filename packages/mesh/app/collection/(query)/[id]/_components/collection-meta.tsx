import Icon from '@/components/icon'
import { displayTimeFromNow } from '@/utils/story-display'

export default function CollectionMeta({
  commentCount,
  updateAt,
}: {
  commentCount: number
  updateAt: string
}) {
  return (
    <div className="flex items-center text-primary-500">
      <Icon iconName="icon-chat-bubble" size="s" />
      <div className="pl-0.5">{commentCount}</div>
      <Icon iconName="icon-dot" size="s" />
      <div>
        <span>{updateAt ? displayTimeFromNow(updateAt) : null}</span>
      </div>
    </div>
  )
}
