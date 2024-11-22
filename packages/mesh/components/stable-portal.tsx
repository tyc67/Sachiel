import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

/**
 * Since the project's body will change in different path,
 * createPortal in document.body may encounter remove the node failed.
 * Here we add a custom container to safely clean the container.
 */
export default function StablePortal({
  children,
}: {
  children: React.ReactNode
}) {
  const [container, setContainer] = useState<HTMLElement | null>(null)

  useEffect(() => {
    // Create a stable portal container
    const portalContainer = document.createElement('div')
    document.body.appendChild(portalContainer)
    setContainer(portalContainer)

    // Cleanup on unmount
    return () => {
      if (document.body.contains(portalContainer)) {
        document.body.removeChild(portalContainer)
      }
    }
  }, [])

  if (!container) return null

  return createPortal(children, container)
}
