'use server'

import { type Abi } from '@alchemy/aa-core'
import { type Hex } from 'viem'

import { RESTFUL_ENDPOINTS, STATIC_FILE_ENDPOINTS } from '@/constants/config'
import { SECOND } from '@/constants/time-unit'
import { fetchRestfulPost } from '@/utils/fetch-restful'
import fetchStatic from '@/utils/fetch-static'
import { getLogTraceObjectFromHeaders, logServerSideError } from '@/utils/log'

export async function getMeshPointContract() {
  return await fetchStatic<{ abi: Abi }>(STATIC_FILE_ENDPOINTS.contract)
}

export type CreatePaymentProps = {
  action:
    | 'unlock_story_single'
    | 'unlock_story_media'
    | 'unlock_all'
    | 'sponsor_media'
    | 'exchange_media'
  memberId: string
  policyId?: string
  storyId?: string
  publisherId?: string
  fee?: string
}

export async function createPayment(paymentPayload: CreatePaymentProps) {
  return await fetchRestfulPost<{ id: string; status: string }>(
    RESTFUL_ENDPOINTS.paymentCreate,
    paymentPayload,
    { cache: 'no-cache' },
    'Failed to create payment'
  )
}

export type UpdatePaymentProps = {
  action:
    | 'unlock_story_single'
    | 'unlock_story_media'
    | 'unlock_all'
    | 'sponsor_media'
    | 'exchange_media'
  memberId: string
  objective: 'transaction' | 'sponsorship' | 'exchange'
  targetId: string
  tid: Hex
}

export async function updatePayment(paymentPayload: UpdatePaymentProps) {
  const globalLogFields = getLogTraceObjectFromHeaders()
  const maxRetries = 3
  let attempt = 0

  while (attempt < maxRetries) {
    const paymentAuthResponse = await fetchRestfulPost(
      RESTFUL_ENDPOINTS.paymentAuth,
      paymentPayload,
      { cache: 'no-cache' },
      'Failed to update payment'
    )

    if (paymentAuthResponse === 'success') {
      return paymentAuthResponse
    }

    attempt += 1

    if (attempt < maxRetries) {
      await new Promise((resolve) => setTimeout(resolve, SECOND))
    }
  }

  logServerSideError(
    'error',
    `Failed to update payment after ${maxRetries} attempts`,
    globalLogFields
  )
}
