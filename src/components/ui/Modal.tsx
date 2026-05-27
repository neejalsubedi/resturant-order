import React, { type ReactNode } from "react";

type ModalProps = {
    open: boolean;
    title?: ReactNode;
    children: ReactNode;
    onClose: () => void;
    footer?: ReactNode;
    className?: string;
    disableBackdropClick?: boolean;
    size?: "small" | "medium" | "large" | "full";
    showCloseButton?: boolean;
};

const sizeClasses: Record<string, string> = {
    small: "max-w-md",
    medium: "max-w-xl",
    large: "max-w-4xl max-h-[90vh]",
    full: "w-full max-w-full max-h-full",
};

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
    if (!open) return null;

    const handleBackdropClick = () => {
        if (!disableBackdropClick) onClose();
    };

    const modalSizeClass = sizeClasses[size] || sizeClasses.medium;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={handleBackdropClick}
            aria-modal="true"
            role="dialog"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`
          relative w-full rounded-2xl border border-border
          bg-background text-foreground shadow-2xl
          ${modalSizeClass}
          ${size === "large" ? "overflow-y-auto" : ""}
          ${className}
        `}
            >
                {showCloseButton && (
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition"
                        aria-label="Close modal"
                    >
                        ✕
                    </button>
                )}

                <div className="p-6">
                    {title && (
                        <div className="mb-6 text-2xl font-semibold tracking-tight">
                            {title}
                        </div>
                    )}

                    {children}

                    {footer && (
                        <div className="mt-6 flex justify-end gap-2">
                            {footer}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;