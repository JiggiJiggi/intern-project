import express from "express";
import { requestPasswordReset } from "../controllers/main.js";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const requestResetPasswordRouter = express.Router();

requestResetPasswordRouter.post("/", async (req, res) => {
  try {
    const { email } = req.body; // Extract email from the request body

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    await requestPasswordReset({ email }); // Call the requestRenewPassword function

    res.status(200).json({ message: "Password reset link has been sent to your email." });
  } catch (error) {
    console.error("RequestRenewPassword Error:", error.message); // Log the error for debugging
    res.status(500).json({
      message: error.message.split(','),
    });
  }
});

export default requestResetPasswordRouter;
