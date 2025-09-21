const Note = require("../models/noteModel");

// 📌 POST /notes → Add note
exports.addNote = async (req, res) => {
  try {
const { videoId, content } = req.body;
const userId = req.session.userId; // trust session


    if (!videoId || !userId || !content) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const note = new Note({ videoId, userId, content });
    await note.save();

    res.status(201).json({ message: "Note added", note });
  } catch (err) {
    console.error("Error adding note:", err);
    res.status(500).json({ error: "Failed to add note" });
  }
};

// 📌 GET /notes/:videoId → Get all notes for a video
exports.getNotesByVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    const notes = await Note.find({ videoId }).sort({ createdAt: -1 });

    res.json({ notes });
  } catch (err) {
    console.error("Error fetching notes:", err);
    res.status(500).json({ error: "Failed to fetch notes" });
  }
};

// 📌 DELETE /notes/:id → Delete note
exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findByIdAndDelete(id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json({ message: "Note deleted" });
  } catch (err) {
    console.error("Error deleting note:", err);
    res.status(500).json({ error: "Failed to delete note" });
  }
};
