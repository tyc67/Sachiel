import Button from '@/components/button'
import { useEditCollection } from '@/context/edit-collection'

import { DesktopEditCollectionStep } from '../../_types/edit-collection'

export default function DesktopGoNextButton() {
  const {
    desktopStepName,
    heroImage,
    collectionPickStories,
    title,
    createCollection,
  } = useEditCollection()
  const canGoToNextStep =
    !!heroImage && !!collectionPickStories.length && !!title

  switch (desktopStepName) {
    // TODO: two step creation
    case DesktopEditCollectionStep.DesktopStep1EditAll:
      return (
        <Button
          onClick={createCollection}
          disabled={!canGoToNextStep}
          size="lg"
          color="primary"
          text="建立集錦"
        />
      )
    // TODO: implement in phase2
    // case DesktopEditCollectionStep.DesktopStep2SortStories:
    //   return null
    default:
      return null
  }
}
