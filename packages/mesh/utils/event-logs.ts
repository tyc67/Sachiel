import type { ShareData, UserPayload } from '@/types/user-behavior-log'
import { generateUserBehaviorLogInfo } from '@/utils/generate-user-behavior-log-info'
import { sendUserBehaviorLog } from '@/utils/send-user-behavior-log'

export function logStoryClick(
  userPayload: UserPayload,
  storyId: string,
  storyTitle: string,
  publisher: string,
  isRelatedStory = false
) {
  const basicInfo = generateUserBehaviorLogInfo('click', userPayload)

  if (basicInfo) {
    const interaction = isRelatedStory
      ? {
          relatedStories: {
            relatedStoryId: storyId,
            relatedTitle: storyTitle,
            publisher,
          },
        }
      : {
          story: {
            storyId,
            storyTitle,
            publisher,
          },
        }

    const info = {
      ...basicInfo,
      interaction,
    }

    sendUserBehaviorLog(info)
  }
}

export function logShareClick(
  userPayload: UserPayload,
  interactionData: ShareData
) {
  const basicInfo = generateUserBehaviorLogInfo('click', userPayload)

  if (basicInfo) {
    const interaction = {
      ...interactionData,
    }

    const info = {
      ...basicInfo,
      interaction,
    }

    sendUserBehaviorLog(info)
  }
}

export function logCategoryClick(
  userPayload: UserPayload,
  categoryName: string
) {
  const basicInfo = generateUserBehaviorLogInfo('click', userPayload)

  if (basicInfo) {
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
}

export function logAddStoryToPick(userPayload: UserPayload, storyId: string) {
  const basicInfo = generateUserBehaviorLogInfo('click', userPayload)

  if (basicInfo) {
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
}

export function logAddStoryToBookmark(
  userPayload: UserPayload,
  storyId: string
) {
  const basicInfo = generateUserBehaviorLogInfo('click', userPayload)

  if (basicInfo) {
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
}

export function logAddStoryToCollection(
  userPayload: UserPayload,
  storyId: string
) {
  const basicInfo = generateUserBehaviorLogInfo('click', userPayload)

  if (basicInfo) {
    const interaction = {
      collection: {
        storyId,
      },
    }

    const info = {
      ...basicInfo,
      interaction,
    }

    sendUserBehaviorLog(info)
  }
}

export function logStoryActionClick(
  userPayload: UserPayload,
  actionType: {
    isPick: boolean
    isComment: boolean
    isPickAndComment: boolean
  },
  actionOwnerIds: string[]
) {
  const basicInfo = generateUserBehaviorLogInfo('click', userPayload)
  if (basicInfo) {
    const typeMap = {
      'pick-comment': actionType.isPickAndComment,
      pick: actionType.isPick,
      comment: actionType.isComment,
    }

    const type = (Object.keys(typeMap) as Array<keyof typeof typeMap>).find(
      (key) => typeMap[key]
    )

    const userActivity = {
      activityType: type,
      userId: actionOwnerIds,
    }

    const info = {
      ...basicInfo,
      userActivity,
    }

    sendUserBehaviorLog(info)
  }
}

export function logVideoPlay(userPayload: UserPayload) {
  const basicInfo = generateUserBehaviorLogInfo('click', userPayload)

  if (basicInfo) {
    const interaction = {
      media: {
        videoPlay: true,
      },
    }

    const info = {
      ...basicInfo,
      interaction,
    }

    sendUserBehaviorLog(info)
  }
}

export function logSponsor(userPayload: UserPayload, publisher: string) {
  const basicInfo = generateUserBehaviorLogInfo('click', userPayload)

  if (basicInfo) {
    const interaction = {
      sponsorAction: {
        sponsor: publisher,
      },
    }

    const info = {
      ...basicInfo,
      interaction,
    }

    sendUserBehaviorLog(info)
  }
}

export function logPayment(userPayload: UserPayload, storyId: string) {
  const basicInfo = generateUserBehaviorLogInfo('click', userPayload)

  if (basicInfo) {
    const interaction = {
      unlock: {
        unlockAction: true,
        storyId,
      },
    }

    const info = {
      ...basicInfo,
      interaction,
    }

    sendUserBehaviorLog(info)
  }
}

export function logCollectionClick(
  userPayload: UserPayload,
  collectionTitle: string
) {
  const basicInfo = generateUserBehaviorLogInfo('click', userPayload)

  if (basicInfo) {
    const collectionInfo = {
      collectionTitle,
    }

    const info = {
      ...basicInfo,
      collectionInfo,
    }

    sendUserBehaviorLog(info)
  }
}
