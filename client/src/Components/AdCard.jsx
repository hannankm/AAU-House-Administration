// ActiveHouseAdCard.js
import React from "react";

const AdCard = ({ adDetails }) => {
  const handlePostAdvertisement = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/ads/post/${adDetails.ad_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // Advertisement posted successfully
        // You can navigate to a different page or update the UI as needed
        // history.push("/posted-advertisements");
        alert("Advertisement posted successfully.");
      } else {
        const data = await response.json();
        console.error("Error posting advertisement:", data.message);
        alert("Error posting advertisement:" + data.message);
      }
    } catch (error) {
      console.error("Error posting advertisement:", error.message);
      alert("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-md">
      <div className="mb-4">
        <div className="w-3/4 mx-auto rounded-md">
          <h1 className="text-xl font-medium mb-2 text-center underline">
            Notice to All Addis Ababa University Academic Staff
          </h1>
          <p className="">
            To apply for housing through transfer or as a new applicant, please
            bring the following documents on the specified application dates.
            Fill out the application forms online, as we do not accept
            applicants at our offices.
          </p>
          <br />
          <p className="">
            Prepare the following documents, among others, before starting your
            application. Note that you won't be able to save the progress of the
            application.
          </p>
          <ol
            className="mx-auto"
            style={{ listStyleType: "decimal", marginLeft: "20px" }}
          >
            <li>Letter from HR confirming your current employment status.</li>
            <li>Academic title</li>
            <li>Years of experience</li>
            <li>Marital status</li>
            <li>Family count</li>
          </ol>
        </div>
        <br />
        <div className="w-3/4 mx-auto">
          <div>
            <strong>Post Date:</strong>
            {new Date(adDetails.post_date).toLocaleDateString()}
            <br />
            <strong>Application Start Date:</strong>{" "}
            {new Date(adDetails.application_start_date).toLocaleDateString()}
          </div>
          <div>
            <strong>Deadline:</strong>{" "}
            {new Date(adDetails.application_deadline).toLocaleDateString()}
          </div>
          <div>
            <strong>Notes:</strong> {adDetails.notes}
          </div>
          <div className="bg-blue text-white my-4 pl-4">
            <strong>Status:</strong> {adDetails.status}
          </div>
        </div>
      </div>

      <table className="w-3/4 border-collapse border border-gray-300 mx-auto">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Bed Capacity</th>
            <th className="border border-gray-300 p-2">Site</th>
            <th className="border border-gray-300 p-2">Rent</th>
            <th className="border border-gray-300 p-2">Block Number</th>
          </tr>
        </thead>
        <tbody>
          {adDetails.houses &&
            adDetails.houses.map((house) => (
              <tr key={house.id}>
                <td className="border border-gray-300 p-2">
                  {house.bed_cap === 0 ? "Studio" : house.bed_cap}
                </td>
                <td className="border border-gray-300 p-2">{house.site}</td>
                <td className="border border-gray-300 p-2">{house.rent}</td>
                <td className="border border-gray-300 p-2">{house.block}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {adDetails.status === "approved_by_president" ? (
        <button
          className="bg-blue text-white mx-auto"
          onClick={handlePostAdvertisement}
        >
          Post Advertisement
        </button>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default AdCard;
