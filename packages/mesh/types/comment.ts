import type {
  GetCollectionQuery,
  GetStoryQuery,
} from '@/graphql/__generated__/graphql'

type Story = NonNullable<NonNullable<GetStoryQuery>['story']>
type Collection = NonNullable<
  NonNullable<GetCollectionQuery>['collections']
>[number]

export type CommentObjectiveData = Pick<
  Story,
  'title' | 'source' | 'picks' | 'picksCount' | 'id'
> &
  Pick<Collection, 'title' | 'creator' | 'picks' | 'picksCount' | 'id'>
