import { useRouter } from 'next/navigation'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import type { CreateCollectionParams } from '@/app/actions/collection'
import { createCollection as sendCreateCollection } from '@/app/actions/collection'
import { maxSummaryLength } from '@/app/collection/(mutate)/_components/edit-summary'
import {
  type CollectionPickStory,
  type PickOrBookmark,
  CollectionFormat,
  DesktopEditCollectionStep,
  MobielEditCollectionStep,
} from '@/app/collection/(mutate)/_types/edit-collection'
import useWindowDimensions from '@/hooks/use-window-dimension'
import { clearCreateCollectionStoryLS } from '@/utils/cross-page-create-collection'
import { setCrossPageToast } from '@/utils/cross-page-toast'
import {
  generateUniqueTimestamp,
  getCurrentTimeInISOFormat,
} from '@/utils/date'

import { useUser } from './user'

const mobileStepNames = [
  MobielEditCollectionStep.MobileStep1SelectStories,
  MobielEditCollectionStep.MobileStep2SetTitle,
  MobielEditCollectionStep.MobileStep3SetSummary,
  MobielEditCollectionStep.MobileStep4SortStories,
]

const desktopStepNames = [
  DesktopEditCollectionStep.DesktopStep1EditAll,
  DesktopEditCollectionStep.DesktopStep2SortStories,
]

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
  checkDesktopStepFullfilled: () => boolean
  mobileTitle: string
  desktopTitle: string
  mobileStepName: MobielEditCollectionStep
  desktopStepName: DesktopEditCollectionStep
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
  const mobileStepName = mobileStepNames[step]
  const desktopStepName = desktopStepNames[step]

  const checkMobileStepFullfilled = () => {
    switch (mobileStepName) {
      case MobielEditCollectionStep.MobileStep1SelectStories:
        return Boolean(collectionPickStories.length)
      case MobielEditCollectionStep.MobileStep2SetTitle:
        return Boolean(heroImage) && Boolean(title)
      case MobielEditCollectionStep.MobileStep3SetSummary:
        return !summary || summary.length <= maxSummaryLength
      case MobielEditCollectionStep.MobileStep4SortStories:
        return true
      default:
        return false
    }
  }

  const checkDesktopStepFullfilled = () => {
    switch (desktopStepName) {
      case DesktopEditCollectionStep.DesktopStep1EditAll:
        return (
          Boolean(heroImage) &&
          Boolean(collectionPickStories.length) &&
          Boolean(title) &&
          (!summary || summary.length <= maxSummaryLength)
        )
      case DesktopEditCollectionStep.DesktopStep2SortStories:
        return true
      default:
        return false
    }
  }

  const getMobileTitle = useCallback(() => {
    switch (mobileStepName) {
      case MobielEditCollectionStep.MobileStep1SelectStories: {
        const pickedStoryCount = collectionPickStories.length
        return pickedStoryCount ? `已選${pickedStoryCount}篇` : '選擇文章'
      }
      case MobielEditCollectionStep.MobileStep2SetTitle:
        return '標題'
      case MobielEditCollectionStep.MobileStep3SetSummary:
        return '敘述'
      case MobielEditCollectionStep.MobileStep4SortStories:
        return '排序'
      default:
        return '建立集錦'
    }
  }, [collectionPickStories.length, mobileStepName])

  const getDesktopTitle = useCallback(() => {
    switch (desktopStepName) {
      case DesktopEditCollectionStep.DesktopStep1EditAll:
        return '建立集錦'
      case DesktopEditCollectionStep.DesktopStep2SortStories:
        return '排序'
      default:
        return '建立集錦'
    }
  }, [desktopStepName])

  const mobileTitle = getMobileTitle()
  const desktopTitle = getDesktopTitle()

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
      // clear localstorage data once collection created
      clearCreateCollectionStoryLS()
      const collectionId = response.createCollection?.id
      router.push(`/collection/${collectionId}`)
    } else {
      setCrossPageToast({ status: 'fail', text: '建立集錦失敗，請重新嘗試' })
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
        checkDesktopStepFullfilled,
        mobileTitle,
        desktopTitle,
        mobileStepName,
        desktopStepName,
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
