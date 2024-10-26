'use client'

import DesktopEditCollection from '../_components/desktop/desktop-edit-collection'

export default function NewCollectionPage() {
  return (
    <main className="flex w-full max-w-[theme(width.maxContent)] grow flex-col">
      <DesktopEditCollection />
    </main>
  )
}
