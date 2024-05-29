import React, { useEffect, useState } from "react";
import Navbar from "../../Components/navbar";
import ActiveHouseAdCard from "../../Components/HouseAdCard";

const HouseAds = () => {
  //   const { user, role } = useUser();

  const [activeAd, setActiveAd] = useState(null);

  useEffect(() => {
    const fetchActiveAdvertisement = async () => {
      try {
        const response = await fetch("http://localhost:5000/ads/active");
        if (response.ok) {
          const data = await response.json();
          setActiveAd(data);
        } else {
          console.error("Failed to fetch active advertisement");
        }
      } catch (error) {
        console.error("Error fetching active advertisement:", error.message);
      }
    };

    fetchActiveAdvertisement();
  }, []);

  return (
    <>
      <Navbar />

      <h1 className="text-black my-4 text-2xl font-bold mb-2 text-center">
        Active House Advertisements
      </h1>
      {activeAd ? (
        // Render the details of the active advertisement
        <>
          <ActiveHouseAdCard adDetails={activeAd} />
          {/* Add more details as needed */}
        </>
      ) : (
        // Render loading state or an error message
        <p>No active house ad, try again later...</p>
      )}

      {/* Your House Ads content for applicants */}
    </>
  );
};

export default HouseAds;
