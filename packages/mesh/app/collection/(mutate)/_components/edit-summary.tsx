import { useEditCollection } from '@/context/edit-collection'

const maxSummaryLength = 3000

export default function EditSummary() {
  const { summary, setSummary } = useEditCollection()
  return (
    <div className="flex grow flex-col p-5 sm:grow-0 sm:py-0 md:px-[70px] lg:grow lg:p-0">
      <div className="profile-subtitle hidden justify-between lg:flex">
        <label htmlFor="summary" className="text-primary-500">
          敘述
        </label>
        <span className="text-primary-400">
          {summary.length}/{maxSummaryLength}字
        </span>
      </div>
      <textarea
        id="summary"
        name="summary"
        className="w-full grow resize-none rounded-md border border-primary-200 p-3 text-primary-700 outline-none placeholder:text-primary-400 focus:border-primary-600 sm:h-[168px] sm:grow-0 lg:mt-2 lg:h-[unset] lg:grow"
        value={summary}
        placeholder="這個集錦的內容主題是什麼..."
        onChange={(evt) => {
          setSummary(evt.target.value.trim())
        }}
        maxLength={maxSummaryLength}
      />
    </div>
  )
}
