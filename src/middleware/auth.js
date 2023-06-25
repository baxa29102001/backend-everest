const jwt = require("jsonwebtoken");
const config = require("../../config/secrets");
const authMiddleWare = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  try {
    const decode = jwt.verify(token, config.JWT_SECRET);

    req.userId = decode.id;

    next();
  } catch (error) {
    return res.status(403).send("Forbidden");
  }
};

module.exports = authMiddleWare;
