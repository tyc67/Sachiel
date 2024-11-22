'use client'

import { useEditCollection } from '@/context/edit-collection'

import { DesktopEditCollectionStep } from '../../../_types/edit-collection'
import DesktopStep1FullEdit from './step-one-full-edit'
// import DesktopStep2SortStories from './step-two-sort-stories'

export default function DesktopMainAction() {
  const { desktopStepName } = useEditCollection()

  const getStepJsx = (stepName: DesktopEditCollectionStep) => {
    switch (stepName) {
      case DesktopEditCollectionStep.DesktopStep1EditAll:
        return <DesktopStep1FullEdit />
      // TODO: implement in phase2
      // case DesktopEditCollectionStep.DesktopStep2SortStories:
      //   return <DesktopStep2SortStories />
      default:
        return null
    }
  }

  return (
    <div className="fixed inset-y-0 left-[calc(max((100vw-1440px)/2,0px))] z-layout flex w-[theme(width.nav.xl)] flex-col gap-8 bg-white shadow-[0px_0px_4px_0px_rgba(0,0,0,0.05),4px_0px_16px_0px_rgba(0,0,0,0.05)]">
      {getStepJsx(desktopStepName)}
    </div>
  )
}
