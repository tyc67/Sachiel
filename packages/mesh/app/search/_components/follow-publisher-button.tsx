'use client'

import Button from '@/components/button'
import useFollowPublisher from '@/hooks/use-publisher-follow'

export default function FollowPublisherButton({
  publisherId,
  publisherName,
}: {
  publisherId: string
  publisherName: string
}) {
  const { isFollowing, handleFollowOnClick } = useFollowPublisher({
    publisherId,
    publisherName,
  })

  return (
    <Button
      size="sm"
      color="transparent"
      text="追蹤"
      activeState={{
        isActive: isFollowing,
        activeText: '追蹤中',
      }}
      onClick={handleFollowOnClick}
    />
  )
}
