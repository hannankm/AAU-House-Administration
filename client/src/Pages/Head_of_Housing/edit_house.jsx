import React, { useState } from "react";

//add form tags
function EditHouse({ isOpen, onClose, post }) {
  const [formData, setFormData] = useState({
    type: "",
    status: "",
    site: "",
    block: "",
    floor: "",
    rent: "",
    bed_cap: "",
    woreda: "",
    kebele: "",
    house_number: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const isEditOpen = isOpen;
  const onEditClose = onClose;

  if (!isEditOpen) {
    return null;
  }

  const handleCancel = () => {
    onEditClose();
  };

  return (
    <div className="font-poppins fixed z-10 backdrop-blur-[2px] inset-0 m-auto overflow-y-scroll scrollbar">
      <div className={`lg:w-1/2 mx-auto mt-10 rounded-xl bg-[#656565]  p-8`}>
        <form>
          <h3 className="text-xl font-medium text-center">Edit House</h3>
          <label className="font-medium">Type:</label>
          <br />

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-3/4 bg-white rounded p-1 my-2"
          >
            <option value="">Select Type</option>
            <option value="AAU">AAU</option>
            <option value="Federal">Federal</option>
          </select>
          <br />

          <label className="font-medium">Status:</label>
          <br />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-3/4 bg-white rounded p-1 my-2"
          >
            <option value="">Select Status</option>
            <option value="empty">Empty</option>
            <option value="occupied">Occupied</option>
            <option value="unavailable">Unavailable</option>
          </select>
          <br />

          <label className="font-medium">Site:</label>
          <br />

          <input
            type="text"
            name="site"
            value={formData.site}
            onChange={handleChange}
            className="w-3/4 bg-white rounded p-1 my-2"
          />
          <br />

          <label className="font-medium">Block:</label>
          <br />

          <input
            type="text"
            name="block"
            value={formData.block}
            onChange={handleChange}
            className="w-3/4 bg-white rounded p-1 my-2"
          />
          <br />

          <label className="font-medium">Floor:</label>
          <br />

          <input
            type="text"
            name="floor"
            value={formData.floor}
            onChange={handleChange}
            className="w-3/4 bg-white rounded p-1 my-2"
          />
          <br />

          <label className="font-medium">Rent:</label>
          <br />

          <input
            type="text"
            name="rent"
            value={formData.rent}
            onChange={handleChange}
            className="w-3/4 bg-white rounded p-1 my-2"
          />
          <br />

          <label className="font-medium">Bed Capacity:</label>
          <br />

          <input
            type="text"
            name="bed_cap"
            value={formData.bed_cap}
            onChange={handleChange}
            className="w-3/4 bg-white rounded p-1 my-2"
          />
          <br />

          <label className="font-medium">Woreda:</label>
          <br />

          <input
            type="text"
            name="woreda"
            value={formData.woreda}
            onChange={handleChange}
            className="w-3/4 bg-white rounded p-1 my-2"
          />
          <br />

          <label className="font-medium">Kebele:</label>
          <br />

          <input
            type="text"
            name="kebele"
            value={formData.kebele}
            onChange={handleChange}
            className="w-3/4 bg-white rounded p-1 my-2"
          />
          <br />
          <label className="font-medium">House Number:</label>
          <br />

          <input
            type="text"
            name="house_number"
            value={formData.house_number}
            onChange={handleChange}
            className="w-3/4 bg-white rounded p-1 my-2"
          />
          <br />

          <div className="flex flex-row align-center">
            <button className=" rounded-xl pl-2 pr-5 m-2 py-2 bg-blue text-white text-xs">
              Update
            </button>

            <button
              className="rounded-xl pl-2 pr-5 py-2 mx-1 my-2 text-black text-xs"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditHouse;
