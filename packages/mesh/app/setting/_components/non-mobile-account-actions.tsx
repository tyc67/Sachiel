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

export default function NonMobileAccountActions() {
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
    <section className="body-2 hidden w-articleMain rounded-xl bg-single-layer text-primary-700 shadow-[0_0_4px_0_rgba(0,9,40,0.1),0_2px_2px_0_rgba(0,9,40,0.1)] sm:block">
      <div className="flex justify-between border-b-[0.5px] border-b-primary-800 border-opacity-10 px-10 py-8">
        <p>{user.email}</p>
        {iconName && <Icon iconName={iconName} size="m" />}
      </div>
      <div className="px-10 pb-9 pt-4">
        <p>{ACTION_NAMES[0]}</p>
        <Divider />
        <p>
          <Link href="/contact">{ACTION_NAMES[1]}</Link>
        </p>
        <Divider />
        <p>{ACTION_NAMES[2]}</p>
        <Divider />
        <p>{ACTION_NAMES[3]}</p>
        <Divider />
        <p className="text-custom-red-text">{ACTION_NAMES[4]}</p>
      </div>
    </section>
  )
}
