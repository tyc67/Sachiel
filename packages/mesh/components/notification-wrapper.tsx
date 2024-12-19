import { useCallback, useEffect, useRef, useState } from 'react'

import {
  getAnnouncement,
  getNotification,
  readNotification,
} from '@/app/actions/notification'
import {
  type AnnouncementData,
  type NotificationData,
} from '@/app/actions/notification'
import { MINUTE } from '@/constants/time-unit'
import { useUser } from '@/context/user'

import Icon from './icon'
import NotificationDropdown from './notification-dropdown'

export default function NotificationWrapper() {
  const { user } = useUser()
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false)
  const [hasNewNotification, setHasNewNotification] = useState(false)
  const [notificationData, setNotificationData] =
    useState<SplitNotificationResult | null>(null)
  const [announcementData, setAnnouncementData] =
    useState<AnnouncementData>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const memberId = user.memberId

  useEffect(() => {
    if (isNotificationModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isNotificationModalOpen])

  const fetchData = useCallback(async () => {
    if (!memberId) return

    const [notificationResponse, announcementResponse] = await Promise.all([
      getNotification({ member_id: memberId, index: 0, take: 10 }),
      getAnnouncement(),
    ])

    if ((notificationResponse?.notifies ?? []).length > 0) {
      const splittedData = splitNotification(notificationResponse)
      setNotificationData(splittedData)
      if (splittedData.current.length) {
        setHasNewNotification(true)
      }
    }
    if (announcementResponse) {
      setAnnouncementData(announcementResponse)
    }
  }, [memberId])

  useEffect(() => {
    if (!memberId) return
    fetchData()

    const interval = setInterval(fetchData, MINUTE)

    return () => {
      clearInterval(interval)
    }
  }, [fetchData, memberId])

  const handleToggleModal = async () => {
    if (!isNotificationModalOpen) {
      await readNotification(memberId)
    }
    setIsNotificationModalOpen((prev) => !prev)
  }

  return (
    <>
      <button
        className={hasNewNotification ? 'rounded-[50%] bg-primary-100' : ''}
        onClick={handleToggleModal}
        aria-label="Open notification modal"
        aria-haspopup="dialog"
        aria-expanded={isNotificationModalOpen}
        ref={buttonRef}
      >
        <Icon
          size="2xl"
          iconName={
            hasNewNotification ? 'icon-notifications-new' : 'icon-notifications'
          }
        />
      </button>
      <NotificationDropdown
        isOpen={isNotificationModalOpen}
        buttonRef={buttonRef}
        onClose={() => setIsNotificationModalOpen(false)}
        notification={notificationData}
        announcement={announcementData}
      />
    </>
  )
}

export type SplitNotificationResult = {
  current: NonNullable<NotificationData>['notifies']
  prev: NonNullable<NotificationData>['notifies']
}

const splitNotification = (notification: NotificationData) => {
  if (!notification) return { current: [], prev: [] }

  const { lrt, notifies } = notification

  return notifies.reduce<SplitNotificationResult>(
    (acc, notify) => {
      if (notify.ts > lrt) {
        acc.current.push(notify)
      } else {
        acc.prev.push(notify)
      }
      return acc
    },
    { current: [], prev: [] }
  )
}