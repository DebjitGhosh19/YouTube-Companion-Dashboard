import React, { useEffect, useState } from "react";
import { getVideoDetails, updateVideo } from "../api/videoApi";
import Comments from "./Comments.jsx"; // ✅ Import Comments component
import Notes from "./Notes";
import { useParams } from "react-router-dom";

const VideoDetails = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [form, setForm] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load video details
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const data = await getVideoDetails(id);
        setVideo(data);
        setForm({
          title: data.snippet.title,
          description: data.snippet.description,
        });
      } catch (err) {
        console.error("Error fetching video:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVideo();
  }, [videoId]);

  // Handle form update
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Save changes
  const handleSave = async () => {
    try {
      setSaving(true);
      const updated = await updateVideo(videoId, form);
      alert("Video updated successfully!");
      setVideo(updated.video);
    } catch (err) {
      console.error("Error updating video:", err);
      alert("Failed to update video.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="p-4">Loading video...</p>;

  if (!video) return <p className="p-4 text-red-600">Video not found</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Video Details</h1>

      {/* Video Player Preview */}
      <div className="mb-4">
        <iframe
          width="100%"
          height="315"
          src={`https://www.youtube.com/embed/${video.id}`}
          title={video.snippet.title}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>

      {/* Stats */}
      <div className="mb-4 text-gray-700">
        <p><strong>Views:</strong> {video.statistics?.viewCount}</p>
        <p><strong>Likes:</strong> {video.statistics?.likeCount}</p>
        <p><strong>Comments:</strong> {video.statistics?.commentCount}</p>
      </div>

      {/* Editable Form */}
      <div className="mb-4">
        <label className="block font-semibold">Title</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full border rounded p-2 mt-1"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border rounded p-2 mt-1"
          rows="5"
        />
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>

      {/* ✅ Comments Section */}
      <Comments videoId={video.id} />
      {/* Inside return of VideoDetails (below Comments) */}
      <Notes videoId={video.id} />
    </div>
  );
};

export default VideoDetails;
