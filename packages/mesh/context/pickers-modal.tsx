'use client'

import { createContext, useContext, useState } from 'react'
import { createPortal } from 'react-dom'

import PickersModal from '@/components/pickers-modal'
import { type DisplayPicks } from '@/hooks/use-display-picks'
import { PickObjective } from '@/types/objective'

export type Picker = DisplayPicks[number]['member']
type ModalType = {
  pickObjective: PickObjective
  isModalOpen: boolean
  pickers: Picker[]
  objectiveId: string
  openPickersModal: ({
    pickObjective,
    displayPicks,
    objectiveId,
  }: {
    pickObjective: PickObjective
    displayPicks: DisplayPicks
    objectiveId: string
  }) => void
  closePickersModal: () => void
}

const ModalContext = createContext<ModalType | undefined>(undefined)

export function PickersModalProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [pickObjective, setPickObjective] = useState<PickObjective>(
    PickObjective.Story
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [pickers, setPickers] = useState<Picker[]>([])
  const [objectiveId, setObjectiveId] = useState('')

  const openPickersModal = ({
    pickObjective,
    displayPicks,
    objectiveId,
  }: {
    pickObjective: PickObjective
    displayPicks: DisplayPicks
    objectiveId: string
  }) => {
    const newPickers = displayPicks.map((p) => ({
      id: p.member.id,
      name: p.member.name,
      avatar: p.member.avatar,
      customId: p.member.customId,
    }))
    setPickObjective(pickObjective)
    setObjectiveId(objectiveId)
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
        pickObjective,
        pickers,
        objectiveId,
        openPickersModal,
        closePickersModal,
      }}
    >
      {isModalOpen && createPortal(<PickersModal />, document.body)}
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
