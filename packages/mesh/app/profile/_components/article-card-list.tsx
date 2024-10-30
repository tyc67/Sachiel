import ArticleCard from '@/app/profile/_components/article-card'
import type {
  BookmarkItem,
  Bookmarks,
  Collections,
  FollowingCollection,
  PickList,
  PickListItem,
} from '@/types/profile'

import CollectionsCarousel from './collections-carousel'

interface ArticleCardListProps {
  items: PickList | Bookmarks | Collections
  emptyMessage: string
  elementForEmpty?: React.ReactNode
  memberId?: string
  avatar?: string
  name?: string
  shouldShowComment: boolean
  followingCollection?: FollowingCollection
}

function ArticleCardList({
  items,
  shouldShowComment,
  emptyMessage,
  elementForEmpty,
  memberId,
  avatar,
  name,
  followingCollection,
}: ArticleCardListProps) {
  if (!items?.length) {
    return (
      <div className="flex grow flex-col">
        <section className="flex h-full max-w-[theme(width.maxMain)] grow flex-col items-center justify-center whitespace-pre bg-primary-700-dark text-center text-base text-primary-400 sm:min-h-full">
          <p className="mb-4 w-full">{emptyMessage}</p>
          {elementForEmpty}
        </section>
      </div>
    )
  }
  const isCollection = items[0].__typename === 'Collection'
  return (
    <div className="bg-multi-layer-light">
      {followingCollection && (
        <CollectionsCarousel followingCollection={followingCollection} />
      )}
      <p className="list-title bg-white px-5 pt-4 text-primary-700">精選文章</p>
      <ul
        className={`max-w-[theme(width.maxMain)] bg-primary-700-dark md:grid md:grid-cols-2 md:items-center md:gap-5 md:p-10 lg:grid-cols-3 ${
          isCollection
            ? 'sm:grid sm:grid-cols-2 sm:items-center sm:gap-5 sm:px-10 sm:py-5'
            : ''
        }`}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          if (!item) return
          if ('story' in item && !item.story) return
          return (
            <li
              key={index}
              className="relative flex size-full grow bg-white md:h-full md:flex-col md:rounded-md md:drop-shadow"
            >
              {'story' in item ? (
                <ArticleCard
                  storyData={item.story as NonNullable<PickListItem>}
                  isLast={isLast}
                  memberId={memberId}
                  avatar={avatar}
                  name={name}
                  shouldShowComment={shouldShowComment}
                />
              ) : (
                <ArticleCard
                  storyData={item as NonNullable<BookmarkItem>}
                  isLast={isLast}
                  shouldShowComment={shouldShowComment}
                />
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default ArticleCardList
