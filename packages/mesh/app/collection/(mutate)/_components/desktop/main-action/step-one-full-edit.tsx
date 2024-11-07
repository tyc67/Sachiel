import EditHeroImage from '../../edit-hero-image'
import EditSummary from '../../edit-summary'
import EditTitle from '../../edit-title'
import DesktopGoNextButton from '../desktop-go-next-button'
import DesktopNavigation from '../desktop-navigtaion'

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
