import type {
  GetCollectionToEditQuery,
  GetMemberPickAndBookmarkQuery,
} from '@/graphql/__generated__/graphql'

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
