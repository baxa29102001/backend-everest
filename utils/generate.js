const jwt = require("jsonwebtoken");
const config = require("../config/secrets");

const generateTokens = (user) => {
  const refreshToken = jwt.sign({ id: user._id }, config.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
  const accessToken = jwt.sign({ id: user._id }, config.JWT_SECRET, {
    expiresIn: "1h",
  });
  return { refreshToken, accessToken };
};

module.exports = generateTokens;
