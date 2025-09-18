import { useEffect } from "react";
import CancelBtn from "../buttons/CancelBtn";

const ConfirmationBox = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-96 animate-fadeIn">
        <h2 className="text-lg font-semibold mb-3">{title}</h2>
        <p className="text-sm text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <CancelBtn onClick={onCancel} className="px-4 py-2 ">
            Cancel
          </CancelBtn>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationBox;
