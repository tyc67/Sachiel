const sendLog = (log, target) => {
  const blob = new Blob([JSON.stringify(log)], {
    type: 'application/json; charset=UTF-8',
  })
  navigator.sendBeacon(target, blob)
}

const sendUserBehaviorLog = (log) => sendLog(log, '/api/tracking')

export { sendUserBehaviorLog }
