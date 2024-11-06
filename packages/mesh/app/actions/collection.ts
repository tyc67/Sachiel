'use server'

import type { CollectionPickCreateInput } from '@/graphql/__generated__/graphql'
import {
  AddStoryToCollectionDocument,
  CreateCollectionDocument,
  GetCollectionDocument,
  GetCollectionStoriesDocument,
  GetMemberCollectionsDocument,
} from '@/graphql/__generated__/graphql'
import queryGraphQL, { mutateGraphQL } from '@/utils/fetch-graphql'
import { getLogTraceObjectFromHeaders } from '@/utils/log'

import type { CollectionFormat } from '../collection/(mutate)/_types/edit-collection'

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

export async function getMemberCollections({ memberId }: { memberId: string }) {
  const globalLogFields = getLogTraceObjectFromHeaders()
  return await queryGraphQL(
    GetMemberCollectionsDocument,
    {
      creatorId: memberId,
    },
    globalLogFields
  )
}

export type CreateCollectionParams = {
  title: string
  slug: string
  summary: string
  format: CollectionFormat
  imageName: string
  imageUpload: FormData
  collectionpicks: CollectionPickCreateInput[]
  memberId: string
}
export async function createCollection({
  title,
  slug,
  summary,
  format,
  imageName,
  imageUpload,
  collectionpicks,
  memberId,
}: CreateCollectionParams) {
  const globalLogFields = getLogTraceObjectFromHeaders()

  return await mutateGraphQL(
    CreateCollectionDocument,
    {
      title,
      slug,
      summary,
      status: 'publish',
      public: 'public',
      format,
      imageName,
      imageUpload: imageUpload.get('heroImage'),
      collectionpicks,
      memberId,
    },
    globalLogFields
  )
}

export async function addStoryToCollection({
  collectionId,
  storyId,
  sortOrder,
  memberId,
  pickDate,
}: {
  collectionId: string
  storyId: string
  sortOrder: number
  memberId: string
  pickDate: string
}) {
  const globalLogFields = getLogTraceObjectFromHeaders()
  return await mutateGraphQL(
    AddStoryToCollectionDocument,
    {
      id: collectionId,
      storyId,
      sortOrder,
      memberId,
      pickDate,
    },
    globalLogFields
  )
}
