import PickStories from '@/app/collection/(mutate)/_components/pick-stories'
import { useEditCollection } from '@/context/edit-collection'

export default function DesktopAddStories() {
  return <PickStories useCollection={useEditCollection} />
}
