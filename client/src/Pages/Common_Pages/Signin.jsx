import React, { useState } from "react";
import { redirect, Link } from "react-router-dom";
import { logo, image } from "../../assets/";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Navbar from "../../Components/navbar1";

const SignIn = () => {
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send registration data to your backend API using fetch
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      // jwt decode
      // user id and role id
      const token = data.token;
      const decoded = jwtDecode(token);

      if (response.ok) {
        const roles = decoded.roles;

        // Redirect based on user role
        if (roles.includes(1)) {
          navigate("/applicant/house_ads");
        } else if (roles.includes(3)) {
          navigate("/head/houses");
        } else if (roles.includes(4)) {
          navigate("/director/ads");
        } else if (roles.includes(6)) {
          navigate("/president/ads");
        } else {
          // Default redirect for other roles
          navigate("/signin");
        }
      } else {
        // Handle login failure
        console.error(token.error || "Login failed");
      }
      return redirect("/");
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-white">
        {/* Left side (Image) */}
        <div className="hidden md:block md:w-1/2 bg-cover bg-center h-screen relative">
          {/* Add your image here */}
          <img src={image} alt="Login" className="w-full h-full object-cover" />
        </div>

        {/* Right side (Login Form) */}
        <div className="w-1/2 max-w-md mx-auto  p-8 ">
          <img src={logo} alt="logo" className="w-1/2 mx-auto mb-8" />
          <form onSubmit={handleSubmit}>
            <label className="font-medium text-sm my-2">Email: </label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />

            <br />
            <label className="font-medium text-sm my-2">Password:</label>
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />

            <br />
            <button
              type="submit"
              className="text-white bg-blue rounded w-full px-3 py-2 border rounded-md my-4"
            >
              Log In
            </button>
          </form>
          <p className="text-sm text-right">
            Don't Have an Account?{" "}
            <Link to="/signup" className="font-medium ">
              Register
            </Link>{" "}
            instead.
          </p>
        </div>
      </div>
    </>
  );
};

export default SignIn;
