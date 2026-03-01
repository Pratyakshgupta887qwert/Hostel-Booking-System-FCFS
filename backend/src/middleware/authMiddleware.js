import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Access denied. Invalid token." });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Session expired. Please login again." });
    }

    return res.status(401).json({ message: "Invalid token." });
  }
};

export const requireStudent = (req, res, next) => {
  if (!req.user || req.user.type !== "student") {
    return res.status(403).json({ message: "Access denied. Students only." });
  }
  next();
};

export const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.type !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};

export const requireMainAdmin = (req, res, next) => {
  if (
    !req.user ||
    req.user.type !== "admin" ||
    req.user.role !== "main_admin"
  ) {
    return res.status(403).json({ message: "Access denied. Main admin only." });
  }
  next();
};
