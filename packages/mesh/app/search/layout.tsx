import LayoutTemplate from '@/components/layout-template'

import Loading from '../_components/loading'

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LayoutTemplate
      type="default"
      suspenseFallback={<Loading />}
      customStyle={{ background: 'bg-multi-layer-light' }}
    >
      {children}
    </LayoutTemplate>
  )
}
