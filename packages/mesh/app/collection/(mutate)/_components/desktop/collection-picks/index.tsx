'use client'

import { useEffect, useState } from 'react'

import { useEditCollection } from '@/context/edit-collection'
import { getCrossPageCollectinPickStory } from '@/utils/cross-page-create-collection'

import type { CollectionPickStory } from '../../../_types/edit-collection'
import { DesktopEditCollectionStep } from '../../../_types/edit-collection'
import DesktopStep1FullEdit from './step-one-full-edit'
import DesktopStep2SortStories from './step-two-sort-stories'

export default function DesktopCollectionPicks() {
  const [fixedStory, setFixedStory] = useState<CollectionPickStory | null>(null)

  const { desktopStepName, collectionPickStories, setCollectionPickStories } =
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

  const getStepJsx = (stepName: DesktopEditCollectionStep) => {
    switch (stepName) {
      case DesktopEditCollectionStep.DesktopStep1EditAll:
        return <DesktopStep1FullEdit fixedStory={fixedStory} />
      case DesktopEditCollectionStep.DesktopStep2SortStories:
        return <DesktopStep2SortStories />
      default:
        return null
    }
  }

  return (
    <div className="relative left-[320px] flex w-maxDesktopNavigation grow flex-col">
      <div className="flex grow flex-col pl-2 pr-5 sm:px-5 md:px-[70px] lg:pl-10 lg:pr-0">
        {getStepJsx(desktopStepName)}
      </div>
    </div>
  )
}
