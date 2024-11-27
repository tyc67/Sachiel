import {
  type ChangeEvent,
  type MouseEvent,
  type RefObject,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { search } from '@/app/actions/search'
import { type SearchResults } from '@/utils/data-schema'
import { debounce } from '@/utils/performance'

const recentSearchMax = 20
const searchSuggestionMax = 7
const defaultVisibleCount = 10

export default function useSearchSuggestion(
  inputRef: RefObject<HTMLInputElement>
) {
  const [searchText, setSearchText] = useState('')
  const [searchSuggestion, setSearchSuggestion] = useState<
    SearchResults['member'] | null
  >(null)
  const [recentSearch, setRecentSearch] = useState<string[]>(getRecentSearch)
  const [visibleCount, setVisibleCount] = useState(defaultVisibleCount)

  useEffect(() => {
    if (!searchText.trim()) {
      setSearchSuggestion(null)
    }
  }, [searchText])

  const fetchSuggestions = useCallback(
    async (query: string, searchSuggestionMax: number) => {
      if (!query) return null
      const data = await search(query)
      if (data) {
        return data.member.slice(0, searchSuggestionMax)
      }
      return null
    },
    []
  )

  const updateRecentSearch = useCallback(
    (
      action: 'add' | 'remove',
      recentSearchMax: number,
      query: string,
      prev: string[]
    ) => {
      let updated = [...prev]
      if (action === 'remove') {
        updated = updated.filter((item) => item !== query)
      } else if (action === 'add' && query) {
        updated = [query, ...updated.filter((item) => item !== query)]
      }
      updated = updated.slice(0, recentSearchMax)
      localStorage.setItem('recent-search', JSON.stringify(updated))
      return updated
    },
    []
  )

  const debouncedFetch = useMemo(
    () =>
      debounce(async (query: string) => {
        const suggestions = await fetchSuggestions(query, searchSuggestionMax)
        if (suggestions) {
          setSearchSuggestion(suggestions)
          setRecentSearch((prev) =>
            updateRecentSearch('add', recentSearchMax, query, prev)
          )
        }
      }, 500),
    [fetchSuggestions, updateRecentSearch]
  )

  const handleSearchTextChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      const trimmedValue = value.trim()
      setSearchText(value)
      debouncedFetch(trimmedValue)
    },
    [debouncedFetch]
  )

  const handleRemoveRecentSearch = useCallback(
    (e: MouseEvent, selectedItem: string) => {
      e.stopPropagation()
      setRecentSearch((prev) =>
        updateRecentSearch('remove', recentSearchMax, selectedItem, prev)
      )
      inputRef.current?.focus()
    },
    [inputRef, updateRecentSearch]
  )

  const handleToggleShowAll = () => {
    setVisibleCount((prev) =>
      prev === defaultVisibleCount ? recentSearch.length : defaultVisibleCount
    )
    inputRef.current?.focus()
  }

  const recentSearchViewData = recentSearch.slice(0, visibleCount)

  return {
    searchText,
    searchSuggestion,
    recentSearch,
    recentSearchViewData,
    handleSearchTextChange,
    handleRemoveRecentSearch,
    handleToggleShowAll,
  }
}

const getRecentSearch = () => {
  const storedSearches = localStorage.getItem('recent-search')
  return storedSearches ? JSON.parse(storedSearches) : []
}
