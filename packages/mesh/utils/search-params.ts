/**
 * Use window.history to add search param to prevent next router reload the page
 */
export function replaceSearchParams(paramName: string, paramValue: string) {
  const searchParams = new URLSearchParams(window.location.search)
  searchParams.set(paramName, paramValue)
  window.history.replaceState(
    null,
    '',
    `${window.location.pathname}?${searchParams.toString()}`
  )
}

/**
 * Use window.history to add search param to prevent next router reload the page
 */
export function setSearchParams(paramName: string, paramValue: string) {
  const searchParams = new URLSearchParams(window.location.search)
  searchParams.set(paramName, paramValue)
  window.history.pushState(
    null,
    '',
    `${window.location.pathname}?${searchParams.toString()}`
  )
}
