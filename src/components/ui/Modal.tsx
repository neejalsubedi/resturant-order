// src/components/Modal.tsx
import React, { type ReactNode } from "react"

type ModalProps = {
  open: boolean
  title?: ReactNode
  children: ReactNode
  onClose: () => void
  footer?: ReactNode
  className?: string
  disableBackdropClick?: boolean
  size?: "small" | "medium" | "large" | "full"
  showCloseButton?: boolean
}

const sizeClasses: Record<string, string> = {
  small: "max-w-md",       // ~28rem width
  medium: "max-w-xl",      // ~36rem width (default)
  large: "max-w-4xl  max-h-[90vh]",      // ~56rem width
  full: "w-full max-w-full max-h-full", // full width/height modal (use carefully)
}

const Modal: React.FC<ModalProps> = ({
                                       open,
                                       title,
                                       children,
                                       onClose,
                                       footer,
                                       className = "",
                                       disableBackdropClick = false,
                                       size = "medium",
                                       showCloseButton = true,
                                     }) => {
  if (!open) return null

  const handleBackdropClick = () => {
    if (!disableBackdropClick) onClose()
  }

  const modalSizeClass = sizeClasses[size] || sizeClasses.medium

  return (
      <div
          className="fixed inset-0 flex items-center justify-center z-50 "
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          onClick={handleBackdropClick}
          aria-modal="true"
          role="dialog"
      >
        <div
            className={`bg-white rounded-lg p-6 w-full shadow-lg relative ${size === "large" ? " overflow-y-auto" : "overscroll-y-none"} ${modalSizeClass} ${className}`}
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
        >
          {showCloseButton && (
              <button
                  onClick={onClose}
                  className="absolute top -3 right-3 text-gray-500 hover:text-gray-700"
                  aria-label="Close modal"
              >
                ✕
              </button>
          )}

          {title && <div className="mb-4 text-xl font-bold">{title}</div>}

          <div>{children}</div>

          {footer && <div className="mt-6 flex justify-end space-x-2">{footer}</div>}
        </div>
      </div>
  )
}

export default Modal
