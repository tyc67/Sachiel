'use client'

import { useEffect } from 'react'
import useUserPayload from '@/hooks/use-user-payload'
import { generateUserBehaviorLogInfo } from '@/utils/generate-user-behavior-log-info'
import { sendUserBehaviorLog } from '@/utils/send-user-behavior-log'
import { isPageReload } from '@/utils/common'
import { debounce } from '@/utils/performance'

export default function UserBehaviorLogger() {
  const userPayload = useUserPayload()

  //pageview event
  useEffect(() => {
    if (isPageReload()) return

    const info = generateUserBehaviorLogInfo('pageview', userPayload)

    sendUserBehaviorLog(info)
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

  //scroll-to-80% event
  useEffect(() => {
    let ignore = false

    function detectIsScrollTo80Percent() {
      const totalPageHeight = document.body.scrollHeight
      const scrollPoint = window.scrollY + window.innerHeight
      return scrollPoint >= totalPageHeight * 0.8
    }

    const scrollToBottomEvent = debounce(() => {
      if (ignore) {
        return
      }
      const isScrollToBottom = detectIsScrollTo80Percent()
      if (isScrollToBottom) {
        const info = generateUserBehaviorLogInfo('scroll-to-80%', userPayload)
        sendUserBehaviorLog(info)
      }
    }, 500)
    window.addEventListener('scroll', scrollToBottomEvent)
    return () => {
      window.removeEventListener('scroll', scrollToBottomEvent)
    }
  }, [userPayload])

  return null
}
