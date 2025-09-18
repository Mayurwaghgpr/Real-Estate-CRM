import React from "react";
import { Outlet } from "react-router";

function Deals_Manager() {
  return (
    <div className=" w-full h-full border-inherit">
      <Outlet />
    </div>
  );
}

export default Deals_Manager;
