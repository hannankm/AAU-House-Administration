import React from "react";
import { NavLink } from "react-router-dom";
import { logo } from "../assets";
import { getRole } from "../utils/auth";
import { applicantMenu, guestMenu, tenantMenu } from "../constants/menuItems";

const Navbar = () => {
  const role = getRole();
  let menu = [];
  if (role === "applicant") {
    menu = applicantMenu;
  } else if (role === "tenant") {
    menu = applicantMenu + tenantMenu;
  } else {
    menu = guestMenu;
  }

  return (
    <nav className="bg-blue p-4">
      <div className="mx-auto flex justify-between items-center">
        <NavLink to="/" className="text-white text-lg font-bold">
          <img className="w-10 h-10 bg-white rounded" src={logo} alt="" />
        </NavLink>

        <div className="space-x-4">
          <NavLink
            to="/applicant/house_ads"
            exact
            className="text-blue hover:bg-grey bg-white px-2 rounded font-medium transition duration-300"
          >
            Houses
          </NavLink>
          <NavLink
            to="/my/applications"
            className="text-white hover:text-gray-300 transition duration-300"
          >
            Applications
          </NavLink>
          <NavLink
            to="/about"
            className="text-white hover:text-gray-300 transition duration-300"
          >
            Announcements
          </NavLink>
          <NavLink
            to="/about"
            className="text-white hover:text-gray-300 transition duration-300"
          >
            Complaints
          </NavLink>
          <NavLink
            to="/signin"
            className="text-white hover:text-gray-300 transition duration-300"
          >
            Logout
          </NavLink>
        </div>
      </div>
      {/* {isLogoutOpen && <Logout onClose={() => setLogoutOpen(false)} />} */}
    </nav>
  );
};

export default Navbar;
