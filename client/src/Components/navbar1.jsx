import React from "react";
import { NavLink } from "react-router-dom";
import { logo } from "../assets";

const Navbar1 = () => {
  return (
    <nav className="bg-blue p-4">
      <div className="mx-auto flex justify-between items-center">
        <NavLink to="/" className="text-white text-lg font-bold">
          <img className="w-10 h-10 bg-white rounded" src={logo} alt="" />
        </NavLink>

        <div className="space-x-4">
          <NavLink
            to="/signin"
            exact
            className="text-white hover:text-gray-300 transition duration-300"
          >
            Sign In
          </NavLink>
          <NavLink
            to="/signup"
            className="text-white hover:text-gray-300 transition duration-300"
          >
            Sign Up
          </NavLink>
        </div>
      </div>
      {/* {isLogoutOpen && <Logout onClose={() => setLogoutOpen(false)} />} */}
    </nav>
  );
};

export default Navbar1;
