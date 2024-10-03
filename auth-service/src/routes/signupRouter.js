import express from "express";
import jwt from "jsonwebtoken";
import _ from "lodash";
import { signup } from "../controllers/main.js"; // Ensure correct path and extension

const signupRouter = express.Router();

signupRouter.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if all required fields are present
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    await signup(req.body);

    // Prepare the user data for JWT
    let user = _.pick(req.body, ["firstName", "lastName", "email"]);

    // Generate a token
    const token = jwt.sign(
      //{ id: user._id, email: user.email },
      { firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role, confirmed: user.confirmed },
      process.env.JWTSECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Signed Up Successfully!", token: token });
  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({
      message: error.message.split(','),
    });
  }
});

export default signupRouter;