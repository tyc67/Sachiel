import ObjectiveCommentCount from '@/components/general-objective/objective-comment-count'
import ObjectivePickCount from '@/components/general-objective/objective-pick-count'
import Icon from '@/components/icon'
import { usePickersModal } from '@/context/pickers-modal'
import { type DisplayPicks } from '@/hooks/use-display-picks'
import type { PickObjective } from '@/types/objective'

export type MobileBottomActionBarProps = {
  objectiveId: string
  picksCount: number
  commentsCount: number
  displayPicks?: DisplayPicks
  actions: React.ReactNode[]
  isSinglePickByCurrentUser: boolean
  pickObjective: PickObjective
}

export default function MobileBottomActionBar({
  objectiveId,
  picksCount = 0,
  commentsCount = 0,
  displayPicks = [],
  actions,
  isSinglePickByCurrentUser,
  pickObjective,
}: MobileBottomActionBarProps) {
  const { openPickersModal } = usePickersModal()

  return (
    <nav className="fixed inset-x-0 bottom-0 h-[theme(height.nav.default)] border-t bg-white shadow-[0_0_8px_0px_rgba(0,0,0,0.1)] sm:hidden">
      <div className="footnote flex justify-between px-5 pt-4 text-primary-500">
        <div className="flex items-center">
          <ObjectiveCommentCount commentsCount={commentsCount} />
          <Icon iconName="icon-dot" size="s" />
          <ObjectivePickCount
            picksCount={picksCount}
            onClickDisplayPicker={() =>
              openPickersModal({
                displayPicks,
                objectiveId,
                pickObjective,
              })
            }
            disabled={isSinglePickByCurrentUser}
          />
        </div>
        <div className="flex gap-2">{actions.map((action) => action)}</div>
      </div>
    </nav>
  )
}
