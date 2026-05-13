import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./src/routes/auth.js";

dotenv.config();
const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.get("/api/health", (req, res) => res.json({ status: "OK" }));

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Connected to MongoDB");
  app.listen(process.env.PORT || 5000, () => console.log("Server running"));
});
