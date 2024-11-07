import type { Rect } from '@/types/canvas'

export async function getImageFileFromImageElement(
  imageElement: HTMLImageElement
) {
  const imageBlob = (await getImageBlob(imageElement)) as Blob
  const file = new File([imageBlob], 'image.jpg', imageBlob)
  return file
}

function getImageBlob(imageElement: HTMLImageElement) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    // Set canvas dimensions to the image's original (natural) dimensions
    canvas.width = imageElement.naturalWidth
    canvas.height = imageElement.naturalHeight

    const ctx = canvas.getContext('2d')
    // Draw the image onto the canvas using its original dimensions
    ctx?.drawImage(
      imageElement,
      0,
      0,
      imageElement.naturalWidth,
      imageElement.naturalHeight
    )

    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob)
        } else {
          reject(new Error('Failed to convert image to blob.'))
        }
      },
      'image/png',
      1.0
    )
  })
}

export async function getCroppedImageFileFromImageElement(
  imageElement: HTMLImageElement,
  selectionRect: Rect,
  imageRect: Rect
) {
  const imageBlob = (await getCroppedImageBlob(
    imageElement,
    selectionRect,
    imageRect
  )) as Blob
  const file = new File([imageBlob], 'image.jpg', imageBlob)
  return file
}

function getCroppedImageBlob(
  imageElement: HTMLImageElement,
  selectionRect: Rect,
  imageRect: Rect
) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    // Set canvas dimensions to the selectionRect
    canvas.width = selectionRect.width
    canvas.height = selectionRect.height

    const ctx = canvas.getContext('2d')
    // Draw the image onto the canvas using the cropped rect
    ctx?.drawImage(
      imageElement,
      // Rect inside image to be drawn in canvas
      0,
      Math.max(selectionRect.y - imageRect.y, 0),
      imageRect.width,
      selectionRect.height,
      // Rect on canvas to draw image
      imageRect.x,
      Math.max(imageRect.y - selectionRect.y, 0),
      imageRect.width,
      selectionRect.height
    )

    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob)
        } else {
          reject(new Error('Failed to convert image to blob.'))
        }
      },
      'image/png',
      1.0
    )
  })
}
