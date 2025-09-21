// src/pages/Comments.jsx
import React, { useState, useEffect } from "react";
import { fetchComments, addComment, replyToComment, deleteComment } from "../api/commentApi.js";

const Comments = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    loadComments();
  }, [videoId]);

  const loadComments = async () => {
    const data = await fetchComments(videoId);
    setComments(data);
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    await addComment(videoId, newComment);
    setNewComment("");
    loadComments();
  };

  return (
    <div>
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button onClick={handleAddComment}>Comment</button>
      <ul>
        {comments.map((c) => (
          <li key={c.id}>{c.snippet.topLevelComment.snippet.textOriginal}</li>
        ))}
      </ul>
    </div>
  );
};

// ✅ Make sure to have this default export
export default Comments;
