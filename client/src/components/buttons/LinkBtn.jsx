import React from "react";
import { Link } from "react-router";

function LinkBtn({ children, stub, action, className, ...props }) {
  return (
    <Link
      to={stub}
      onClick={action}
      className={`transition-colors duration-150 opacity-50 hover:opacity-100  hover:bg-black/5  p-1  rounded-lg ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}

export default LinkBtn;
