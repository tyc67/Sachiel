'use server'

import { RESTFUL_ENDPOINTS } from '@/constants/config'
import { type SearchResults, SearchResultsSchema } from '@/utils/data-schema'
import { fetchRestfulPost } from '@/utils/fetch-restful'
import { logServerSideError } from '@/utils/log'

export async function search(queryText: string) {
  const data = await fetchRestfulPost<SearchResults>(
    RESTFUL_ENDPOINTS.search,
    {
      text: queryText,
      objectives: ['member', 'collection'],
    },
    {
      cache: 'no-cache',
    }
  )

  const result = SearchResultsSchema.safeParse(data)

  if (result.success) {
    return result.data
  } else {
    logServerSideError(
      result.error.errors,
      'validate search result raw data errors'
    )
    return null
  }
}
