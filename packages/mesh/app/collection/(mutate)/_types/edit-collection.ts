import type {
  GetCollectionToEditQuery,
  GetMemberPickAndBookmarkQuery,
} from '@/graphql/__generated__/graphql'

export enum MobielEditCollectionStep {
  MobileStep1SelectStories = 'mobile-step-1-select-stories',
  MobileStep2SetTitle = 'mobile-step-2-set-title',
  MobileStep3SetSummary = 'mobile-step-3-set-summary',
  MobileStep4SortStories = 'mobile-step-4-sort-stoires',
}

export enum DesktopEditCollectionStep {
  DesktopStep1EditAll = 'desktop-step-1-edit-all',
  DesktopStep2SortStories = 'desktop-step-2-sort-stories',
}

export type Collection = NonNullable<GetCollectionToEditQuery['collection']>
export type CollectionPick = NonNullable<Collection['collectionpicks']>[number]

export type PickOrBookmark = NonNullable<
  NonNullable<GetMemberPickAndBookmarkQuery['member']>['picksAndBookmarks']
>[number]
export type CollectionPickStory = NonNullable<PickOrBookmark['story']>

export enum CollectionFormat {
  Folder = 'folder',
  Timeline = 'timeline',
}
