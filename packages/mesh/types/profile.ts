import type { ChangeEvent, RefObject } from 'react'

import type {
  GetMemberProfileQuery,
  Story,
} from '@/graphql/__generated__/graphql'

// Use const assertion for better type inference and immutability
export const TabKey = {
  PICK: '精選',
  FOLLOWER: '粉絲',
  FOLLOWING: '追蹤中',
  SPONSORED: '本月獲得贊助',
} as const

// Convert to union type for better type safety
export type TabKey = typeof TabKey[keyof typeof TabKey]

// Use const assertion for enum-like behavior
export const TabCategory = {
  PICKS: 'PICKS',
  BOOKMARKS: 'BOOKMARKS',
  PUBLISH: 'PUBLISH',
  COLLECTIONS: 'COLLECTIONS',
} as const

export type TabCategory = typeof TabCategory[keyof typeof TabCategory]

export interface TabItem {
  tabName: TabKey
  count?: number | string
  redirectLink?: string
}

// Use literal types for form field names to prevent typos
export type ProfileFormField = 'name' | 'customId' | 'intro' | 'avatar'

export interface EditProfileFormTypes {
  name: string
  customId: string
  intro: string
  avatar: string
}

export interface ProfileTypes {
  name: string
  avatar: string
  intro: string
  pickCount: number
  followingCount: string
  followerCount: string
  picksData: PickList
  bookmarks?: Bookmarks
  customId: string
  memberId: string
  collections: Collections
  pickCollections: PickList
}

// Improve nullable types handling
export type Member = NonNullable<GetMemberProfileQuery['member']>
export type Collections = NonNullable<GetMemberProfileQuery['collections']>
export type PickList = NonNullable<Member['picks']>

// Simplify complex type definitions
export type PickCollections = NonNullable<PickList[number]['collection']>[]
export type Bookmarks = NonNullable<Member['books']>
export type StoryData = NonNullable<Story>[]
export type StoryDataItem = StoryData[number]
export type PickListItem = NonNullable<PickList[number]['story']>
export type BookmarkItem = PickListItem
export type CollectionItem = Collections[number]

// Use union literal type instead of string literals
export type UserType = 'member' | 'visitor' | 'publisher'

export type CommentList = NonNullable<PickListItem['comment']>
export type CommentType = CommentList[number]

// Improve error handling types
export type FormErrors = Partial<Record<ProfileFormField, string>>

// Improve context type with more specific error handling
export interface EditProfileContextType {
  editProfileForm: EditProfileFormTypes
  visitorProfile: ProfileTypes
  isFormValid: boolean
  errors: FormErrors
  isProfileLoading: boolean
  formRef: RefObject<HTMLFormElement> | null
  isSubmitting: boolean

  // Improve function signatures
  updateErrors: (field: ProfileFormField, errorMessage: string) => void
  updateField: (field: ProfileFormField, value: string) => void
  handleSubmit: () => Promise<void>
  initializeProfileData: () => void
  handleAvatarChange: (e: ChangeEvent<HTMLInputElement>) => void
  clearFormInput: (field: Exclude<ProfileFormField, 'avatar'>) => void
  handleDeletePhoto: (avatarImageId?: string) => void
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  isProfileError: boolean
}
