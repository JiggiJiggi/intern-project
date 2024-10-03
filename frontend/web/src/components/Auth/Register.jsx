import { useState } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../utils/api";
import Logo from "../../assets/logo.png";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const { firstName, lastName, email, password } = formData;

    try {
      const response = await registerUser({
        firstName,
        lastName,
        email,
        password,
      });
      if (response.success) {
        navigate("/login"); // Redirect to login page after successful registration
      } else {
        setError(response.message || "Registration failed");
      }
    } catch (err) {
      console.log(err);
      setError("An error occurred during registration");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <img src={Logo} alt="Logo" className="mx-auto mb-6 w-24" />
        <h2 className="text-2xl mb-4 text-center">Sign up for Free</h2>
        <div className="text-center mt-4">
          <span>Already have an account? </span>
          <Link to="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">First Name</label>
            <div className="flex items-center border rounded p-2">
              <FaUser className="mr-2 text-gray-500" />
              <input
                type="text"
                name="firstName"
                className="w-full p-2 outline-none"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Last Name</label>
            <div className="flex items-center border rounded p-2">
              <FaUser className="mr-2 text-gray-500" />
              <input
                type="text"
                name="lastName"
                className="w-full p-2 outline-none"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <div className="flex items-center border rounded p-2">
              <FaEnvelope className="mr-2 text-gray-500" />
              <input
                type="email"
                name="email"
                className="w-full p-2 outline-none"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Password</label>
            <div className="flex items-center border rounded p-2">
              <FaLock className="mr-2 text-gray-500" />
              <input
                type="password"
                name="password"
                className="w-full p-2 outline-none"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Confirm Password</label>
            <div className="flex items-center border rounded p-2">
              <FaLock className="mr-2 text-gray-500" />
              <input
                type="password"
                name="confirmPassword"
                className="w-full p-2 outline-none"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
