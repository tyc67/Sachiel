import { useRouter } from 'next/navigation'

import GoBackButton from '@/components/navigation/go-back-button'
import { useEditCollection } from '@/context/edit-collection'

export default function MobileGoBackButton() {
  const router = useRouter()
  const { step, setStep } = useEditCollection()

  const onGoBackClicked = () => {
    if (step === 0) {
      router.back()
    } else {
      setStep(step - 1)
    }
  }
  return <GoBackButton customAction={onGoBackClicked} />
}
