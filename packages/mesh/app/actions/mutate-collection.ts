'use server'

import type { CollectionPickCreateInput } from '@/graphql/__generated__/graphql'
import { CreateCollectionDocument } from '@/graphql/__generated__/graphql'
import { mutateGraphQL } from '@/utils/fetch-graphql'
import { getLogTraceObjectFromHeaders } from '@/utils/log'

import type { CollectionFormat } from '../collection/(mutate)/_types/edit-collection'

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
