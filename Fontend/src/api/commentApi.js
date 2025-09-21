import axios from "axios";

const API_BASE = "http://localhost:5000";

export const fetchComments = async (videoId) => {
  const res = await axios.get(`${API_BASE}/video/${videoId}/comments`, { withCredentials: true });
  return res.data.comments;
};

export const addComment = async (videoId, text) => {
  const res = await axios.post(
    `${API_BASE}/video/${videoId}/comment`,
    { text },
    { withCredentials: true }
  );
  return res.data;
};

export const replyToComment = async (videoId, commentId, text) => {
  const res = await axios.post(
    `${API_BASE}/video/${videoId}/comment/${commentId}/reply`,
    { text },
    { withCredentials: true }
  );
  return res.data;
};

export const deleteComment = async (videoId, commentId) => {
  const res = await axios.delete(`${API_BASE}/video/${videoId}/comment/${commentId}`, {
    withCredentials: true,
  });
  return res.data;
};
