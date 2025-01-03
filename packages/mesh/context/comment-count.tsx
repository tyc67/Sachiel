'use client'

import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'

type CommentCountContextType = {
  interactedComments: string[]
  setInteractedComments: Dispatch<SetStateAction<string[]>>
  updateCommentsCount: (
    storyId: string,
    action: 'increment' | 'decrement'
  ) => void
}

const CommentCountContext = createContext<CommentCountContextType | undefined>(
  undefined
)

export function CommentCountProvider({ children }: { children: ReactNode }) {
  const [interactedComments, setInteractedComments] = useState<string[]>([])

  const updateCommentsCount = (
    storyId: string,
    action: 'increment' | 'decrement'
  ) => {
    setInteractedComments((prev) => {
      if (action === 'increment' && !prev.includes(storyId)) {
        return [...prev, storyId]
      } else if (action === 'decrement') {
        return prev.filter((id) => id !== storyId)
      }
      return prev
    })
  }

  return (
    <CommentCountContext.Provider
      value={{
        interactedComments,
        setInteractedComments,
        updateCommentsCount,
      }}
    >
      {children}
    </CommentCountContext.Provider>
  )
}

export function useCommentCount() {
  const context = useContext(CommentCountContext)
  if (!context) {
    throw new Error('CommentCountProvider Error')
  }
  return context
}
