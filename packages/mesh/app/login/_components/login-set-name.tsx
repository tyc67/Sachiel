import { useEffect, useRef, useState } from 'react'

import Button from '@/components/button'
import Icon from '@/components/icon'
import { debounce } from '@/utils/performance'

import { useLogin } from '../page'

export default function LoginSetName() {
  const { formData, setFormData, setProcess } = useLogin()
  const [helperText, setHelperText] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      debounce(handleSubmit)()
    }
  }

  const handleSubmit = () => {
    if (formData.name === '') {
      setHelperText('請輸入您的姓名')
    } else {
      const { isValid, errorMessage } = isValidName(formData.name)
      if (isValid) {
        setHelperText(errorMessage)
        setProcess('set-category')
      } else {
        setHelperText(errorMessage)
      }
    }
  }

  return (
    <div className="flex flex-col items-center gap-10 px-5 pb-10 pt-5 sm:px-10">
      <Icon iconName="icon-login-step-1" size={{ width: 335, height: 20 }} />
      <div>
        <input
          className={`w-full appearance-none border-b ${
            helperText ? 'border-custom-red-text' : 'border-primary-200'
          }`}
          ref={inputRef}
          type="text"
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              name: e.target.value,
            }))
          }
          onKeyDown={handleKeyDown}
          required
        ></input>
        {helperText ? (
          <p className="body-3 pt-2 text-custom-red-text">{helperText}</p>
        ) : null}
        <p className="footnote pt-3 text-primary-500">
          輸入您想使用的公開顯示名稱。我們鼓勵使用者填寫真實姓名。這裡可以放其他規定。字數限制。之類的。
        </p>
      </div>
      <div className="w-full max-w-[320px] px-5">
        <Button
          size="lg"
          color="primary"
          text="下一步"
          onClick={handleSubmit}
        />
      </div>
    </div>
  )
}

function isValidName(name: string) {
  const nameRegex = /^[a-zA-Z0-9\u4e00-\u9fa5]{2,32}$/
  const invalidNames: { [key: string]: boolean } = {
    CNN: true,
    BBC: true,
    WSJ: true,
    Readr: true,
    鏡週刊: true,
    鏡新聞: true,
    鏡文學: true,
    鏡報: true,
    報導者: true,
    中央社: true,
  }

  let errorMessage = ''

  switch (true) {
    case invalidNames[name]:
      errorMessage = '這個 ID 目前無法使用，請使用其他 ID'
      break
    case name.length < 2:
      errorMessage = 'ID至少要有2個字元'
      break
    case name.length > 32:
      errorMessage = 'ID最多不能超過 32 個字元。'
      break
    case !nameRegex.test(name):
      errorMessage = 'ID包含無效字元。只能使用中英字母和數字'
      break
    default:
      return { isValid: true, errorMessage: '' }
  }

  return {
    isValid: false,
    errorMessage,
  }
}
