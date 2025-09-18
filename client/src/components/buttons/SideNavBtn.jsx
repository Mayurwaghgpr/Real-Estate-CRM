import { Link, NavLink } from "react-router";
import useIcon from "../../hooks/useIcon";

function SideNavBtn({ action, stub, icon, text, className, hideText, state }) {
  const icons = useIcon();
  return (
    <NavLink
      className={({ isActive }) =>
        ` ${
          isActive
            ? "opacity-100 border-l-gray-700 border-l-2 shadow"
            : "opacity-50"
        } flex justify-start items-center gap-3  hover:opacity-100 hover:border-l-gray-700 hover:border-l-2 hover:shadow rounded-lg transition-all duration-200 p-2 ${className}`
      }
      aria-label={`${text}-side-nav-link`}
      to={stub}
      onClick={action}
      state={state}
    >
      <span>{icons[icon]}</span>
      {hideText && <span>{text}</span>}
    </NavLink>
  );
}

export default SideNavBtn;
