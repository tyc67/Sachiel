import { useRouter } from 'next/navigation'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

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
  checkMobileStepFullfilled: () => boolean
  mobileTitle: string
}

const EditCollectionContext = createContext<
  EditCollectionContextValue | undefined
>(undefined)

export default function EditCollectionProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [step, setStep] = useState(0)
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [heroImage, setHeroImage] = useState<File | null>(null)
  const [candidates, setCandidates] = useState<PickOrBookmark[]>([])
  const [collectionPickStories, setCollectionPickStories] = useState<
    CollectionPickStory[]
  >([])
  const router = useRouter()
  const { user } = useUser()
  const { width } = useWindowDimensions()

  const checkMobileStepFullfilled = () => {
    switch (step) {
      case 0:
        return Boolean(collectionPickStories.length)
      case 1:
        return Boolean(heroImage) && Boolean(title)
      case 2:
        // optional filed
        return true
      default:
        return false
    }
  }

  const getMobileTitle = useCallback(() => {
    switch (step) {
      case 0: {
        const pickedStoryCount = collectionPickStories.length
        return pickedStoryCount ? `已選${pickedStoryCount}篇` : '選擇文章'
      }
      case 1:
        return '標題'
      case 2:
        return '敘述'
      default:
        return '建立集錦'
    }
  }, [collectionPickStories.length, step])
  const mobileTitle = getMobileTitle()

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
      setStep(0)
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
        checkMobileStepFullfilled,
        mobileTitle,
      }}
    >
      {children}
    </EditCollectionContext.Provider>
  )
}

export const useEditCollection = () => {
  const context = useContext(EditCollectionContext)
  if (!context) {
    throw new Error(
      'useEditCollection must be used within a EditCollectionProvider'
    )
  }
  return context
}
