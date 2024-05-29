import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar";
// import housename from "../../components/housename";
import { Link } from "react-router-dom";
import { create, edit, trash } from "../../assets";
// import Deletehouse from "./Deletehouse";
// import Edithouse from "./Edithouse";
// import { useAuth } from "../../hooks/useAuth";

function Ads() {
  //   const { token } = useAuth();
  const [ad, setAd] = useState(true);
  const [ads, setads] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of ads per page
  const [selectedhouse, setSelectedhouse] = useState(null);

  //house role id -- 2
  //admin role id -- 1

  useEffect(() => {
    const fetchAllads = async () => {
      try {
        const response = await fetch(`http://localhost:5000/ads/`, {
          method: "GET",
        });
        if (response.ok) {
          const { message, advertisements } = await response.json();
          setads(advertisements || []);
        } else {
          // console.error("Error fetching ads:", response.status);
        }
      } catch (error) {
        // console.error("Error fetching ads:", error);
      }
    };

    fetchAllads();
  }, []);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(ads.length / itemsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(ads.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedads = ads.slice(startIndex, endIndex);

  const [isEditOpen, setOpenEdit] = useState(false);
  const [isDeleteOpen, setOpenDelete] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/v1/ads/${selectedhouse}`,
        {
          method: "DELETE",
          headers: {
            // Other headers if needed
          },
        }
      );

      const parseRes = await response.json();
      // console.log(parseRes);

      if (parseRes.status === "success") {
        alert("house deleted successfully");
        setOpenDelete(false);
        window.location.reload();
      } else {
        alert("house has not been deleted, try again later.");
      }
    } catch (error) {
      // console.error(error);
      alert(
        "An error occurred while processing your request. Please try again later"
      );
    }

    // Close the delete confirmation modal
    setOpenDelete(false);
  };

  const openEdit = (houseId) => {
    setSelectedhouse(houseId);
    setOpenEdit(true);
  };

  const openDelete = (houseId) => {
    setSelectedhouse(houseId);
    setOpenDelete(true);
  };

  function closeDelete() {
    setOpenDelete(false);
  }
  function closeEdit() {
    setOpenEdit(false);
  }

  return (
    <div className="flex h-screen">
      <div className=" w-1/5">
        <Sidebar active={"ads"} role="head" />
      </div>
      <div className="bg-white h-screen w-5/6 flex text-black scrollbar overflow-y-scroll">
        <div className="w-3/4">
          <h1 className="text-black font-semibold text-xl m-4 ml-12">
            Advertisements
          </h1>
          <Link to="/head/post_ad" className="flex items-center ml-12 my-6">
            <img src={create} alt="add Icon" className="mr-2" />
            <span>Create </span>
          </Link>

          <div
            className={`bg-grey p-2 rounded-xl m-1 ml-2 w-[590px] lg:m-auto`}
          >
            {ads.length > 0 ? (
              <div className="flex flex-col">
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
                      <th className="border border-gray-400 p-2">
                        House Count
                      </th>
                      <th className="border border-gray-400 p-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedads &&
                      paginatedads.map((ad) => (
                        <tr key={ad.ad_id} className="hover:bg-gray-100">
                          <td className="border border-gray-400 p-2">
                            {ad.status}
                          </td>
                          <td className="border border-gray-400 p-2">
                            {new Date(ad.post_date).toLocaleDateString()}
                          </td>
                          <td className="border border-gray-400 p-2">
                            {new Date(
                              ad.application_start_date
                            ).toLocaleDateString()}
                          </td>
                          <td className="border border-gray-400 p-2">
                            {new Date(
                              ad.application_deadline
                            ).toLocaleDateString()}
                          </td>
                          <td className="border border-gray-400 p-2">
                            {ad.houses.length}
                          </td>
                          <td>
                            <Link
                              to={{
                                pathname: `/head/ad/${ad.ad_id}`,
                                state: { adObject: ad },
                              }}
                              key={ad.ad_id}
                              className="block bg-blue text-white my-2 px-1 text-xs text-align rounded-md"
                            >
                              View More
                            </Link>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-black my-10">
                No enties found, change your filters and try agin
              </p>
            )}
          </div>

          <div className="flex items-center mt-8 flex-col lg:hidden">
            {ads.length === 0 ? (
              <p>No entries found</p>
            ) : (
              <>
                <p className="text-sm">
                  Showing {startIndex + 1} to{" "}
                  {endIndex > ads.length ? ads.length : endIndex} of{" "}
                  {ads.length} entires
                </p>
                <div className="flex justify-center">
                  <button
                    onClick={handlePrevPage}
                    className="bg-lighterGray px-2 mx-1 rounded"
                  >
                    &lt;
                  </button>
                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                  ).map((pageNumber) => (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageClick(pageNumber)}
                      className={`rounded mx-1 px-2 m-1 ${
                        pageNumber === currentPage
                          ? "bg-lighterPrimary"
                          : "bg-white text-grey"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  ))}
                  <button
                    onClick={handleNextPage}
                    className="bg-lighterGray px-2 mx-1 rounded"
                  >
                    &gt;
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="w-1/4">
          <div className="absolute bottom-0 mb-2 lg:block hidden">
            {ads.length === 0 ? (
              <p>No entires forund</p>
            ) : (
              <>
                <p className="text-sm">
                  Showing {startIndex + 1} to{" "}
                  {endIndex > ads.length ? ads.length : endIndex} of{" "}
                  {ads.length} entires
                </p>
                <button
                  onClick={handlePrevPage}
                  className="bg-lighterGray px-2 mx-1 rounded"
                >
                  &lt;
                </button>
                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageClick(pageNumber)}
                    className={`rounded mx-1 px-2 m-1 ${
                      pageNumber === currentPage
                        ? "bg-lighterPrimary"
                        : "bg-white text-grey"
                    }`}
                  >
                    {pageNumber}
                  </button>
                ))}
                <button
                  onClick={handleNextPage}
                  className="bg-lighterGray px-2 mx-1 rounded"
                >
                  &gt;
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ads;
