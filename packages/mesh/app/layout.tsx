import '@/styles/global.css'

import { GoogleTagManager } from '@next/third-parties/google'
import type { Metadata } from 'next'
import { Noto_Sans_TC } from 'next/font/google'

import { GTM_ID } from '@/constants/config'
import { PickModalProvider } from '@/context/pick-modal'
import { ToastProvider } from '@/context/toast'
import { UserProvider } from '@/context/user'

import RootLayoutWrapper from './_components/root-layout-wrapper'
import { getCurrentUser } from './actions/auth'

export const metadata: Metadata = {
  title: 'READr Mesh 讀選',
}

const notoSans = Noto_Sans_TC({
  subsets: ['latin'],
  display: 'swap',
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await getCurrentUser()

  return (
    <html lang="zh-Hant" className={notoSans.className}>
      <GoogleTagManager gtmId={GTM_ID} />
      <UserProvider user={user}>
        <ToastProvider>
          <PickModalProvider>
            <RootLayoutWrapper>{children}</RootLayoutWrapper>
          </PickModalProvider>
        </ToastProvider>
      </UserProvider>
    </html>
  )
}
