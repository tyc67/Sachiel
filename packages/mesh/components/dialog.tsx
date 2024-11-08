import type { ForwardedRef } from 'react'
import { forwardRef } from 'react'

import Button from './button'

type DialogAction = {
  text: string
  action: () => void
}

type DialogProps = {
  title?: string
  description?: string
  primaryAction: DialogAction
  secondaryAction?: DialogAction
}

export default forwardRef(function Dialog(
  { title, description, primaryAction, secondaryAction }: DialogProps,
  ref: ForwardedRef<HTMLDialogElement>
) {
  return (
    <dialog
      ref={ref}
      className="w-[278px] rounded-lg border px-5 py-4 shadow-light-box lg:w-[400px]"
    >
      <div className="flex flex-col gap-1">
        {title && <h3 className="title-2 text-primary-700">{title}</h3>}
        {description && (
          <p className="body-3 text-primary-700">{description}</p>
        )}
      </div>
      <div className="flex flex-row items-center justify-end gap-3 pt-5">
        {secondaryAction && (
          <Button
            size="sm"
            color="transparent-blue"
            text={secondaryAction.text}
            onClick={secondaryAction.action}
          />
        )}
        <Button
          size="sm"
          color="custom-blue"
          text={primaryAction.text}
          onClick={primaryAction.action}
        />
      </div>
    </dialog>
  )
})
