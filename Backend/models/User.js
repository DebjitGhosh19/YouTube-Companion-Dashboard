const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  email: { type: String },
  name: { type: String },
  accessToken: { type: String },
  refreshToken: { type: String },
  tokenExpiry: { type: Date },
});

module.exports = mongoose.model("User", userSchema);
