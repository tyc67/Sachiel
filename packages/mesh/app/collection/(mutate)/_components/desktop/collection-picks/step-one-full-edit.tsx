import type { CollectionPickStory } from '../../../_types/edit-collection'
import PickStories from '../../pick-stories'
import PickStoryCard from '../../pick-story-card'

export default function DesktopStep1FullEdit({
  fixedStory,
}: {
  fixedStory: CollectionPickStory | null
}) {
  return !fixedStory ? (
    <Step1PickStories />
  ) : (
    <Step1FixedStory fixedStory={fixedStory} />
  )
}

const Step1PickStories = () => {
  return <PickStories />
}

const Step1FixedStory = ({
  fixedStory,
}: {
  fixedStory: CollectionPickStory | null
}) => {
  if (!fixedStory) return null
  return (
    <PickStoryCard
      key={fixedStory.id}
      isPicked={true}
      onClick={() => {}}
      story={fixedStory}
    />
  )
}
