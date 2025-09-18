import React from "react";
import useIcon from "../../hooks/useIcon";

const SaveBtn = ({
  onClick,
  isLoading,
  children,
  className = "",
  ...props
}) => {
  const icons = useIcon();
  return (
    <button
      onClick={onClick}
      disabled={isLoading || props.disabled}
      className={`inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 
        disabled:bg-green-400 text-white rounded-md transition-colors disabled:cursor-not-allowed 
        ${className}`}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center gap-3 border-inherit">
          {icons["spinner1"]} "Processing..."
        </div>
      ) : (
        <>
          {icons["save"]}
          {children}
        </>
      )}
    </button>
  );
};

export default SaveBtn;
