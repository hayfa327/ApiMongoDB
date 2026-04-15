import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // REVIEW: Debug console.log left in production code — remove to avoid leaking token data in logs
    console.log("DECODED:", decoded);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

const isAdmin = (req, res, next) => {
  // REVIEW: Debug console.log left in production code — remove to avoid leaking user data in logs
  console.log("REQ.USER:", req.user);

  if (!req.user || req.user.role?.trim().toLowerCase() !== "admin") {
    return res.status(403).json({ message: "Access denied. Admin only" });
  }

  next();
};

export { auth, isAdmin };
