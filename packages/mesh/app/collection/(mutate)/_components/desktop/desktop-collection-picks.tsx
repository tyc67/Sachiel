import { useCallback, useEffect, useState } from 'react'

import { getMemberPickAndBookmark } from '@/app/actions/edit-collection'
import Spinner from '@/components/spinner'
import { useUser } from '@/context/user'

import type { PickOrBookmark } from '../../_types/edit-collection'
import InfiniteCollectionPicks from '../infinite-collection-picks'

const picksAndBookmarksPageCount = 100

export default function DesktopCollectionPicks() {
  const [mounted, setMounted] = useState(false)
  const [shouldLoadMore, setShouldLoadMore] = useState(true)
  const [candidates, setCandidates] = useState<PickOrBookmark[]>([])
  const [, setCandidatesCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
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
    setCandidatesCount(picksAndBookmarksCount)

    if (newCandidates.length === picksAndBookmarksCount) {
      setShouldLoadMore(false)
    }
  }, [candidates, user.memberId])

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

  const contentJsx = isLoading ? (
    <Spinner />
  ) : (
    <InfiniteCollectionPicks
      key={candidates.length}
      candidates={candidates}
      loadMore={loadMorePicksAndBookmarks}
      shouldLoadMore={shouldLoadMore}
    />
  )
  return (
    <div className="relative left-[320px] flex w-maxDesktopNavigation grow flex-col">
      {contentJsx}
    </div>
  )
}
