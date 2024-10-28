export function getShareUrl(urlTemplate: string, url: string) {
  return urlTemplate.replace('${url}', url)
}

export function getStoryUrl(storyId: string) {
  return `${location.origin}/story/${storyId}`
}

export function getCollectionUrl(collectionId: string) {
  return `${location.origin}/collection/${collectionId}`
}
