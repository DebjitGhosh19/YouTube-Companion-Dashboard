import axios from "axios";

const API_BASE = "https://youtube-companion-dashboard-8gg0.onrender.com";

export const fetchNotes = async (videoId) => {
  const res = await axios.get(`${API_BASE}/notes/${videoId}`, {
    withCredentials: true,
  });
  return res.data.notes;
};

export const addNote = async (videoId, content) => {
  const res = await axios.post(
    `${API_BASE}/notes`,
    { videoId, content },
    { withCredentials: true }
  );
  return res.data;
};

export const deleteNote = async (id) => {
  const res = await axios.delete(`${API_BASE}/notes/${id}`, {
    withCredentials: true,
  });
  return res.data;
};
