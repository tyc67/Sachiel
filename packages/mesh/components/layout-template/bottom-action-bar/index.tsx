import Icon from '@/components/icon'
import StoryCommentCount from '@/components/story-card/story-comment-count'
import StoryPickCount from '@/components/story-card/story-pick-count'
import { usePickersModal } from '@/context/pickers-modal'
import { type DisplayPicks } from '@/hooks/use-display-picks'

export type MobileBottomActionBarProps = {
  storyId: string
  picksCount: number
  commentsCount: number
  displayPicks?: DisplayPicks
  actions: React.ReactNode[]
  isSinglePickByCurrentUser: boolean
}

export default function MobileBottomActionBar({
  storyId,
  picksCount = 0,
  commentsCount = 0,
  displayPicks,
  actions,
  isSinglePickByCurrentUser,
}: MobileBottomActionBarProps) {
  const { openPickersModal } = usePickersModal()

  return (
    <nav className="fixed inset-x-0 bottom-0 h-[theme(height.nav.default)] border-t bg-white shadow-[0_0_8px_0px_rgba(0,0,0,0.1)] sm:hidden">
      <div className="footnote flex justify-between px-5 pt-4 text-primary-500">
        <div className="flex items-center">
          {!!commentsCount && (
            <>
              <StoryCommentCount commentsCount={commentsCount} />
              <Icon iconName="icon-dot" size="s" />
            </>
          )}
          <StoryPickCount
            picksCount={picksCount}
            onClickDisplayPicker={() =>
              openPickersModal({ displayPicks: displayPicks || [], storyId })
            }
            disabled={isSinglePickByCurrentUser}
          />
        </div>
        <div className="flex gap-2">{actions.map((action) => action)}</div>
      </div>
    </nav>
  )
}
