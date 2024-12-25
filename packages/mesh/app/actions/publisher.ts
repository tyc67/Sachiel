'use server'

import {
  GetPublisherWalletDocument,
  PublishersDocument,
} from '@/graphql/__generated__/graphql'
import queryGraphQL from '@/utils/fetch-graphql'
import { getLogTraceObjectFromHeaders } from '@/utils/log'

type AllPublisherData = Awaited<ReturnType<typeof getAllPublishers>>
export type PublisherData = AllPublisherData extends Array<infer U> ? U : never

export async function getAllPublishers() {
  const globalLogFields = getLogTraceObjectFromHeaders()
  const data = await queryGraphQL(
    PublishersDocument,
    undefined,
    globalLogFields,
    'Failed to get all publishers'
  )
  return data?.publishers ?? []
}

export async function getPublisherWallet(publisherId: string) {
  const globalLogFields = getLogTraceObjectFromHeaders()
  const data = await queryGraphQL(
    GetPublisherWalletDocument,
    { id: publisherId },
    globalLogFields,
    'Failed to get publisher admin wallet'
  )
  return data?.publisher
}
