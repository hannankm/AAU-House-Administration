import React, { useEffect, useState } from "react";
import AdCard from "../../Components/AdCard";
import Sidebar from "../../Components/Sidebar";
import { useParams } from "react-router-dom";

const AdDetail = () => {
  const [ad, setAd] = useState(null);
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

  return (
    <div className="flex h-screen">
      <div className=" w-1/5">
        <Sidebar active={"houses"} role="head" />
      </div>
      <div className="overflow-y-auto">
        <h1 className="text-black my-4 text-2xl font-bold mb-2 text-center">
          House Advertisement Detail
        </h1>
        {ad ? (
          // Render the details of the active advertisement
          <>
            <AdCard adDetails={ad} />
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

export default AdDetail;
