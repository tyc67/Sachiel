import { getAllPublishers } from '../actions/publisher'
import PublisherList from './_components/publisher-list'

export default async function Page() {
  const publishers = await getAllPublishers()
  const sortedPublishers = publishers.sort((a, b) => b.createdAt - a.createdAt)

  return <PublisherList publishers={sortedPublishers} />
}
