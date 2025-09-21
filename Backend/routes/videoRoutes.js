const express = require("express");
const router = express.Router();
const videoController = require("../controllers/videoController");
const authMiddleware = require("../middleware/authMiddleware");

// All routes require authentication
router.get("/video/:id", authMiddleware, videoController.getVideoDetails);
router.patch("/video/:id", authMiddleware, videoController.updateVideo);
router.post("/video/:id/comment", authMiddleware, videoController.addComment);
router.post(
  "/video/:id/comment/:commentId/reply",
  authMiddleware,
  videoController.replyToComment
);
router.delete(
  "/video/:id/comment/:commentId",
  authMiddleware,
  videoController.deleteComment
);
router.get("/video/:id/comments", authMiddleware, videoController.getComments);


module.exports = router;
