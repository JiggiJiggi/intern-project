import React, { useState } from "react";
import {
  FaGoogle,
  FaFacebook,
  FaLinkedin,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {
  loginUser,
  googleLogin,
  linkedinLogin,
  facebookLogin,
} from "../../utils/api";

import logo from "../../assets/logo.png";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await loginUser(formData);
      if (response.success) {
        // Set the token or user info in localStorage or context
        localStorage.setItem("token", response.token);
        navigate("/"); // Redirect to a protected route after login
      } else {
        setError(response.message || "Login failed");
      }
    } catch (err) {
      setError("An error occurred during login");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <img src={logo} alt="Logo" className="w-24 mx-auto mb-6" />
        <h2 className="mb-4 text-2xl text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <div className="flex items-center p-2 border rounded">
              <FaEnvelope className="mr-2 text-gray-500" />
              <input
                type="email"
                name="email"
                className="w-full p-2 outline-none"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Password</label>
            <div className="flex items-center p-2 border rounded">
              <FaLock className="mr-2 text-gray-500" />
              <input
                type="password"
                name="password"
                className="w-full p-2 outline-none"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>
          {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Login
          </button>
          <div className="mt-4 text-center">
            <a
              href="/forgot-password"
              className="text-blue-500 hover:underline"
            >
              Forgot Password?
            </a>
          </div>
          <div className="mt-4 text-center">
            <span>Don't have an account? </span>
            <Link to="/register" className="text-blue-500 hover:underline">
              Create one
            </Link>
          </div>
        </form>
        <div className="mt-6">
          <button
            onClick={googleLogin}
            className="flex items-center justify-center w-full p-2 mb-2 text-white bg-red-500 rounded hover:bg-red-600"
          >
            <FaGoogle className="mr-2" /> Sign in with Google
          </button>
          <button
            onClick={facebookLogin}
            className="flex items-center justify-center w-full p-2 mb-2 text-white bg-blue-700 rounded hover:bg-blue-800"
          >
            <FaFacebook className="mr-2" /> Sign in with Facebook
          </button>
          <button
            onClick={linkedinLogin}
            className="flex items-center justify-center w-full p-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            <FaLinkedin className="mr-2" /> Sign in with LinkedIn
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
