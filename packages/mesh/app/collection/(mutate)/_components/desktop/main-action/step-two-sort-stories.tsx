'use client'

import Button from '@/components/button'

import DesktopGoBackButton from '../desktop-go-back-button'

// TODO: update at phase2
export default function DesktopStep2SortStories() {
  return (
    <>
      <div className="flex gap-5 px-5 py-3">
        <DesktopGoBackButton />
        <h1>排序</h1>
      </div>
      <div className="flex h-full flex-col gap-6 px-5">
        <div className="body-2 text-primary-500">
          預設是以加入集錦的時間排序新聞，你也可以拖動新聞，重新排列順序。
        </div>
      </div>
      <div className="px-5 py-3">
        <Button onClick={() => {}} size="lg" color="blue-500" text="建立集錦" />
      </div>
    </>
  )
}
