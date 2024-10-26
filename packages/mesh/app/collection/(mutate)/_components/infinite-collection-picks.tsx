import { useEffect, useMemo } from 'react'

import { useEditCollection } from '@/context/edit-collection'
import useInView from '@/hooks/use-in-view'

import type { PickOrBookmark } from '../_types/edit-collection'
import PickStoryCard from './pick-story-card'

export default function InfiniteCollectionPicks({
  candidates,
  loadMore,
  shouldLoadMore,
}: {
  candidates: PickOrBookmark[]
  loadMore: () => Promise<void>
  shouldLoadMore: boolean
}) {
  const { collectionPicks, setCollectionPicks } = useEditCollection()
  const { targetRef: triggerLoadmoreRef, isIntersecting: shouldStartLoadMore } =
    useInView()

  const collectionPickStoryIds = useMemo(() => {
    return collectionPicks.reduce((ids, collectionPick) => {
      const storyId = collectionPick.story?.id
      if (storyId) {
        ids.add(storyId)
      }
      return ids
    }, new Set<string>())
  }, [collectionPicks])

  const onPickStoryClicked = (
    candidate: PickOrBookmark,
    isStoryPicked: boolean
  ) => {
    if (isStoryPicked) {
      setCollectionPicks([
        ...collectionPicks.filter(
          (collectionPick) => collectionPick.story?.id !== candidate.story?.id
        ),
      ])
    } else {
      setCollectionPicks([
        ...collectionPicks,
        {
          sort_order: collectionPicks.length,
          story: candidate.story,
        },
      ])
    }
  }

  useEffect(() => {
    if (shouldStartLoadMore && shouldLoadMore) {
      loadMore()
    }
  }, [loadMore, shouldLoadMore, shouldStartLoadMore])

  return (
    <div className="flex grow flex-col pl-2 pr-5 sm:px-5 md:px-[70px] lg:pl-10 lg:pr-0">
      {candidates.map((candidate, i) => {
        const isStoryPicked = collectionPickStoryIds.has(
          candidate.story?.id ?? ''
        )
        return (
          <PickStoryCard
            key={candidate.story?.id}
            isPicked={isStoryPicked}
            story={candidate.story}
            onClick={onPickStoryClicked.bind(null, candidate, isStoryPicked)}
            ref={i === candidates.length - 1 ? triggerLoadmoreRef : undefined}
          />
        )
      })}
    </div>
  )
}
