// sidber
// fixed width
// repsonsiveness
import React from "react";
import Sidebar from "../Sidebar";
const AdminLayout = ({ children }) => {
  return (
    <>
      <div className="flex h-screen">
        <div className=" w-1/5">
          <Sidebar active={"houses"} role="head" />
        </div>
        <div className="bg-white h-screen w-5/6 flex text-black scrollbar overflow-y-scroll">
          <div className="w-5/6">{children}</div>
        </div>
      </div>
    </>
  );
};
export default AdminLayout;
