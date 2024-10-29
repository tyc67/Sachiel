'use server'

import {
  GetSentInvitationCodesDocument,
  GetValidInvitationCodesDocument,
  InvalidateInvitationCodeDocument,
  IsInvitationCodeValidDocument,
  UpdateMemberInvitedByDocument,
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
    `Failed to get ${memberId} valid invitation codes`
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
    `Failed to get sent invitation codes for ${memberId}`
  )

  if (!response) {
    return null
  }

  return response.invitationCodes ?? []
}

export async function invalidateInvitationCode(
  codeId: string,
  memberId: string
) {
  const globalLogFields = getLogTraceObjectFromHeaders()
  try {
    const invalidateInvitationCodeResponse = await mutateGraphQL(
      InvalidateInvitationCodeDocument,
      {
        codeId,
        memberId,
      }
    )
    const updateMemberInviteByResponse = await mutateGraphQL(
      UpdateMemberInvitedByDocument,
      {
        codeId,
        memberId,
      }
    )

    return {
      invitationCode: invalidateInvitationCodeResponse?.updateInvitationCode,
      memberInviteBy: updateMemberInviteByResponse?.updateMember,
    }
  } catch (error) {
    logServerSideError(
      error,
      `Failed to invalidate invitation code: ${codeId}`,
      globalLogFields
    )
    return null
  }
}
