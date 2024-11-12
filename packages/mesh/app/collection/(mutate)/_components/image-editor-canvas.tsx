'use client'

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react'

import type { Point, Rect } from '@/types/canvas'
import { getCroppedImageFileFromImageElement } from '@/utils/image-blob'

function getClampNumber(value: number, maxValue: number, minValue: number) {
  return Math.max(Math.min(maxValue, value), minValue)
}

type DrawData = {
  imageRect: Rect
  selectionRect: Rect
  scaleRate: number
}

export type ImageEditorCanvasRef = {
  getCroppedImage: () => Promise<File | null>
}

type ImageEditorCanvasProps = { imageFile: File }

const DrawRectWidth = 2

export default forwardRef<ImageEditorCanvasRef, ImageEditorCanvasProps>(
  function ImageEditorCanvas({ imageFile }, ref) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const imgRef = useRef<HTMLImageElement | null>(null)
    const drawDataRef = useRef<DrawData>()
    const draggingPointRef = useRef<Point | null>(null)

    useImperativeHandle(ref, () => ({
      async getCroppedImage() {
        if (!imgRef.current || !drawDataRef.current) return null
        const { selectionRect, imageRect } = drawDataRef.current

        try {
          return await getCroppedImageFileFromImageElement(
            imgRef.current,
            selectionRect,
            imageRect
          )
        } catch (error) {
          console.error('output cropped image from image editor failed,', error)
          return null
        }
      },
    }))

    const draw = useCallback(() => {
      const canvas = canvasRef.current
      const img = imgRef.current
      const ctx = canvas?.getContext('2d')
      const drawData = drawDataRef.current
      if (!canvas || !img || !ctx || !drawData) return
      const { imageRect, selectionRect, scaleRate } = drawData

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, imageRect.x, imageRect.y)

      ctx.strokeStyle = 'white'
      ctx.lineWidth = DrawRectWidth * scaleRate

      ctx.strokeRect(
        selectionRect.x,
        selectionRect.y,
        selectionRect.width,
        selectionRect.height
      )
      ctx.fillStyle = 'rgba(0,0,0,0.5)'
      ctx.fillRect(0, 0, canvas.width, selectionRect.y)
      ctx.fillRect(
        0,
        selectionRect.y + selectionRect.height,
        canvas.width,
        canvas.height - (selectionRect.y + selectionRect.height)
      )
    }, [])

    useEffect(() => {
      const canvas = canvasRef.current
      const img = imgRef.current
      const isFirstLoaded = canvas && !img

      if (isFirstLoaded) {
        const ctx = canvas.getContext('2d')
        if (!ctx) return
        const img = new Image()
        img.src = URL.createObjectURL(imageFile)
        img.onload = () => {
          const canvasBoundingRect = canvas.getBoundingClientRect()
          const canvasAspectRatio =
            canvasBoundingRect.width / canvasBoundingRect.height
          const imgAspectRatio = img.naturalWidth / img.naturalHeight

          let imageX = 0,
            imageY = 0,
            scaleRate = 1
          // fixed img width and set image vertically center
          if (imgAspectRatio > canvasAspectRatio) {
            canvas.width = img.naturalWidth
            canvas.height = canvas.width / canvasAspectRatio
            imageX = 0
            imageY = (canvas.height - img.naturalHeight) / 2
            scaleRate = canvas.width / canvasBoundingRect.width
          }
          // fixed img height and set image horizontally center
          else if (imgAspectRatio < canvasAspectRatio) {
            canvas.height = img.naturalHeight
            canvas.width = canvas.height * canvasAspectRatio
            imageX = (canvas.width - img.naturalWidth) / 2
            imageY = 0
            scaleRate = canvas.height / canvasBoundingRect.height
          } // imageAspectRatio === canvasAspectRatio
          else {
            canvas.width = img.naturalWidth
            canvas.height = img.naturalHeight
            scaleRate = canvas.width / canvasBoundingRect.width
          }

          drawDataRef.current = {
            scaleRate,
            imageRect: {
              x: imageX,
              y: imageY,
              width: img.naturalWidth,
              height: img.naturalHeight,
            },
            selectionRect: {
              x: 0,
              y: (canvas.height - canvas.width / 2) / 2,
              width: canvas.width,
              height: canvas.width / 2,
            },
          }

          URL.revokeObjectURL(img.src)

          draw()
        }
        img.onerror = () => {
          console.error('Failed to load image to Image Editor')
        }
        imgRef.current = img
      }
    }, [draw, imageFile])

    useEffect(() => {
      const canvas = canvasRef.current
      if (canvas) {
        const onCanvasMouseDown = (e: MouseEvent) => {
          // block dragging if image is totally inside the selection
          if (
            drawDataRef.current &&
            drawDataRef.current.imageRect.height >
              drawDataRef.current.selectionRect.height
          ) {
            draggingPointRef.current = {
              x: e.clientX,
              y: e.clientY,
            }
          }
        }
        const onCanvasMouseMove = (e: MouseEvent) => {
          const draggingPoint = draggingPointRef.current
          const drawData = drawDataRef?.current
          if (draggingPoint && drawData) {
            const yDiff = (e.clientY - draggingPoint.y) * drawData.scaleRate
            const maxSelectionY =
              drawData.imageRect.y +
              drawData.imageRect.height -
              drawData.selectionRect.height
            const minSelctionY = drawData.imageRect.y
            const newSelctionY = getClampNumber(
              drawData.selectionRect.y + yDiff,
              maxSelectionY,
              minSelctionY
            )
            drawData.selectionRect.y = newSelctionY
            draw()
            draggingPointRef.current = {
              x: e.clientX,
              y: e.clientY,
            }
          }
        }
        const onCanvasMouseUpOrLeave = () => {
          draggingPointRef.current = null
        }
        canvas.addEventListener('mousedown', onCanvasMouseDown)
        canvas.addEventListener('mousemove', onCanvasMouseMove)
        canvas.addEventListener('mouseup', onCanvasMouseUpOrLeave)
        canvas.addEventListener('mouseleave', onCanvasMouseUpOrLeave)

        return () => {
          canvas.removeEventListener('mousedown', onCanvasMouseDown)
          canvas.removeEventListener('mousemove', onCanvasMouseMove)
          canvas.removeEventListener('mouseup', onCanvasMouseUpOrLeave)
          canvas.removeEventListener('mouseleave', onCanvasMouseUpOrLeave)
        }
      }
    }, [])
    return (
      <div className="grow">
        <canvas className="size-full " ref={canvasRef} />
      </div>
    )
  }
)
