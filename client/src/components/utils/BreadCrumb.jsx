// components/Breadcrumb.jsx
import { ChevronRight } from "lucide-react";
import { Link, NavLink } from "react-router";

const Breadcrumb = ({ items }) => {
  return (
    <nav
      className="flex items-center text-sm text-gray-600 px-3"
      aria-label="Breadcrumb"
    >
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index !== 0 && (
            <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
          )}
          {typeof item.path === "string" ? (
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `${
                  isActive ? "text-black " : ""
                } hover:text-blue-600 transition-colors`
              }
            >
              {item.label}
            </NavLink>
          ) : (
            <span className="font-medium text-gray-800">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;
