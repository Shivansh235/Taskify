import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const SignUp = () => {
  const navigate = useNavigate();
  const [Data, setData] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (Data.username === "" || Data.email === "" || Data.password === "") {
        alert("All fields are required");
      } else {
        const response = await axios.post(
          "http://localhost:3000/api/v1/signup",
          Data
        );
        setData({ username: "", email: "", password: "" });
        alert(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-[92vh] flex items-center justify-center px-4 py-6">
        <div className="p-4 w-full max-w-md rounded-lg bg-slate-950">
          <div className="font-semibold text-xl text-white">Sign Up</div>

          <input
            type="text"
            name="username"
            placeholder="Username"
            autoComplete="off"
            value={Data.username}
            className="bg-gray-800 text-white rounded px-3 py-2 my-4 w-full"
            onChange={handleChange}
          />

          <input
            type="email"
            placeholder="Email"
            className="bg-gray-800 text-white rounded px-3 py-2 my-4 w-full"
            name="email"
            value={Data.email}
            required
            onChange={handleChange}
          />

          <input
            type="password"
            placeholder="Password"
            className="bg-gray-800 text-white rounded px-3 py-2 my-4 w-full"
            name="password"
            autoComplete="new-password"
            value={Data.password}
            onChange={handleChange}
          />

          <div className="w-full flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-y-4 mt-2">
            <button
              type="button"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-base px-6 py-2 text-center sm:px-5 sm:py-1.5 md:py-1.5"
              onClick={handleSubmit}
            >
              Sign Up
            </button>

            <Link to="/login" className="text-sm text-gray-400 hover:text-gray-300">
              Already having an account?{" "}
              <span className="text-blue-600 underline">Login here</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
