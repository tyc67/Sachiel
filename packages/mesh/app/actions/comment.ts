'use server'

import { z } from 'zod'

import { RESTFUL_ENDPOINTS } from '@/constants/config'
import { GetLatestAddedCommentDocument } from '@/graphql/__generated__/graphql'
import fetchGraphQL from '@/utils/fetch-graphql'
import { fetchRestfulPost } from '@/utils/fetch-restful'
import { getLogTraceObjectFromHeaders, logServerSideError } from '@/utils/log'
import { sleep } from '@/utils/sleep'

const ItemIdSchema = z.string().regex(/^\d+$/)
const ContentSchema = z.string().min(1)

const AddCommentSchema = z.object({
  memberId: ItemIdSchema,
  storyId: ItemIdSchema,
  content: ContentSchema,
  latestCommentId: z.string(),
})

const EditCommentSchema = z.object({
  memberId: ItemIdSchema,
  commentId: ItemIdSchema,
  content: ContentSchema,
})

const DeleteCommentSchema = z.object({
  memberId: ItemIdSchema,
  commentId: ItemIdSchema,
})

const LikeCommentSchema = DeleteCommentSchema

const GetLatestAddCommentSchema = z.object({
  memberId: ItemIdSchema,
  storyId: ItemIdSchema,
})

const getLatestAddComment = async (
  input: z.infer<typeof GetLatestAddCommentSchema>
) => {
  const globalLogFields = getLogTraceObjectFromHeaders()
  const result = GetLatestAddCommentSchema.safeParse(input)

  if (!result.success) {
    logServerSideError(
      result.error,
      'invalid input for getLatestAddComment',
      globalLogFields
    )
    return null
  }

  const { memberId, storyId } = result.data

  try {
    const data = await fetchGraphQL(
      GetLatestAddedCommentDocument,
      {
        memberId,
        storyId,
      },
      globalLogFields,
      'getLatestAddComment failed'
    )
    const comments = data?.comments
    if (!comments?.length) return null
    return comments[0].id
  } catch (error) {
    logServerSideError(
      error,
      'Unexpected error in GetLatestAddedComment',
      globalLogFields
    )
    return null
  }
}

export async function addComment(
  input: z.infer<typeof AddCommentSchema>
): Promise<string | null> {
  const sleepTime = 500
  const retryTimes = 3
  const globalLogFields = getLogTraceObjectFromHeaders()

  const result = AddCommentSchema.safeParse(input)
  if (!result.success) {
    logServerSideError(
      result.error,
      'invalid input for addComment',
      globalLogFields
    )
    return null
  }

  const { memberId, storyId, content, latestCommentId } = result.data

  const payload = {
    action: 'add_comment',
    memberId,
    objective: 'story',
    targetId: storyId,
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
    logServerSideError(error, 'Error in fetchRestfulPost', globalLogFields)
    return null
  }

  await sleep(sleepTime)

  // 嘗試獲取新評論ID，最多重試3次
  for (let i = 0; i < retryTimes; i++) {
    const newCommentId = await getLatestAddComment({ memberId, storyId })

    if (newCommentId && latestCommentId !== newCommentId) {
      return newCommentId
    }
    // 如果沒有獲取到ID，稍等片刻再試
    await sleep(sleepTime)
  }

  logServerSideError(
    null,
    'Failed to retrieve new comment ID after all attempts',
    globalLogFields
  )
  return null
}

export async function editComment(input: z.infer<typeof EditCommentSchema>) {
  const result = EditCommentSchema.safeParse(input)
  const globalLogFields = getLogTraceObjectFromHeaders()

  if (!result.success) {
    logServerSideError(
      result.error,
      'Invalid input for editComment',
      globalLogFields
    )
    throw result.error
  }

  const { memberId, commentId, content } = result.data

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

export async function deleteComment(
  input: z.infer<typeof DeleteCommentSchema>
) {
  const result = DeleteCommentSchema.safeParse(input)
  const globalLogFields = getLogTraceObjectFromHeaders()

  if (!result.success) {
    logServerSideError(
      result.error,
      'Invalid input for deleteComment',
      globalLogFields
    )
    throw result.error
  }
  const { memberId, commentId } = result.data
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

export async function likeComment(input: z.infer<typeof LikeCommentSchema>) {
  const result = LikeCommentSchema.safeParse(input)
  const globalLogFields = getLogTraceObjectFromHeaders()

  if (!result.success) {
    logServerSideError(
      result.error,
      'Unexpected unlikeComment input',
      globalLogFields
    )
    throw result.error
  }
  const { memberId, commentId } = result.data

  const payload = {
    action: 'add_like',
    memberId,
    commentId,
  }

  return await fetchRestfulPost(
    RESTFUL_ENDPOINTS.pubsub + 'ss',
    payload,
    { cache: 'no-cache' },
    'Failed to like comment via pub/sub'
  )
}

export async function unlikeComment(input: z.infer<typeof LikeCommentSchema>) {
  const result = LikeCommentSchema.safeParse(input)
  const globalLogFields = getLogTraceObjectFromHeaders()

  if (!result.success) {
    logServerSideError(
      result.error,
      'Unexpected unlikeComment input',
      globalLogFields
    )
    throw result.error
  }

  const { memberId, commentId } = result.data

  const payload = {
    action: 'remove_like',
    memberId,
    commentId,
  }

  return await fetchRestfulPost(
    RESTFUL_ENDPOINTS.pubsub,
    payload,
    { cache: 'no-cache' },
    'Failed to unlike comment via pub/sub'
  )
}
