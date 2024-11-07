'use client'

import LayoutTemplate from '@/components/layout-template'
import EditCollectionProvider from '@/context/edit-collection'

import MobileGoBackButton from '../_components/mobile/mobile-go-back-button'
import MobileGoNextButton from '../_components/mobile/mobile-go-next-button'
import MobileTitle from '../_components/mobile/mobile-title'

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
          leftButtons: [<MobileGoBackButton key={0} />],
          title: <MobileTitle />,
          rightButtons: [<MobileGoNextButton key={0} />],
        }}
      >
        {children}
      </LayoutTemplate>
    </EditCollectionProvider>
  )
}
