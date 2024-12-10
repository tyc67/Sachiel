'use client'

import { useEffect, useState } from 'react'

import Spinner from '@/components/spinner'

import { fetchPrivacyPolicy } from '../../actions/policy'

export default function Page() {
  const [htmlContent, setHtmlContent] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPrivacyPolicy()
      if (data) {
        const bodyElement = document.querySelector('body')
        const paragraphs =
          document.querySelectorAll<HTMLElement>('.page-body p')

        if (bodyElement) {
          bodyElement.style.marginTop = '0'
        }

        if (paragraphs) {
          paragraphs.forEach((p) => (p.style.margin = '0'))
        }

        setHtmlContent(data)
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
