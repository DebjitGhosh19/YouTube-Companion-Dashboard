const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  videoId: { type: String, required: true },
  userId: { type: String, required: true }, // you can store Google userId or session userId
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Note", noteSchema);
