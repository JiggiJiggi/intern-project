import crypto from "crypto";

/**
 * Hashes a plain password.
 * @param {string} password - User's plain password.
 * @returns {Promise<string>} - Hashed password
 */
export function hashPassword(password) {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString("hex");

    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) {
        return reject(`Password hashing: ${err.message}`);
      }

      resolve(`${salt}:${derivedKey.toString("hex")}`);
    });
  });
}

/**
 * Compares a hashed password with a plain password.
 * @param {string} plainPassword - User's plain password.
 * @param {string} hashedPassword - Hashed password from the database.
 * @returns {Promise<boolean>} - True if the passwords match.
 */
export function validatePassword(plainPassword, hashedPassword) {
  return new Promise((resolve, reject) => {
    const [salt, key] = hashedPassword.split(":");

    crypto.scrypt(plainPassword, salt, 64, (err, derivedKey) => {
      if (err) {
        return reject(new Error(`Password comparison: ${err.message}`));
      }

      const isValid = key === derivedKey.toString("hex");
      if (!isValid) {
        return reject(new Error("Passwords do not match!"));
      }

      resolve(true);
    });
  });
}
