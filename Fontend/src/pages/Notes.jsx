import React, { useEffect, useState } from "react";
import { fetchNotes, addNote, deleteNote } from "../api/notesApi";

const Notes = ({ videoId }) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  // Load notes
  useEffect(() => {
    loadNotes();
  }, [videoId]);

  const loadNotes = async () => {
    try {
      const data = await fetchNotes(videoId);
      setNotes(data);
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  };

  // Add note
  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    try {
      await addNote(videoId, newNote);
      setNewNote("");
      loadNotes();
    } catch (err) {
      console.error("Error adding note:", err);
    }
  };

  // Delete note
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this note?")) return;
    try {
      await deleteNote(id);
      loadNotes();
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  return (
    <div className="mt-6 bg-white shadow p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Notes</h2>

      {/* Add Note Box */}
      <div className="mb-4">
        <textarea
          placeholder="Write your note..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          className="w-full border p-2 rounded mb-2"
          rows="3"
        />
        <button
          onClick={handleAddNote}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Add Note
        </button>
      </div>

      {/* Notes List */}
      {notes.length === 0 ? (
        <p className="text-gray-500">No notes yet.</p>
      ) : (
        <ul className="space-y-3">
          {notes.map((n) => (
            <li
              key={n._id}
              className="p-3 border rounded flex justify-between items-start"
            >
              <p>{n.content}</p>
              <button
                onClick={() => handleDelete(n._id)}
                className="text-red-600 text-sm hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notes;
