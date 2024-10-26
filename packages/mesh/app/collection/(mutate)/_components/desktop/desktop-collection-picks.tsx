import { useCallback, useEffect, useState } from 'react'

import { getMemberPickAndBookmark } from '@/app/actions/edit-collection'
import Spinner from '@/components/spinner'
import { useEditCollection } from '@/context/edit-collection'
import { useUser } from '@/context/user'

import InfiniteCollectionPicks from '../infinite-collection-picks'

const picksAndBookmarksPageCount = 100

export default function DesktopCollectionPicks() {
  const { step } = useEditCollection()

  const getStepJsx = (step: number) => {
    switch (step) {
      case 0:
        return <Step1 />
      case 1:
        return <Step2 />
      default:
        return null
    }
  }

  return (
    <div className="relative left-[320px] flex w-maxDesktopNavigation grow flex-col">
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
    <InfiniteCollectionPicks
      key={candidates.length}
      candidates={candidates}
      loadMore={loadMorePicksAndBookmarks}
      shouldLoadMore={shouldLoadMore}
    />
  )
}

const Step2 = () => {
  return <></>
}
