import type { SharePlatform } from '@/components/share-sheet'

export type UserPayload = {
  memberType: string
  email: string
  firebaseId: string
}

export type ShareData = {
  shareActions: {
    storyId: string
    storyTitle: string
    sharePlatform: SharePlatform
  }
}
