import type { Metadata } from 'next'

import { metadata as rootMetadata } from '@/app/layout'
import LayoutTemplate from '@/components/layout-template'
import { SITE_TITLE, SITE_URL } from '@/constants/config'

const pageTitle = `社群 | ${SITE_TITLE}`
const pageDescription = '追蹤你感興趣的媒體，查看他們最新發布的各類文章。'

export const metadata: Metadata = {
  ...rootMetadata,
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    url: SITE_URL + '/social',
    title: pageTitle,
    description: pageDescription,
  },
}

export default function SocialLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LayoutTemplate
      type="default"
      customStyle={{ background: 'bg-multi-layer-light' }}
    >
      {children}
    </LayoutTemplate>
  )
}
