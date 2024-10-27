'use client'

import { onAuthStateChanged } from 'firebase/auth'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import type { IconName } from '@/components/icon'
import Icon from '@/components/icon'
import { ACTION_NAMES } from '@/constants/config'
import { useUser } from '@/context/user'
import { auth } from '@/firebase/client'

import Divider from './divider'

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-y-[0.5px] border-y-primary-800 border-opacity-10 bg-single-layer px-5 py-4 first:border-t-0">
      {children}
    </div>
  )
}

export default function MobileAccountActions() {
  const [logInMethodName, setlogInMethodName] = useState('')
  const { user } = useUser()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setlogInMethodName(user.providerData[0].providerId)
      } else {
        setlogInMethodName('')
      }
    })

    return () => unsubscribe()
  }, [])

  const iconMap: { [key: string]: IconName } = {
    'google.com': 'icon-google',
    'facebook.com': 'icon-facebook',
    'apple.com': 'icon-apple',
  }

  const iconName = iconMap[logInMethodName] || null

  return (
    <section className="body-2 flex flex-col gap-y-3  text-primary-700 sm:hidden">
      <Container>
        <div className="flex justify-between">
          <p>{user.email}</p>
          {iconName && <Icon iconName={iconName} size="m" />}
        </div>
      </Container>
      <Container>{ACTION_NAMES[0]}</Container>
      <Container>
        <p>
          <Link href="/contact">{ACTION_NAMES[1]}</Link>
        </p>
        <Divider />
        <p>{ACTION_NAMES[2]}</p>
      </Container>
      <Container>
        <p>{ACTION_NAMES[3]}</p>
        <Divider />
        <p className="text-custom-red-text">{ACTION_NAMES[4]}</p>
      </Container>
    </section>
  )
}
