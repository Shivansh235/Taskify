import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Navbar toggleSidebar={() => setIsOpen(!isOpen)} />
      <div className="flex flex-col sm:flex-row h-[88vh] mt-[10vh] px-2 gap-2">
        {/* Sidebar */}
        <div className="sm:w-1/6  ">
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>

        {/* Main Content */}
        <div className="content-scroll sm:w-5/6 w-full rounded-xl overflow-y-auto border border-gray-600 p-3">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Home;
