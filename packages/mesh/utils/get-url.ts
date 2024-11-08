export function getShareUrl(urlTemplate: string, url: string) {
  return urlTemplate.replace('${url}', url)
}

export function getStoryUrl(storyId: string) {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/story/${storyId}`
  }
  return ''
}

export function getCollectionUrl(collectionId: string) {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/collection/${collectionId}`
  }
  return ''
}

export function getMemberProfileUrl(customId: string) {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/profile/member/${customId}`
  }
  return ''
}
