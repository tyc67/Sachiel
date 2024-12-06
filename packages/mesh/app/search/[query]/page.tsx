import { notFound } from 'next/navigation'

import { search } from '@/app/actions/search'

import SearchFilter from '../_components/search-filter'

export default async function SearchResultPage({
  params,
}: {
  params: { query: string }
}) {
  const { query } = params
  const decodedQuery = decodeURIComponent(query)

  const results = await search(decodedQuery, [
    'story',
    'collection',
    'member',
    'publisher',
  ])

  if (!results) {
    return notFound()
  }

  return (
    <main>
      <SearchFilter query={decodedQuery} results={results} />
    </main>
  )
}
