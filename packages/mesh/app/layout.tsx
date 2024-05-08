import '@/styles/global.css'

import type { Metadata } from 'next'
import { Noto_Sans_TC } from 'next/font/google'

import Header from './_components/header'

export const metadata: Metadata = {
  title: 'Mesh',
}

const notoSans = Noto_Sans_TC({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-Hant" className={notoSans.className}>
      <body className="min-h-screen">
        {/* fixed header */}
        <Header />
        {/* block for non-fixed content, set padding for fixed blocks */}
        <div className="flex min-h-screen flex-col bg-gray-50 pb-[theme(height.nav.default)] pt-[theme(height.header.default)]  sm:pb-0 sm:pt-[theme(height.header.sm)] sm:pl-[theme(width.nav.sm)] md:pl-[theme(width.nav.md)] xl:pl-[calc((100vw-theme(width.maxContent))/2+theme(width.nav.xl))]">
          {/* block for main and aside content to maintain the max width for screen width larger than 1440 */}
          <div className="grow xl:max-w-[theme(width.maxMain)]">{children}</div>
          {/* footer after main content */}
          <footer className="h-[theme(height.footer.default)] border-t bg-white sm:h-[theme(height.footer.sm)]">
            {/* nested footer to maintain the max width for screen width larger than 1440 */}
            <div className="h-full max-w-[theme(width.maxMain)]">
              這是 footer
            </div>
          </footer>
        </div>
        {/* fixed left nav shown on tablet, desktop size */}
        <nav className="hidden sm:fixed sm:bottom-0 sm:left-0 sm:top-[theme(height.header.sm)] sm:flex sm:w-[theme(width.nav.sm)] sm:justify-end sm:bg-white md:w-[theme(width.nav.md)] xl:w-[calc((100vw-theme(width.maxContent))/2+theme(width.nav.xl))] ">
          {/* nested nav bar to maintain the max width for screen width larger than 1440 */}
          <div className="grow border-r xl:max-w-[theme(width.nav.xl)]">
            左側 navbar, 只在平板以上尺寸顯示
          </div>
        </nav>
        {/* fixed bottom nav bar shown on mobile only */}
        <nav className="fixed bottom-0 left-0 right-0 h-[theme(height.nav.default)] border-t bg-white sm:hidden">
          <div className="h-full">置底 nav bar, 只在手機尺寸顯示</div>
        </nav>
      </body>
    </html>
  )
}
