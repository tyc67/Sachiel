import {
  GetMemberFollowingListDocument,
  GetMemberFollowingListQuery,
} from '@/graphql/__generated__/graphql'
import fetchGraphQL from '@/utils/fetch-graphql'

import { PageProps } from '../page'
import EmptyFollowingStatus from './_components/empty-following-status'
import FollowingPublisherList from './_components/following-publisher-list'

export type FollowingListType = NonNullable<
  GetMemberFollowingListQuery['member']
>['following']

export type FollowingPublisherListType = NonNullable<
  GetMemberFollowingListQuery['member']
>['follow_publisher']

const FollowerList = async ({ params, searchParams }: PageProps) => {
  const response = await fetchGraphQL(GetMemberFollowingListDocument, {
    customId: params.userId,
  })
  const isVisitor = params.userId === searchParams.user
  const followPublisherResponse = response?.member?.follow_publisher || []
  const followResponse = response?.member?.following || []
  const hasPublisherData = !!followPublisherResponse.length
  const hasFollowingData = !!followResponse.length
  const followPublisherData = followPublisherResponse.map((followItem) => {
    return {
      ...followItem,
      avatar: followItem.logo,
      name: followItem.title,
    }
  })
  if (!hasPublisherData && !hasFollowingData) {
    return <EmptyFollowingStatus isVisitor={isVisitor} />
  }
  return (
    <div className="flex max-w-[1120px] grow flex-col items-center sm:gap-5  sm:p-5 md:px-[70px] md:py-10 xl:w-maxMain">
      {/**TODO: map list*/}
      <FollowingPublisherList
        title="媒體"
        followingList={followPublisherData as FollowingListType}
        defaultToggle={false}
      />
      <FollowingPublisherList
        title="人物"
        followingList={followResponse}
        defaultToggle={true}
      />
    </div>
  )
}

export default FollowerList
