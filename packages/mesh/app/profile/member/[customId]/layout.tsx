'use client'
import '@/styles/global.css'

import { useParams, usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'

import LayoutTemplate from '@/components/layout-template'
import MobileNavigationButton from '@/components/layout-template/navigation/mobile-navigation/mobile-navigation-button'
import GoBackButton from '@/components/navigation/go-back-button'
import { FOLLOW_LIST_PATHS } from '@/constants/page-style'
import { EditProfileProvider } from '@/context/edit-profile'
import { useUser } from '@/context/user'

import ProfileMoreActionButton from '../../_components/profile-more-action-button'

const hasNestedLayout = (pathName: string) => {
  return FOLLOW_LIST_PATHS.some((path) => pathName.endsWith(path))
}

export default function ProfileMemberLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathName = usePathname()
  const params = useParams<{ customId?: string }>()
  const { user } = useUser()
  const router = useRouter()
  const typeOfUser = 'member'

  const pageCustomId = params.customId ?? ''
  const isSelf = pageCustomId === user?.customId

  if (hasNestedLayout(pathName)) {
    return <EditProfileProvider>{children}</EditProfileProvider>
  }

  return (
    <LayoutTemplate
      type="default"
      customStyle={{
        background: 'bg-white',
        restrictMainWidth: false,
        footer: 'hidden sm:block',
      }}
      mobileNavigation={{
        leftButtons: [
          isSelf ? (
            <MobileNavigationButton
              key={0}
              type="icon"
              icon="icon-setting"
              onClick={() => router.push('/setting')}
            />
          ) : (
            <GoBackButton key={0} />
          ),
        ],
        title: pageCustomId,
        rightButtons: [
          <ProfileMoreActionButton
            key={0}
            customId={pageCustomId}
            typeOfUser={typeOfUser}
          />,
        ],
      }}
      nonMobileNavigation={{
        leftButtons: isSelf ? [] : [<GoBackButton key={0} />],
        title: pageCustomId,
        rightButtons: [
          <ProfileMoreActionButton
            key={0}
            customId={pageCustomId}
            typeOfUser={typeOfUser}
          />,
        ],
      }}
    >
      <EditProfileProvider>{children}</EditProfileProvider>
    </LayoutTemplate>
  )
}
