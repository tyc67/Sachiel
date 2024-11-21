import { useEditCollection } from '@/context/edit-collection'

import DesktopGoBackButton from './desktop-go-back-button'

export default function DesktopNavigation() {
  const { desktopTitle } = useEditCollection()
  return (
    <div className="flex gap-5 px-5 py-3">
      <DesktopGoBackButton />
      <h1>{desktopTitle}</h1>
    </div>
  )
}
