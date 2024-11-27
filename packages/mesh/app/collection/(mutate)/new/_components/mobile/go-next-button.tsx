'use client'

import MobileNavigationButton from '@/components/layout-template/navigation/mobile-navigation/mobile-navigation-button'
import { useEditCollection } from '@/context/edit-collection'

import { MobielCreateCollectionStep } from '../../_types/create-collection'

export default function MobileGoNextButton() {
  const {
    mobileStepName,
    setStep,
    checkMobileStepFullfilled,
    createCollection,
  } = useEditCollection()
  const isStepFullfilled = checkMobileStepFullfilled()

  const goNextStep = () => {
    setStep((step) => step + 1)
  }

  if (!isStepFullfilled) return null

  switch (mobileStepName) {
    case MobielCreateCollectionStep.Step1SelectStories:
    case MobielCreateCollectionStep.Step2SetTitle:
      return (
        <MobileNavigationButton
          text="下一步"
          type="text"
          onClick={goNextStep}
          color="blue"
        />
      )
    case MobielCreateCollectionStep.Step3SetSummary:
      return (
        <MobileNavigationButton
          text="下一步"
          type="text"
          onClick={goNextStep}
          color="blue"
        />
      )
    case MobielCreateCollectionStep.Step4SortStories:
      return (
        <MobileNavigationButton
          text="建立"
          type="text"
          onClick={createCollection}
          color="blue"
        />
      )
    default:
      return null
  }
}
