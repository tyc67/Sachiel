import { useCallback, useEffect, useRef, useState } from 'react'

import useWindowDimensions from './use-window-dimension'

function checkIfDomIsTooLong(dom: HTMLElement) {
  const lineHeight = parseInt(window.getComputedStyle(dom).lineHeight, 10)
  const realContentLines = Math.floor(dom.scrollHeight / lineHeight)
  const renderingContentLines = Math.floor(dom.clientHeight / lineHeight)

  return realContentLines > renderingContentLines
}

export default function useClamp() {
  const [isTooLong, setIsTooLong] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const { width } = useWindowDimensions()
  const domRef = useRef<HTMLElement>(null)

  const toggleClamp = useCallback(() => {
    setIsExpanded(!isExpanded)
  }, [isExpanded])

  useEffect(() => {
    const dom = domRef.current
    if (dom) {
      setIsExpanded(false)
      setIsTooLong(checkIfDomIsTooLong(dom))
    }
  }, [width])

  return { domRef, isTooLong, isExpanded, toggleClamp }
}
