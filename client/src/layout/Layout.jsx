import React from "react";
import NavBar from "../components/header/NavBar";
import { Outlet } from "react-router";
import SideBar from "./SideBar";
import { ToastContainer } from "react-toastify";

function Layout() {
  return (
    <main className="flex justify-between w-full h-screen  transition-all duration-300 ">
      <ToastContainer stacked={true} />

      <SideBar />
      <div className=" flex flex-col w-full h-full border-inherit">
        <NavBar />
        <section className=" relative flex justify-center items-center  h-full p-5 border-inherit overflow-y-auto">
          <Outlet />
        </section>
      </div>
    </main>
  );
}

export default Layout;
