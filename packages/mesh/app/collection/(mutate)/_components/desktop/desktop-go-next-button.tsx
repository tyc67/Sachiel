import Button from '@/components/button'
import { useEditCollection } from '@/context/edit-collection'

export default function DesktopGoNextButton() {
  const { step, heroImage, collectionPickStories, title, createCollection } =
    useEditCollection()
  const canGoToNextStep =
    !!heroImage && !!collectionPickStories.length && !!title

  switch (step) {
    // TODO: two step creation
    case 0:
      return (
        <Button
          onClick={createCollection}
          disabled={!canGoToNextStep}
          size="lg"
          color="primary"
          text="建立集錦"
        />
      )

    default:
      return null
  }
}
