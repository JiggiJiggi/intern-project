import "dotenv/config"; // Automatically loads .env file
import express from "express";
import cors from "cors";

// Import routers
import signupRouter from "./src/routes/signupRouter.js";
import signinRouter from "./src/routes/signinRouter.js";
import confirmationRouter from "./src/routes/confirmationRouter.js";
import googleSignupRouter from "./src/routes/googleSignupRouter.js";
import linkedinSignupRouter from "./src/routes/linkedinSignupRouter.js";
import requestResetPasswordRouter from "./src/routes/requestResetPasswordRouter.js";
import resetPasswordRouter from "./src/routes/resetPasswordRouter.js";

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
app.use(cors()); // Allows all origins (good for development)
// app.use(cors({ origin: 'http://localhost:5174' })); // Restrict to a specific origin (recommended for production)

// Body parsing middleware
app.use(express.json()); // Parses incoming JSON requests

// Route handling
app.use("/auth/signup", signupRouter); // Endpoint: http://localhost:${PORT}/auth/signup
app.use("/auth/signin", signinRouter); // Endpoint: http://localhost:${PORT}/auth/signin
app.use("/auth/confirmation", confirmationRouter); // Endpoint: http://localhost:${PORT}/auth/confirmation?email=example@gmail.com
app.use("/auth/googleSignup", googleSignupRouter); // Endpoint: http://localhost:${PORT}/auth/googleSignup
app.use("/auth/linkedinSignup", linkedinSignupRouter); // Endpoint: http://localhost:${PORT}/auth/linkedinSignup
app.use("/auth/resetPasswordRequest", requestResetPasswordRouter); // Endpoint: http://localhost:${PORT}/auth/resetPasswordRequest
app.use("/auth/resetPassword", resetPasswordRouter); // Endpoint: http://localhost:${PORT}/auth/resetPassword

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.stack); // Logs error stack trace
  res.status(500).json({ success: false, message: "Something went wrong!" }); // Sends JSON response
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
