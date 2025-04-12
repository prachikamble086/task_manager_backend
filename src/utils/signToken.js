const jwt = require("jsonwebtoken");

function signtoken(userId) {
  return jwt.sign({ userId }, process.env.SECRET, { expiresIn: "7D" });
}

module.exports = { signtoken };
