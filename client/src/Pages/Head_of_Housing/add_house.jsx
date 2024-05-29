import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar";

const AddHouse = () => {
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

  const handleCreateHouse = async (e) => {
    e.preventDefault();

    try {
      // Make an API call to your server to create a new house using the form data
      const response = await fetch("http://localhost:5000/houses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert("House Created Successfully!");
        console.log("House created:", data);
        // Handle the response from the server as needed
      } else {
        console.error("Error creating house:", response.status);
      }
    } catch (error) {
      console.error("Error creating house:", error);
    }
  };

  return (
    <div className="flex h-screen">
      <div className=" w-1/5">
        <Sidebar active={"houses"} role="head" />
      </div>
      <div className="overflow-y-auto w-5/6">
        <h2 className="text-xl font-medium text-center my-3">Add New House</h2>
        <div
          className="flex flex-col align-center bg-grey w-1/2
       mx-auto rounded-xl py-4 px-8 my-4"
        >
          <form onSubmit={handleCreateHouse}>
            <label>Type:</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full bg-white rounded p-1 my-2"
            >
              <option value="">Select Type</option>
              <option value="AAU">AAU</option>
              <option value="Federal">Federal</option>
            </select>

            <label>Status:</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full bg-white rounded p-1 my-2"
            >
              <option value="">Select Status</option>
              <option value="empty">Empty</option>
              <option value="occupied">Occupied</option>
              <option value="unavailable">Unavailable</option>
            </select>

            <label>Site:</label>
            <input
              type="text"
              name="site"
              value={formData.site}
              onChange={handleChange}
              className="w-full bg-white rounded p-1 my-2"
            />

            <label>Block:</label>
            <input
              type="text"
              name="block"
              value={formData.block}
              onChange={handleChange}
              className="w-full bg-white rounded p-1 my-2"
            />

            <label>Floor:</label>
            <input
              type="text"
              name="floor"
              value={formData.floor}
              onChange={handleChange}
              className="w-full bg-white rounded p-1 my-2"
            />

            <label>Rent:</label>
            <input
              type="text"
              name="rent"
              value={formData.rent}
              onChange={handleChange}
              className="w-full bg-white rounded p-1 my-2"
            />

            <label>Bed Capacity:</label>
            <input
              type="text"
              name="bed_cap"
              value={formData.bed_cap}
              onChange={handleChange}
              className="w-full bg-white rounded p-1 my-2"
            />

            <label>Woreda:</label>
            <input
              type="text"
              name="woreda"
              value={formData.woreda}
              onChange={handleChange}
              className="w-full bg-white rounded p-1 my-2"
            />

            <label>Kebele:</label>
            <input
              type="text"
              name="kebele"
              value={formData.kebele}
              onChange={handleChange}
              className="w-full bg-white rounded p-1 my-2"
            />

            <label>House Number:</label>
            <input
              type="text"
              name="house_number"
              value={formData.house_number}
              onChange={handleChange}
              className="w-full bg-white rounded p-1 my-2"
            />

            <button
              type="submit"
              className="w-full bg-blue rounded p-2 my-2 text-white text-medium font-bold"
            >
              Create House
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddHouse;
