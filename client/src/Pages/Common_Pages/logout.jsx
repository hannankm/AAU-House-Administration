import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const isLogoutOpen = isOpen;
  const closeDelete = onClose;

  const handleDeleteClick = () => {
    navigate("/signin");
    onClose();
  };

  if (!isLogoutOpen) {
    return null;
  }
  return (
    <div className="font-poppins fixed inset-0 z-10 backdrop-blur-[2px] flex">
      <div className="bg-blue text-white w-96 p-4 m-auto">
        <div className="flex mb-2">
          <button className="ml-auto" onClick={closeDelete}>
            X
          </button>
        </div>
        <h1 className="font-semibold text-xl">Log Out</h1>
        <p className="font-light mb-6 text-base">
          Are you sure you want to log out? You will have to sign in to access
          your account.
        </p>
        <button
          className="bg-white py-2 px-14 rounded-xl mr-2 text-black"
          onClick={closeDelete}
        >
          Cancel
        </button>
        <button
          className="bg-red-600 py-2 px-14 rounded-xl"
          onClick={handleDeleteClick}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Logout;
