import Image from 'next/image'
import type { ChangeEventHandler } from 'react'

import { IMAGE_SIZE_LIMITATION } from '@/constants/profile'
import { useEditCollection } from '@/context/edit-collection'

const getHeroImageSrc = (image: string | File) => {
  if (typeof image === 'string') return image
  if (!image.type.startsWith('image/')) return ''
  return URL.createObjectURL(image)
}

export default function EditHeroImage() {
  const { heroImage, setHeroImage } = useEditCollection()
  const heroImageSrc = getHeroImageSrc(heroImage)

  const onImageInputChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    const file = evt.target.files?.[0]

    if (!file) return
    if (file.size > IMAGE_SIZE_LIMITATION) {
      console.error('上傳的檔案大小須小於10MB')
      return
    }
    setHeroImage(file)
  }

  return (
    <div className="flex flex-col gap-3">
      {/* TODO: replace with <ImageWithFallback /> */}
      <div className="relative aspect-[2/1]">
        <Image
          className="rounded-md"
          src={heroImageSrc || '/images/default-story-image.webP'}
          alt="集錦封面照片"
          objectFit="cover"
          fill
        />
      </div>
      <button className="body-2 text-custom-blue">
        <label htmlFor="image">更換封面照片</label>
      </button>
      <input
        id="image"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onImageInputChange}
      />
    </div>
  )
}
