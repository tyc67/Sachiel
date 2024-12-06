'use client'

import { notFound } from 'next/navigation'
import { useEffect, useState } from 'react'

import { type SearchOption, search } from '@/app/actions/search'
import { type SearchResults } from '@/utils/data-schema'

import MemberAndPublisher from '../_components/member-and-publisher'
import StoryAndCollection from '../_components/story-and-collection'

type filterType = {
  id: 'story-collection' | 'member-publisher'
  name: string
  objective: SearchOption[]
}
const filters: filterType[] = [
  {
    id: 'story-collection',
    name: '新聞',
    objective: ['story', 'collection'],
  },
  {
    id: 'member-publisher',
    name: '個人檔案',
    objective: ['member', 'publisher'],
  },
]

export default function SearchResultPage({
  params,
}: {
  params: { query: string }
}) {
  const { query } = params
  const decodedQuery = decodeURIComponent(query)
  const [activeFilter, setActiveFilter] = useState<filterType['id']>(
    filters[0].id
  )
  const [isLoading, setIsLoading] = useState(true)
  const [storyResult, setStoryResult] = useState<SearchResults['story']>([])
  const [collectionResult, setCollectionResult] = useState<
    SearchResults['collection']
  >([])
  const [memberResult, setMemberResult] = useState<SearchResults['member']>([])
  const [publisherResult, setPublisherResult] = useState<
    SearchResults['publisher']
  >([])
  const [cacheKeys, setCacheKeys] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (!decodedQuery) return
    const fetch = async () => {
      const currentKey = `${decodedQuery}-${activeFilter}`
      if (cacheKeys.has(currentKey)) return
      const currentFilter = filters.find((f) => f.id === activeFilter)
      const objectives = currentFilter?.objective ?? []
      setIsLoading(true)
      const result = await search(decodedQuery, objectives)
      setStoryResult(result?.story || [])
      setCollectionResult(result?.collection || [])
      setMemberResult(result?.member || [])
      setPublisherResult(result?.publisher || [])
      setCacheKeys((prev) => new Set(prev).add(currentKey))
      setIsLoading(false)
    }
    fetch()
  }, [activeFilter, cacheKeys, decodedQuery])

  if (!decodedQuery) return notFound()

  return (
    <main>
      <div className="flex justify-between border-b-[0.5px] border-primary-400 sm:justify-start sm:gap-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            className="flex flex-1 justify-center sm:flex-none"
            onClick={() => setActiveFilter(filter.id)}
          >
            <span
              className={`flex h-12 items-center justify-center border-b px-[14px] sm:px-8 ${
                activeFilter === filter.id
                  ? 'border-primary-700 text-primary-700'
                  : 'border-transparent text-primary-400'
              }`}
            >
              {filter.name}
            </span>
          </button>
        ))}
      </div>
      <section className="px-5 xl:px-10">
        {activeFilter === 'story-collection' ? (
          <StoryAndCollection
            query={decodedQuery}
            storyResult={storyResult}
            collectionResult={collectionResult}
            isLoading={isLoading}
          />
        ) : (
          <MemberAndPublisher
            query={decodedQuery}
            memberResult={memberResult}
            publisherResult={publisherResult}
            isLoading={isLoading}
          />
        )}
      </section>
    </main>
  )
}
