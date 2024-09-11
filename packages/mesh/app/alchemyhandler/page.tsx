'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import Spinner from '@/components/spinner'

export default function Page() {
  const router = useRouter()

  useEffect(() => {
    const route = localStorage.getItem('alchemy-redirect')
    if (route) {
      router.push(route)
    }
  }, [router])

  return (
    <body>
      <main className="flex h-dvh justify-center">
        <Spinner />
      </main>
    </body>
  )
}
