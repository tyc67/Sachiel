import Icon from '@/components/icon'
import StoryCommentCount from '@/components/story-card/story-comment-count'
import StoryPickCount from '@/components/story-card/story-pick-count'
import { useComment } from '@/context/comment'

export type MobileBottomActionBarProps = {
  picksCount: number
  commentsCount: number
  actions: React.ReactNode[]
}

export default function MobileBottomActionBar(
  props: MobileBottomActionBarProps
) {
  const picksCount = props?.picksCount ?? 0
  const commentsCount = props?.commentsCount ?? 0
  const { dispatch } = useComment()
  const openCommentBlock = () => {
    dispatch({ type: 'TOGGLE_MOBILE_COMMENT_MODAL', payload: { isOpen: true } })
    document.body.classList.add('overflow-hidden')
  }
  return (
    <nav className="fixed inset-x-0 bottom-0 h-[theme(height.nav.default)] border-t bg-white shadow-[0_0_8px_0px_rgba(0,0,0,0.1)] sm:hidden">
      <div className="footnote flex justify-between px-5 pt-4 text-primary-500">
        <div className="flex items-center" onClick={openCommentBlock}>
          {!!commentsCount && (
            <>
              <StoryCommentCount commentsCount={commentsCount} />
              <Icon iconName="icon-dot" size="s" />
            </>
          )}
          <StoryPickCount picksCount={picksCount} />
        </div>
        <div className="flex gap-2">
          {props.actions.map((action) => action)}
        </div>
      </div>
    </nav>
  )
}
