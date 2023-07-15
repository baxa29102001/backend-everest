const jwt = require("jsonwebtoken");
const config = require("../config/secrets");

const generateTokens = (user) => {
  const refreshToken = jwt.sign({ id: user._id }, "bohodir", {
    expiresIn: "7d",
  });
  const accessToken = jwt.sign({ id: user._id }, "bohodir29102001<>", {
    expiresIn: "1h",
  });
  return { refreshToken, accessToken };
};

module.exports = generateTokens;
