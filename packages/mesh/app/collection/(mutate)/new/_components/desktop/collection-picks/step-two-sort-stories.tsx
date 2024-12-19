import SortStories from '@/app/collection/(mutate)/_components/sort-stories'
import { useCreateCollection } from '@/context/create-collection'

export default function DesktopStep2SortStories() {
  return <SortStories useCollection={useCreateCollection} />
}
