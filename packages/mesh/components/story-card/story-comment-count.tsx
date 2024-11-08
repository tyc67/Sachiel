import { useComment } from '@/context/comment'
import useWindowDimensions from '@/hooks/use-window-dimension'

export default function StoryCommentCount({
  commentsCount,
}: {
  commentsCount: number
}) {
  const { dispatch } = useComment()
  const { width } = useWindowDimensions()
  const openCommentBlock = () => {
    dispatch({ type: 'TOGGLE_MOBILE_COMMENT_MODAL', payload: { isOpen: true } })
    document.body.classList.add('overflow-hidden')
  }
  const displayCount =
    commentsCount < 10000
      ? commentsCount
      : (Math.floor(commentsCount / 1000) / 10).toFixed(1)

  return (
    <button onClick={openCommentBlock} disabled={width > 768}>
      <span className="pr-1 text-primary-700">{displayCount}</span>
      <span>{commentsCount < 10000 ? '則留言' : '萬則留言'}</span>
    </button>
  )
}
