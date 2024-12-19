'use server'
import { STATIC_FILE_ENDPOINTS } from '@/constants/config'
import fetchStatic from '@/utils/fetch-static'
import { getLogTraceObjectFromHeaders } from '@/utils/log'

async function fetchTermsOfService() {
  const globalLogFields = getLogTraceObjectFromHeaders()
  const data = await fetchStatic<string>(
    STATIC_FILE_ENDPOINTS.termsOfService,
    undefined,
    globalLogFields,
    'Error occurs while fetching terms of service'
  )
  return data
}

async function fetchPrivacyPolicy() {
  const globalLogFields = getLogTraceObjectFromHeaders()
  const data = await fetchStatic<string>(
    STATIC_FILE_ENDPOINTS.privacyPolicy,
    undefined,
    globalLogFields,
    'Error occurs while fetching privacy policy'
  )
  return data
}

export { fetchPrivacyPolicy, fetchTermsOfService }
