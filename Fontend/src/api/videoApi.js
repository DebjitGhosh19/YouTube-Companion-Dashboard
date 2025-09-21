import axios from "axios";

const API_BASE = "https://youtube-companion-dashboard-8gg0.onrender.com"; // backend server

export const getVideoDetails = async (videoId) => {
  const res = await axios.get(`${API_BASE}/video/${videoId}`, {
    withCredentials: true,
  });
  return res.data;
};

export const updateVideo = async (videoId, data) => {
  const res = await axios.patch(`${API_BASE}/video/${videoId}`, data, {
    withCredentials: true,
  });
  return res.data;
};
