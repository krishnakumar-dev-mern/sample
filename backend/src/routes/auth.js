import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { sendEmail } from "../utils/sendEmail.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: "User already exists" });

  const hash = await bcrypt.hash(password, 10);
  const otp = String(Math.floor(100000 + Math.random() * 900000));

  const user = await User.create({
    email,
    password: hash,
    otp,
    otpExpires: new Date(Date.now() + 10 * 60 * 1000)
  });

  // await sendEmail(email, "Your OTP", `Your OTP is: ${otp}`);
  // res.json({ message: "OTP sent" });
  try {
  await sendEmail(email, otp);
} catch (error) {
  console.error("Email sending failed:", error);
  return res.status(500).json({
    message: "Failed to send OTP email",
  });
}
});

router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });
  if (!user || user.otp !== otp || user.otpExpires < new Date()) {
    return res.status(400).json({ message: "Invalid OTP" });
  }
  user.verified = true;
  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();
  res.json({ message: "Verified successfully" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.verified) {
    return res.status(400).json({ message: "Verify your account first" });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false
  });

  res.json({ message: "Login successful" });
});

router.get("/me", async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.userId).select("email");
  res.json(user);
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});

export default router;
