const { google } = require("googleapis");
const { oauth2Client } = require("../config/googleConfig");

// Get YouTube client
const youtube = google.youtube("v3");

// 📌 GET /video/:id → Fetch video details
exports.getVideoDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await youtube.videos.list({
      auth: oauth2Client,
      part: "snippet,statistics",
      id,
    });

    if (!response.data.items.length) {
      return res.status(404).json({ error: "Video not found" });
    }

    res.json(response.data.items[0]);
  } catch (err) {
    console.error("Error fetching video:", err);
    res.status(500).json({ error: "Failed to fetch video details" });
  }
};

// 📌 PATCH /video/:id → Update title/description
exports.updateVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const response = await youtube.videos.update({
      auth: oauth2Client,
      part: "snippet",
      requestBody: {
        id,
        snippet: {
          title,
          description,
          categoryId: "22", // People & Blogs (required)
        },
      },
    });

    res.json({ message: "Video updated", video: response.data });
  } catch (err) {
    console.error("Error updating video:", err);
    res.status(500).json({ error: "Failed to update video" });
  }
};

// 📌 POST /video/:id/comment → Add comment
exports.addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    const response = await youtube.commentThreads.insert({
      auth: oauth2Client,
      part: "snippet",
      requestBody: {
        snippet: {
          videoId: id,
          topLevelComment: {
            snippet: {
              textOriginal: text,
            },
          },
        },
      },
    });

    res.json({ message: "Comment added", comment: response.data });
  } catch (err) {
    console.error("Error adding comment:", err);
    res.status(500).json({ error: "Failed to add comment" });
  }
};

// 📌 POST /video/:id/comment/:commentId/reply → Reply to comment
exports.replyToComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;

    const response = await youtube.comments.insert({
      auth: oauth2Client,
      part: "snippet",
      requestBody: {
        snippet: {
          parentId: commentId,
          textOriginal: text,
        },
      },
    });

    res.json({ message: "Reply added", reply: response.data });
  } catch (err) {
    console.error("Error replying to comment:", err);
    res.status(500).json({ error: "Failed to reply to comment" });
  }
};

// 📌 DELETE /video/:id/comment/:commentId → Delete comment
exports.deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    await youtube.comments.delete({
      auth: oauth2Client,
      id: commentId,
    });

    res.json({ message: "Comment deleted" });
  } catch (err) {
    console.error("Error deleting comment:", err);
    res.status(500).json({ error: "Failed to delete comment" });
  }
};
// 📌 GET /video/:id/comments → Fetch all comments
exports.getComments = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await youtube.commentThreads.list({
      auth: oauth2Client,
      part: "snippet",
      videoId: id,
      maxResults: 20,
    });

    res.json({ comments: response.data.items });
  } catch (err) {
    console.error("Error fetching comments:", err);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};
