import React from 'react'

type EmptyFollowingStatusProps = {
  isVisitor: boolean
}

const EmptyFollowingStatus = ({ isVisitor }: EmptyFollowingStatusProps) => {
  const emptyContent = isVisitor
    ? '這個人還沒有追蹤中的對象'
    : '目前還沒有追蹤中的對象'
  return (
    <div className="flex grow flex-col items-center justify-center">
      <p className="subtitle-1 text-primary-400">{emptyContent}</p>
    </div>
  )
}

export default EmptyFollowingStatus
