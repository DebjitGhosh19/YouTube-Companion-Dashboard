const express = require("express");
const session = require("express-session");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const videoRoutes = require("./routes/videoRoutes");
const noteRoutes = require("./routes/noteRoutes");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Routes
app.use("/", authRoutes);
app.use("/", videoRoutes);
app.use("/", noteRoutes);
// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("Mongo Error:", err));

module.exports = app;
