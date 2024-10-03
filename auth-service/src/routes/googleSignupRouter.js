import express from "express";
import jwt from "jsonwebtoken";
import _ from "lodash";
import { googleSignup } from "../controllers/main.js";

const googleSignupRouter = express.Router();

googleSignupRouter.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    // Check if all required fields are present
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ message: "All fields are required." });
    }

    await googleSignup(req.body);

    // Prepare the user data for JWT
    let user = _.pick(req.body, ["firstName", "lastName", "email"]);

    // Generate a token
    // const token = jwt.sign(user, process.env.JWTSECRET, { expiresIn: "1h" });
    const token = jwt.sign(
      //{ id: user._id, email: user.email }, // After database is ready, we will have id
      { firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role, confirmed: user.confirmed },
      process.env.JWTSECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Signed Up Successfully with Google!", token: token });
  } catch (error) {
    console.error("Google Signup error:", error.message);
    res.status(500).json({
      message: error.message.split(','),
    });
  }
});

export default googleSignupRouter;