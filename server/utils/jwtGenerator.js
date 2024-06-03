const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(user_id, roleIds) {
  const payload = {
    user_id,
    roles: roleIds,
  };

  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1h" });
}

module.exports = jwtGenerator;
