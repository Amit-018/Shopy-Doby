const { Validatetoken } = require("../services/authenication");

function CheckForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    // Retrieve the token from cookies
    const tokenCookie = req.cookies[cookieName];

    if (!tokenCookie) {
      // If no token is found, continue to the next middleware
      return next();
    }

    try {
      // Validate the token and attach user payload to the request
      const userPayload = Validatetoken(tokenCookie);
      req.user = userPayload;
    } catch (error) {
      // Log the error for debugging purposes
      console.error("Token validation failed:", error.message);
    }

    // Continue to the next middleware or route handler
    return next();
  };
}

module.exports = {
  CheckForAuthenticationCookie
};
