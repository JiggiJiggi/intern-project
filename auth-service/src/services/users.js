import fs from "fs/promises";
import path from "path";
import url from "url";
import userRole from "../models/role.js"; // Adjust the path to the role module

// Get the directory name of the current module file
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const usersDataJson = path.resolve(__dirname, "../models/usersData.json");
let usersArr = [];

/**
 * Fetches users from the database.
 * @returns {Promise<Array>} - The array of users.
 */
export async function fetchUsers() {
  try {
    const data = await fs.readFile(usersDataJson, "utf8");
    usersArr = JSON.parse(data);
    console.log("Users fetched:", usersArr);
    return usersArr;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Could not fetch users from database!");
  }
}

/**
 * Adds a new user to the database and updates usersArr.
 * @param {string} firstName - User's first name.
 * @param {string} lastName - User's last name.
 * @param {string} email - User's email.
 * @param {string} hashedPassword - User's hashed password.
 * @returns {Promise<Object>} - The newly added user.
 */
export async function addUser(firstName, lastName, email, hashedPassword) {
  try {
    const newUser = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: userRole.MENTEE,
      confirmed: false,
    };

    // Read existing data and update usersArr
    const data = await fs.readFile(usersDataJson, "utf8");
    const jsonData = JSON.parse(data);
    jsonData.push(newUser);

    // Write updated data back to file
    await fs.writeFile(
      usersDataJson,
      JSON.stringify(jsonData, null, 2),
      "utf8"
    );

    // Update the local usersArr
    usersArr.push(newUser);

    return newUser;
  } catch (error) {
    console.error("Error adding user:", error);
    throw new Error(`Error writing usersData.json: ${error.message}`);
  }
}

/**
 * Finds the password of a user in the usersArr.
 * @param {string} email - The email to search for.
 * @returns {string} - The password of the given email.
 * @throws {Error} - If user is not found.
 */
export function getUserPasswordFromDatabase(email) {
  const user = usersArr.find((u) => u.email === email);
  if (!user) {
    throw new Error("User not found");
  }
  return user.password;
}

/**
 * Checks if the user has confirmed their email.
 * @param {string} email - The email of the user to check.
 * @throws {Error} - If the user's email is not confirmed.
 */
export function isUserConfirmed(email) {
  const user = usersArr.find((u) => u.email === email);
  if (!user) {
    throw new Error("User not found");
  }
  if (!user.confirmed) {
    throw new Error("Account is not confirmed!");
  }
}

// Example function to update the user's password in the database
export async function updateUserPasswordInDatabase(email, hashedPassword, usersArr) {
  const userIndex = usersArr.findIndex(user => user.email === email);
  if (userIndex === -1) throw new Error("User not found in database");

  usersArr[userIndex].password = hashedPassword; // Update the password
  console.log(`Password updated for ${email}`);
  return Promise.resolve(); // Mocking a database operation
}

/**
 * Confirms the user's email.
 * @param {string} email - The email of the user to confirm.
 */
export async function confirmEmail(email) {
  try {
    // Read existing data and update usersArr
    const data = await fs.readFile(usersDataJson, "utf8");
    usersArr = JSON.parse(data);

    const user = usersArr.find((u) => u.email === email);
    if (!user) {
      throw new Error("User not found");
    }
    user.confirmed = true;

    // Write updated data back to file
    await fs.writeFile(
      usersDataJson,
      JSON.stringify(usersArr, null, 2),
      "utf8"
    );
  } catch (error) {
    console.error("Error confirming email:", error);
    throw new Error(`Error confirming email: ${error.message}`);
  }
}
