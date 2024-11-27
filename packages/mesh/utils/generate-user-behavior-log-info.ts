import type { PageInfo } from '@/types/user-behavior-log'

import {
  detectIsInApp,
  getBrowserInfo,
  getDeviceInfo,
  getWindowSizeInfo,
  isServer,
} from './common'
import { displayTime } from './story-display'

const generateUserBehaviorLogInfo = (
  eventType: string,
  payload = {
    memberType: 'none-logged-in',
    email: '',
    firebaseId: '',
  }
) => {
  if (isServer()) {
    return null
  }

  const userAgent = window.navigator.userAgent
  const pathname = window.location.pathname
  const { memberType, email, firebaseId } = payload

  const triggerEvent = {
    'event-type': eventType,
    datetime: displayTime(new Date()) ?? '',
  }

  const clientInfo = {
    ip: '',
    userInfo: {
      memberType,
      email,
      firebaseId,
    },
    device: getDeviceInfo(userAgent),
    browser: getBrowserInfo(userAgent),
    isInApBrowser: detectIsInApp(userAgent),
    screenSize: getWindowSizeInfo(),
  }

  const pageInfo: PageInfo = {
    referrer: document.referrer,
    pageUrl: window.location.href,
    pageName: pathname,
  }

  if (pathname.startsWith('/story/')) {
    pageInfo['pageName'] = { storyId: pathname.split('/story/')?.[1] ?? '' }
  }

  if (pathname.startsWith('/collection/')) {
    pageInfo['pageName'] = {
      collectionId: pathname.split('/story/')?.[1] ?? '',
    }
  }

  return { triggerEvent, clientInfo, pageInfo }
}

export { generateUserBehaviorLogInfo }
