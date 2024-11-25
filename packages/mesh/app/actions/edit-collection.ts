'use server'

import { GetMemberPickAndBookmarkDocument } from '@/graphql/__generated__/graphql'
import queryGraphQL from '@/utils/fetch-graphql'
import { getLogTraceObjectFromHeaders } from '@/utils/log'

export async function getMemberPickAndBookmark({
  memberId,
  pickTake,
  pickSkip,
  bookmarkTake,
  bookmarkSkip,
}: {
  memberId: string
  pickTake: number
  pickSkip: number
  bookmarkTake: number
  bookmarkSkip: number
}) {
  const globalLogFields = getLogTraceObjectFromHeaders()
  return await queryGraphQL(
    GetMemberPickAndBookmarkDocument,
    {
      memberId,
      pickTake,
      pickSkip,
      bookmarkTake,
      bookmarkSkip,
    },
    globalLogFields
  )
}
