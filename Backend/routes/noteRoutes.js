const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteController");

// Notes routes
router.post("/notes", noteController.addNote);
router.get("/notes/:videoId", noteController.getNotesByVideo);
router.delete("/notes/:id", noteController.deleteNote);

module.exports = router;
