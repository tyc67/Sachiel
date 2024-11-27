'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

import Button from '@/components/button'
import Icon from '@/components/icon'
import { LOGO_ICONS } from '@/constants/layout'
import { isUserLoggedIn, useUser } from '@/context/user'
const SearchBar = dynamic(() => import('@/components/search-bar'), {
  ssr: false,
})
const SearchModal = dynamic(() => import('@/components/search-modal'), {
  ssr: false,
})

export default function DefaultHeader() {
  // TODO: implement notification system
  const [showNotification, setShowNotification] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { user } = useUser()
  const isLoggedIn = isUserLoggedIn(user)
  const newNotification = true
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)

  const handleLoginButton = () => {
    localStorage.setItem('login-redirect', pathname)
    router.push('/login')
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-layout h-[theme(height.header.default)] border-b bg-white sm:h-[theme(height.header.sm)]">
        {/* nested header to maintain the max width for screen width larger than 1440 */}
        <div className="mx-auto flex h-full max-w-[theme(width.maxContent)] justify-between p-2 sm:px-10 sm:py-3">
          {/* left side block */}
          <div className="flex gap-10">
            <Link
              href={LOGO_ICONS.mobile.href}
              className="GTM-header_click_mesh_logo flex items-center justify-center"
            >
              <Icon
                size={LOGO_ICONS.mobile.size}
                iconName={LOGO_ICONS.mobile.icon}
                className="sm:hidden"
              />
              <Icon
                size={LOGO_ICONS.nonMobile.size}
                iconName={LOGO_ICONS.nonMobile.icon}
                className="hidden sm:block"
              />
            </Link>
            <SearchBar className="hidden sm:flex" />
          </div>
          {/* right side block */}
          <div className="flex">
            <HeaderIconWrapper className="sm:hidden">
              <button onClick={() => setIsSearchModalOpen(true)}>
                <Icon size="2xl" iconName="icon-search" />
              </button>
            </HeaderIconWrapper>
            {isLoggedIn ? (
              <HeaderIconWrapper className="">
                <Link href="/invitation-code">
                  <Icon size="2xl" iconName="icon-invitation-code" />
                </Link>
              </HeaderIconWrapper>
            ) : null}
            {isLoggedIn ? (
              newNotification ? (
                // TODO: replace with correct path
                <div>
                  {/* TODO: uncomment the code after notification has been implemented  */}
                  {/* <HeaderIconWrapper
                  onClick={async () => {
                    // TODO: show notification panel
                    setShowNotification(!showNotification)
                  }}
                  className={
                    showNotification ? 'rounded-[50%] bg-primary-100' : ''
                  }
                >
                  <Icon size="2xl" iconName="icon-notifications-new" />
                </HeaderIconWrapper> */}
                </div>
              ) : (
                // TODO: replace with correct path
                <HeaderIconWrapper
                  onClick={() => {
                    // TODO: show notification panel
                    setShowNotification(!showNotification)
                  }}
                  className={
                    showNotification ? 'rounded-[50%] bg-primary-100' : ''
                  }
                >
                  <Icon size="2xl" iconName="icon-notifications" />
                </HeaderIconWrapper>
              )
            ) : (
              <div className="mx-3 my-1 flex items-center">
                <Button
                  size="sm"
                  color="white"
                  text="登入"
                  onClick={handleLoginButton}
                />
              </div>
            )}
          </div>
        </div>
      </header>
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />
    </>
  )
}

const HeaderIconWrapper = ({
  children,
  className = '',
  onClick,
}: {
  children: React.ReactNode
  className?: string
  onClick?: React.MouseEventHandler<HTMLDivElement>
}) => {
  return (
    <div
      className={twMerge(
        'flex h-11 w-11 cursor-pointer items-center justify-center hover:rounded-[50%] hover:bg-primary-100 active:rounded-[50%] active:bg-primary-100',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
