'use server'

import { STATIC_FILE_ENDPOINTS } from '@/constants/config'
import fetchStatic from '@/utils/fetch-static'
import { getLogTraceObjectFromHeaders, logServerSideError } from '@/utils/log'

export async function getInvalidNameList() {
  const globalLogFields = getLogTraceObjectFromHeaders()

  try {
    return await fetchStatic<string[]>(STATIC_FILE_ENDPOINTS.invalidNameList, {
      next: { revalidate: 10 },
    })
  } catch (error) {
    logServerSideError(
      error,
      'Error: Fail to get invalid name lists',
      globalLogFields
    )
    return null
  }
}
