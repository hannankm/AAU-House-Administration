import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../Components/Sidebar";

const CreateAdvertisementPage = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    post_date: "",
    application_start_date: "",
    application_deadline: "",
    status: "",
    notes: "",
    house_count: 0,
  });

  const [emptyHouses, setEmptyHouses] = useState([]);
  const [selectedHouses, setSelectedHouses] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const fetchEmptyHouses = async () => {
      try {
        const response = await fetch("http://localhost:5000/houses/empty");
        if (response.ok) {
          const data = await response.json();
          setEmptyHouses(data.houses);
        } else {
          console.error("Error fetching empty houses:", response.status);
        }
      } catch (error) {
        console.error("Error fetching empty houses:", error);
      }
    };

    fetchEmptyHouses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCheckboxChange = (houseId) => {
    // Toggle the selected status of the clicked checkbox
    const updatedSelectedHouses = selectedHouses.includes(houseId)
      ? selectedHouses.filter((id) => id !== houseId)
      : [...selectedHouses, houseId];

    // Update the selectedHouses state
    setSelectedHouses(updatedSelectedHouses);

    // Check if all checkboxes are selected
    const allSelected = emptyHouses.every((house) =>
      updatedSelectedHouses.includes(house.house_id)
    );

    // Update the selectAll state
    setSelectAll(allSelected);
  };

  const handleNextStep = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleCreateAdvertisement = async () => {
    try {
      // Make an API call to create the advertisement
      const adResponse = await fetch("http://localhost:5000/ads/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          house_count: selectedHouses.length,
        }),
      });

      if (adResponse.ok) {
        const { message, advertisement } = await adResponse.json();
        const generatedAdId = advertisement.ad_id;
        console.log("Advertisement created:", advertisement);

        // Make API calls to associate houses with the advertisement
        for (const houseId of selectedHouses) {
          await fetch("http://localhost:5000/house-ads/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ad_id: generatedAdId, house_id: houseId }),
          });
        }

        // Handle the response from the server as needed
        // You may want to navigate to another page after successful creation
        // Example: Redirect to the advertisement list page
        // history.push('/advertisements');
        alert("Advertisement created succesfully");
      } else {
        console.error("Error creating advertisement:", adResponse.status);
      }
    } catch (error) {
      console.error("Error creating advertisement:", error);
    }
  };
  const handleSelectAll = () => {
    // Toggle the selectAll state
    setSelectAll((prevSelectAll) => !prevSelectAll);

    // If selectAll is true, set all houses as selected; otherwise, clear the selection
    const updatedSelectedHouses = selectAll
      ? []
      : emptyHouses.map((house) => house.house_id);
    setSelectedHouses(updatedSelectedHouses);
  };
  const handleGoBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  return (
    <div className="flex h-screen">
      <div className=" w-1/5">
        <Sidebar active={"houses"} role="head" />
      </div>
      <div className="mb-4 overflow-y-auto w-full mx-auto w-5/6 ml-6">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Create Advertisement
        </h2>
        {activeStep === 1 && (
          <>
            <h3 className="font-medium my-8 p-2 bg-grey w-1/3">
              Step 1 : Fill Advertisement Form
            </h3>
            <form className="mx-14">
              <div className="mb-4">
                <label
                  htmlFor="post_date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Post Date
                </label>
                <input
                  type="date"
                  id="post_date"
                  name="post_date"
                  value={formData.post_date}
                  onChange={handleChange}
                  className="mt-1 p-2 border rounded-md focus:outline-none focus:border-blue w-1/2"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="application_start_date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Application Start Date
                </label>
                <input
                  type="date"
                  id="application_start_date"
                  name="application_start_date"
                  value={formData.application_start_date}
                  onChange={handleChange}
                  className="mt-1 p-2 border rounded-md focus:outline-none focus:border-blue w-1/2 "
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="application_deadline"
                  className="block text-sm font-medium text-gray-700"
                >
                  Application Deadline
                </label>
                <input
                  type="date"
                  id="application_deadline"
                  name="application_deadline"
                  value={formData.application_deadline}
                  onChange={handleChange}
                  className="mt-1 p-2 border rounded-md focus:outline-none focus:border-blue w-1/2 "
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="notes"
                  className="block text-sm font-medium text-gray-700"
                >
                  Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="4"
                  className="mt-1 p-2 border rounded-md focus:outline-none focus:border-blue w-1/2 "
                ></textarea>
              </div>

              <button
                type="button"
                onClick={handleNextStep}
                className="bg-blue text-white py-2 px-4 rounded-md w-1/2"
              >
                Next
              </button>
            </form>
          </>
        )}

        {activeStep === 2 && (
          <>
            <h3 className="font-medium my-8 p-2 bg-grey w-1/2">
              Step 2 : Select Houses for Advertisement
            </h3>
            <div>
              <table className="w-3/4 mx-auto border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 p-2">
                      <input
                        type="checkbox"
                        id="select-all"
                        onChange={() => handleSelectAll()}
                        checked={selectAll}
                      />
                      <label htmlFor="select-all">Select All</label>
                    </th>
                    <th className="border border-gray-300 p-2">House Number</th>
                    <th className="border border-gray-300 p-2">Site</th>
                    <th className="border border-gray-300 p-2">Rent</th>
                    <th className="border border-gray-300 p-2">Bed Capacity</th>
                  </tr>
                </thead>
                <tbody>
                  {emptyHouses.map((house) => (
                    <tr key={house.house_id}>
                      <td className="border border-gray-300 p-2">
                        <input
                          type="checkbox"
                          id={`house-${house.house_id}`}
                          onChange={() => handleCheckboxChange(house.house_id)}
                          checked={selectedHouses.includes(house.house_id)}
                        />
                      </td>
                      <td className="border border-gray-300 p-2">
                        {house.house_number}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {house.site}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {house.rent}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {house.bed_cap}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>{" "}
              <br />
              <button
                type="button"
                onClick={handleCreateAdvertisement}
                className="bg-blue text-white py-2 px-4 rounded-md"
              >
                Create Advertisement
              </button>
            </div>
            <br />
            <button
              type="button"
              onClick={handleGoBack}
              className="bg-gray-300 text-white py-2 px-4 rounded-md mr-2"
            >
              Go Back
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateAdvertisementPage;
