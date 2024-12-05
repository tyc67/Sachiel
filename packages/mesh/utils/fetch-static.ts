import { type RequestInit } from 'next/dist/server/web/spec-extension/request'

import { type TraceObject, logServerSideError } from './log'

export default async function fetchStatic<T>(
  url: string | URL | Request,
  init?: RequestInit,
  traceObject?: TraceObject,
  errorMessage?: string,
  responseType: 'json' | 'text' = 'json'
) {
  try {
    const response = await fetch(url, init)
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`)
    }

    let data: T

    if (responseType === 'text') {
      data = (await response.text()) as T
    } else {
      data = await response.json()
    }

    return data
  } catch (error) {
    const fallbackErrorMessage =
      'Fetch static failed, info: ' + JSON.stringify({ url, init })
    logServerSideError(error, errorMessage || fallbackErrorMessage, traceObject)
    return null
  }
}
