import React from "react";
import { Dialog, DialogContent, DialogOverlay, DialogTitle } from "@/components/ui/modal"; // Import necessary components

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
  title?: string;  
  confirmLabel?: string;  
  cancelLabel?: string;  
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  message,
  title = "Confirm Action",  
  confirmLabel = "Confirm",  
  cancelLabel = "Cancel",  
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay />
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        <p>{message}</p>
        <div className="flex justify-end mt-4">
          <button className="bg-gray-300 text-black px-4 py-2 rounded mr-2" onClick={onClose}>
            {cancelLabel}
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationModal;