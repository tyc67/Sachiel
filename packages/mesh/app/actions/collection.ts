import {
  GetCollectionDocument,
  GetCollectionStoriesDocument,
} from '@/graphql/__generated__/graphql'
import queryGraphQL from '@/utils/fetch-graphql'
import { getLogTraceObjectFromHeaders } from '@/utils/log'

export async function getCollection({
  collectionId,
}: {
  collectionId: string
}) {
  const picksTake = 5
  const commentsTake = 10

  const globalLogFields = getLogTraceObjectFromHeaders()
  return await queryGraphQL(
    GetCollectionDocument,
    {
      collectionId,
      picksTake,
      commentsTake,
    },
    globalLogFields
  )
}

export async function getCollectionStories({
  collectionId,
  creatorCustomId,
}: {
  collectionId: string
  creatorCustomId: string
}) {
  const globalLogFields = getLogTraceObjectFromHeaders()
  return await queryGraphQL(
    GetCollectionStoriesDocument,
    {
      collectionId,
      creatorCustomId,
    },
    globalLogFields
  )
}
