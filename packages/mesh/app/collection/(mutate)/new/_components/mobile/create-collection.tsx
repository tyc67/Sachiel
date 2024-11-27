'use client'

import { useEffect, useState } from 'react'

import type { CollectionPickStory } from '@/app/collection/(mutate)/_types/collection'
import { useEditCollection } from '@/context/edit-collection'
import { getCrossPageCollectinPickStory } from '@/utils/cross-page-create-collection'

import { MobielCreateCollectionStep } from '../../_types/create-collection'
import TabletNavigation from '../tablet/navigation'
import MobileStep4SortStories from './steps/step-four-sort-stories'
import MobileStep1SelectStories from './steps/step-one-select-stories'
import MobileStep3SetSummary from './steps/step-three-set-summary'
import MobileStep2SetTitle from './steps/step-two-set-title'

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

  const getStepJsx = (stepName: MobielCreateCollectionStep) => {
    switch (stepName) {
      case MobielCreateCollectionStep.Step1SelectStories:
        return <MobileStep1SelectStories fixedStory={fixedStory} />
      case MobielCreateCollectionStep.Step2SetTitle:
        return <MobileStep2SetTitle />
      case MobielCreateCollectionStep.Step3SetSummary:
        return <MobileStep3SetSummary />
      case MobielCreateCollectionStep.Step4SortStories:
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
