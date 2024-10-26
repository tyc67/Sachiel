import Button from '@/components/button'
import GoBackButton from '@/components/navigation/go-back-button'
import { useEditCollection } from '@/context/edit-collection'

import EditHeroImage from '../edit-hero-image'
import EditSummary from '../edit-summary'
import EditTitle from '../edit-title'

export default function DesktopMainAction() {
  const { step } = useEditCollection()

  const contentJsx = step === 0 ? <Step1 /> : <Step2 />
  return (
    <div className="fixed inset-y-0 left-[calc(max((100vw-1440px)/2,0px))] z-layout flex w-[theme(width.nav.xl)] flex-col gap-8 bg-white shadow-[0px_0px_4px_0px_rgba(0,0,0,0.05),4px_0px_16px_0px_rgba(0,0,0,0.05)]">
      {contentJsx}
    </div>
  )
}

const Step1 = () => {
  const { setStep, collectionPicks, title } = useEditCollection()
  const canGoToNextStep = !!collectionPicks.length && !!title

  return (
    <>
      <div className="flex gap-5 px-5 py-3">
        <GoBackButton
          customAction={() => {
            // show confirm alert then goback
          }}
        />
        <h1>建議集錦</h1>
      </div>
      <div className="flex h-full flex-col gap-6 px-5">
        <EditHeroImage />
        <EditTitle />
        <EditSummary />
      </div>
      <div className="px-5 py-3">
        <Button
          onClick={() => {
            setStep(1)
          }}
          disabled={!canGoToNextStep}
          size="lg"
          color="blue-500"
          text="建立集錦"
        />
      </div>
    </>
  )
}

const Step2 = () => {
  const { setStep } = useEditCollection()

  return (
    <>
      <div className="flex gap-5 px-5 py-3">
        <GoBackButton
          customAction={() => {
            setStep(0)
          }}
        />
        <h1>排序</h1>
      </div>
      <div className="flex h-full flex-col gap-6 px-5">
        <div className="body-2 text-primary-500">
          預設是以加入集錦的時間排序新聞，你也可以拖動新聞，重新排列順序。
        </div>
      </div>
      <div className="px-5 py-3">
        <Button onClick={() => {}} size="lg" color="blue-500" text="建立集錦" />
      </div>
    </>
  )
}
