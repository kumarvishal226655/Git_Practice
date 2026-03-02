import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";



dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("Library API Running 🚀");
});

app.use("/api/auth", authRoutes);

// Borrow feature started

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));