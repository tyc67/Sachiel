'use client'

import { createContext, useContext, useState } from 'react'

import { type DisplayPicks } from '@/hooks/use-display-picks'

export type Picker = DisplayPicks[number]['member']
type ModalType = {
  isModalOpen: boolean
  pickers: Picker[]
  storyId: string
  openPickersModal: ({
    displayPicks,
    storyId,
  }: {
    displayPicks: DisplayPicks
    storyId: string
  }) => void
  closePickersModal: () => void
}

const ModalContext = createContext<ModalType | undefined>(undefined)

export function PickersModalProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [pickers, setPickers] = useState<Picker[]>([])
  const [storyId, setStoryId] = useState('')

  const openPickersModal = ({
    displayPicks,
    storyId,
  }: {
    displayPicks: DisplayPicks
    storyId: string
  }) => {
    const newPickers = displayPicks.map((p) => ({
      id: p.member.id,
      name: p.member.name,
      avatar: p.member.avatar,
      customId: p.member.customId,
    }))
    setStoryId(storyId)
    setPickers(newPickers)
    setIsModalOpen(true)
  }

  const closePickersModal = () => {
    setIsModalOpen(false)
    setPickers([])
  }

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        pickers,
        storyId,
        openPickersModal,
        closePickersModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export const usePickersModal = () => {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error('usePickersModal must be used within a ModalProvider')
  }
  return context
}
