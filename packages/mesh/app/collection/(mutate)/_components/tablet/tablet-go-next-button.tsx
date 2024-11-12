'use client'

import Button from '@/components/button'
import { useEditCollection } from '@/context/edit-collection'

import { MobielEditCollectionStep } from '../../_types/edit-collection'

export default function TabletGoNextButton() {
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

  switch (mobileStepName) {
    case MobielEditCollectionStep.MobileStep1SelectStories:
    case MobielEditCollectionStep.MobileStep2SetTitle:
      return (
        <Button
          text="下一步"
          size="lg"
          color="primary"
          disabled={!isStepFullfilled}
          onClick={goNextStep}
        />
      )
    case MobielEditCollectionStep.MobileStep3SetSummary:
      return (
        <Button
          text="建立"
          size="lg"
          color="primary"
          disabled={!isStepFullfilled}
          onClick={createCollection}
        />
      )
    // TODO: implement in phase2
    // case MobielEditCollectionStep.MobileStep4SortStories:
    //   return null
    default:
      return null
  }
}
