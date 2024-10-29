'use client'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import ArticleCardList from '@/app/profile/_components/article-card-list'
import ProfileButtonList from '@/app/profile/_components/profile-button-list'
import Tab from '@/app/profile/_components/tab'
import UserProfile from '@/app/profile/_components/user-profile'
import UserStatusList from '@/app/profile/_components/user-status-list'
import Button from '@/components/button'
import ErrorPage from '@/components/status/error-page'
import { useEditProfile } from '@/context/edit-profile'
import { useUser } from '@/context/user'
import { useFollow } from '@/hooks/use-follow'
import type { Collections } from '@/types/profile'
import {
  type Bookmarks,
  type PickList,
  TabCategory,
  TabKey,
} from '@/types/profile'

import Loading from './loading'

interface ProfilePageProps {
  isMember: boolean
}

const ProfilePage: React.FC<ProfilePageProps> = ({ isMember }) => {
  const { user } = useUser()
  const { visitorProfile, isProfileError, isProfileLoading } = useEditProfile()
  const router = useRouter()
  const pathName = usePathname()
  const currentUrl = pathName

  const [category, setCategory] = useState<TabCategory>(TabCategory.PICKS)
  const [tabData, setTabData] = useState<PickList | Bookmarks | Collections>([])

  const profileData = isMember ? user : visitorProfile
  const { handleClickFollow, isFollowing } = useFollow(
    String(profileData.memberId)
  )

  useEffect(() => {
    if (isMember) {
      switch (category) {
        case TabCategory.PICKS:
          setTabData(profileData.picksData)
          break
        case TabCategory.BOOKMARKS:
          setTabData(profileData.bookmarks)
          break
        case TabCategory.COLLECTIONS:
          setTabData(profileData.collections || [])
          break
        default:
          setTabData(profileData.picksData)
      }
    } else {
      setTabData(profileData.picksData)
    }
  }, [category, isMember, profileData])

  if (isProfileLoading) {
    return <Loading />
  }

  if (isProfileError) {
    return <ErrorPage statusCode={404} />
  }

  const {
    pickCount,
    name,
    avatar,
    followerCount,
    followingCount,
    customId,
    memberId,
    intro,
  } = profileData

  const userStatusList = [
    { tabName: TabKey.PICK, count: pickCount },
    {
      tabName: TabKey.FOLLOWER,
      count: followerCount,
      redirectLink: `${customId}/follower`,
    },
    {
      tabName: TabKey.FOLLOWING,
      count: followingCount,
      redirectLink: `${customId}/following`,
    },
  ]

  const buttonList = isMember
    ? [
        {
          text: { default: '編輯個人檔案', isActive: '' },
          clickFn: () => router.push(`${currentUrl}/edit-profile`),
          isActive: false,
        },
      ]
    : [
        {
          text: { default: '追蹤', isActive: '追蹤中' },
          clickFn: handleClickFollow,
          isActive: isFollowing,
        },
      ]

  const getMessage = (category: TabCategory): string => {
    const messages: { [key: string]: string } = {
      PICKS: isMember
        ? '這裡還空空的\n趕緊將喜愛的新聞加入精選吧'
        : '這個人還沒有精選新聞',
      BOOKMARKS: '沒有已儲存的書籤',
      COLLECTIONS: `從精選新聞或書籤中\n將數篇新聞打包成集錦`,
    }
    return messages[category] || ''
  }

  const shouldShowComment = category !== TabCategory.BOOKMARKS || !isMember
  const emptyElement = (category: TabCategory): React.ReactNode => {
    if (category === TabCategory.COLLECTIONS)
      return (
        <>
          <Button size="md" color="transparent" text="立即嘗試" />
        </>
      )
  }

  return (
    <>
      <section className="bg-white">
        <div className="flex max-h-[calc(100%_-_152px)] max-w-[theme(width.maxMain)] flex-col items-center bg-white px-5 pb-8 pt-6 sm:max-h-full sm:pt-0 md:px-[70px] lg:px-10">
          <UserProfile
            name={name}
            pickCount={pickCount}
            avatar={avatar}
            userType={isMember ? 'member' : 'visitor'}
            intro={intro}
          />
          <ProfileButtonList buttonList={buttonList} />
          <UserStatusList userStatusList={userStatusList} />
        </div>
      </section>
      <Tab
        tabCategory={category}
        setCategory={setCategory}
        userType={isMember ? 'member' : 'visitor'}
      />
      <ArticleCardList
        items={tabData || []}
        shouldShowComment={shouldShowComment}
        emptyMessage={getMessage(category)}
        elementForEmpty={emptyElement(category)}
        memberId={memberId}
        avatar={avatar}
        name={name}
      />
    </>
  )
}

export default ProfilePage
