import Button from '@/components/button'
import { useEditCollection } from '@/context/edit-collection'

export default function TabletGoNextButton() {
  const { step, setStep, checkMobileStepFullfilled, createCollection } =
    useEditCollection()

  const isStepFullfilled = checkMobileStepFullfilled()

  const goNextStep = () => {
    setStep(step + 1)
  }

  switch (step) {
    case 0:
    case 1:
      return (
        <Button
          text="下一步"
          size="lg"
          color="primary"
          disabled={!isStepFullfilled}
          onClick={goNextStep}
        />
      )
    case 2:
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
