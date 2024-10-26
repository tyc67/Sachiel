'use client'

import { useRouter } from 'next/navigation'

import Icon from '../icon'

export default function GoBackButton({
  customAction,
}: {
  customAction?: () => void
}) {
  const router = useRouter()
  const backToPreviousPage = () => {
    router.back()
  }

  return (
    <button
      type="button"
      className="flex size-11 items-center justify-center sm:size-6"
      onClick={customAction ?? backToPreviousPage}
    >
      <Icon iconName="icon-chevron-left" size="m" />
    </button>
  )
}
