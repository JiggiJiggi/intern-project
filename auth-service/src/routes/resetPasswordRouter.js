import express from "express";
import { resetPassword } from "../controllers/main.js";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const resetPasswordRouter = express.Router();

resetPasswordRouter.post("/", async (req, res) => {
  try {
    const { email, newPassword, token } = req.body;

    if (!email || !newPassword || !token) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const message = await resetPassword({ email, newPassword, token });

    res.status(200).json({ message });
  } catch (error) {
    console.error("ResetPassword Error:", error.message); // Log the error for debugging
    res.status(500).json({
      message: error.message.split(','),
    });
  }
});

export default resetPasswordRouter;
