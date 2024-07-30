/* eslint-disable */
import * as types from './graphql'
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  'fragment UserActionStory on Story {\n  id\n  url\n  title\n  og_image\n  og_description\n  source {\n    title\n    createdAt\n  }\n  published_date\n  paywall\n  full_screen_ad\n  pickCount\n  pick {\n    createdAt\n    member {\n      id\n      name\n      avatar\n    }\n  }\n  commentCount\n  comment {\n    id\n    content\n    state\n    published_date\n    createdAt\n    member {\n      id\n      name\n      avatar\n    }\n  }\n}':
    types.UserActionStoryFragmentDoc,
  'mutation SignUpMember($registrationData: MemberCreateInput!) {\n  createMember(data: $registrationData) {\n    id\n    firebaseId\n  }\n}':
    types.SignUpMemberDocument,
  'query GetAllCategories {\n  categories(orderBy: {id: asc}) {\n    id\n    slug\n    title\n  }\n}':
    types.GetAllCategoriesDocument,
  'query GetMemberFollowing($memberId: ID!, $takes: Int!) {\n  member(where: {id: $memberId}) {\n    id\n    name\n    avatar\n    following {\n      id\n      name\n      avatar\n      following(where: {id: {gte: 0}}, orderBy: {id: asc}, take: 10000) {\n        id\n        name\n        avatar\n        followerCount\n      }\n      pick(\n        where: {kind: {equals: "read"}, AND: [{is_active: {equals: true}}]}\n        orderBy: {createdAt: desc}\n        take: $takes\n      ) {\n        id\n        createdAt\n        story {\n          ...UserActionStory\n        }\n      }\n      comment(orderBy: {createdAt: desc}, take: $takes) {\n        id\n        createdAt\n        story {\n          ...UserActionStory\n        }\n      }\n    }\n    pick(where: {kind: {equals: "read"}, AND: [{is_active: {equals: true}}]}) {\n      id\n      story {\n        id\n      }\n    }\n  }\n}\n\nquery GetMember($memberId: ID!) {\n  member(where: {id: $memberId}) {\n    id\n    name\n    avatar\n    followingMembers: following {\n      id\n      name\n    }\n    picks: pick {\n      id\n      story {\n        id\n      }\n    }\n    followingCategories: following_category(orderBy: {id: asc}) {\n      id\n      title\n      slug\n    }\n    followPublishers: follow_publisher {\n      id\n      title\n    }\n  }\n}\n\nquery GetMemberByFollowingCategory($slugs: [String!]!) {\n  members(\n    where: {following_category: {every: {slug: {in: $slugs}}}}\n    orderBy: [{id: desc}]\n    take: 20\n    skip: 0\n  ) {\n    id\n    customId\n    name\n    nickname\n    avatar\n  }\n}\n\nquery GetCurrentUserMemberId($uid: String!) {\n  member(where: {firebaseId: $uid}) {\n    id\n    name\n    customId\n    avatar\n  }\n}\n\nquery GetMemberProfile($customId: String, $takes: Int!) {\n  member(where: {customId: $customId}) {\n    id\n    name\n    avatar\n    avatar_image {\n      urlOriginal\n    }\n    intro\n    picksCount: pickCount(\n      where: {kind: {equals: "read"}, is_active: {equals: true}}\n    )\n    followingCount\n    followerCount\n    picks: pick(\n      where: {kind: {equals: "read"}, is_active: {equals: true}}\n      take: $takes\n    ) {\n      story {\n        id\n        og_image\n        source {\n          title\n          official_site\n        }\n        title\n        og_title\n        createdAt\n        tag {\n          id\n          name\n        }\n        pick {\n          createdAt\n          member {\n            id\n            name\n            avatar\n          }\n        }\n        pickCount\n        commentCount\n        paywall\n        full_screen_ad\n        published_date\n        comment(\n          orderBy: {createdAt: desc}\n          where: {member: {customId: {equals: $customId}}}\n          take: 1\n        ) {\n          id\n          content\n          createdAt\n          likeCount\n          member {\n            id\n            name\n            avatar\n          }\n        }\n      }\n      kind\n    }\n    booksCount: pickCount(\n      where: {kind: {equals: "bookmark"}, is_active: {equals: true}}\n    )\n    books: pick(\n      where: {kind: {equals: "bookmark"}, is_active: {equals: true}}\n      take: $takes\n    ) {\n      story {\n        id\n        og_image\n        source {\n          title\n          official_site\n        }\n        title\n        og_title\n        commentCount\n        createdAt\n        tag {\n          id\n          name\n        }\n        pick {\n          createdAt\n          member {\n            id\n            name\n            avatar\n          }\n        }\n        pickCount\n        commentCount\n        paywall\n        full_screen_ad\n        published_date\n        comment(\n          orderBy: {createdAt: desc}\n          where: {member: {customId: {equals: $customId}}}\n          take: 1\n        ) {\n          id\n          content\n          createdAt\n          likeCount\n          member {\n            id\n            name\n            avatar\n          }\n        }\n      }\n      kind\n    }\n  }\n}\n\nquery GetVisitorProfile($customId: String, $takes: Int!) {\n  member(where: {customId: $customId}) {\n    id\n    name\n    avatar\n    avatar_image {\n      urlOriginal\n    }\n    intro\n    picksCount: pickCount(\n      where: {kind: {equals: "read"}, is_active: {equals: true}}\n    )\n    followingCount\n    followerCount\n    picks: pick(\n      where: {kind: {equals: "read"}, is_active: {equals: true}}\n      take: $takes\n    ) {\n      story {\n        id\n        og_image\n        source {\n          title\n          official_site\n        }\n        title\n        og_title\n        createdAt\n        tag {\n          id\n          name\n        }\n        pick {\n          createdAt\n          member {\n            id\n            name\n            avatar\n          }\n        }\n        pickCount\n        commentCount\n        paywall\n        full_screen_ad\n        published_date\n        comment(\n          orderBy: {createdAt: desc}\n          where: {member: {customId: {equals: $customId}}}\n        ) {\n          id\n          content\n          createdAt\n          likeCount\n          member {\n            id\n            name\n            avatar\n          }\n        }\n      }\n      kind\n    }\n  }\n}\n\nquery GetMemberFollowingList($customId: String, $take: Int!) {\n  member(where: {customId: $customId}) {\n    id\n    name\n    avatar\n    followingCount\n    follow_publisherCount\n    following(take: $take) {\n      id\n      customId\n      name\n      avatar\n    }\n    follow_publisher(take: $take) {\n      id\n      customId\n      title\n      logo\n    }\n  }\n}\n\nquery GetMemberFollowerList($customId: String, $take: Int!) {\n  member(where: {customId: $customId}) {\n    id\n    name\n    avatar\n    followingCount\n    follower(take: $take) {\n      id\n      customId\n      name\n      avatar\n    }\n  }\n}':
    types.GetMemberFollowingDocument,
  'query Publishers {\n  publishers {\n    id\n    title\n    rss\n    official_site\n    sponsorCount: followerCount\n  }\n}\n\nquery GetPublisherProfile($publisherId: String, $takes: Int!) {\n  publishers(where: {customId: {equals: $publisherId}}) {\n    id\n    title\n    logo\n    followerCount\n    description\n  }\n  storiesCount(where: {source: {customId: {equals: $publisherId}}})\n  stories(where: {source: {customId: {equals: $publisherId}}}, take: $takes) {\n    title\n    id\n    og_image\n    source {\n      title\n      official_site\n    }\n    og_title\n    commentCount\n    createdAt\n    tag {\n      id\n      name\n    }\n    pick {\n      createdAt\n      member {\n        id\n        name\n        avatar\n      }\n    }\n    pickCount\n    paywall\n    full_screen_ad\n    published_date\n  }\n}\n\nquery GetPublisherFollowerList($publisherId: String, $takes: Int!) {\n  publishers(where: {customId: {equals: $publisherId}}) {\n    id\n    title\n    logo\n    followerCount\n    follower(take: $takes) {\n      id\n      customId\n      name\n      avatar\n    }\n  }\n}':
    types.PublishersDocument,
  'query LatestStories($date: DateTime) {\n  stories(\n    where: {published_date: {gte: $date}, category: {id: {gt: 0}}}\n    orderBy: {published_date: desc}\n  ) {\n    id\n    url\n    title\n    category {\n      id\n      slug\n    }\n    source {\n      id\n      title\n    }\n    published_date\n    summary\n    content\n    og_title\n    og_image\n    og_description\n    full_content\n    origid\n    picksCount: pickCount(\n      where: {kind: {equals: "read"}, is_active: {equals: true}}\n    )\n    picks: pick(where: {kind: {equals: "read"}, is_active: {equals: true}}) {\n      createdAt\n      member {\n        id\n        name\n        avatar\n      }\n    }\n    commentCount\n    paywall\n    full_screen_ad\n  }\n}\n\nquery GetStory($storyId: ID) {\n  story(where: {id: $storyId}) {\n    title\n    content\n    apiData\n    source {\n      id\n      title\n      customId\n    }\n  }\n}':
    types.LatestStoriesDocument,
}

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'fragment UserActionStory on Story {\n  id\n  url\n  title\n  og_image\n  og_description\n  source {\n    title\n    createdAt\n  }\n  published_date\n  paywall\n  full_screen_ad\n  pickCount\n  pick {\n    createdAt\n    member {\n      id\n      name\n      avatar\n    }\n  }\n  commentCount\n  comment {\n    id\n    content\n    state\n    published_date\n    createdAt\n    member {\n      id\n      name\n      avatar\n    }\n  }\n}'
): typeof documents['fragment UserActionStory on Story {\n  id\n  url\n  title\n  og_image\n  og_description\n  source {\n    title\n    createdAt\n  }\n  published_date\n  paywall\n  full_screen_ad\n  pickCount\n  pick {\n    createdAt\n    member {\n      id\n      name\n      avatar\n    }\n  }\n  commentCount\n  comment {\n    id\n    content\n    state\n    published_date\n    createdAt\n    member {\n      id\n      name\n      avatar\n    }\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'mutation SignUpMember($registrationData: MemberCreateInput!) {\n  createMember(data: $registrationData) {\n    id\n    firebaseId\n  }\n}'
): typeof documents['mutation SignUpMember($registrationData: MemberCreateInput!) {\n  createMember(data: $registrationData) {\n    id\n    firebaseId\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query GetAllCategories {\n  categories(orderBy: {id: asc}) {\n    id\n    slug\n    title\n  }\n}'
): typeof documents['query GetAllCategories {\n  categories(orderBy: {id: asc}) {\n    id\n    slug\n    title\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query GetMemberFollowing($memberId: ID!, $takes: Int!) {\n  member(where: {id: $memberId}) {\n    id\n    name\n    avatar\n    following {\n      id\n      name\n      avatar\n      following(where: {id: {gte: 0}}, orderBy: {id: asc}, take: 10000) {\n        id\n        name\n        avatar\n        followerCount\n      }\n      pick(\n        where: {kind: {equals: "read"}, AND: [{is_active: {equals: true}}]}\n        orderBy: {createdAt: desc}\n        take: $takes\n      ) {\n        id\n        createdAt\n        story {\n          ...UserActionStory\n        }\n      }\n      comment(orderBy: {createdAt: desc}, take: $takes) {\n        id\n        createdAt\n        story {\n          ...UserActionStory\n        }\n      }\n    }\n    pick(where: {kind: {equals: "read"}, AND: [{is_active: {equals: true}}]}) {\n      id\n      story {\n        id\n      }\n    }\n  }\n}\n\nquery GetMember($memberId: ID!) {\n  member(where: {id: $memberId}) {\n    id\n    name\n    avatar\n    followingMembers: following {\n      id\n      name\n    }\n    picks: pick {\n      id\n      story {\n        id\n      }\n    }\n    followingCategories: following_category(orderBy: {id: asc}) {\n      id\n      title\n      slug\n    }\n    followPublishers: follow_publisher {\n      id\n      title\n    }\n  }\n}\n\nquery GetMemberByFollowingCategory($slugs: [String!]!) {\n  members(\n    where: {following_category: {every: {slug: {in: $slugs}}}}\n    orderBy: [{id: desc}]\n    take: 20\n    skip: 0\n  ) {\n    id\n    customId\n    name\n    nickname\n    avatar\n  }\n}\n\nquery GetCurrentUserMemberId($uid: String!) {\n  member(where: {firebaseId: $uid}) {\n    id\n    name\n    customId\n    avatar\n  }\n}\n\nquery GetMemberProfile($customId: String, $takes: Int!) {\n  member(where: {customId: $customId}) {\n    id\n    name\n    avatar\n    avatar_image {\n      urlOriginal\n    }\n    intro\n    picksCount: pickCount(\n      where: {kind: {equals: "read"}, is_active: {equals: true}}\n    )\n    followingCount\n    followerCount\n    picks: pick(\n      where: {kind: {equals: "read"}, is_active: {equals: true}}\n      take: $takes\n    ) {\n      story {\n        id\n        og_image\n        source {\n          title\n          official_site\n        }\n        title\n        og_title\n        createdAt\n        tag {\n          id\n          name\n        }\n        pick {\n          createdAt\n          member {\n            id\n            name\n            avatar\n          }\n        }\n        pickCount\n        commentCount\n        paywall\n        full_screen_ad\n        published_date\n        comment(\n          orderBy: {createdAt: desc}\n          where: {member: {customId: {equals: $customId}}}\n          take: 1\n        ) {\n          id\n          content\n          createdAt\n          likeCount\n          member {\n            id\n            name\n            avatar\n          }\n        }\n      }\n      kind\n    }\n    booksCount: pickCount(\n      where: {kind: {equals: "bookmark"}, is_active: {equals: true}}\n    )\n    books: pick(\n      where: {kind: {equals: "bookmark"}, is_active: {equals: true}}\n      take: $takes\n    ) {\n      story {\n        id\n        og_image\n        source {\n          title\n          official_site\n        }\n        title\n        og_title\n        commentCount\n        createdAt\n        tag {\n          id\n          name\n        }\n        pick {\n          createdAt\n          member {\n            id\n            name\n            avatar\n          }\n        }\n        pickCount\n        commentCount\n        paywall\n        full_screen_ad\n        published_date\n        comment(\n          orderBy: {createdAt: desc}\n          where: {member: {customId: {equals: $customId}}}\n          take: 1\n        ) {\n          id\n          content\n          createdAt\n          likeCount\n          member {\n            id\n            name\n            avatar\n          }\n        }\n      }\n      kind\n    }\n  }\n}\n\nquery GetVisitorProfile($customId: String, $takes: Int!) {\n  member(where: {customId: $customId}) {\n    id\n    name\n    avatar\n    avatar_image {\n      urlOriginal\n    }\n    intro\n    picksCount: pickCount(\n      where: {kind: {equals: "read"}, is_active: {equals: true}}\n    )\n    followingCount\n    followerCount\n    picks: pick(\n      where: {kind: {equals: "read"}, is_active: {equals: true}}\n      take: $takes\n    ) {\n      story {\n        id\n        og_image\n        source {\n          title\n          official_site\n        }\n        title\n        og_title\n        createdAt\n        tag {\n          id\n          name\n        }\n        pick {\n          createdAt\n          member {\n            id\n            name\n            avatar\n          }\n        }\n        pickCount\n        commentCount\n        paywall\n        full_screen_ad\n        published_date\n        comment(\n          orderBy: {createdAt: desc}\n          where: {member: {customId: {equals: $customId}}}\n        ) {\n          id\n          content\n          createdAt\n          likeCount\n          member {\n            id\n            name\n            avatar\n          }\n        }\n      }\n      kind\n    }\n  }\n}\n\nquery GetMemberFollowingList($customId: String, $take: Int!) {\n  member(where: {customId: $customId}) {\n    id\n    name\n    avatar\n    followingCount\n    follow_publisherCount\n    following(take: $take) {\n      id\n      customId\n      name\n      avatar\n    }\n    follow_publisher(take: $take) {\n      id\n      customId\n      title\n      logo\n    }\n  }\n}\n\nquery GetMemberFollowerList($customId: String, $take: Int!) {\n  member(where: {customId: $customId}) {\n    id\n    name\n    avatar\n    followingCount\n    follower(take: $take) {\n      id\n      customId\n      name\n      avatar\n    }\n  }\n}'
): typeof documents['query GetMemberFollowing($memberId: ID!, $takes: Int!) {\n  member(where: {id: $memberId}) {\n    id\n    name\n    avatar\n    following {\n      id\n      name\n      avatar\n      following(where: {id: {gte: 0}}, orderBy: {id: asc}, take: 10000) {\n        id\n        name\n        avatar\n        followerCount\n      }\n      pick(\n        where: {kind: {equals: "read"}, AND: [{is_active: {equals: true}}]}\n        orderBy: {createdAt: desc}\n        take: $takes\n      ) {\n        id\n        createdAt\n        story {\n          ...UserActionStory\n        }\n      }\n      comment(orderBy: {createdAt: desc}, take: $takes) {\n        id\n        createdAt\n        story {\n          ...UserActionStory\n        }\n      }\n    }\n    pick(where: {kind: {equals: "read"}, AND: [{is_active: {equals: true}}]}) {\n      id\n      story {\n        id\n      }\n    }\n  }\n}\n\nquery GetMember($memberId: ID!) {\n  member(where: {id: $memberId}) {\n    id\n    name\n    avatar\n    followingMembers: following {\n      id\n      name\n    }\n    picks: pick {\n      id\n      story {\n        id\n      }\n    }\n    followingCategories: following_category(orderBy: {id: asc}) {\n      id\n      title\n      slug\n    }\n    followPublishers: follow_publisher {\n      id\n      title\n    }\n  }\n}\n\nquery GetMemberByFollowingCategory($slugs: [String!]!) {\n  members(\n    where: {following_category: {every: {slug: {in: $slugs}}}}\n    orderBy: [{id: desc}]\n    take: 20\n    skip: 0\n  ) {\n    id\n    customId\n    name\n    nickname\n    avatar\n  }\n}\n\nquery GetCurrentUserMemberId($uid: String!) {\n  member(where: {firebaseId: $uid}) {\n    id\n    name\n    customId\n    avatar\n  }\n}\n\nquery GetMemberProfile($customId: String, $takes: Int!) {\n  member(where: {customId: $customId}) {\n    id\n    name\n    avatar\n    avatar_image {\n      urlOriginal\n    }\n    intro\n    picksCount: pickCount(\n      where: {kind: {equals: "read"}, is_active: {equals: true}}\n    )\n    followingCount\n    followerCount\n    picks: pick(\n      where: {kind: {equals: "read"}, is_active: {equals: true}}\n      take: $takes\n    ) {\n      story {\n        id\n        og_image\n        source {\n          title\n          official_site\n        }\n        title\n        og_title\n        createdAt\n        tag {\n          id\n          name\n        }\n        pick {\n          createdAt\n          member {\n            id\n            name\n            avatar\n          }\n        }\n        pickCount\n        commentCount\n        paywall\n        full_screen_ad\n        published_date\n        comment(\n          orderBy: {createdAt: desc}\n          where: {member: {customId: {equals: $customId}}}\n          take: 1\n        ) {\n          id\n          content\n          createdAt\n          likeCount\n          member {\n            id\n            name\n            avatar\n          }\n        }\n      }\n      kind\n    }\n    booksCount: pickCount(\n      where: {kind: {equals: "bookmark"}, is_active: {equals: true}}\n    )\n    books: pick(\n      where: {kind: {equals: "bookmark"}, is_active: {equals: true}}\n      take: $takes\n    ) {\n      story {\n        id\n        og_image\n        source {\n          title\n          official_site\n        }\n        title\n        og_title\n        commentCount\n        createdAt\n        tag {\n          id\n          name\n        }\n        pick {\n          createdAt\n          member {\n            id\n            name\n            avatar\n          }\n        }\n        pickCount\n        commentCount\n        paywall\n        full_screen_ad\n        published_date\n        comment(\n          orderBy: {createdAt: desc}\n          where: {member: {customId: {equals: $customId}}}\n          take: 1\n        ) {\n          id\n          content\n          createdAt\n          likeCount\n          member {\n            id\n            name\n            avatar\n          }\n        }\n      }\n      kind\n    }\n  }\n}\n\nquery GetVisitorProfile($customId: String, $takes: Int!) {\n  member(where: {customId: $customId}) {\n    id\n    name\n    avatar\n    avatar_image {\n      urlOriginal\n    }\n    intro\n    picksCount: pickCount(\n      where: {kind: {equals: "read"}, is_active: {equals: true}}\n    )\n    followingCount\n    followerCount\n    picks: pick(\n      where: {kind: {equals: "read"}, is_active: {equals: true}}\n      take: $takes\n    ) {\n      story {\n        id\n        og_image\n        source {\n          title\n          official_site\n        }\n        title\n        og_title\n        createdAt\n        tag {\n          id\n          name\n        }\n        pick {\n          createdAt\n          member {\n            id\n            name\n            avatar\n          }\n        }\n        pickCount\n        commentCount\n        paywall\n        full_screen_ad\n        published_date\n        comment(\n          orderBy: {createdAt: desc}\n          where: {member: {customId: {equals: $customId}}}\n        ) {\n          id\n          content\n          createdAt\n          likeCount\n          member {\n            id\n            name\n            avatar\n          }\n        }\n      }\n      kind\n    }\n  }\n}\n\nquery GetMemberFollowingList($customId: String, $take: Int!) {\n  member(where: {customId: $customId}) {\n    id\n    name\n    avatar\n    followingCount\n    follow_publisherCount\n    following(take: $take) {\n      id\n      customId\n      name\n      avatar\n    }\n    follow_publisher(take: $take) {\n      id\n      customId\n      title\n      logo\n    }\n  }\n}\n\nquery GetMemberFollowerList($customId: String, $take: Int!) {\n  member(where: {customId: $customId}) {\n    id\n    name\n    avatar\n    followingCount\n    follower(take: $take) {\n      id\n      customId\n      name\n      avatar\n    }\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query Publishers {\n  publishers {\n    id\n    title\n    rss\n    official_site\n    sponsorCount: followerCount\n  }\n}\n\nquery GetPublisherProfile($publisherId: String, $takes: Int!) {\n  publishers(where: {customId: {equals: $publisherId}}) {\n    id\n    title\n    logo\n    followerCount\n    description\n  }\n  storiesCount(where: {source: {customId: {equals: $publisherId}}})\n  stories(where: {source: {customId: {equals: $publisherId}}}, take: $takes) {\n    title\n    id\n    og_image\n    source {\n      title\n      official_site\n    }\n    og_title\n    commentCount\n    createdAt\n    tag {\n      id\n      name\n    }\n    pick {\n      createdAt\n      member {\n        id\n        name\n        avatar\n      }\n    }\n    pickCount\n    paywall\n    full_screen_ad\n    published_date\n  }\n}\n\nquery GetPublisherFollowerList($publisherId: String, $takes: Int!) {\n  publishers(where: {customId: {equals: $publisherId}}) {\n    id\n    title\n    logo\n    followerCount\n    follower(take: $takes) {\n      id\n      customId\n      name\n      avatar\n    }\n  }\n}'
): typeof documents['query Publishers {\n  publishers {\n    id\n    title\n    rss\n    official_site\n    sponsorCount: followerCount\n  }\n}\n\nquery GetPublisherProfile($publisherId: String, $takes: Int!) {\n  publishers(where: {customId: {equals: $publisherId}}) {\n    id\n    title\n    logo\n    followerCount\n    description\n  }\n  storiesCount(where: {source: {customId: {equals: $publisherId}}})\n  stories(where: {source: {customId: {equals: $publisherId}}}, take: $takes) {\n    title\n    id\n    og_image\n    source {\n      title\n      official_site\n    }\n    og_title\n    commentCount\n    createdAt\n    tag {\n      id\n      name\n    }\n    pick {\n      createdAt\n      member {\n        id\n        name\n        avatar\n      }\n    }\n    pickCount\n    paywall\n    full_screen_ad\n    published_date\n  }\n}\n\nquery GetPublisherFollowerList($publisherId: String, $takes: Int!) {\n  publishers(where: {customId: {equals: $publisherId}}) {\n    id\n    title\n    logo\n    followerCount\n    follower(take: $takes) {\n      id\n      customId\n      name\n      avatar\n    }\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: 'query LatestStories($date: DateTime) {\n  stories(\n    where: {published_date: {gte: $date}, category: {id: {gt: 0}}}\n    orderBy: {published_date: desc}\n  ) {\n    id\n    url\n    title\n    category {\n      id\n      slug\n    }\n    source {\n      id\n      title\n    }\n    published_date\n    summary\n    content\n    og_title\n    og_image\n    og_description\n    full_content\n    origid\n    picksCount: pickCount(\n      where: {kind: {equals: "read"}, is_active: {equals: true}}\n    )\n    picks: pick(where: {kind: {equals: "read"}, is_active: {equals: true}}) {\n      createdAt\n      member {\n        id\n        name\n        avatar\n      }\n    }\n    commentCount\n    paywall\n    full_screen_ad\n  }\n}\n\nquery GetStory($storyId: ID) {\n  story(where: {id: $storyId}) {\n    title\n    content\n    apiData\n    source {\n      id\n      title\n      customId\n    }\n  }\n}'
): typeof documents['query LatestStories($date: DateTime) {\n  stories(\n    where: {published_date: {gte: $date}, category: {id: {gt: 0}}}\n    orderBy: {published_date: desc}\n  ) {\n    id\n    url\n    title\n    category {\n      id\n      slug\n    }\n    source {\n      id\n      title\n    }\n    published_date\n    summary\n    content\n    og_title\n    og_image\n    og_description\n    full_content\n    origid\n    picksCount: pickCount(\n      where: {kind: {equals: "read"}, is_active: {equals: true}}\n    )\n    picks: pick(where: {kind: {equals: "read"}, is_active: {equals: true}}) {\n      createdAt\n      member {\n        id\n        name\n        avatar\n      }\n    }\n    commentCount\n    paywall\n    full_screen_ad\n  }\n}\n\nquery GetStory($storyId: ID) {\n  story(where: {id: $storyId}) {\n    title\n    content\n    apiData\n    source {\n      id\n      title\n      customId\n    }\n  }\n}']

export function gql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
