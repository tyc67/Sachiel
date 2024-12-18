import { notFound } from 'next/navigation'

import { getStory } from '@/app/actions/story'
import { CommentProvider } from '@/context/comment'
import { CommentObjective } from '@/types/objective'

import ClientLayout from './_components/client-layout'

export default async function StoryLayout({
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
    <CommentProvider
      initialComments={storyData.story?.comments || []}
      commentsCount={storyData.story.commentsCount ?? 0}
      commentObjectiveData={storyData.story}
      commentObjective={CommentObjective.Story}
    >
      <ClientLayout story={storyData.story}>{children}</ClientLayout>
    </CommentProvider>
  )
}
