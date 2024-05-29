import React, { useEffect, useState } from "react";
import AdCard from "../../Components/AdCard";
import Sidebar from "../../Components/Sidebar";
import { useParams } from "react-router-dom";

const AdDetails = () => {
  const [adDetails, setAd] = useState(null);
  const adId = useParams().id; // Assuming you're using React Router and the ID is available as a route parameter

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const response = await fetch(`http://localhost:5000/ads/${adId}`); // Replace with your API endpoint
        const { message, advertisement } = await response.json();

        setAd(advertisement);
      } catch (error) {
        console.error("Error fetching ad:", error);
      }
    };

    fetchAd();
  }, []);

  const handleApprove = async (adId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/ads/director/authorize/${adId}`,
        {
          method: "PUT", // Assuming you have a route for updating the status
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        alert("Ad approved succesfully!");
      } else {
        console.error("Error approving advertisement:", response.message);
      }
    } catch (error) {
      console.error("Error approving advertisement:", error);
    }
  };

  const handleRejectClick = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/ads/director/reject/${adDetails.ad_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          // You can include a request body if needed
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Advertisement rejected by director:", data);
        // You can update your state or perform any other actions after successful rejection
      } else {
        console.error("Error rejecting advertisement:", response.status);
      }
    } catch (error) {
      console.error("Error rejecting advertisement:", error);
    }
  };

  return (
    <div className="flex h-screen">
      <div className=" w-1/5">
        <Sidebar active={"houses"} role="director" />
      </div>
      <div className="overflow-y-auto">
        <h1 className="text-black my-4 text-2xl font-bold mb-2 text-center">
          House Advertisement Detail
        </h1>
        {adDetails ? (
          // Render the details of the active advertisement
          <>
            <div className="bg-white p-4 shadow-md rounded-md">
              <div className="mb-4">
                <div className="w-3/4 mx-auto rounded-md">
                  <h1 className="text-xl font-medium mb-2 text-center underline">
                    Notice to All Addis Ababa University Academic Staff
                  </h1>
                  <p className="">
                    To apply for housing through transfer or as a new applicant,
                    please bring the following documents on the specified
                    application dates. Fill out the application forms online, as
                    we do not accept applicants at our offices.
                  </p>
                  <br />
                  <p className="">
                    Prepare the following documents, among others, before
                    starting your application. Note that you won't be able to
                    save the progress of the application.
                  </p>
                  <ol
                    className="mx-auto"
                    style={{ listStyleType: "decimal", marginLeft: "20px" }}
                  >
                    <li>
                      Letter from HR confirming your current employment status.
                    </li>
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
                    {new Date(
                      adDetails.application_start_date
                    ).toLocaleDateString()}
                  </div>
                  <div>
                    <strong>Deadline:</strong>{" "}
                    {new Date(
                      adDetails.application_deadline
                    ).toLocaleDateString()}
                  </div>
                  <div>
                    <strong>Notes:</strong> {adDetails.notes}
                  </div>
                  <div className="bg-grey text-black my-4 pl-4">
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
                        <td className="border border-gray-300 p-2">
                          {house.site}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {house.rent}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {house.block}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div className="flex flex-row align-center my-4 mx-auto w-1/3">
                <button
                  className="bg-blue px-8 py-2 mx-8 text-white font-medium rounded"
                  onClick={() => handleApprove(adDetails.ad_id)}
                >
                  Approve
                </button>
                <button
                  className="bg-red-600 px-8 py-2 mx-8 text-white font-medium rounded"
                  onClick={() => handleRejectClick(adDetails.ad_id)}
                >
                  Reject
                </button>
              </div>
            </div>
            {/* Add more details as needed */}
          </>
        ) : (
          // Render loading state or an error message
          <p>No active house ad, try again later...</p>
        )}

        {/* Your House Ads content for applicants */}
      </div>
    </div>
  );
};

export default AdDetails;
