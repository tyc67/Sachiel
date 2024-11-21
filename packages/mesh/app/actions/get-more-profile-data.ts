'use server'
import { z } from 'zod'

import {
  GetMoreBookmarksDocument,
  GetMoreCollectionsDocument,
  GetMorePicksDocument,
} from '@/graphql/__generated__/graphql'
import fetchGraphQL from '@/utils/fetch-graphql'
import { getLogTraceObjectFromHeaders, logServerSideError } from '@/utils/log'

const getMoreMemberDataArgsSchema = z.object({
  customId: z.string(),
  takes: z.number().default(20),
  start: z.number().default(0),
})

/**
 * 在個人檔案頁中無限滾動拿取更多精選
 */
export const getMoreMemberPicks = async (
  params: z.infer<typeof getMoreMemberDataArgsSchema>
) => {
  const parseResult = getMoreMemberDataArgsSchema.safeParse(params)
  const globalLogFields = getLogTraceObjectFromHeaders()
  if (!parseResult.success) {
    logServerSideError(parseResult.error, 'Invalid parameters', globalLogFields)
    return []
  }

  const { customId, takes, start } = parseResult.data

  try {
    const response = await fetchGraphQL(
      GetMorePicksDocument,
      { customId, takes, start },
      globalLogFields,
      'Failed to get more member picks'
    )

    return response?.picks?.filter((item) => item.objective === 'story') ?? []
  } catch (error) {
    console.error('Failed to fetch picks:', error)
    return []
  }
}

/**
 * 在個人檔案頁中無限滾動拿取更多集錦
 */
export const getMoreMemberBookmarks = async (
  params: z.infer<typeof getMoreMemberDataArgsSchema>
) => {
  // Validate the input parameters
  const parseResult = getMoreMemberDataArgsSchema.safeParse(params)
  const globalLogFields = getLogTraceObjectFromHeaders()
  if (!parseResult.success) {
    logServerSideError(parseResult.error, 'Invalid parameters', globalLogFields)
    return []
  }
  const { customId, takes, start } = parseResult.data

  const response = await fetchGraphQL(
    GetMoreBookmarksDocument,
    { customId, takes, start },
    globalLogFields,
    'Failed to get more member bookmarks'
  )
  const bookmarkList = response?.picks ?? []
  return bookmarkList
}

export const getMoreMemberCollections = async (
  params: z.infer<typeof getMoreMemberDataArgsSchema>
) => {
  // Validate the input parameters
  const globalLogFields = getLogTraceObjectFromHeaders()
  const parseResult = getMoreMemberDataArgsSchema.safeParse(params)
  if (!parseResult.success) {
    logServerSideError(parseResult.error, 'Invalid parameters', globalLogFields)
    return []
  }

  const { customId, takes, start } = parseResult.data

  const response = await fetchGraphQL(
    GetMoreCollectionsDocument,
    { customId, takes, start },
    globalLogFields,
    'Failed to get more member collections'
  )
  const collectionList = response?.picks ?? []
  return collectionList
}
