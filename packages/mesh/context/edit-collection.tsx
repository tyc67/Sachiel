import { createContext, useContext, useEffect, useState } from 'react'

import type {
  CollectionPick,
  PickOrBookmark,
} from '@/app/collection/(mutate)/_types/edit-collection'
import useWindowDimensions from '@/hooks/use-window-dimension'

type EditCollectionContextValue = {
  step: number
  setStep: React.Dispatch<React.SetStateAction<number>>
  title: string
  setTitle: React.Dispatch<React.SetStateAction<string>>
  summary: string
  setSummary: React.Dispatch<React.SetStateAction<string>>
  heroImage: File | string
  setHeroImage: React.Dispatch<React.SetStateAction<File | string>>
  candidates: PickOrBookmark[]
  setCandidates: React.Dispatch<React.SetStateAction<PickOrBookmark[]>>
  collectionPicks: CollectionPick[]
  setCollectionPicks: React.Dispatch<React.SetStateAction<CollectionPick[]>>
}

const initialValue: EditCollectionContextValue = {
  step: 0,
  setStep: () => {},
  title: '',
  setTitle: () => {},
  summary: '',
  setSummary: () => {},
  heroImage: '',
  setHeroImage: () => {},
  candidates: [],
  setCandidates: () => {},
  collectionPicks: [],
  setCollectionPicks: () => {},
}

const EditCollectionContext = createContext(initialValue)

export default function EditCollectionProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [step, setStep] = useState(initialValue.step)
  const [title, setTitle] = useState(initialValue.title)
  const [summary, setSummary] = useState(initialValue.summary)
  const [heroImage, setHeroImage] = useState(initialValue.heroImage)
  const [candidates, setCandidates] = useState(initialValue.candidates)
  const [collectionPicks, setCollectionPicks] = useState(
    initialValue.collectionPicks
  )
  const { width } = useWindowDimensions()

  // handle different set of steps in mobile and desktop
  useEffect(() => {
    if (width) {
      setStep(initialValue.step)
    }
  }, [width])

  return (
    <EditCollectionContext.Provider
      value={{
        step,
        setStep,
        title,
        setTitle,
        summary,
        setSummary,
        heroImage,
        setHeroImage,
        candidates,
        setCandidates,
        collectionPicks,
        setCollectionPicks,
      }}
    >
      {children}
    </EditCollectionContext.Provider>
  )
}

export const useEditCollection = () => {
  return useContext(EditCollectionContext)
}
