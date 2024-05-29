import React, { useState } from "react";
import { redirect, Link } from "react-router-dom";
import Navbar from "../../Components/navbar1";

const SignUp = () => {
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    surname: "",
    mobile_phone_number: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send registration data to your backend API using fetch
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const responseData = await response.json();
      console.log(responseData); // Handle the response data as needed

      // Redirect to login page
      return redirect("/signin");
    } catch (error) {
      console.error("Registration failed:", error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="text-center text-black text-2xl font-bold my-4">
        Create an Account
      </div>
      <div
        className="flex flex-col align-center bg-grey w-96
       mx-auto rounded-xl py-4 px-8 my-4"
      >
        <form onSubmit={handleSubmit}>
          <label className="font-medium text-sm">First Name:</label>
          <br />
          <input
            type="text"
            name="first_name"
            value={userData.first_name}
            onChange={handleChange}
            className="w-full bg-white rounded p-1 my-2"
          />
          <br />
          <label className="font-medium text-sm">Last Name:</label>
          <br />
          <input
            type="text"
            name="last_name"
            value={userData.last_name}
            onChange={handleChange}
            className="w-full bg-white rounded p-1 my-2 "
          />
          <br />
          <label className="font-medium text-sm">Surname:</label>
          <br />
          <input
            type="text"
            name="surname"
            value={userData.surname}
            onChange={handleChange}
            className="w-full bg-white rounded p-1 my-2 "
          />
          <br />
          <label className="font-medium text-sm">Phone Number:</label>
          <br />
          <input
            type="text"
            name="phone_number"
            value={userData.phone_number}
            onChange={handleChange}
            className="w-full bg-white rounded p-1 my-2 "
          />
          <br />
          <label className="font-medium text-sm">Email:</label>
          <br />
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="w-full bg-white rounded p-1 my-2 "
          />
          <br />
          <label className="font-medium text-sm">Password:</label>
          <br />{" "}
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            className="w-full bg-white rounded p-1 my-2 "
          />
          <br />
          <button
            className="w-full bg-blue rounded p-2 my-2 text-white text-medium font-bold"
            type="submit"
          >
            Register
          </button>
          <p className="text-sm text-center">
            Already Have an Account?{" "}
            <Link to="/signin" className="font-medium ">
              Login
            </Link>{" "}
            instead.
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
