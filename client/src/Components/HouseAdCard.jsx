// ActiveHouseAdCard.js
import React from "react";
import { Link } from "react-router-dom";

const ActiveHouseAdCard = ({ adDetails }) => {
  const {
    post_date,
    application_start_date,
    application_deadline,
    notes,
    houses, // Assuming houses is an array
  } = adDetails;

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
            {new Date(post_date).toLocaleDateString()}
            <br />
            <strong>Application Start Date:</strong>{" "}
            {new Date(application_start_date).toLocaleDateString()}
          </div>
          <div>
            <strong>Deadline:</strong>{" "}
            {new Date(application_deadline).toLocaleDateString()}
          </div>
          <div>
            <strong>Notes:</strong> {notes}
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {houses.map((house) => (
            <tr key={house.id}>
              <td className="border border-gray-300 p-2">
                {house.bed_cap === 0 ? "Studio" : house.bed_cap}
              </td>
              <td className="border border-gray-300 p-2">{house.site}</td>
              <td className="border border-gray-300 p-2">{house.rent}</td>
              <td className="border border-gray-300 p-2">{house.block}</td>
              <td className="border border-gray-300 p-2">
                <Link
                  to={`/application/${house.HouseAdvertisement.id}`}
                  className="bg-blue px-2 py-1 rounded text-white"
                >
                  Apply
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActiveHouseAdCard;
