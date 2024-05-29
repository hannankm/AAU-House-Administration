import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../Components/Sidebar";
import Navbar from "../../Components/navbar";

const ApplicationPage = () => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleNextStep = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleCreateAdvertisement = async () => {
    try {
      //   // Make an API call to create the advertisement
      //   const adResponse = await fetch("http://localhost:5000/ads/", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       ...formData,
      //       house_count: selectedHouses.length,
      //     }),
      //   });
      //   if (adResponse.ok) {
      //     const { message, advertisement } = await adResponse.json();
      //     const generatedAdId = advertisement.ad_id;
      //     console.log("Advertisement created:", advertisement);
      //     // Make API calls to associate houses with the advertisement
      //     for (const houseId of selectedHouses) {
      //       await fetch("http://localhost:5000/house-ads/", {
      //         method: "POST",
      //         headers: {
      //           "Content-Type": "application/json",
      //         },
      //         body: JSON.stringify({ ad_id: generatedAdId, house_id: houseId }),
      //       });
      //     }
      //     // Handle the response from the server as needed
      //     // You may want to navigate to another page after successful creation
      //     // Example: Redirect to the advertisement list page
      //     // history.push('/advertisements');
      //     alert("Advertisement created succesfully");
      //   } else {
      //     console.error("Error creating advertisement:", adResponse.status);
      //   }
    } catch (error) {
      console.error("Error creating advertisement:", error);
    }
  };

  const handleGoBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  return (
    <>
      <Navbar />
      <div className="mb-4 overflow-y-auto w-full mx-auto w-5/6 ml-6">
        <div className="w-1/2 mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center my-2">
            Create Application
          </h2>
          {activeStep === 1 && (
            <>
              <h3 className="font-medium my-8 p-2 bg-grey  mx-auto">
                Step 1 : Fill Advertisement Form
              </h3>
              <form className="mx-auto">
                <div className="mb-4">
                  <label
                    htmlFor="post_date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="post_date"
                    name="post_date"
                    value={formData.post_date}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded-md focus:outline-none focus:border-blue w-3/4"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="post_date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Spouse Full Name
                  </label>
                  <input
                    type="text"
                    id="post_date"
                    name="post_date"
                    value={formData.post_date}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded-md focus:outline-none focus:border-blue w-3/4"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Gender
                  </label>
                  <div className="mt-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="gender-male"
                        name="gender"
                        value="Male"
                        checked={formData.gender === "Male"}
                        onChange={handleChange}
                        className="form-radio h-4 w-4 text-blue-500"
                      />
                      <label
                        htmlFor="gender-male"
                        className="ml-2 text-sm text-gray-700"
                      >
                        Male
                      </label>
                    </div>
                    <div className="flex items-center mt-2">
                      <input
                        type="radio"
                        id="gender-female"
                        name="gender"
                        value="Female"
                        checked={formData.gender === "Female"}
                        onChange={handleChange}
                        className="form-radio h-4 w-4 text-blue-500"
                      />
                      <label
                        htmlFor="gender-female"
                        className="ml-2 text-sm text-gray-700"
                      >
                        Female
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="type"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded-md focus:outline-none focus:border-blue w-3/4"
                  >
                    <option value="new">New</option>
                    <option value="transfer">Transfer</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="application_deadline"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Family Size
                  </label>
                  <input
                    type="number"
                    id="application_deadline"
                    name="application_deadline"
                    value={formData.application_deadline}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded-md focus:outline-none focus:border-blue w-3/4 "
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="post_date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Position
                  </label>
                  <input
                    type="text"
                    id="post_date"
                    name="post_date"
                    value={formData.post_date}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded-md focus:outline-none focus:border-blue w-3/4"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="post_date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Academic Title
                  </label>
                  <input
                    type="text"
                    id="post_date"
                    name="post_date"
                    value={formData.post_date}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded-md focus:outline-none focus:border-blue w-3/4"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="post_date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Additional Position
                  </label>
                  <input
                    type="text"
                    id="post_date"
                    name="post_date"
                    value={formData.post_date}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded-md focus:outline-none focus:border-blue w-3/4"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="post_date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Mobile Phone Number
                  </label>
                  <input
                    type="text"
                    id="post_date"
                    name="post_date"
                    value={formData.post_date}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded-md focus:outline-none focus:border-blue w-3/4"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="post_date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Office Phone Number
                  </label>
                  <input
                    type="text"
                    id="post_date"
                    name="post_date"
                    value={formData.post_date}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded-md focus:outline-none focus:border-blue w-3/4"
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
                    className="mt-1 p-2 border rounded-md focus:outline-none focus:border-blue w-3/4 "
                  ></textarea>
                </div>

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="bg-blue text-white py-2 px-4 rounded-md w-3/4"
                >
                  Next
                </button>
              </form>
            </>
          )}

          {activeStep === 2 && (
            <>
              <h3 className="font-medium my-8 p-2 bg-grey w-full">
                Step 2 : Upload Docuements
              </h3>
              <div>
                <div className="mb-4">
                  <label
                    htmlFor="hrLetter"
                    className="block text-sm font-medium text-gray-700"
                  >
                    HR Letter of Continuance
                  </label>
                  <input
                    type="file"
                    id="hrLetter"
                    name="hrLetter"
                    accept=".pdf, .doc, .docx"
                    //   onChange={(e) => handleFileChange(e, "hrLetter")}
                    className="mt-1 p-2 border rounded-md focus:outline-none focus:border-blue w-3/4"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="marriageCertificate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Marriage Certificate
                  </label>
                  <input
                    type="file"
                    id="marriageCertificate"
                    name="marriageCertificate"
                    accept=".pdf, .jpg, .jpeg, .png"
                    //   onChange={(e) => handleFileChange(e, "marriageCertificate")}
                    className="mt-1 p-2 border rounded-md focus:outline-none focus:border-blue w-3/4"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="childrenBirthCertificate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Children's Birth Certificate
                  </label>
                  <input
                    type="file"
                    id="childrenBirthCertificate"
                    name="childrenBirthCertificate"
                    accept=".pdf, .jpg, .jpeg, .png"
                    //   onChange={(e) => handleFileChange(e, "childrenBirthCertificate")}
                    className="mt-1 p-2 border rounded-md focus:outline-none focus:border-blue w-3/4"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="experienceProof"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Years of Experience Proof
                  </label>
                  <input
                    type="file"
                    id="experienceProof"
                    name="experienceProof"
                    accept=".pdf, .doc, .docx"
                    //   onChange={(e) => handleFileChange(e, "experienceProof")}
                    className="mt-1 p-2 border rounded-md focus:outline-none focus:border-blue w-3/4"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="positionProof"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Position Proof
                  </label>
                  <input
                    type="file"
                    id="positionProof"
                    name="positionProof"
                    accept=".pdf, .doc, .docx"
                    //   onChange={(e) => handleFileChange(e, "positionProof")}
                    className="mt-1 p-2 border rounded-md focus:outline-none focus:border-blue w-3/4"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="signatureFile"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Signature File
                  </label>
                  <input
                    type="file"
                    id="signatureFile"
                    name="signatureFile"
                    accept=".png, .jpg, .jpeg"
                    //   onChange={(e) => handleFileChange(e, "signatureFile")}
                    className="mt-1 p-2 border rounded-md focus:outline-none focus:border-blue w-3/4"
                  />
                </div>
                <br />
                <button
                  type="button"
                  onClick={handleCreateAdvertisement}
                  className="bg-blue text-white py-2 px-4 rounded-md w-3/4"
                >
                  Submit Application
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
    </>
  );
};

export default ApplicationPage;
