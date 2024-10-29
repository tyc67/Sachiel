import { useRouter } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'

import type { CreateCollectionParams } from '@/app/actions/mutate-collection'
import { createCollection as sendCreateCollection } from '@/app/actions/mutate-collection'
import {
  type CollectionPickStory,
  type PickOrBookmark,
  CollectionFormat,
} from '@/app/collection/(mutate)/_types/edit-collection'
import useWindowDimensions from '@/hooks/use-window-dimension'
import {
  generateUniqueTimestamp,
  getCurrentTimeInISOFormat,
} from '@/utils/date'

import { useUser } from './user'

type EditCollectionContextValue = {
  step: number
  setStep: React.Dispatch<React.SetStateAction<number>>
  title: string
  setTitle: React.Dispatch<React.SetStateAction<string>>
  summary: string
  setSummary: React.Dispatch<React.SetStateAction<string>>
  heroImage: File | null
  setHeroImage: React.Dispatch<React.SetStateAction<File | null>>
  candidates: PickOrBookmark[]
  setCandidates: React.Dispatch<React.SetStateAction<PickOrBookmark[]>>
  collectionPickStories: CollectionPickStory[]
  setCollectionPickStories: React.Dispatch<
    React.SetStateAction<CollectionPickStory[]>
  >
  createCollection: () => void
}

const initialValue: EditCollectionContextValue = {
  step: 0,
  setStep: () => {},
  title: '',
  setTitle: () => {},
  summary: '',
  setSummary: () => {},
  heroImage: null,
  setHeroImage: () => {},
  candidates: [],
  setCandidates: () => {},
  collectionPickStories: [],
  setCollectionPickStories: () => {},
  createCollection: () => {},
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
  const [collectionPickStories, setCollectionPickStories] = useState(
    initialValue.collectionPickStories
  )
  const router = useRouter()
  const { user } = useUser()
  const { width } = useWindowDimensions()

  const createCollection = async () => {
    const formData = new FormData()
    if (heroImage) {
      formData.append('heroImage', heroImage)
    }
    const newCollectionData: CreateCollectionParams = {
      title,
      slug: generateUniqueTimestamp(),
      summary,
      format: CollectionFormat.Folder,
      imageName: `集錦首圖_${title}`,
      imageUpload: formData,
      collectionpicks: collectionPickStories.map((story, i) => ({
        story: {
          connect: {
            id: story.id,
          },
        },
        sort_order: i,
        creator: {
          connect: {
            id: user.memberId,
          },
        },
        picked_date: getCurrentTimeInISOFormat(),
      })),
      memberId: user.memberId,
    }
    const response = await sendCreateCollection(newCollectionData)
    if (response) {
      const collectionId = response.createCollection?.id
      router.push(`/collection/${collectionId}`)
    } else {
      router.push(`/profile/member/${user.customId}`)
    }
  }

  // reset steps when window width change
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
        collectionPickStories,
        setCollectionPickStories,
        createCollection,
      }}
    >
      {children}
    </EditCollectionContext.Provider>
  )
}

export const useEditCollection = () => {
  return useContext(EditCollectionContext)
}
