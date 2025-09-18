import { Outlet } from "react-router";
function LeadsManager() {
  return (
    <div className="w-full h-full border-inherit">
      <Outlet />
    </div>
  );
}

export default LeadsManager;
