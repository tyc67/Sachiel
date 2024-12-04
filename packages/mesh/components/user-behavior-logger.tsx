'use client'

import throttle from 'raf-throttle'
import { useEffect } from 'react'

import useUserPayload from '@/hooks/use-user-payload'
import { isPageReload } from '@/utils/common'
import { generateUserBehaviorLogInfo } from '@/utils/generate-user-behavior-log-info'
import { sendUserBehaviorLog } from '@/utils/send-user-behavior-log'

export default function UserBehaviorLogger() {
  const userPayload = useUserPayload()

  //pageview event
  useEffect(() => {
    if (isPageReload()) return

    const info = generateUserBehaviorLogInfo('pageview', userPayload)
    if (info) {
      sendUserBehaviorLog(info)
    }
  }, [userPayload])

  //exit event
  useEffect(() => {
    if (isPageReload()) return

    const info = generateUserBehaviorLogInfo('exit', userPayload)

    let hasEventTriggered = false

    const beforeLeavingPage = () => {
      if (!hasEventTriggered) {
        hasEventTriggered = true
        sendUserBehaviorLog(info)
      }
    }

    window.addEventListener('beforeunload', beforeLeavingPage)

    return () => {
      window.removeEventListener('beforeunload', beforeLeavingPage)
    }
  }, [userPayload])

  // scroll event (50%、80%)
  useEffect(() => {
    let hasScrolledTo50 = false
    let hasScrolledTo80 = false

    function detectScrollPercentage() {
      const totalPageHeight = document.body.scrollHeight
      const scrollPoint = window.scrollY + window.innerHeight
      const scrollPercent = scrollPoint / totalPageHeight

      return scrollPercent
    }

    const handleScroll = throttle(() => {
      const scrollPercent = detectScrollPercentage()

      if (!hasScrolledTo50 && scrollPercent >= 0.5) {
        hasScrolledTo50 = true
        const info50 = generateUserBehaviorLogInfo('scroll-to-50%', userPayload)
        sendUserBehaviorLog(info50)
      }

      if (!hasScrolledTo80 && scrollPercent >= 0.8) {
        hasScrolledTo80 = true
        const info80 = generateUserBehaviorLogInfo('scroll-to-80%', userPayload)
        sendUserBehaviorLog(info80)
      }
    })

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [userPayload])

  return null
}
