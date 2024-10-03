import express from "express";
import jwt from "jsonwebtoken";
import { signin } from "../controllers/main.js";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const signinRouter = express.Router();

signinRouter.post("/", async (req, res) => {
  try {
    const user = await signin(req.body); // {"email", "password"}

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      //{ id: user._id, email: user.email }, // After database is ready, we will have id
      { firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role, confirmed: user.confirmed },
      process.env.JWTSECRET,
      { expiresIn: "1h" }
    );
    
    res.status(200).json({ message: "Signed In Successfully!", token });
  } catch (error) {
    console.error("Signin Error:", error.message); // Log the error for debugging
    res.status(500).json({
      message: error.message.split(','),
    });
  }
});

export default signinRouter;