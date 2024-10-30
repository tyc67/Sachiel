'use client'

import DesktopCollectionPicks from './desktop-collection-picks'
import DesktopMainAction from './desktop-main-action'

export default function DesktopEditCollection() {
  return (
    <div className="hidden grow flex-col lg:flex">
      <DesktopMainAction />
      <DesktopCollectionPicks />
    </div>
  )
}
