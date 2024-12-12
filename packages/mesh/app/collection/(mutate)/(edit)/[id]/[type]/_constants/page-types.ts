import {
  DesktopEditCollectionType,
  MobileEditCollectionType,
} from '../../../_types/edit-collection'

export const pageTypes: Record<
  string,
  DesktopEditCollectionType | MobileEditCollectionType
> = {
  edit: DesktopEditCollectionType.EditAll,
  'edit-stories': MobileEditCollectionType.TypeEditStories,
  'edit-summary': MobileEditCollectionType.TypeEditSummary,
  'edit-title': MobileEditCollectionType.TypeEditTitle,
}
