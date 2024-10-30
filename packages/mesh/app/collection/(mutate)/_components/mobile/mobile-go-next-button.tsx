import MobileNavigationButton from '@/components/layout-template/navigation/mobile-navigation/mobile-navigation-button'
import { useEditCollection } from '@/context/edit-collection'

export default function MobileGoNextButton() {
  const { step, setStep, checkMobileStepFullfilled, createCollection } =
    useEditCollection()
  const isStepFullfilled = checkMobileStepFullfilled()

  const goNextStep = () => {
    setStep(step + 1)
  }

  if (!isStepFullfilled) return null

  switch (step) {
    case 0:
    case 1:
      return (
        <MobileNavigationButton
          text="下一步"
          type="text"
          onClick={goNextStep}
          color="blue"
        />
      )
    case 2:
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
