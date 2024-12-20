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

export type SplitNotificationResult = {
  current: NonNullable<NotificationData>['notifies']
  prev: NonNullable<NotificationData>['notifies']
}

export default function NotificationWrapper() {
  const { user } = useUser()
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false)
  const [hasNewNotification, setHasNewNotification] = useState(false)
  const [notificationData, setNotificationData] =
    useState<SplitNotificationResult | null>(null)
  const [announcementData, setAnnouncementData] =
    useState<AnnouncementData>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const memberId = user.memberId

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
    if (!memberId || isNotificationModalOpen) return
    fetchData()

    intervalRef.current = setInterval(fetchData, MINUTE)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [fetchData, isNotificationModalOpen, memberId])

  const handleToggleModal = async () => {
    if (!isNotificationModalOpen) {
      await readNotification(memberId)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      } else {
        intervalRef.current = setInterval(fetchData, MINUTE)
      }
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
