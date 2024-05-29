import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar";
import { Link } from "react-router-dom";
import { create, edit, trash } from "../../assets";
import Edithouse from "./edit_house";
import DeleteHouse from "./delete_house";

// import { useAuth } from "../../hooks/useAuth";
export function House() {
  //   const { token } = useAuth();
  const [house, setHouse] = useState(true);
  const [houses, setHouses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of houses per page
  const [selectedhouse, setSelectedhouse] = useState(null);

  //house role id -- 2
  //admin role id -- 1
  useEffect(() => {
    const fetchAllhouses = async () => {
      try {
        const response = await fetch(`http://localhost:5000/houses`, {
          method: "GET",
        });
        if (response.ok) {
          const data = await response.json();
          setHouses(data.houses || []);
        } else {
          // console.error("Error fetching houses:", response.status);
        }
      } catch (error) {
        // console.error("Error fetching houses:", error);
      }
    };

    fetchAllhouses();
  }, []);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(houses.length / itemsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(houses.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedhouses = houses.slice(startIndex, endIndex);

  const [isEditOpen, setOpenEdit] = useState(false);
  const [isDeleteOpen, setOpenDelete] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/v1/houses/${selectedhouse}`,
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
        <Sidebar active={"houses"} role="head" />
      </div>
      <div className="bg-white h-screen w-5/6 flex text-black scrollbar overflow-y-scroll">
        <div className="w-5/6">
          <h1 className="text-black font-semibold text-xl m-4 ml-12">Houses</h1>
          <Link to="/head/add_house" className="flex items-center ml-12 my-6">
            <img src={create} alt="House Icon" className="mr-2" />
            <span>Create </span>
          </Link>

          <div
            className={`bg-grey p-2 rounded-xl m-1 ml-2 w-[590px] lg:m-auto my-4`}
          >
            {houses.length > 0 ? (
              <div className="flex flex-col">
                <table className="border-collapse w-full">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-400 p-2">Site</th>
                      <th className="border border-gray-400 p-2">Bed Cap</th>
                      <th className="border border-gray-400 p-2">Rent</th>
                      <th className="border border-gray-400 p-2">Block No</th>
                      <th className="border border-gray-400 p-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedhouses.map((house) => (
                      <tr key={house.id} className="hover:bg-gray-100">
                        <td className="border border-gray-400 p-2">
                          {house.site}
                        </td>
                        <td className="border border-gray-400 p-2">
                          {house.bed_cap === 0 ? "Studio" : house.bed_cap}
                        </td>
                        <td className="border border-gray-400 p-2">
                          {house.rent}
                        </td>
                        <td className="border border-gray-400 p-2">
                          {house.block}
                        </td>
                        <td className="border border-gray-400 p-2">
                          <div className="flex items-center">
                            <button
                              onClick={() => openEdit(house.id)}
                              className="mr-2"
                            >
                              <img src={edit} alt="Edit" />
                              {/* Your edit button */}
                            </button>
                            <Edithouse
                              isOpen={isEditOpen && selectedhouse === house.id}
                              onClose={closeEdit}
                              id={selectedhouse}
                            />
                            <button onClick={() => openDelete(house.id)}>
                              {/* Your delete button */}
                              <img src={trash} alt="Delete" />
                            </button>
                            <DeleteHouse
                              isOpen={
                                isDeleteOpen && selectedhouse === house.id
                              }
                              onClose={closeDelete}
                              onDelete={handleDelete}
                            />
                          </div>
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
        </div>
        <div className="w-1/4">
          <div className="absolute bottom-0 mb-2 lg:block hidden">
            {houses.length === 0 ? (
              <p>No entires forund</p>
            ) : (
              <>
                <p className="text-sm">
                  Showing {startIndex + 1} to{" "}
                  {endIndex > houses.length ? houses.length : endIndex} of{" "}
                  {houses.length} entires
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
