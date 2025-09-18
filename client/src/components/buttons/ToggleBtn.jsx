import React from "react";

const ToggleBtn = ({ isOn, onToggle, onLabel, offLabel }) => {
  return (
    <button
      onClick={onToggle}
      className={`relative inline-flex items-center h-8 w-16 rounded-full transition-colors duration-300 ${
        isOn ? "bg-green-500" : "bg-gray-400"
      }`}
    >
      <span
        className={`absolute left-1 top-1 h-6 w-6 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
          isOn ? "translate-x-8" : "translate-x-0"
        }`}
      />
      <span className="absolute w-full text-xs font-medium text-white">
        {isOn ? onLabel : offLabel}
      </span>
    </button>
  );
};

export default ToggleBtn;
