import { generateUserBehaviorLogInfo } from '@/utils/generate-user-behavior-log-info'
import { sendUserBehaviorLog } from '@/utils/send-user-behavior-log'
import type { UserPayload, ShareData } from '@/types/user-behavior-log'

export function logStoryClick(
  userPayload: UserPayload,
  storyId: string,
  storyTitle: string,
  isRelatedStory = false
) {
  const basicInfo = generateUserBehaviorLogInfo('click', userPayload)

  const interaction = isRelatedStory
    ? {
        relatedStories: {
          relatedStoryId: storyId,
          relatedTitle: storyTitle,
        },
      }
    : {
        story: {
          storyId,
          storyTitle,
        },
      }

  const info = {
    ...basicInfo,
    interaction,
  }

  sendUserBehaviorLog(info)
}

export function logShareClick(
  userPayload: UserPayload,
  interactionData: ShareData
) {
  const basicInfo = generateUserBehaviorLogInfo('click', userPayload)

  const interaction = {
    ...interactionData,
  }

  const info = {
    ...basicInfo,
    interaction,
  }

  sendUserBehaviorLog(info)
}

export function logCategoryClick(
  userPayload: UserPayload,
  categoryName: string
) {
  const basicInfo = generateUserBehaviorLogInfo('click', userPayload)

  const interaction = {
    categories: {
      categoryName: categoryName,
    },
  }

  const info = {
    ...basicInfo,
    interaction,
  }

  sendUserBehaviorLog(info)
}

export function logPickClick(userPayload: UserPayload, storyId: String) {
  const basicInfo = generateUserBehaviorLogInfo('click', userPayload)

  const interaction = {
    pick: {
      storyId,
    },
  }

  const info = {
    ...basicInfo,
    interaction,
  }

  sendUserBehaviorLog(info)
}

export function logBookmarkClick(userPayload: UserPayload, storyId: string) {
  const basicInfo = generateUserBehaviorLogInfo('click', userPayload)

  const interaction = {
    bookmark: {
      storyId,
    },
  }

  const info = {
    ...basicInfo,
    interaction,
  }

  sendUserBehaviorLog(info)
}
