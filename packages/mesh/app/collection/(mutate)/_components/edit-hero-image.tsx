import type { ChangeEventHandler } from 'react'

import ImageWithFallback from '@/app/_components/image-with-fallback'
import { ImageCategory } from '@/constants/fallback-src'
import { IMAGE_SIZE_LIMITATION } from '@/constants/profile'
import { useEditCollection } from '@/context/edit-collection'

const getHeroImageSrc = (image: File | null) => {
  if (!image || !image.type.startsWith('image/')) return ''
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
    <div className="flex flex-col gap-3 sm:px-5 md:px-[70px] lg:px-0">
      {/* TODO: replace with <ImageWithFallback /> */}
      <div className="relative aspect-[2/1]">
        <ImageWithFallback
          className="sm:rounded-md"
          fallbackCategory={ImageCategory.STORY}
          src={heroImageSrc}
          alt="集錦封面照片"
          style={{
            objectFit: 'cover',
          }}
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
