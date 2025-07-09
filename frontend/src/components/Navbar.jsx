import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigate = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <nav className="h-[8vh] fixed top-0 left-0 w-full z-50 bg-slate-800 text-white flex items-center justify-between px-5 sm:px-11">
      <button
        type="button"
        onClick={() => handleNavigate("/")}
        className="flex items-center gap-1 font-semibold text-xl"
      >
        <img className="w-10 z-10" src="management.gif" alt="Task" />
        Task Management
      </button>

      {/* Desktop Menu */}
      <ul className="hidden sm:flex gap-5 text-base font-semibold">
        <li>
          <button onClick={() => handleNavigate("/")} className="hover:scale-105 bg-purple-500 px-2 py-1 rounded-lg">
            Home
          </button>
        </li>
        <li>
          <button onClick={() => handleNavigate("/about")} className="hover:scale-105 bg-purple-500 px-2 py-1 rounded-lg">
            About
          </button>
        </li>
        <li>
          <button onClick={() => handleNavigate("/login")} className="hover:scale-105 bg-purple-500 px-2 py-1 rounded-lg">
            Sign In
          </button>
        </li>
        <li>
          <button onClick={() => handleNavigate("/signup")} className="hover:scale-105 bg-purple-500 px-2 py-1 rounded-lg">
            Sign Up
          </button>
        </li>
      </ul>

      {/* Mobile Hamburger */}
      <div className="sm:hidden flex items-center gap-3">
        <button onClick={toggleSidebar} className="text-2xl bg-purple-600 rounded-md px-2 py-1">
          <HiMenuAlt3 />
        </button>

        <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">
          {menuOpen ? <RxCross2 /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-[8vh] left-0 bg-slate-800 w-full flex flex-col items-start px-6 py-3 sm:hidden">
          <button onClick={() => handleNavigate("/")} className="py-2 w-full text-left">Home</button>
          <button onClick={() => handleNavigate("/about")} className="py-2 w-full text-left">About</button>
          <button onClick={() => handleNavigate("/login")} className="py-2 w-full text-left">Sign In</button>
          <button onClick={() => handleNavigate("/signup")} className="py-2 w-full text-left">Sign Up</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
