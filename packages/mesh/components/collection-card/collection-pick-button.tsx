'use client'

import { useRouter } from 'next/navigation'

import type { ButtonColor } from '@/components/button'
import Button from '@/components/button'
import { usePickModal } from '@/context/pick-modal'
import { useUser } from '@/context/user'
import { PickObjective } from '@/types/pick'
import { debounce } from '@/utils/performance'

export default function StoryPickButton({
  collectionId,
  color = 'white',
}: {
  collectionId: string
  color?: ButtonColor
}) {
  const router = useRouter()
  const { user } = useUser()
  const { openPickModal } = usePickModal()
  const memberId = user.memberId
  const isStoryPicked = user.pickCollectionIds.has(collectionId)

  const handleClickPick = debounce(async () => {
    if (!memberId) {
      router.push('/login')
      return
    }
    openPickModal(PickObjective.Collection, collectionId, isStoryPicked)
  })

  return (
    <Button
      size="sm"
      color={color}
      text="精選"
      icon={{ iconName: 'icon-star-primary', size: 's' }}
      onClick={handleClickPick}
      activeState={{
        isActive: isStoryPicked,
        activeText: '已精選',
        activeIcon: { iconName: 'icon-star-white', size: 's' },
      }}
    />
  )
}
