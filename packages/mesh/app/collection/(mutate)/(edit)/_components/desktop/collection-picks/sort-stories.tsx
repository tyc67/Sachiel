import SortStories from '@/app/collection/(mutate)/_components/sort-stories'
import { useEditCollection } from '@/context/edit-collection'

import AdditionalEditor from '../../additional-editor'

export default function DesktopSortStories() {
  return (
    <>
      <SortStories useCollection={useEditCollection} />
      <AdditionalEditor />
    </>
  )
}
