import { useEffect, useRef } from 'react'

function useAutoFocus<T extends HTMLElement>({
  disable = false,
}: {
  disable: boolean
}) {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (ref.current && !disable) {
      ref.current.focus()
    }
  }, [disable])

  return ref
}

export default useAutoFocus
