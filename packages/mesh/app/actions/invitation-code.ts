'use server'

import {
  GetSentInvitationCodesDocument,
  GetValidInvitationCodesDocument,
  InvalidateInvitationCodeDocument,
  IsInvitationCodeValidDocument,
} from '@/graphql/__generated__/graphql'
import fetchGraphQL, { mutateGraphQL } from '@/utils/fetch-graphql'
import { getLogTraceObjectFromHeaders, logServerSideError } from '@/utils/log'

export async function isInvitationCodeValid(code: string) {
  const globalLogFields = getLogTraceObjectFromHeaders()
  const response = await fetchGraphQL(
    IsInvitationCodeValidDocument,
    { code },
    globalLogFields,
    'Failed to get match invitation code'
  )

  if (!response) {
    return null
  }

  return response.invitationCodes ?? []
}

export async function getValidInvitationCodes(memberId: string) {
  const globalLogFields = getLogTraceObjectFromHeaders()

  const response = await fetchGraphQL(
    GetValidInvitationCodesDocument,
    { memberId },
    globalLogFields,
    'Failed to get valid invitation codes'
  )

  if (!response) {
    return null
  }

  return response.invitationCodes ?? []
}

export async function getSentInvitationCodes(memberId: string) {
  const globalLogFields = getLogTraceObjectFromHeaders()

  const response = await fetchGraphQL(
    GetSentInvitationCodesDocument,
    { memberId },
    globalLogFields,
    'Failed to get sent invitation codes'
  )

  if (!response) {
    return null
  }

  return response.invitationCodes ?? []
}

export async function invalidateInvitationCode(codeId: string) {
  const globalLogFields = getLogTraceObjectFromHeaders()
  try {
    const response = await mutateGraphQL(InvalidateInvitationCodeDocument, {
      id: codeId,
    })
    return response?.updateInvitationCode
  } catch (error) {
    logServerSideError(
      error,
      'Failed to invalidate invitation code',
      globalLogFields
    )
    return null
  }
}
