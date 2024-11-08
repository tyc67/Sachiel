import LayoutTemplate from '@/components/layout-template'

export default function NewCollectionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LayoutTemplate
      type="collection"
      mobileNavigation={{ leftButtons: [], title: '', rightButtons: [] }}
    >
      {children}
    </LayoutTemplate>
  )
}
