import { useEffect, useState } from "react";
import axios from "axios";

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/announcements");
        setAnnouncements(res.data || []);
      } catch (error) {
        console.error("Failed to fetch announcements", error);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
        📢 All Announcements
      </h2>

      {announcements.length === 0 ? (
        <p className="text-gray-500 text-center">No announcements found.</p>
      ) : (
        <div className="space-y-6">
          {announcements.map((a) => (
            <div key={a._id} className="bg-white shadow-md border rounded p-5">
              <h3 className="text-xl font-semibold text-blue-800">{a.title}</h3>
              <p className="text-gray-700 mt-2 whitespace-pre-line">{a.description}</p>
              <p className="text-sm text-gray-400 mt-2">
                Published: {new Date(a.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Announcement;
