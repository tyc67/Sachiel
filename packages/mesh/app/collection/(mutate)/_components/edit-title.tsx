import { useEditCollection } from '@/context/edit-collection'

export default function EditTitle() {
  const { title, setTitle } = useEditCollection()
  return (
    <div>
      <label htmlFor="title" className="profile-subtitle px-1">
        標題*
      </label>
      <input
        id="title"
        name="title"
        className="body-2 mt-2 w-full border-b px-1 pb-2 text-primary-700 placeholder:text-primary-400 focus:border-b-primary-600"
        type="text"
        value={title}
        onChange={(evt) => {
          setTitle(evt.target.value.trim())
        }}
        placeholder="輸入集錦標題"
      />
    </div>
  )
}
