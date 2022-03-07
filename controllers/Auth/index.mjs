import bcrypt from "bcrypt";
import Users from "../../models/Users.mjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const RegisterApi = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = {
    firstName,
    lastName,
    email,
    password: hash,
    refreshToken: "",
  };
  const newUser = new Users(user);
  try {
    newUser.save();
    res.status(200).json({
      message: "Register Success",
    });
  } catch (error) {
    res.status(500).json({
      message: "Register Failed",
    });
  }
};

export const LoginApi = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Password incorrect",
      });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "15s",
      }
    );
    const refreshToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    });
    await Users.findByIdAndUpdate(user._id, { refreshToken });
    res.status(200).json({
      message: "Login Success",
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Login Failed",
      error,
    });
  }
};

export const logoutApi = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({
      message: "No refresh token provided",
    });
  }
  try {
    const user = await Users.findOne({ refreshToken });
    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }
    await Users.findByIdAndUpdate(user._id, { refreshToken: "" });
    res.clearCookie("refreshToken");
    return res.status(200).json({
      message: "Logout Success",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Logout Failed",
      error,
    });
  }
};
