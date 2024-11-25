'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import getAllPublishers from '@/app/actions/get-all-publishers'
import { PaymentType } from '@/types/payment'

import Button from '../button'

export default function PublisherDonateButton({
  publisherId,
}: {
  publisherId: string
}) {
  const router = useRouter()
  const [isWalletAvailable, setIsWalletAvailable] = useState(false)

  useEffect(() => {
    const init = async () => {
      const allPublishers = await getAllPublishers()
      const publisher = allPublishers?.find(
        (publisher) => publisher.id === publisherId
      )

      setIsWalletAvailable(!!publisher?.wallet)
    }

    init()
  }, [publisherId])

  const handleClickDonate = () => {
    router.push(`/payment/${PaymentType.Sponsor}/${publisherId}`)
  }

  return (
    <Button
      size="sm"
      color="custom-blue"
      icon={{ iconName: 'icon-donate', size: 's' }}
      text="贊助"
      onClick={handleClickDonate}
      disabled={!isWalletAvailable}
    />
  )
}
