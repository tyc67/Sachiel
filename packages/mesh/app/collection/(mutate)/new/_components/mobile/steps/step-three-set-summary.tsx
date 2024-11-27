import EditSummary from '@/app/collection/(mutate)/_components/edit-summary'

import TabletGoNextButton from '../../tablet/go-next-button'

export default function MobileStep3SetSummary() {
  return (
    <div className="flex grow flex-col">
      <EditSummary autoFocus={true} />
      <div className="hidden items-center justify-center pt-6 sm:flex">
        <div className="w-[295px]">
          <TabletGoNextButton />
        </div>
      </div>
    </div>
  )
}
