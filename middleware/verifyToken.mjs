import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  const token = authorization.split(" ")[1];
  if (token === "null") {
    return res.status(401).json({
      message: "Invalid token",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        message: "Invalid token",
      });
    } 
    req.email = user.email;
    next();
  })
};
