'use client'

import LayoutTemplate from '@/components/layout-template'
import EditCollectionProvider from '@/context/edit-collection'

export default function NewCollectionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <EditCollectionProvider>
      <LayoutTemplate
        type="collection"
        mobileNavigation={{
          leftButtons: [],
          title: '建立集錦',
          rightButtons: [],
        }}
      >
        {children}
      </LayoutTemplate>
    </EditCollectionProvider>
  )
}
