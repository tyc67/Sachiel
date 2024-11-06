import { notFound } from 'next/navigation'

import { getCollection } from '@/app/actions/collection'
import { CommentProvider } from '@/context/comment'
import { CommentObjective } from '@/types/objective'

import ClientLayout from './_components/client-layout'

export default async function CollectionLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { id: string }
}) {
  const collectionId = params.id

  const collectionData = await getCollection({
    collectionId,
  })

  if (!collectionData || !collectionData?.collections?.[0]) notFound()

  const collection = collectionData.collections[0]

  return (
    <CommentProvider
      initialComments={collection.comments ?? []}
      commentObjectiveData={collection}
      commentObjective={CommentObjective.Collection}
    >
      <ClientLayout collection={collection}>{children}</ClientLayout>
    </CommentProvider>
  )
}
