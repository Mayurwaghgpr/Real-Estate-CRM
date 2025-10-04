import React from "react";
import { FiSearch } from "react-icons/fi";
import { useSelector } from "react-redux";

const DashboardHeader = () => {
  const { logedInUser } = useSelector((state) => state.auth);

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
  console.log(logedInUser);

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold ">
          Welcome back,{logedInUser.userName} 👋
        </h1>
        <p className="">{today}</p>
      </div>
      <div className="flex gap-2 items-center">
        <div className="relative">
          <FiSearch className="absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-3 py-2 rounded-lg  border border-gray-700 focus:ring focus:ring-purple-500"
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
