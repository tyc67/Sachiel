'use client'

import Button from '@/components/button'
import { useEditCollection } from '@/context/edit-collection'

import { DesktopCreateCollectionStep } from '../../_types/create-collection'

export default function DesktopGoNextButton() {
  const {
    setStep,
    desktopStepName,
    checkDesktopStepFullfilled,
    createCollection,
  } = useEditCollection()

  const isStepFullfilled = checkDesktopStepFullfilled()

  const goNextStep = () => {
    setStep((step) => step + 1)
  }

  switch (desktopStepName) {
    case DesktopCreateCollectionStep.Step1EditAll:
      return (
        <Button
          onClick={goNextStep}
          disabled={!isStepFullfilled}
          size="lg"
          color="primary"
          text="下一步"
        />
      )
    case DesktopCreateCollectionStep.Step2SortStories:
      return (
        <Button
          onClick={createCollection}
          disabled={!isStepFullfilled}
          size="lg"
          color="primary"
          text="建立"
        />
      )

    default:
      return null
  }
}
