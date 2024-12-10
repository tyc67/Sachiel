import { type Story as LatestStory } from '@/app/actions/get-latest-stories-in-category'
import { type Collection } from '@/app/collection/(query)/_types/collection'
import type { SocialStoryPicks } from '@/app/social/_components/feed'
import { type Story as ArticleStory } from '@/app/story/[id]/_components/article'
import { useUser } from '@/context/user'
import type {
  CategoryStory,
  DailyStory,
  Story as HomepageStory,
} from '@/types/homepage'

export function useDisplayPicks(
  objective:
    | CategoryStory
    | DailyStory
    | HomepageStory
    | SocialStoryPicks
    | ArticleStory
    | LatestStory
    | Collection
) {
  const { user } = useUser()
  if (!objective || !objective.picks)
    return { displayPicks: [], displayPicksCount: 0 }

  const isUserLoggedIn = !!user.memberId
  const isStoryPicked = isUserLoggedIn
    ? user.pickStoryIds.has(objective.id)
    : false
  const isUserInPicks = isUserLoggedIn
    ? objective.picks.some((pick) => pick.member?.id === user.memberId)
    : false

  const picksCount =
    'picksCount' in objective
      ? (objective as { picksCount: number }).picksCount
      : 'pickCount' in objective
      ? (objective as { pickCount: number }).pickCount
      : 0

  const transformedData = {
    id: objective.id,
    picksCount,
    picks: objective.picks.map((p) => ({
      member: {
        id: p.member?.id ?? '',
        name: p.member?.name ?? '',
        avatar: p.member?.avatar ?? '',
        customId: p.member && 'customId' in p.member ? p.member.customId : '',
      },
    })),
  }

  const displayPicks = transformedData.picks.filter(
    (pick) => pick.member?.id !== user.memberId
  )

  let displayPicksCount = isUserInPicks
    ? transformedData.picksCount - 1
    : transformedData.picksCount

  if (isStoryPicked) {
    const currentUserPick = {
      member: {
        id: user.memberId,
        name: user.name ?? '',
        avatar: user.avatar ?? '',
        customId: user.customId ?? '',
      },
    }
    displayPicks.unshift(currentUserPick)
    displayPicksCount++
  }

  return { displayPicks, displayPicksCount }
}

export type DisplayPicks = ReturnType<typeof useDisplayPicks>['displayPicks']
