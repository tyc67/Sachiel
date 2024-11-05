'use server'

import { RESTFUL_ENDPOINTS } from '@/constants/config'
import {
  GetSentInvitationCodesDocument,
  GetValidInvitationCodesDocument,
  InvalidateInvitationCodeDocument,
  IsInvitationCodeValidDocument,
  UpdateMemberInvitedByDocument,
} from '@/graphql/__generated__/graphql'
import fetchGraphQL, { mutateGraphQL } from '@/utils/fetch-graphql'
import { fetchRestfulPost } from '@/utils/fetch-restful'
import { getLogTraceObjectFromHeaders, logServerSideError } from '@/utils/log'

async function isInvitationCodeValid(code: string) {
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

async function getValidInvitationCodes(memberId: string) {
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

async function getSentInvitationCodes(memberId: string) {
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

async function invalidateInvitationCode(codeId: string, memberId: string) {
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
      `Failed to invalidate invitation code ${codeId} and link data to member ${memberId}`,
      globalLogFields
    )
    return null
  }
}

async function generateInvitationCodes() {
  return await fetchRestfulPost(
    RESTFUL_ENDPOINTS.invitationCodes,
    {},
    { cache: 'no-cache' },
    `Failed to generate 5 invitation codes`
  )
}

export {
  generateInvitationCodes,
  getSentInvitationCodes,
  getValidInvitationCodes,
  invalidateInvitationCode,
  isInvitationCodeValid,
}
