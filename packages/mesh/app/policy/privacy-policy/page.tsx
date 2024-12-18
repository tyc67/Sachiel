import '@/styles/policy.css'

import { processPolicy } from '@/utils/process-policy'

import { fetchPrivacyPolicy } from '../../actions/policy'

export default async function Page() {
  const data = await fetchPrivacyPolicy()
  const processedHtml = data && (await processPolicy(data))

  if (!processedHtml) return null

  return (
    <section className="px-5 pb-5 pt-6 sm:p-0">
      <div
        className="policy-content"
        dangerouslySetInnerHTML={{ __html: processedHtml }}
      />
    </section>
  )
}
