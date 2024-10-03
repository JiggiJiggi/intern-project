import { userRole, MENTEE, MENTOR } from "./role.js";

console.log(userRole.MENTEE); // "Mentee"
console.log(MENTOR); // "Mentor"

/**
 * User class representing a user in the system.
 */
class User {
  /**
   * Creates an instance of User.
   * @param {string} firstName - User's first name.
   * @param {string} lastName - User's last name.
   * @param {string} email - User's email address.
   * @param {string} password - User's password.
   */
  constructor(firstName, lastName, email, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.role = MENTEE; // Set default role to MENTEE
    this.confirmed = false; // Set default confirmation status
  }

  // Getters for user properties
  getFirstName() {
    return this.firstName;
  }

  getLastName() {
    return this.lastName;
  }

  getEmail() {
    return this.email;
  }

  getPassword() {
    return this.password;
  }

  getRole() {
    return this.role;
  }
}

export default User;
