import { Outlet } from "react-router";

function PropertyManager() {
  return (
    <div className="w-full h-full border-inherit">
      <Outlet />
    </div>
  );
}

export default PropertyManager;
