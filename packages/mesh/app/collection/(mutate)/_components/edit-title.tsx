'use client'

import { useEditCollection } from '@/context/edit-collection'
import useAutoFocus from '@/hooks/use-auto-focus'

export default function EditTitle({
  autoFocus = true,
}: {
  autoFocus?: boolean
}) {
  const { title, setTitle } = useEditCollection()
  const inputRef = useAutoFocus<HTMLInputElement>({ disable: !autoFocus })

  return (
    <div className="px-5 md:px-[70px] lg:px-0">
      <label htmlFor="title" className="profile-subtitle  hidden px-1 lg:block">
        標題*
      </label>
      <input
        id="title"
        name="title"
        className="body-2 mt-0 w-full border-b pb-2 text-primary-700 placeholder:text-primary-400 focus:border-b-primary-600 lg:mt-2 lg:px-1"
        type="text"
        value={title}
        onChange={(evt) => {
          setTitle(evt.target.value.trim())
        }}
        placeholder="輸入集錦標題"
        ref={inputRef}
      />
    </div>
  )
}
