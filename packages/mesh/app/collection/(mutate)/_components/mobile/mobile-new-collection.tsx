import { useCallback, useEffect, useState } from 'react'

import { getMemberPickAndBookmark } from '@/app/actions/edit-collection'
import Spinner from '@/components/spinner'
import { useEditCollection } from '@/context/edit-collection'
import { useUser } from '@/context/user'
import { getCrossPageCollectinPickStory } from '@/utils/cross-page-create-collection'

import { picksAndBookmarksPageCount } from '../../_const/edit-collection'
import type { CollectionPickStory } from '../../_types/edit-collection'
import EditHeroImage from '../edit-hero-image'
import EditSummary from '../edit-summary'
import EditTitle from '../edit-title'
import InfiniteCollectionPicks from '../infinite-collection-picks'
import PickStoryCard from '../pick-story-card'
import TabletGoNextButton from '../tablet/tablet-go-next-button'
import TabletNavigation from '../tablet/tablet-navigation'

export default function MobileNewCollection() {
  const [fixedStory, setFixedStory] = useState<CollectionPickStory | null>(null)

  const { step, collectionPickStories, setCollectionPickStories } =
    useEditCollection()

  useEffect(() => {
    if (!collectionPickStories.length) {
      const story = getCrossPageCollectinPickStory()
      if (story) {
        setFixedStory(story)
        setCollectionPickStories([story])
      }
    }
  }, [collectionPickStories.length, setCollectionPickStories])

  const getStepJsx = (step: number) => {
    switch (step) {
      case 0:
        return <Step1 fixedStory={fixedStory} />
      case 1:
        return <Step2 />
      case 2:
        return <Step3 />
      default:
        return null
    }
  }

  return (
    <div className="flex w-full grow flex-col sm:mx-auto sm:max-w-screen-sm md:max-w-[740px] lg:hidden">
      <TabletNavigation />
      {getStepJsx(step)}
    </div>
  )
}

const Step1 = ({ fixedStory }: { fixedStory: CollectionPickStory | null }) => {
  return (
    <>
      {!fixedStory ? (
        <Step1PickStories />
      ) : (
        <Step1FixedStory fixedStory={fixedStory} />
      )}
      <div className="fixed inset-x-0 bottom-0 hidden items-center justify-center bg-white py-4 sm:flex lg:hidden">
        <div className="w-[335px]">
          <TabletGoNextButton />
        </div>
      </div>
    </>
  )
}

const Step1PickStories = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [shouldLoadMore, setShouldLoadMore] = useState(true)

  const { candidates, setCandidates } = useEditCollection()
  const { user } = useUser()

  const loadMorePicksAndBookmarks = useCallback(async () => {
    const response = await getMemberPickAndBookmark({
      memberId: user.memberId,
      pickSkip: candidates.length,
      pickTake: picksAndBookmarksPageCount,
    })
    if (!response) return
    const picksAndBookmarks = response?.member?.picksAndBookmarks ?? []
    const picksAndBookmarksCount = response?.member?.picksAndBookmarksCount ?? 0
    const newCandidates = candidates.concat(picksAndBookmarks)
    setCandidates(newCandidates)

    if (newCandidates.length === picksAndBookmarksCount) {
      setShouldLoadMore(false)
    }
  }, [candidates, setCandidates, user.memberId])

  useEffect(() => {
    const fetchPicksAndBookmarks = async () => {
      setIsLoading(true)
      await loadMorePicksAndBookmarks()
      setIsLoading(false)
    }
    if (!mounted) {
      fetchPicksAndBookmarks()
    }
    setMounted(true)
  }, [loadMorePicksAndBookmarks, mounted])

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="mb-[72px] flex grow flex-col">
      <InfiniteCollectionPicks
        key={candidates.length}
        candidates={candidates}
        loadMore={loadMorePicksAndBookmarks}
        shouldLoadMore={shouldLoadMore}
      />
    </div>
  )
}

const Step1FixedStory = ({
  fixedStory,
}: {
  fixedStory: CollectionPickStory | null
}) => {
  if (!fixedStory) return null
  return (
    <div className="flex grow flex-col pl-2 pr-5 sm:px-5 md:px-[70px] lg:pl-10 lg:pr-0">
      <PickStoryCard
        key={fixedStory.id}
        isPicked={true}
        onClick={() => {}}
        story={fixedStory}
      />
    </div>
  )
}

const Step2 = () => {
  return (
    <div className="flex flex-col gap-8">
      <EditHeroImage />
      <EditTitle />
      <div className="flex items-center justify-center pt-6">
        <div className="w-[295px]">
          <TabletGoNextButton />
        </div>
      </div>
    </div>
  )
}

const Step3 = () => {
  return (
    <div className="flex grow flex-col">
      <EditSummary />
      <div className="flex items-center justify-center pt-6">
        <div className="w-[295px]">
          <TabletGoNextButton />
        </div>
      </div>
    </div>
  )
}
