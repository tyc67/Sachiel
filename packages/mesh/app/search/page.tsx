'use client'

import { notFound, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { type SearchResults } from '@/utils/data-schema'

import { type SearchOption, search } from '../actions/search'
import MemberAndPublisher from './_components/member-and-publisher'
import StoryAndCollection from './_components/story-and-collection'

const filters: {
  id: number
  name: string
  objective: SearchOption[]
}[] = [
  {
    id: 1,
    name: '新聞',
    objective: ['story', 'collection'],
  },
  {
    id: 2,
    name: '個人檔案',
    objective: ['member', 'publisher'],
  },
]

export default function SearchResultPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q')
  const [activeFilter, setActiveFilter] = useState(filters[0].id)
  const [isLoading, setIsLoading] = useState(true)
  const [storyResult, setStoryResult] = useState<SearchResults['story']>([])
  const [collectionResult, setCollectionResult] = useState<
    SearchResults['collection']
  >([])
  const [memberResult, setMemberResult] = useState<SearchResults['member']>([])
  const [publisherResult, setPublisherResult] = useState<
    SearchResults['publisher']
  >([])

  useEffect(() => {
    if (!query) return
    const fetch = async () => {
      const currentFilter = filters.find((f) => f.id === activeFilter)
      const objectives = currentFilter?.objective ?? []
      setIsLoading(true)
      const result = await search(query, objectives)
      setStoryResult(result?.story || [])
      setCollectionResult(result?.collection || [])
      setMemberResult(result?.member || [])
      setPublisherResult(result?.publisher || [])
      setIsLoading(false)
    }
    fetch()
  }, [activeFilter, query])

  if (!query) return notFound()

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
        {activeFilter === 1 ? (
          <StoryAndCollection
            query={query}
            storyResult={storyResult}
            collectionResult={collectionResult}
            isLoading={isLoading}
          />
        ) : (
          <MemberAndPublisher
            query={query}
            memberResult={memberResult}
            publisherResult={publisherResult}
            isLoading={isLoading}
          />
        )}
      </section>
    </main>
  )
}
