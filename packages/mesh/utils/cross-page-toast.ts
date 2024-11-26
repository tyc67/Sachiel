import type { Toast } from '@/context/toast'

const toastsKey = 'toasts'

export function getCrossPageToast() {
  try {
    const toasts: Toast[] | null = JSON.parse(
      localStorage.getItem(toastsKey) ?? 'null'
    )
    return toasts
  } catch (error) {
    console.error(
      `toastsKey in localStorage in not a valid JSON string: "${localStorage.getItem(
        toastsKey
      )}"`,
      error
    )
    return null
  }
}

export function setCrossPageToast(toast: Toast) {
  const toasts = getCrossPageToast()

  if (toasts) {
    toasts.push(toast)
    localStorage.setItem(toastsKey, JSON.stringify(toasts))
  } else {
    localStorage.setItem(toastsKey, JSON.stringify([toast]))
  }
}

export function clearCrossPageToasts() {
  localStorage.removeItem(toastsKey)
}
