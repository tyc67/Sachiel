'use server'

import { RESTFUL_ENDPOINTS } from '@/constants/config'
import {
  GetMemberPickCollectionCommentDocument,
  GetMemberPickStoryCommentDocument,
} from '@/graphql/__generated__/graphql'
import { PickObjective } from '@/types/objective'
import queryGraphQL from '@/utils/fetch-graphql'
import { fetchRestfulPost } from '@/utils/fetch-restful'
import { getLogTraceObjectFromHeaders } from '@/utils/log'

export async function addPick({
  memberId,
  targetId,
  pickObjective,
}: {
  memberId: string
  targetId: string
  pickObjective: PickObjective
}) {
  const payload = {
    action: 'add_pick',
    memberId,
    objective: pickObjective,
    targetId,
    state: 'public',
  }

  return await fetchRestfulPost(
    RESTFUL_ENDPOINTS.pubsub,
    payload,
    { cache: 'no-cache' },
    'Failed to add pick state via pub/sub'
  )
}

export async function removePick({
  memberId,
  targetId,
  pickObjective,
}: {
  memberId: string
  targetId: string
  pickObjective: PickObjective
}) {
  const payload = {
    action: 'remove_pick',
    memberId,
    objective: pickObjective,
    targetId,
  }

  return await fetchRestfulPost(
    RESTFUL_ENDPOINTS.pubsub,
    payload,
    { cache: 'no-cache' },
    'Failed to remove pick state via pub/sub'
  )
}

export async function addPickAndComment({
  memberId,
  targetId,
  pickObjective,
  comment,
}: {
  memberId: string
  targetId: string
  pickObjective: PickObjective
  comment: string
}) {
  const payload = {
    action: 'add_pick_and_comment',
    memberId,
    objective: pickObjective,
    targetId,
    state: 'public',
    content: comment,
  }

  return await fetchRestfulPost(
    RESTFUL_ENDPOINTS.pubsub,
    payload,
    { cache: 'no-cache' },
    'Failed to add pick and comment via pub/sub'
  )
}

export async function getPickComment({
  memberId,
  pickObjective,
  targetId,
}: {
  memberId: string
  pickObjective: PickObjective
  targetId: string
}) {
  const globalLogFields = getLogTraceObjectFromHeaders()

  let pickCommentId: string = ''
  switch (pickObjective) {
    case PickObjective.Story: {
      const data = await queryGraphQL(
        GetMemberPickStoryCommentDocument,
        { memberId, storyId: targetId },
        globalLogFields,
        "Failed to get pick story's comment"
      )

      pickCommentId = data?.members?.[0].pick?.[0].pick_comment?.[0]?.id ?? ''
      break
    }
    case PickObjective.Collection: {
      const data = await queryGraphQL(
        GetMemberPickCollectionCommentDocument,
        { memberId, collectionId: targetId },
        globalLogFields,
        "Failed to get pick collection's comment"
      )

      pickCommentId = data?.members?.[0].pick?.[0].pick_comment?.[0]?.id ?? ''
      break
    }

    default:
      break
  }

  return pickCommentId
}

export async function removeComment({
  memberId,
  commentId,
}: {
  memberId: string
  commentId: string
}) {
  const payload = {
    action: 'remove_comment',
    memberId,
    commentId,
  }

  return await fetchRestfulPost(
    RESTFUL_ENDPOINTS.pubsub,
    payload,
    { cache: 'no-cache' },
    'Failed to remove comment state via pub/sub'
  )
}
