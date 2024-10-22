import type { Dispatch, SetStateAction } from 'react'

import type { User } from '@/context/user'
import { PickObjective } from '@/types/pick'

function getTargetIdsKey(objective: PickObjective) {
  switch (objective) {
    case PickObjective.Story:
      return 'pickStoryIds'
    case PickObjective.Collection:
      return 'pickCollectionIds'
    default:
      console.error(
        'getTargetIdsKey with exceptional input objective',
        objective
      )
      return 'pickStoryIds'
  }
}

export function addPickToUser(
  objective: PickObjective,
  targetId: string,
  user: User,
  setUser: Dispatch<SetStateAction<User>>
) {
  const targetIdsKey = getTargetIdsKey(objective)
  const newTargetIds = new Set(user[targetIdsKey])
  newTargetIds.add(targetId)

  setUser((user) => ({ ...user, [targetIdsKey]: newTargetIds }))

  return function reverseMutation() {
    newTargetIds.delete(targetId)
    setUser((user) => ({ ...user, [targetIdsKey]: newTargetIds }))
  }
}

export function removePickFromUser(
  objective: PickObjective,
  targetId: string,
  user: User,
  setUser: Dispatch<SetStateAction<User>>
) {
  const targetIdsKey = getTargetIdsKey(objective)
  const newTargetIds = new Set(user[targetIdsKey])
  newTargetIds.delete(targetId)

  setUser((user) => ({ ...user, [targetIdsKey]: newTargetIds }))

  return function reverseMutation() {
    newTargetIds.add(targetId)
    setUser((user) => ({ ...user, [targetIdsKey]: newTargetIds }))
  }
}
