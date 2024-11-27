import EditHeroImage from '@/app/collection/(mutate)/_components/edit-hero-image'
import EditSummary from '@/app/collection/(mutate)/_components/edit-summary'
import EditTitle from '@/app/collection/(mutate)/_components/edit-title'

import DesktopGoNextButton from '../go-next-button'
import DesktopNavigation from '../navigtaion'

export default function DesktopStep1FullEdit() {
  return (
    <>
      <DesktopNavigation />
      <div className="flex h-full flex-col gap-6 px-5">
        <EditHeroImage />
        <EditTitle />
        <EditSummary />
      </div>
      <div className="px-5 py-3">
        <DesktopGoNextButton />
      </div>
    </>
  )
}
