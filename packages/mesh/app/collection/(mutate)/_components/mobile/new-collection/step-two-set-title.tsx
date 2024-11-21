import EditHeroImage from '../../edit-hero-image'
import EditTitle from '../../edit-title'
import TabletGoNextButton from '../../tablet/tablet-go-next-button'

export default function MobileStep2SetTitle() {
  return (
    <div className="flex flex-col gap-8">
      <EditHeroImage />
      <EditTitle autoFocus={true} />
      <div className="hidden items-center justify-center pt-6 sm:flex">
        <div className="w-[295px]">
          <TabletGoNextButton />
        </div>
      </div>
    </div>
  )
}
