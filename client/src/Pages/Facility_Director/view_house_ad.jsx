import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar";
import { Link } from "react-router-dom";

const DirectorAuthorizationPage = () => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchAdsForAuthorization = async () => {
      try {
        const response = await fetch("http://localhost:5000/ads/director/");
        if (response.ok) {
          const { success, message, data } = await response.json();
          setAds(data || []);
        } else {
          console.error("Error fetching advertisements:", response.status);
        }
      } catch (error) {
        console.error("Error fetching advertisements:", error);
      }
    };

    fetchAdsForAuthorization();
  }, []);

  return (
    <div className="flex h-screen">
      <div className=" w-1/5">
        <Sidebar active={"houses"} />
      </div>
      <div>
        <h2 className="text-2xl font-medium text-center my-4">
          Advertisements for Director Authorization
        </h2>
        <div className="flex flex-col ml-6 ">
          <table className="border-collapse w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-400 p-2">Status</th>
                <th className="border border-gray-400 p-2">Post Date</th>
                <th className="border border-gray-400 p-2">
                  Application Start Date
                </th>
                <th className="border border-gray-400 p-2">
                  Application End Date
                </th>
                <th className="border border-gray-400 p-2">House Count</th>
                <th className="border border-gray-400 p-2"></th>
              </tr>
            </thead>
            <tbody>
              {ads.map((ad) => (
                <tr key={ad.ad_id} className="hover:bg-gray-100">
                  <td className="border border-gray-400 p-2">{ad.status}</td>
                  <td className="border border-gray-400 p-2">
                    {new Date(ad.post_date).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-400 p-2">
                    {new Date(ad.application_start_date).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-400 p-2">
                    {new Date(ad.application_deadline).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-400 p-2">
                    {ad.house_count}
                  </td>
                  <td>
                    <Link
                      to={{
                        pathname: `/director/adDetails/${ad.ad_id}`,
                        state: { adObject: ad },
                      }}
                      key={ad.ad_id}
                      className="block bg-blue text-white my-2 px-1 text-xs text-align rounded-md border border-gray-400"
                    >
                      View More
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DirectorAuthorizationPage;
