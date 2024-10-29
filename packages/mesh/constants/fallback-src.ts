export enum ImageCategory {
  STORY = 'story',
  AVATAR = 'avatar',
  PUBLISHER = 'publisher',
}

export const DEFAULT_IMAGES: Record<ImageCategory, string> = {
  [ImageCategory.STORY]: '/images/default-story-image.webp',
  [ImageCategory.AVATAR]: '/images/default-avatar-image.webp',
  [ImageCategory.PUBLISHER]: '/images/default-publisher-image.webp',
}
