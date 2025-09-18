import { useEffect, useState } from "react";
import useIcon from "../hooks/useIcon";

import LinkDropDown from "./LinkDropDown";
import LogoutBtn from "../components/buttons/Auth/LogoutBtn";
import CommonBtn from "../components/buttons/CommonBtn";
import Brand from "../components/brand/Brand";

const links = [
  {
    icon: "dashboardFi",
    stub: "/",
    text: "Dashboard",
  },
  {
    icon: "leads",
    stub: "/leads_management",
    text: "Leads Managment",
    state: { activeSection: "Leads Managment" },
    chidrens: [
      {
        icon: "point",
        stub: "/leads_management/add_leads",
        text: "Add Leads ",
      },
      {
        icon: "point",
        stub: "/leads_management/disposed/leads",
        text: "Disposed Leads ",
      },
    ],
  },
  {
    icon: "property",
    stub: "/property_management",
    text: "Property Managment",
    chidrens: [
      {
        icon: "point",
        stub: "/property_management/add_property",
        text: "Add Property",
      },
      {
        icon: "point",
        stub: "/property_management/archived_properties",
        text: "Archived Properties",
      },
    ],
    state: { activeSection: "Property Managment" },
  },
  {
    icon: "agent",
    stub: "/team_management",
    text: "Team Managment",
    chidrens: [
      { icon: "point", stub: "/team_management/add_user", text: "Add user" },
    ],
    state: { activeSection: "Agent Managment" },
  },
  {
    icon: "deal",
    stub: "/deals_management",
    text: "Deals Managment",
    // chidrens: [{ stub: "/agent_management/add_agent", text: "Add Agent" }],
    state: { activeSection: "Deals Managment" },
  },
  {
    icon: "followup",
    stub: "/followups_management",
    text: "Followup Managment",
    // chidrens: [{ stub: "/agent_management/add_agent", text: "Add Agent" }],
    state: { activeSection: "Followup Managment" },
  },
  {
    icon: "document",
    stub: "/documents_management",
    text: "Documents Managment",
    // chidrens: [{ stub: "/agent_management/add_agent", text: "Add Agent" }],
    state: { activeSection: "Documents Managment" },
  },
];

function SideBar() {
  const icons = useIcon();

  const [isOpen, setOpen] = useState(() => {
    return true;
  });

  const handlExpantion = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className="sm:static  fixed top-0 bottom-0 right-0 left-0 border-inherit">
      <aside
        className={` flex flex-col h-full backdrop-blur-sm transition-all duration-300 ease-in-out border-inherit border-e ${
          isOpen ? "min-w-[280px] w-[280px]" : "w-[72px]"
        } h-full relative overflow-hidden`}
      >
        {/* Header with improved styling */}
        <header className="relative group flex justify-between items-center h-20 px-4 border-b border-inherit ">
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              !isOpen ? "w-0 opacity-0" : "w-auto opacity-100"
            }`}
          >
            <Brand />
          </div>
          <div
            className={`transition-all duration-200 ${
              !isOpen && "group-hover:scale-110"
            }`}
          >
            <CommonBtn
              action={handlExpantion}
              className={`p-2 rounded-lg bg-blue-600/40 hover:bg-blue-500/60 transition-all duration-200 backdrop-blur-sm border border-cyan-400/40 hover:border-cyan-300/70 shadow-lg hover:shadow-cyan-500/20 ${
                isOpen
                  ? "hover:cursor-w-resize shadow-lg"
                  : "cursor-e-resize hover:shadow-xl transform hover:scale-105"
              }`}
            >
              {icons["sidebar"]}
            </CommonBtn>
          </div>
        </header>

        {/* Navigation section with enhanced styling */}
        <section className="flex-1 py-6 px-3 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500/70 scrollbar-track-transparent">
          <nav>
            <ul className="flex flex-col gap-1 text-lg w-full">
              {links.map((link, index) => (
                <li
                  key={JSON.stringify(link)}
                  className={`transition-all duration-300 ease-in-out space-y-2 ${
                    !isOpen && "hover:scale-105"
                  }`}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  <LinkDropDown link={link} isOpen={isOpen} />
                </li>
              ))}
            </ul>
          </nav>
        </section>

        {/* Footer with improved styling */}
        <footer className="p-5 border-t backdrop-blur-sm border-inherit">
          <div
            className={`transition-all duration-300 ${
              !isOpen && "flex justify-center"
            }`}
          >
            <LogoutBtn
              className={`transition-all duration-300 transform hover:border-l-gray-700 hover:border-l-2 hover:shadow ${
                isOpen ? "w-full" : "w-auto"
              }`}
              hideText={isOpen}
            />
          </div>
        </footer>
      </aside>
    </div>
  );
}

export default SideBar;
