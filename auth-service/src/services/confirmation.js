import dotenv from "dotenv";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

// Load environment variables from .env file
dotenv.config({ path: "../../.env" });

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: "Gmail", // You can use other services like 'smtp.example.com'
  auth: {
    user: process.env.EMAIL, // Your email address
    pass: process.env.PASS, // Your email password or app-specific password
  },
});

/**
 * Sends a confirmation email to the user.
 * @param {string} firstName - User's first name.
 * @param {string} email - User's email address.
 */
export async function sendConfirmationEmail(firstName, email) {
  try {
    // Generate a JWT token
    const token = jwt.sign(
      { email },
      process.env.JWTSECRET, // Secret for JWT
      { expiresIn: "1h" } // Token expiration time
    );

    // URL for email confirmation
    const url = `http://localhost:3000/auth/confirmation/${token}`;

    // HTML message to be sent
    const message = `
            <h1>Email Confirmation</h1>
            <p>Hi ${firstName},</p>
            <p>Thank you for registering at CrackInterview. Please confirm your email by clicking the link below:</p>
            <a href="${url}">Confirm Email</a>
            <p>This link will expire in 1 hour.</p>
        `;

    // Send email
    await transporter.sendMail({
      from: "No Reply <noreply@crackinterview.com>", // Sender email
      to: email, // Recipient email
      subject: "Confirm Email", // Subject line
      html: message, // HTML body content
    });

    console.log("Confirmation email sent to", email);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

export async function generateResetToken() {
  const payload = { purpose: "password-reset" }; // Define the purpose of the token
  const secret = process.env.JWTSECRET; // Get the secret key from environment variables
  const options = { expiresIn: '1h' }; // Set token to expire in 1 hour

  if (!secret) throw new Error("JWT secret is not defined");

  return jwt.sign(payload, secret, options);
}

export async function storeResetToken(email, token, usersArr) {
  // Example: Store token in a database (This is just a placeholder for demonstration)
  // Replace this with actual database storage logic
  const ind = usersArr.findIndex(user => user.email === email);
  usersArr[ind].resetToken = token;
  console.log(`Stored reset token for ${email}: ${token}`);
  return Promise.resolve();
}

export async function validateResetToken(user, token) {
  // Implement logic to validate the reset token
  // This could involve checking against stored tokens in a database
  // For this example, assume tokens are stored and this function checks for validity
  //const user = await fetchUserByEmail(email); // Assume this fetches a user by email
  const storedToken = user.resetToken; // Example, assuming a `resetToken` field
  if (storedToken !== token) return false;
  // Additional checks (e.g., expiration) can be implemented here
  return true;
}

export async function sendEmail(to, subject, body) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: subject,
    text: body,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error.message);
    throw error;
  }
}