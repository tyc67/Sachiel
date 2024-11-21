'use client'

import { useEffect, useState } from 'react'

import { useEditCollection } from '@/context/edit-collection'
import { getCrossPageCollectinPickStory } from '@/utils/cross-page-create-collection'

import type { CollectionPickStory } from '../../../_types/edit-collection'
import { MobielEditCollectionStep } from '../../../_types/edit-collection'
import TabletNavigation from '../../tablet/tablet-navigation'
import MobileStep4SortStories from './step-four-sort-stories'
import MobileStep1SelectStories from './step-one-select-stories'
import MobileStep3SetSummary from './step-three-set-summary'
import MobileStep2SetTitle from './step-two-set-title'

export default function MobileNewCollection() {
  const [fixedStory, setFixedStory] = useState<CollectionPickStory | null>(null)

  const { mobileStepName, collectionPickStories, setCollectionPickStories } =
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

  const getStepJsx = (stepName: MobielEditCollectionStep) => {
    switch (stepName) {
      case MobielEditCollectionStep.MobileStep1SelectStories:
        return <MobileStep1SelectStories fixedStory={fixedStory} />
      case MobielEditCollectionStep.MobileStep2SetTitle:
        return <MobileStep2SetTitle />
      case MobielEditCollectionStep.MobileStep3SetSummary:
        return <MobileStep3SetSummary />
      case MobielEditCollectionStep.MobileStep4SortStories:
        return <MobileStep4SortStories />
      default:
        return null
    }
  }

  return (
    <div className="flex w-full grow flex-col sm:mx-auto sm:max-w-screen-sm md:max-w-[740px] lg:hidden">
      <TabletNavigation />
      {getStepJsx(mobileStepName)}
    </div>
  )
}
