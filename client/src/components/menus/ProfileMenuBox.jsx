import React, { useState, useRef, useEffect } from "react";
import {
  User,
  LogOut,
  Bell,
  Shield,
  HelpCircle,
  ChevronDown,
} from "lucide-react";
import Avatar from "../imageComp/Avatar";
import { useSelector } from "react-redux";
import LogoutBtn from "../buttons/Auth/LogoutBtn";
import CommonBtn from "../buttons/CommonBtn";
import useIcon from "../../hooks/useIcon";
import LinkBtn from "../buttons/LinkBtn";

const ProfileMenuBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logedInUser } = useSelector((state) => state.auth);
  const menuRef = useRef(null);
  const icons = useIcon();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (action) => {
    console.log(`Clicked: ${action}`);
    setIsOpen(false);
  };

  const menuItems = [
    {
      icon: "user",
      label: "View Profile",
      action: "profile",
      stub: "/user/profile",
    },
    { icon: "settings", label: "Account Settings", action: "settings" },
    { icon: "bell", label: "Notifications", action: "notifications" },
    { icon: "shield", label: "Privacy & Security", action: "privacy" },
    { icon: "helpCircle", label: "Help & Support", action: "help" },
  ];

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      {/* Profile Trigger Button */}
      <button
        onClick={toggleMenu}
        className="flex items-center space-x-2 px-4 py-2  hover:bg-gray-50  transition-all duration-200"
      >
        {/* Profile Avatar */}
        <Avatar
          className={"w-10 h-10 rounded-full "}
          image={"assets/avatar-1.webp"}
        />{" "}
        {/* User Info */}
        <div className="text-left hidden sm:block">
          <p className="text-sm font-medium text-gray-900">
            {logedInUser?.userName}
          </p>
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <Avatar
                className={"w-10 h-10 rounded-full "}
                image={"assets/avatar-1.webp"}
              />{" "}
              <div className="text-left hidden sm:block">
                <p className="text-sm font-medium text-gray-900">
                  {logedInUser?.userName}
                </p>
                <p className="text-xs text-gray-500">{logedInUser?.email}</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-1 text-md">
            {menuItems.map((item, index) => (
              <LinkBtn
                key={index}
                stub={item.stub}
                onClick={() => handleMenuItemClick(item.action)}
                className={`flex items-center gap-3 w-full px-4 py-2  text-left `}
              >
                {icons[item.icon]}
                {item.label}
              </LinkBtn>
            ))}
            <LogoutBtn
              className={"w-full px-4 py-2 rounded-none hover:bg-black/10"}
              hideText={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenuBox;
