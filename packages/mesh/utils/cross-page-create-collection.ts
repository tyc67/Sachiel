import type { CollectionPickStory } from '@/app/collection/(mutate)/_types/edit-collection'
import { MINUTE } from '@/constants/time-unit'

type CreateCollectionStory = {
  story: CollectionPickStory
  ts: number
}

const createCollectionStoryKey = 'create-collecction-story' as const

export function getCrossPageCollectinPickStory() {
  const createCollectionStory: CreateCollectionStory | null = JSON.parse(
    localStorage.getItem(createCollectionStoryKey) ?? 'null'
  )
  if (!createCollectionStory) return null
  console.log(Date.now() - createCollectionStory?.ts, 30 * MINUTE)

  if (Date.now() - createCollectionStory?.ts > 30 * MINUTE) {
    clearCreateCollectionStoryLS()
    return null
  }
  return createCollectionStory.story
}

export function setCrossPageCollectionPickStory(story: CollectionPickStory) {
  const createCollectionStory = {
    story,
    ts: Date.now(),
  }
  localStorage.setItem(
    createCollectionStoryKey,
    JSON.stringify(createCollectionStory)
  )
}

export function clearCreateCollectionStoryLS() {
  localStorage.removeItem(createCollectionStoryKey)
}
