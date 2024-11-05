import { useRouter } from 'next/navigation'
import { useRef } from 'react'

import Dialog from '@/components/dialog'
import GoBackButton from '@/components/navigation/go-back-button'
import { useEditCollection } from '@/context/edit-collection'

import { DesktopEditCollectionStep } from '../../_types/edit-collection'

export default function DesktopGoBackButton() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const router = useRouter()
  const { setStep, desktopStepName } = useEditCollection()

  const onGoBackClicked = () => {
    if (desktopStepName === DesktopEditCollectionStep.DesktopStep1EditAll) {
      dialogRef.current?.showModal()
    } else {
      setStep((step) => step - 1)
    }
  }

  return (
    <>
      <GoBackButton customAction={onGoBackClicked} />
      <Dialog
        ref={dialogRef}
        title="確認要退出編輯？"
        description="系統不會儲存您所做的變更"
        primayAction={{
          text: '繼續編輯',
          action: () => {
            dialogRef.current?.close()
          },
        }}
        secondaryAction={{
          text: '退出',
          action: () => {
            router.back()
          },
        }}
      />
    </>
  )
}
