const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const getRoleNamesFromIds = require("../utils/getRoleNames");
dotenv.config();

// Helper function to check if the user has one of the allowed roles
const hasAllowedRole = (userRoles, allowedRoles) => {
  return allowedRoles.some((role) => userRoles.includes(role));
};

module.exports = (allowedRoles) => async (req, res, next) => {
  // Get the token from the headers
  const authorizationHeader = req.header("Authorization");

  const token = authorizationHeader.split(" ")[1];

  // If there's no token, return a 403 error
  if (!token) {
    return res.status(403).json({ msg: "Authorization denied" });
  }

  // Try to verify the token
  try {
    // Verify the token with the secret key
    const decoded = jwt.verify(token, process.env.jwtSecret);

    const userRoleNames = await getRoleNamesFromIds(decoded.roles);

    // Check if the user has any of the allowed roles
    if (!hasAllowedRole(userRoleNames, allowedRoles)) {
      return res.status(403).json({ msg: "Access denied" });
    }

    // Store user information in the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // If the token is invalid, return a 401 error
    res.status(401).json({
      msg: "Token is not valid",
    });
  }
};
