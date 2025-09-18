import React from "react";

function Avatar({ className, image, fallBackText, ...props }) {
  return (
    <div
      className={`relative rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600  ${className}`}
    >
      <img
        className="w-full h-full object-center object-fill "
        src={image}
        alt={fallBackText}
        {...props}
      />
    </div>
  );
}

export default Avatar;
