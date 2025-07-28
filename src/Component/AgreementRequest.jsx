import React, { useEffect, useState } from "react";
import axios from "axios";

const AgreementRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔵 Load pending requests
  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/agreements/pending");
      setRequests(res.data || []);
    } catch (err) {
      console.error("Error fetching requests", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // ✅ Accept agreement request
  const handleAccept = async (request) => {
    try {
      await axios.put(`http://localhost:5000/api/agreements/accept/${request._id}`, {
        userEmail: request.userEmail,
        apartmentNo: request.apartmentNo
      });
      alert("Accepted!");
      fetchRequests();
    } catch (err) {
      alert("Accept failed");
    }
  };

  // ❌ Reject agreement request
  const handleReject = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/agreements/reject/${id}`);
      alert("Rejected!");
      fetchRequests();
    } catch (err) {
      alert("Reject failed");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Agreement Requests</h2>
      {loading ? (
        <p>Loading...</p>
      ) : requests.length === 0 ? (
        <p>No pending requests</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Floor</th>
                <th className="p-2 border">Block</th>
                <th className="p-2 border">Room No</th>
                <th className="p-2 border">Rent</th>
                <th className="p-2 border">Applied At</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req._id} className="text-center">
                  <td className="p-2 border">{req.userName}</td>
                  <td className="p-2 border">{req.userEmail}</td>
                  <td className="p-2 border">{req.floor}</td>
                  <td className="p-2 border">{req.block}</td>
                  <td className="p-2 border">{req.apartmentNo}</td>
                  <td className="p-2 border">৳{req.rent}</td>
                  <td className="p-2 border">{new Date(req.appliedAt).toLocaleDateString()}</td>
                  <td className="p-2 border space-x-2">
                    <button
                      onClick={() => handleAccept(req)}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(req._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AgreementRequest;
