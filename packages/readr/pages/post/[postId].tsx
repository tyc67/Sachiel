import errors from '@twreporter/errors'
import type { GetServerSideProps } from 'next'
import type { ReactElement } from 'react'

import client from '~/apollo-client'
import LayoutGeneral from '~/components/layout/layout-general'
import Blank from '~/components/post/article-type/blank'
import Frame from '~/components/post/article-type/frame'
import News from '~/components/post/article-type/news'
import ScrollableVideo from '~/components/post/article-type/scrollable-video'
import type { Post } from '~/graphql/fragments/post'
import type { PostDetail } from '~/graphql/query/post'
import { post } from '~/graphql/query/post'
import { latestPosts as latestPostsQuery } from '~/graphql/query/post'
import type { NextPageWithLayout } from '~/pages/_app'
import { ValidPostStyle } from '~/types/common'

interface PostProps {
  postData: PostDetail
  latestPosts: Post[]
}

const Post: NextPageWithLayout<PostProps> = ({ postData, latestPosts }) => {
  let articleType: JSX.Element

  switch (postData.style) {
    case ValidPostStyle.NEWS:
      articleType = <News postData={postData} latestPosts={latestPosts} />
      break
    case ValidPostStyle.SCROLLABLE_VIDEO:
      articleType = (
        <ScrollableVideo postData={postData} latestPosts={latestPosts} />
      )
      break
    case ValidPostStyle.BLANK:
      articleType = <Blank postData={postData} />
      break
    case ValidPostStyle.FRAME:
      articleType = <Frame postData={postData} latestPosts={latestPosts} />
      break
    default:
      articleType = <News postData={postData} latestPosts={latestPosts} />
      break
  }

  return <>{articleType}</>
}

export const getServerSideProps: GetServerSideProps<PostProps> = async ({
  query,
}) => {
  let postData: PostDetail, latestPosts: Post[]

  try {
    {
      // fetch post data by id
      const { postId } = query
      const { data, errors: gqlErrors } = await client.query<{
        post: PostDetail
      }>({
        query: post,
        variables: { id: postId },
      })

      if (gqlErrors) {
        const annotatingError = errors.helpers.wrap(
          'GraphQLError',
          'failed to complete `postData`',
          { errors: gqlErrors }
        )

        throw annotatingError
      }

      postData = data.post ?? []
    }

    {
      // fetch the latest 4 reports
      const { data, errors: gqlErrors } = await client.query<{
        latestPosts: Post[]
      }>({
        query: latestPostsQuery,
        variables: {
          first: 4,
        },
      })

      if (gqlErrors) {
        const annotatingError = errors.helpers.wrap(
          'GraphQLError',
          'failed to complete `latestPosts`',
          { errors: gqlErrors }
        )

        throw annotatingError
      }
      latestPosts = data.latestPosts ?? []
    }
  } catch (err) {
    console.error(
      JSON.stringify({
        severity: 'ERROR',
        message: errors.helpers.printAll(
          err,
          {
            withStack: true,
            withPayload: true,
          },
          0,
          0
        ),
      })
    )
    return { notFound: true }
  }

  return {
    props: {
      postData: postData,
      latestPosts: latestPosts,
    },
  }
}

Post.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGeneral>{page}</LayoutGeneral>
}

export default Post
