'use client'

import Button from '@/components/button'
import { useEditCollection } from '@/context/edit-collection'

import { MobielCreateCollectionStep } from '../../_types/create-collection'

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
    case MobielCreateCollectionStep.Step1SelectStories:
    case MobielCreateCollectionStep.Step2SetTitle:
      return (
        <Button
          text="下一步"
          size="lg"
          color="primary"
          disabled={!isStepFullfilled}
          onClick={goNextStep}
        />
      )
    case MobielCreateCollectionStep.Step3SetSummary:
      return (
        <Button
          text="下一步"
          size="lg"
          color="primary"
          disabled={!isStepFullfilled}
          onClick={goNextStep}
        />
      )
    case MobielCreateCollectionStep.Step4SortStories:
      return (
        <Button
          text="建立"
          size="lg"
          color="primary"
          disabled={!isStepFullfilled}
          onClick={createCollection}
        />
      )
    default:
      return null
  }
}
