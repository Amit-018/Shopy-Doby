const JWT = require("jsonwebtoken");

// Use environment variables for secret keys
const secret = "cheen chapak dum dum"; // Replace with a strong default or use an environment variable

function createTokenForUser(user) {
  const payload = {
    _id: user._id, // Use _id to match MongoDB field
    fullName: user.fullName,
    email: user.email,
    role: user.role,
  };

  // Create a token with an expiration time
  const token = JWT.sign(payload, secret, { expiresIn: '1h' }); // Token expires in 1 hour

  return token;
}

function Validatetoken(token) {
  try {
    // Verify the token and return the payload
    const payload = JWT.verify(token, secret);
    return payload;
  } catch (error) {
    // Handle invalid or expired tokens
    throw new Error("Invalid or expired token");
  }
}

module.exports = {
  createTokenForUser,
  Validatetoken
};
