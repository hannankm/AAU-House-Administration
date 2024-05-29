import React from "react";

const DeleteHouse = ({ isOpen, onClose, onDelete }) => {
  const isDeleteOpen = isOpen;
  const closeDelete = onClose;

  const handleDeleteClick = () => {
    onDelete();
  };

  if (!isDeleteOpen) {
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
        <h1 className="font-semibold text-xl">Delete House</h1>
        <p className="font-light mb-6 text-base">
          Are you sure you want to delete this house? This action can not be
          undone.
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
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteHouse;
