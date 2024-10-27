import Icon from '@/components/icon'

export default function Page() {
  return (
    <main className="sm:flex sm:justify-center sm:pb-[115px] sm:pt-5 xl:py-10">
      <section className="overflow-hidden bg-single-layer sm:w-articleMain sm:rounded-xl sm:shadow-[0_0_4px_0_rgba(0,9,40,0.1),0_2px_2px_0_rgba(0,9,40,0.1)]">
        <div className="flex flex-col items-center gap-y-6 px-5 pb-5 pt-10 sm:border-b-[0.5px] sm:border-b-primary-800 sm:border-opacity-10 sm:px-10 sm:py-8">
          <Icon
            iconName="icon-readr-logoA-mobile"
            size={{ width: 176, height: 44 }}
          />
          <p className="body-3 text-primary-600">
            若有使用上的問題，請將截圖及問題描述寄至客服信箱，或撥打客服電話由專人為您服務（服務時間：星期一～星期五，10:00～18:00）
          </p>
        </div>
        <div className="border-b-[0.5px] border-b-primary-800 border-opacity-10 px-5 py-4 sm:px-10">
          <p className="subtitle-2 mb-2 text-primary-500">客服信箱</p>
          <p className="subtitle-1 text-primary-700">readr@readr.tw</p>
        </div>
        <div className="border-b-[0.5px] border-b-primary-800 border-opacity-10 px-5 py-4 sm:px-10">
          <p className="subtitle-2 mb-2 text-primary-500">客服電話</p>
          <p className="subtitle-1 text-primary-700">(02) 6633-3890</p>
        </div>
        <div className="px-5 py-4 sm:px-10">
          <p className="subtitle-2 mb-2 text-primary-500">Discord 社群</p>
          <p className="subtitle-1 text-primary-700">
            https://discord.gg/ywpth4mZUw
          </p>
        </div>
      </section>
    </main>
  )
}
