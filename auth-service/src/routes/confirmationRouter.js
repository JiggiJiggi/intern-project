import express from "express";
import { confirm } from "../controllers/main.js";

const confirmationRouter = express.Router();

/**
 * Handles email confirmation.
 * @route GET /confirmation
 * @param {string} email - Email to confirm, passed as a query parameter.
 */
confirmationRouter.get("/", async (req, res) => {
  const { email } = req.query;

  // Validate the email query parameter
  if (!email) {
    return res
      .status(400)
      .json({ message: "Email query parameter is required" });
  }

  try {
    await confirm(email);
    res.status(200).json({ message: "Email confirmation successful" });
  } catch (error) {
    console.error(`Email confirmation error: ${error.message}`);
    res.status(500).json({
      message: error.message.split(','),
    });
  }
});

export default confirmationRouter;
