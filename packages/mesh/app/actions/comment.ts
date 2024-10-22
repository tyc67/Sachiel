'use server'

import { RESTFUL_ENDPOINTS } from '@/constants/config'
import {
  GetCollectionLatestAddedCommentDocument,
  GetStoryLatestAddedCommentDocument,
} from '@/graphql/__generated__/graphql'
import { CommentObjective } from '@/types/objective'
import fetchGraphQL from '@/utils/fetch-graphql'
import { fetchRestfulPost } from '@/utils/fetch-restful'
import { getLogTraceObjectFromHeaders } from '@/utils/log'
import { sleep } from '@/utils/sleep'

const getLatestAddComment = async ({
  memberId,
  targetId,
  commentObjective,
}: {
  memberId: string
  targetId: string
  commentObjective: CommentObjective
}) => {
  const globalLogFields = getLogTraceObjectFromHeaders()

  let commentId: string = ''
  switch (commentObjective) {
    case CommentObjective.Story: {
      const data = await fetchGraphQL(
        GetStoryLatestAddedCommentDocument,
        {
          memberId,
          storyId: targetId,
        },
        globalLogFields,
        `Failed to get latest story comment's ID`
      )
      const comments = data?.comments
      commentId = comments?.[0].id ?? ''
      break
    }

    case CommentObjective.Collection: {
      const data = await fetchGraphQL(
        GetCollectionLatestAddedCommentDocument,
        {
          memberId,
          collectionId: targetId,
        },
        globalLogFields,
        `Failed to get latest collection comment's ID`
      )
      const comments = data?.comments
      commentId = comments?.[0].id ?? ''
      break
    }

    default:
      break
  }

  return commentId
}

export async function addComment({
  memberId,
  targetId,
  commentObjective,
  content,
  latestCommentId,
}: {
  memberId: string
  targetId: string
  commentObjective: CommentObjective
  content: string
  latestCommentId: string
}): Promise<string | null> {
  const sleepTime = 500
  const retryTimes = 3

  const payload = {
    action: 'add_comment',
    memberId,
    objective: commentObjective,
    targetId,
    state: 'public',
    content,
  }

  try {
    await fetchRestfulPost(
      RESTFUL_ENDPOINTS.pubsub,
      payload,
      { cache: 'no-cache' },
      'Failed to add comment state via pub/sub'
    )
  } catch (error) {
    console.error('Error in fetchRestfulPost:', error)
    return null
  }

  await sleep(sleepTime)

  // 嘗試獲取新評論ID，最多重試3次
  for (let i = 0; i < retryTimes; i++) {
    const newCommentId = await getLatestAddComment({
      memberId,
      targetId,
      commentObjective,
    })

    if (newCommentId && latestCommentId !== newCommentId) {
      return newCommentId
    }
    // 如果沒有獲取到ID，稍等片刻再試
    await sleep(sleepTime)
  }

  console.error('Failed to retrieve new comment ID after all attempts')
  return null
}

export async function editComment({
  memberId,
  commentId,
  content,
}: {
  memberId: string
  commentId: string
  content: string
}) {
  const payload = {
    action: 'edit_comment',
    memberId,
    commentId,
    content,
  }
  return await fetchRestfulPost(
    RESTFUL_ENDPOINTS.pubsub,
    payload,
    { cache: 'no-cache' },
    'Failed to edit comment state via pub/sub'
  )
}

export async function deleteComment({
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
