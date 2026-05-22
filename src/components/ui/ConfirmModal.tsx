import React from "react";
import Modal from "./Modal";

type ConfirmModalProps = {
  open: boolean;
  title?: string;
  description?: React.ReactNode;
  onClose: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmLoading?: boolean;
  disableBackdropClick?: boolean;
  size?: "small" | "medium" | "large" | "full";
  actionType?: "delete" | "approve" | "default";
};

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  title = "Are you sure?",
  description,
  onClose,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmLoading = false,
  disableBackdropClick = false,
  size = "small",
  actionType = "default",
}) => {
  const confirmButtonClass = {
    delete: "bg-red-600 hover:bg-red-700",
    approve: "bg-green-600 hover:bg-green-700",
    default: "bg-blue-600 hover:bg-blue-700",
  }[actionType];

  return (
    <Modal
      open={open}
      title={title}
      onClose={onClose}
      size={size}
      disableBackdropClick={disableBackdropClick}
    >
      {description && <p>{description}</p>}

      <div className="mt-6 flex justify-end space-x-2">
        <button
          onClick={onClose}
          disabled={confirmLoading}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
        >
          {cancelText}
        </button>
        <button
          onClick={onConfirm}
          disabled={confirmLoading}
          className={`px-4 py-2 rounded text-white ${confirmButtonClass}`}
        >
          {confirmLoading ? `${confirmText}ing...` : confirmText}
        </button>
      </div>
    </Modal>
  );
};


export default ConfirmModal;
