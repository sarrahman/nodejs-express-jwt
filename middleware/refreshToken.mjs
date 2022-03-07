import Users from "../models/Users.mjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({
        message: "No refresh token provided",
      });
    }
    const user = await Users.findOne({ refreshToken });
    if (!user) {
      return res.status(401).json({
        message: "Invalid refresh token",
      });
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({
          message: "Invalid refresh token",
        });
      }
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "15s",
        }
      );
      res.json({ token });
    });
  } catch (error) {
    console.log(error);
  }
};
