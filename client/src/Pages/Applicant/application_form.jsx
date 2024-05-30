import React, { useState, useEffect } from "react";
import Navbar from "../../Components/navbar";
import SignatureInput from "../../Components/SignatureInput"; // Adjust the path as needed

const ApplicationPage = () => {
  // on apply click -> either start a new application or if there is one already edit the old application
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    post_date: "",
    application_start_date: "",
    application_deadline: "",
    status: "",
    notes: "",
    house_count: 0,
  });

  const [signature, setSignature] = useState("");

  const handleSignatureChange = (signatureData) => {
    setSignature(signatureData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleNextStep = () => {
    // handleCreateApplication();
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleSubmit = () => {
    // handleUploadDocuments();
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleCreateApplication = async () => {
    try {
    } catch (error) {
      console.error("Error creating advertisement:", error);
    }
  };

  const handleUploadDocuments = async () => {
    setActiveStep(3);

    try {
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
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="bg-blue text-white py-2 px-4 rounded-md w-3/4"
                >
                  Save Progress & Continue Later
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
                    HR Letter
                  </label>
                  <small>
                    This letter should include your position, years of
                    experience, academic title and letter of continuance.
                  </small>
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
                    multiple
                    id="childrenBirthCertificate"
                    name="childrenBirthCertificate"
                    accept=".pdf, .jpg, .jpeg, .png"
                    //   onChange={(e) => handleFileChange(e, "childrenBirthCertificate")}
                    className="mt-1 p-2 border rounded-md focus:outline-none focus:border-blue w-3/4"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="disabilityProof"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Disability Proof
                  </label>
                  <input
                    type="file"
                    id="disabilityProof"
                    name="disabilityProof"
                    accept=".pdf, .doc, .docx"
                    //   onChange={(e) => handleFileChange(e, "disabilityProof")}
                    className="mt-1 p-2 border rounded-md focus:outline-none focus:border-blue w-3/4"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleUploadDocuments}
                  className="bg-blue text-white py-2 px-4 rounded-md w-3/4"
                >
                  Next
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
          {activeStep === 3 && (
            <>
              <p className="text-justify my-4">
                I hereby confirm that neither I nor my spouse have any ownership
                of private or public houses. I also attest that the information
                provided in this application form and the documents uploaded are
                accurate. I understand that any falsification on my part will
                result in legal action being taken against me. By signing below,
                I acknowledge and agree to these terms.
              </p>
              <div className="mb-4">
                <div>
                  <h2 className="text-lg font-semibold">Signature</h2>
                  <SignatureInput onSignatureChange={handleSignatureChange} />
                </div>
              </div>
              <br />
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-blue text-white py-2 px-4 rounded-md w-3/4"
              >
                Submit Application
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ApplicationPage;
