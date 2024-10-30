'use client'

import DesktopEditCollection from '../_components/desktop/desktop-edit-collection'
import MobileNewCollection from '../_components/mobile/mobile-new-collection'

export default function NewCollectionPage() {
  return (
    <main className="flex w-full max-w-[theme(width.maxContent)] grow flex-col">
      <DesktopEditCollection />
      <MobileNewCollection />
    </main>
  )
}
