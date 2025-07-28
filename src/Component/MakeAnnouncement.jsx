import React, { useState } from "react";
import axios from "axios";

const MakeAnnouncement = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/announcements", {
        title,
        description,
        createdAt: new Date(),
      });

      alert("Announcement created successfully!");
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error(error);
      alert("Failed to create announcement.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 mt-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">📢 Make an Announcement</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter announcement title"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-1">Description</label>
          <textarea
            className="w-full border border-gray-300 rounded px-3 py-2"
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter announcement description"
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Posting..." : "Submit Announcement"}
        </button>
      </form>
    </div>
  );
};

export default MakeAnnouncement;
