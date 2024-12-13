import { type RequestInit } from 'next/dist/server/web/spec-extension/request'

import { type TraceObject, logServerSideError } from './log'

export default async function fetchStatic<T>(
  url: string | URL | Request,
  init?: RequestInit,
  traceObject?: TraceObject,
  errorMessage?: string
): Promise<T | null> {
  try {
    const response = await fetch(url, init)
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`)
    }

    const contentType = response.headers.get('Content-Type')

    if (contentType?.includes('text/html')) {
      return (await response.text()) as T
    } else if (contentType?.includes('application/json')) {
      return await response.json()
    } else {
      throw new Error(`Unsupported Content-Type: ${contentType}`)
    }
  } catch (error) {
    const fallbackErrorMessage =
      'Fetch static failed, info: ' + JSON.stringify({ url, init })
    logServerSideError(error, errorMessage || fallbackErrorMessage, traceObject)
    return null
  }
}
