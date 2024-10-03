const nameRegex = /^[\p{L}]+$/u;
const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
const passwordRegex =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{}|;:,<.>]).{8,}$/;

/**
 * Authenticates user data for signing up.
 * @param firstName User's unique username.
 * @param email User's unique email.
 * @param password User's hashed password.
 * @param usersArr Array of the users in the database.
 */
export function signupAuth(firstName, lastName, email, password, usersArr) {
  const errors = [];

  if (
    firstName.length === 0 ||
    lastName.length === 0 ||
    email.length === 0 ||
    password.length === 0
  )
    errors.push("Missing data!");

  if (!nameRegex.test(firstName) || !nameRegex.test(lastName))
    errors.push("Name is not valid!");

  if (!emailRegex.test(email)) errors.push("Email is not valid!");

  if (usersArr.some((u) => u.email === email))
    errors.push("Email already exists!");

  if (!passwordRegex.test(password)) errors.push("Password is not valid!");

  if (errors.length > 0) throw new Error(errors);
}

export function signinAuth(email, password, usersArr) {
  const errors = [];

  if (email.length === 0 || password.length === 0) errors.push("Missing data!");

  if (!emailRegex.test(email)) errors.push("Email is not valid!");

  if (!usersArr.some((u) => u.email === email)) errors.push("Email doesn't exists!");

  if (errors.length > 0) throw new Error(errors);
}
