// Define user roles and freeze the object to prevent modifications
const userRole = Object.freeze({
  MENTEE: "Mentee",
  MENTOR: "Mentor",
});

// // Exporting the userRole object
export default userRole;

// // Exporting individual roles
// export const { MENTEE, MENTOR } = userRole;
