'use client'

import { useEffect, useState } from 'react'

import Spinner from '@/components/spinner'
import { processPolicy } from '@/utils/process-policy'

import { fetchTermsOfService } from '../../actions/policy'

export default function Page() {
  const [htmlContent, setHtmlContent] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTermsOfService()
      if (data) {
        const processedHtml = processPolicy(data)

        setHtmlContent(processedHtml)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) return <Spinner />

  return (
    <section className="body-1 px-5 pb-5 pt-6 text-primary-700 sm:p-0">
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </section>
  )
}
