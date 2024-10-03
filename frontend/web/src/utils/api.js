import axios from "axios";

// Base API URL
const API_URL = "http://localhost:5001"; // Replace with your backend API URL

// Function to handle Google login
export const googleLogin = async (token) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/google`,
      { token },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Google login error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// Function to handle Facebook login
export const facebookLogin = async (token) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/facebook`,
      { token },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Facebook login error:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

// Function to handle LinkedIn login
export const linkedinLogin = async (token) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/linkedin`,
      { token },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "LinkedIn login error:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

// Function to handle user registration
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, userData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Registration error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// Function to handle user login
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signin`, userData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// Function to handle password reset
export const resetPassword = async (email) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/reset-password`,
      { email },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Password reset error:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

// Function to get the current authenticated user
export const getCurrentUser = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Get current user error:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

// Function to handle logout
export const logoutUser = async (token) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Logout error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// API Base URL for Books
const API_BASE_URL = "/api";

// Function to fetch books
export const fetchBooks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/books`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching books:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};
