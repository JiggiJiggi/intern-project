import express from "express";
import jwt from "jsonwebtoken";
import _ from "lodash";
import { linkedinSignup } from "../controllers/main.js"; // Ensure correct path and extension

const linkedinSignupRouter = express.Router();

linkedinSignupRouter.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    // Check if all required fields are present
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ message: "All fields are required." });
    }

    await linkedinSignup(req.body);

    // Prepare the user data for JWT
    let user = _.pick(req.body, ["firstName", "lastName", "email"]);

    // Generate a token
    const token = jwt.sign(user, process.env.JWTSECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Signed Up Successfully with LinkedIn!", token: token });
  } catch (error) {
    console.error("LinkedIn Signup error:", error.message);
    res.status(500).json({
      message: error.message.split(','),
    });
  }
});

export default linkedinSignupRouter;
