import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  otp: String,
  otpExpires: Date,
  verified: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
