import { Outlet, useLocation } from "react-router";
import CommonHeader from "../../components/header/CommonHeader";

import Breadcrumb from "../../components/utils/BreadCrumb";
function FollowupsDashboard() {
  const { pathname } = useLocation();
  const breadcrumbItems = [
    { label: "All", path: "/followups_management" },
    { label: "Todays", path: "/followups_management/todays_followups" },
    // { label: "Upcomming", path: "/followups_management/upcomming" },
    { label: "Analytics", path: "/followups_management/analytics" },
  ];
  const path = pathname.split("/followups_management/")[1];
  return (
    <div className=" space-y-4 border-inherit ">
      <Breadcrumb items={breadcrumbItems} />

      {/* Header */}
      <CommonHeader
        title={`${path ? path.split("_").join(" ") : "Follow-ups Dashboard"} `}
        className={"flex justify-between w-full"}
      >
        <div></div>
      </CommonHeader>
      <div className="space-y-4 border-inherit text-start">
        <Outlet />
      </div>
    </div>
  );
}

export default FollowupsDashboard;
