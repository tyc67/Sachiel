import { useEffect } from 'react'

export default function useBlockBodyScroll(isBlock: boolean) {
  useEffect(() => {
    if (isBlock) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }

    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [isBlock])
}
