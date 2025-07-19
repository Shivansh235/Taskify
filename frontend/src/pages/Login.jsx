import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { authActions } from "../store/auth";
import Navbar from "../components/Navbar";
import { useDispatch } from "react-redux";

const Login = () => {
  const [Data, setData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (Data.username === "" || Data.password === "") {
        alert("All fields are required");
      } else {
        const response = await axios.post(
          "https://taskify-iota-three.vercel.app/api/v1/login",
          Data
        );
        setData({ username: "", password: "" });
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        dispatch(authActions.login());
        navigate("/");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-[92vh] flex items-center justify-center px-4 py-6">
        <div className="p-4 w-full max-w-md rounded-lg bg-slate-950 shadow-md">
          <div className="font-semibold text-2xl text-white text-center mb-4">Login</div>

          <input
            type="text"
            name="username"
            placeholder="Username"
            autoComplete="off"
            value={Data.username}
            onChange={handleChange}
            className="bg-gray-800 text-white rounded px-3 py-2 my-2 w-full"
          />

          <input
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="bg-gray-800 text-white rounded px-3 py-2 my-2 w-full"
            name="password"
            autoComplete="new-password"
            value={Data.password}
          />

          <div className="w-full flex flex-col sm:flex-row items-start sm:items-center sm:justify-between mt-4 gap-y-3">
            <button
              type="button"
              onClick={handleSubmit}
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-6 py-2 text-center sm:px-5 sm:py-1.5 md:py-1.5"
            >
              Login
            </button>

            <Link to="/signup" className="text-sm text-gray-400 hover:text-gray-300">
              Not having an account?{" "}
              <span className="text-blue-600 underline">Signup here</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
