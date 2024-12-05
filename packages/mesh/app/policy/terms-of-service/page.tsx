'use client'

import { useEffect, useState } from 'react'

import Spinner from '@/components/spinner'

import { fetchTermsOfService } from '../../actions/policy'

export default function Page() {
  const [htmlContent, setHtmlContent] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTermsOfService()
      if (data) {
        const bodyElement = document.querySelector('body')
        if (bodyElement) {
          bodyElement.style.marginTop = '0'
        }
        setHtmlContent(data)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) return <Spinner />

  return (
    <section className="px-5 pb-5 pt-6 sm:p-0">
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </section>
  )
}
