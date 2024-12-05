import { notFound } from 'next/navigation'

import { getCurrentUser } from '@/app/actions/auth'
import { getCollectionToEdit } from '@/app/actions/edit-collection'

import ClientLayout from '../../../_components/client-layout'
import { MobileEditCollectionType } from '../../../_types/edit-collection'

export default async function EditCollectionLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { id: string }
}) {
  const collectionId = params.id
  const collectionData = await getCollectionToEdit({ collectionId })
  const user = await getCurrentUser()

  if (
    !collectionData ||
    !collectionData.collection ||
    // prenvent user edit other user's collection
    collectionData.collection.creator?.customId !== user?.customId
  ) {
    notFound()
  }

  const collection = collectionData.collection

  return (
    <ClientLayout
      initialMobileEditType={MobileEditCollectionType.TypeEditStories}
      initialCollection={collection}
    >
      {children}
    </ClientLayout>
  )
}
