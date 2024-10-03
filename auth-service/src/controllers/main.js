import {
  fetchUsers,
  addUser,
  getUserPasswordFromDatabase,
  updateUserPasswordInDatabase,
  confirmEmail,
} from "../services/users.js";

import { signupAuth, signinAuth } from "../services/auth.js";
import { hashPassword, validatePassword } from "../services/hash.js";

import { sendConfirmationEmail,
  generateResetToken,
  storeResetToken,
  validateResetToken,
  sendEmail } from "../services/confirmation.js";

/**
 * Processes new user's data for signing up.
 * @param {Object} userData - New user's input data.
 * @param {string} userData.firstName - User's first name.
 * @param {string} userData.lastName - User's last name.
 * @param {string} userData.email - User's email.
 * @param {string} userData.password - User's password.
 */
async function signup(userData) {
  const { firstName, lastName, email, password } = userData;

  try {
    const usersArr = await fetchUsers();

    // Check if the user already exists
    const existingUser = usersArr?.find((user) => user.email === email);
    if (existingUser) throw new Error("User already exists");

    // Handle user authentication and password hashing
    await signupAuth(firstName, lastName, email, password, usersArr);
    const hashedPassword = await hashPassword(password);
    await validatePassword(password, hashedPassword);

    // Add new user to the database
    await addUser(firstName, lastName, email, hashedPassword);

    // Send confirmation email
    await sendConfirmationEmail(firstName, email);
  } catch (error) {
    console.error("Signup Error:", error.message);
    throw error; // Re-throw the error after logging it
  }
}

/**
 * Processes user's data for signing in.
 * @param {Object} userData - User's input data.
 * @param {string} userData.email - User's email.
 * @param {string} userData.password - User's password.
 * @returns {Object} - The user object if successful.
 */
async function signin(userData) {
  const { email, password } = userData;

  try {
    const usersArr = await fetchUsers();

    await signinAuth(email, password, usersArr);

    // Find the user in the database
    const user = usersArr.find((user) => user.email === email);
    if (!user) throw new Error("User not found");

    // Get the hashed password from the database
    const hashedPassword = await getUserPasswordFromDatabase(email);

    // Validate the password
    const isValidPassword = await validatePassword(password, hashedPassword);
    if (!isValidPassword) throw new Error("Invalid password");

    return user; // Return the user object if successful
  } catch (error) {
    console.error("Signin Error:", error.message);
    throw error; // Re-throw the error after logging it
  }
}

/**
 * Processes new user's data from Google Sign-Up.
 * @param {Object} userData - New user's data from Google.
 */
async function googleSignup(userData) {
  const { googleId, firstName, lastName, email } = userData;

  try {
    const usersArr = await fetchUsers();

    // Check if the user already exists
    const existingUser = usersArr?.find((user) => user.email === email);
    if (existingUser) {
      console.log("User already exists. Logging in with Google.");
      // Optionally, you could log the user in directly or throw an error
      return existingUser;
    }

    // Since the password is handled by Google, we don't need to store one here
    await addUser(firstName, lastName, email, null);

    // Send a welcome email
    await sendConfirmationEmail(firstName, email);

    console.log("Google signup successful for:", email);
  } catch (error) {
    console.error("Google Signup Error:", error.message);
    throw error; // Re-throw the error after logging it
  }
}

/**
 * Processes new user's data from LinkedIn Sign-Up.
 * @param {Object} userData - New user's data from LinkedIn.
 */
async function linkedinSignup(userData) {
  const { linkedinId, firstName, lastName, email } = userData;

  try {
    const usersArr = await fetchUsers();

    // Check if the user already exists
    const existingUser = usersArr?.find((user) => user.email === email);
    if (existingUser) {
      console.log("User already exists. Logging in with LinkedIn.");
      // Optionally, you could log the user in directly or throw an error
      return existingUser;
    }

    // Since the password is handled by LinkedIn, we don't need to store one here
    await addUser(firstName, lastName, email, null);

    // Send a welcome email
    await sendConfirmationEmail(firstName, email);

    console.log("LinkedIn signup successful for:", email);
  } catch (error) {
    console.error("LinkedIn Signup Error:", error.message);
    throw error; // Re-throw the error after logging it
  }
}

/**
 * Sends a password renewal request link to the user.
 * @param {Object} userData - User's input data.
 */
async function requestPasswordReset(userData) {
  const { email } = userData;

  try {
    const usersArr = await fetchUsers();

    // Check if the user exists in the database
    const user = usersArr.find((user) => user.email === email);
    if (!user) throw new Error("User not found");
    
    // Generate a unique token for password reset
    const resetToken = await generateResetToken(); // Assume this function exists and generates a token
    
    // Store the reset token in the database, associated with the user's email
    await storeResetToken(email, resetToken, usersArr); // Assume this function exists to store the token in the database

    // Generate a password reset link
    const resetLink = `http://localhost:3000/auth/reset-password?token=${resetToken}`;

    // Send the reset link to the user's email
    await sendEmail(email, "Password Reset Request", `Click the link to reset your password: ${resetLink}`);

    return "Password reset link has been sent to your email."; // Return a success message
  } catch (error) {
    console.error("RequestRenewPassword Error:", error.message);
    throw error; // Re-throw the error after logging it
  }
}

/**
 * Resets password for a user.
 * @param {Object} userData - User's input data.
 * @param {string} userData.email - User's email.
 * @param {string} userData.newPassword - The new password.
 * @param {string} userData.token - The reset token for verification.
 * @returns {string} - A message indicating the result of the operation.
 */
async function resetPassword(userData) {
  const { email, newPassword, token } = userData;

  try {
    const usersArr = await fetchUsers();

    // Find the user in the database
    const user = usersArr.find((user) => user.email === email);
    if (!user) throw new Error("User not found");

    // Check if the reset token is valid (this function should verify the token)
    const isValidToken = await validateResetToken(user, token); // Assume this function exists
    if (!isValidToken) throw new Error("Invalid or expired reset token");

    // Hash the new password
    const hashedNewPassword = await hashPassword(newPassword);

    // Update the user's password in the database
    await updateUserPasswordInDatabase(email, hashedNewPassword, usersArr);

    return "Password has been successfully updated."; // Return success message
  } catch (error) {
    console.error("RenewPassword Error:", error.message);
    throw error; // Re-throw the error after logging it
  }
}

/**
 * Confirms the user's email.
 * @param {string} email - User's email to confirm.
 */
async function confirm(email) {
  try {
    await confirmEmail(email);
  } catch (error) {
    console.error("Confirmation Error:", error.message);
    throw error; // Re-throw the error after logging it
  }
}

export { 
  signup,
  signin,
  confirm,
  googleSignup,
  linkedinSignup,
  requestPasswordReset,
  resetPassword
};
