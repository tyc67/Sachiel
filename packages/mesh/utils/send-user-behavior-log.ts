import type { UserBehaviorLogInfo } from '@/types/user-behavior-log'

const sendLog = (log: UserBehaviorLogInfo, target: string) => {
  const blob = new Blob([JSON.stringify(log)], {
    type: 'application/json; charset=UTF-8',
  })
  navigator.sendBeacon(target, blob)
}

const sendUserBehaviorLog = (log: UserBehaviorLogInfo) =>
  sendLog(log, '/api/tracking')

export { sendUserBehaviorLog }
