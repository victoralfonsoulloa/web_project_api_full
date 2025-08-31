const jwt = require("jsonwebtoken");

// Use development secret if NODE_ENV is not production
const JWT_SECRET =
  process.env.NODE_ENV === "production"
    ? process.env.JWT_SECRET
    : "dev-secret-key";

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization required" });
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = auth;
