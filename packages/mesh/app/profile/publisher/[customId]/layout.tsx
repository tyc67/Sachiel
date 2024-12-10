'use client'
import '@/styles/global.css'

import { useParams, usePathname } from 'next/navigation'

import LayoutTemplate from '@/components/layout-template'
import GoBackButton from '@/components/navigation/go-back-button'
import { FOLLOW_LIST_PATHS } from '@/constants/page-style'

import ProfileMoreActionButton from '../../_components/profile-more-action-button'
import Loading from './_component/loading'

const hasNestedLayout = (pathName: string) => {
  return FOLLOW_LIST_PATHS.some((path) => pathName.endsWith(path))
}

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathName = usePathname()
  const params = useParams<{ customId?: string }>()
  const typeOfUser = 'publisher'

  const pageCustomId = params.customId ?? ''

  if (hasNestedLayout(pathName)) {
    return <>{children}</>
  }

  const navigationData = {
    leftButtons: [<GoBackButton key={0} />],
    title: pageCustomId,
    rightButtons: [
      <ProfileMoreActionButton
        key={0}
        customId={pageCustomId}
        typeOfUser={typeOfUser}
      />,
    ],
  }

  return (
    <LayoutTemplate
      type="default"
      customStyle={{
        background: 'bg-white',
        restrictMainWidth: false,
        footer: 'hidden sm:block',
      }}
      mobileNavigation={navigationData}
      nonMobileNavigation={navigationData}
      suspenseFallback={<Loading />}
    >
      {children}
    </LayoutTemplate>
  )
}
