'use client'

import { useEffect, useRef, useState } from 'react'

import { fetchTermsOfService } from '@/app/actions/policy'
import Button from '@/components/button'
import Icon from '@/components/icon'
import Spinner from '@/components/spinner'
import { useLogin } from '@/context/login'

export default function LoginTermsConfirmation() {
  const [terms, setTerms] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isChecked, setIsChecked] = useState(false)
  const [isAtBottom, setIsAtBottom] = useState(false)
  const termsRef = useRef<HTMLDivElement>(null)
  const { setStep } = useLogin()

  const handleCheck = () => {
    if (isAtBottom) {
      setIsChecked((prev) => !prev)
    }
  }

  const handleSubmit = () => {
    setStep('set-name')
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTermsOfService()
      const parser = new DOMParser()
      if (data) {
        const doc = parser.parseFromString(data, 'text/html')

        const pageBody = doc.querySelector('.page-body')
        pageBody?.classList.add(
          'text-primary-700',
          'caption-1',
          'flex',
          'flex-col',
          'gap-y-4'
        )

        const pageTitle = doc.querySelector('h1')
        pageTitle?.classList.add('profile-title-2', 'text-primary-700', 'mb-2')

        doc.querySelectorAll('p').forEach((p) => {
          if (!p.textContent?.trim()) {
            p.remove()
          }
        })

        setTerms(doc.body.innerHTML)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const termsElement = termsRef.current
    if (!isLoading && termsElement) {
      const handleScroll = () => {
        const { scrollTop, clientHeight, scrollHeight } = termsElement
        if (scrollTop + clientHeight >= scrollHeight - 10) {
          setIsAtBottom(true)
        }
      }

      termsElement.addEventListener('scroll', handleScroll)

      return () => {
        termsElement.removeEventListener('scroll', handleScroll)
      }
    }
  }, [isLoading])

  if (isLoading) {
    return (
      <div className="flex h-[447px] w-full flex-col justify-center p-5">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="flex size-full flex-col">
      <div className="flex flex-col items-center justify-center px-5 pt-5 sm:px-10">
        <p className="body-3 mb-5 text-primary-500">
          繼續使用前，請先詳閱我們的服務條款及隱私權政策
        </p>
        <div
          className="boder-primary-200 caption-1 mb-5 h-[410px] w-full overflow-auto rounded border p-4 text-primary-700 sm:mb-6 sm:h-[247px]"
          ref={termsRef}
        >
          <div dangerouslySetInnerHTML={{ __html: terms }} />
        </div>
        <div
          className={`mb-5 flex items-center gap-x-1 ${
            isAtBottom ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
          }`}
          onClick={handleCheck}
        >
          {isChecked ? (
            <Icon iconName="icon-checkbox-on" size="l" />
          ) : (
            <Icon iconName="icon-checkbox-off" size="l" />
          )}

          <p className="subtitle-1 text-primary-700">我同意以上條款</p>
        </div>
      </div>

      <div className="mt-auto w-full border-t border-t-primary-200 px-5 py-3">
        <Button
          size="lg"
          color="primary"
          text="下一步"
          onClick={handleSubmit}
          disabled={!isChecked}
        />
      </div>
    </div>
  )
}
