import MobileNavigationButton from '@/components/layout-template/navigation/mobile-navigation/mobile-navigation-button'
import { useEditCollection } from '@/context/edit-collection'

import { MobielEditCollectionStep } from '../../_types/edit-collection'

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
    case MobielEditCollectionStep.MobileStep1SelectStories:
    case MobielEditCollectionStep.MobileStep2SetTitle:
      return (
        <MobileNavigationButton
          text="下一步"
          type="text"
          onClick={goNextStep}
          color="blue"
        />
      )
    case MobielEditCollectionStep.MobileStep3SetSummary:
      return (
        <MobileNavigationButton
          text="建立"
          type="text"
          onClick={createCollection}
          color="blue"
        />
      )
    // TODO: implement in phase2
    // case MobielEditCollectionStep.MobileStep4SortStories:
    //   return null
    default:
      return null
  }
}
