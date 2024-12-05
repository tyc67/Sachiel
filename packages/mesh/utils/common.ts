import Bowser from 'bowser'

export function getDeviceInfo(userAgent = '') {
  if (!userAgent) {
    return {
      name: '',
      version: '',
    }
  }
  const browser = Bowser.getParser(userAgent)
  const deviceInfo = browser.getOS()

  return { name: deviceInfo?.name ?? '', version: deviceInfo?.version ?? '' }
}

export function getBrowserInfo(userAgent = '') {
  if (!userAgent) {
    return {
      name: '',
      version: '',
    }
  }

  const browser = Bowser.getParser(userAgent)
  const browserInfo = browser.getBrowser()

  return browserInfo
}

/**
 *  Inspired by https://github.com/f2etw/detect-inapp
 */
export function detectIsInApp(userAgent = '') {
  if (!userAgent) {
    return false
  }
  const rules = [
    'WebView',
    '(iPhone|iPod|iPad)(?!.*Safari/)',
    'Android.*(wv|.0.0.0)',
  ]
  const regex = new RegExp(`(${rules.join('|')})`, 'ig')
  return Boolean(userAgent.match(regex))
}

export function getWindowSizeInfo() {
  return {
    width: document.documentElement.clientWidth || document.body.clientWidth,
    height: document.documentElement.clientHeight || document.body.clientHeight,
  }
}

export function isServer() {
  return typeof window === 'undefined'
}
