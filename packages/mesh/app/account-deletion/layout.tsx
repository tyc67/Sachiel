import LayoutTemplate from '@/components/layout-template'

export default function AccountDeletionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <LayoutTemplate type="stateless">{children}</LayoutTemplate>
}
