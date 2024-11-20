'use client'

import { usePathname } from 'next/navigation'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

import Icon from '@/components/icon'
import StablePortal from '@/components/stable-portal'
import { SECOND } from '@/constants/time-unit'
import {
  clearCrossPageToasts,
  getCrossPageToast,
} from '@/utils/cross-page-toast'

export type Toast = {
  status: 'success' | 'fail'
  text: string
}

type ToastContextValue = {
  addToast: (newToast: Toast) => void
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

const delayToShowToast = 0.5 * SECOND
const delayToCompleteToast = 0.4 * SECOND
const delayToHideToast = 3 * SECOND

const Toast = ({ toast, onClose }: { toast?: Toast; onClose: () => void }) => {
  const [showToast, setShowToast] = useState(false)
  // use ref to store onClose callback to prevent timeout being cleared
  const onCloseRef = useRef(onClose)

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    // When toast prop is true show the toast after `delayToShowToast` to let toast UI update first.
    if (toast) {
      const timer = setTimeout(() => {
        setShowToast(true)
      }, delayToShowToast)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [toast])

  useEffect(() => {
    // if showing toast, hide the toast after `delayToHideToast`
    if (showToast) {
      const hideToastTimer = setTimeout(() => {
        setShowToast(false)
      }, delayToHideToast)

      return () => {
        clearTimeout(hideToastTimer)
      }
    }
    // If the toast is hidden call onClose prop after `delayToCompleteToast`, this logic will call onClose when the toast is mounted which is harmless.
    else {
      const completeToastTimer = setTimeout(
        onCloseRef.current,
        delayToCompleteToast
      )

      return () => {
        clearTimeout(completeToastTimer)
      }
    }
  }, [showToast])

  const classes = showToast
    ? 'duration-300 translate-y-[calc(theme(height.header.default)+theme(height.toast))] sm:translate-y-[calc(theme(height.header.sm)+theme(height.toast)+18px)]'
    : ''

  if (!toast) return null

  return (
    <StablePortal>
      <div
        className={`fixed bottom-full left-1/2 z-modal flex h-toast -translate-x-1/2 items-center gap-1 rounded-md pl-3 pr-4 transition-transform ${
          toast?.status === 'success' ? 'bg-primary-600' : 'bg-custom-red'
        } ${classes}`}
        role="alert"
      >
        <span className="flex size-6 items-center justify-center ">
          <Icon
            iconName={
              toast?.status === 'success'
                ? 'icon-toast-success'
                : 'icon-toast-fail'
            }
            size="m"
          />
        </span>
        <span className="footnote text-white">{toast?.text}</span>
      </div>
    </StablePortal>
  )
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const pathname = usePathname()

  const currentToast = toasts[0]

  const addToast = useCallback((newToast: Toast) => {
    setToasts((oldToasts) => [...oldToasts, newToast])
  }, [])

  const onToastEnded = useCallback(() => {
    setToasts(toasts.slice(1))
  }, [toasts])

  useEffect(() => {
    const crossPageToasts = getCrossPageToast()
    if (crossPageToasts) {
      // add a delay to let toast show when page mounted, might need to check in the future why toast won't show if directly addToast
      setTimeout(() => {
        crossPageToasts.forEach((toast) => {
          addToast(toast)
        })
      }, SECOND)
      clearCrossPageToasts()
    }
  }, [addToast, pathname])

  return (
    <ToastContext.Provider value={{ addToast }}>
      <>
        {children}
        {/* re-render the component when path changes */}
        <Toast key={pathname} toast={currentToast} onClose={onToastEnded} />
      </>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
