import LayoutTemplate from '@/components/layout-template'

export default function NewCollectionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
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
  )
}
