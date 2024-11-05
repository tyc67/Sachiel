import EditSummary from '../../edit-summary'
import TabletGoNextButton from '../../tablet/tablet-go-next-button'

export default function MobileStep3SetSummary() {
  return (
    <div className="flex grow flex-col">
      <EditSummary />
      <div className="hidden items-center justify-center pt-6 sm:flex">
        <div className="w-[295px]">
          <TabletGoNextButton />
        </div>
      </div>
    </div>
  )
}
