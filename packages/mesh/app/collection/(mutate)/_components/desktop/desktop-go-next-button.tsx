'use client'

import Button from '@/components/button'
import { useEditCollection } from '@/context/edit-collection'

import { DesktopEditCollectionStep } from '../../_types/edit-collection'

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
    case DesktopEditCollectionStep.DesktopStep1EditAll:
      return (
        <Button
          onClick={goNextStep}
          disabled={!isStepFullfilled}
          size="lg"
          color="primary"
          text="下一步"
        />
      )
    case DesktopEditCollectionStep.DesktopStep2SortStories:
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
