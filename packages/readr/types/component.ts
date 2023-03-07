export type ArticleCard = {
  id?: string
  href?: string
  title: string
  image?: string
  date?: string
  readTimeText?: string
  isReport?: boolean
}

export type ArticleCardWithIsFeatured = ArticleCard & {
  isFeatured?: boolean
}
