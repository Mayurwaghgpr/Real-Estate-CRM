import React from "react";

function CancelBtn({ onClick, className = "", children, ...props }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default CancelBtn;
