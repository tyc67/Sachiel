import { useEffect, useState } from 'react'

export default function useIsClient() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true) // Only after mounting, we know we're on the client
  }, [])

  return isClient
}
