import { type RequestInit } from 'next/dist/server/web/spec-extension/request'

import { type TraceObject, logServerSideError } from './log'

export default async function fetchStatic<T>(
  url: string | URL | Request,
  init?: RequestInit,
  traceObject?: TraceObject,
  errorMessage?: string
) {
  try {
    const response = await fetch(url, init)
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`)
    }

    const contentType = response.headers.get('Content-type')
    let data: T

    if (contentType?.includes('text/html')) {
      data = (await response.text()) as T
    } else if (contentType?.includes('application/json')) {
      data = await response.json()
    } else {
      throw new Error(`Unsupported Content-Type: ${contentType}`)
    }
    return data
  } catch (error) {
    const fallbackErrorMessage =
      'Fetch static failed, info: ' + JSON.stringify({ url, init })
    logServerSideError(error, errorMessage || fallbackErrorMessage, traceObject)
    return null
  }
}
