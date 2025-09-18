import React from "react";

function CommonBtn({ children, action, tooltip = "btn", className, ...props }) {
  return (
    <button
      onClick={action}
      className={` relative transition-colors duration-150 opacity-50 hover:opacity-100  hover:bg-black/5 p-1  border-inherit ${className} `}
      {...props}
      title={tooltip}
    >
      {children}
    </button>
  );
}

export default CommonBtn;
