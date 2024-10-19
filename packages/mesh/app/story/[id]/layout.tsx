import { notFound } from 'next/navigation'

import { getStory } from '@/app/actions/story'
import { MobileCommentModalContent } from '@/components/comment/mobile-comment-section/mobile-comment-modal-content'
import { CommentProvider } from '@/context/comment-context'

import ClientLayout from './_components/client-layout'

export default async function MediaLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { id: string }
}) {
  const storyId = params.id
  const storyData = await getStory({ storyId })

  if (!storyData || !storyData?.story) {
    notFound()
  }

  return (
    <CommentProvider initialComments={storyData.story?.comments || []}>
      <ClientLayout story={storyData.story}>
        <MobileCommentModalContent data={storyData.story} />
        {children}
      </ClientLayout>
    </CommentProvider>
  )
}
