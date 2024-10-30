import { useCallback, useEffect, useState } from 'react'

import { getMemberPickAndBookmark } from '@/app/actions/edit-collection'
import Spinner from '@/components/spinner'
import { useEditCollection } from '@/context/edit-collection'
import { useUser } from '@/context/user'

import { picksAndBookmarksPageCount } from '../../_const/edit-collection'
import EditHeroImage from '../edit-hero-image'
import EditSummary from '../edit-summary'
import EditTitle from '../edit-title'
import InfiniteCollectionPicks from '../infinite-collection-picks'
import TabletGoNextButton from '../tablet/tablet-go-next-button'
import TabletNavigation from '../tablet/tablet-navigation'

export default function MobileNewCollection() {
  const { step } = useEditCollection()

  const getStepJsx = (step: number) => {
    switch (step) {
      case 0:
        return <Step1 />
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

const Step1 = () => {
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
    <>
      <div className="mb-[72px] flex grow flex-col">
        <InfiniteCollectionPicks
          key={candidates.length}
          candidates={candidates}
          loadMore={loadMorePicksAndBookmarks}
          shouldLoadMore={shouldLoadMore}
        />
      </div>
      <div className="fixed inset-x-0 bottom-0 hidden items-center justify-center bg-white py-4 sm:flex lg:hidden">
        <div className="w-[335px]">
          <TabletGoNextButton />
        </div>
      </div>
    </>
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
