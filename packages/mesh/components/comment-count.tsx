import { useEffect, useState } from 'react'

import { usePickModal } from '@/context/pick-modal'

export default function CommentCount({
  objectiveId,
  initialCommentCounts,
}: {
  objectiveId: string
  initialCommentCounts: number
}) {
  const { interactCommentStack, setInteractCommentStack } = usePickModal()
  const [displayCommentCount, setDisplayCommentCount] =
    useState(initialCommentCounts)

  useEffect(() => {
    if (
      objectiveId &&
      interactCommentStack.length > 0 &&
      interactCommentStack.includes(objectiveId)
    ) {
      setDisplayCommentCount((prev) => prev + 1)
      setInteractCommentStack((prev) => prev.filter((id) => id !== objectiveId))
    }
  }, [
    interactCommentStack,
    interactCommentStack.length,
    setInteractCommentStack,
    objectiveId,
  ])

  return <div className="pl-0.5">{displayCommentCount}</div>
}
