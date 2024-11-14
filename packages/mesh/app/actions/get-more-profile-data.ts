'use server'
import { z } from 'zod'

import {
  GetMoreBookmarksDocument,
  GetMorePicksDocument,
} from '@/graphql/__generated__/graphql'
import fetchGraphQL from '@/utils/fetch-graphql'
import { getLogTraceObjectFromHeaders } from '@/utils/log'

const getMoreMemberPicksSchema = z.object({
  customId: z.string(),
  takes: z.number().default(20),
  start: z.number().default(0),
})

/**
 * 在個人檔案頁中無限滾動拿取更多精選
 */
export const getMoreMemberPicks = async (
  params: z.infer<typeof getMoreMemberPicksSchema>
) => {
  // Validate the input parameters
  const { customId, takes, start } = getMoreMemberPicksSchema.parse(params)

  const globalLogFields = getLogTraceObjectFromHeaders()

  const response = await fetchGraphQL(
    GetMorePicksDocument,
    { customId, takes, start },
    globalLogFields,
    'Failed to get more member picks'
  )
  const pickList =
    response?.picks?.filter((item) => item.objective === 'story') ?? []
  return pickList
}

export const getMoreMemberBookmarks = async (
  params: z.infer<typeof getMoreMemberPicksSchema>
) => {
  // Validate the input parameters
  const { customId, takes, start } = getMoreMemberPicksSchema.parse(params)

  const globalLogFields = getLogTraceObjectFromHeaders()

  const response = await fetchGraphQL(
    GetMoreBookmarksDocument,
    { customId, takes, start },
    globalLogFields,
    'Failed to get more member picks'
  )
  const bookmarkList = response?.picks ?? []
  return bookmarkList
}
