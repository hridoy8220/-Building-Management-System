import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AgreementRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  
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

  
  const handleAccept = async (request) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to accept this agreement?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, accept it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.put(`http://localhost:5000/api/agreements/accept/${request._id}`, {
          userEmail: request.userEmail,
          apartmentNo: request.apartmentNo,
        });

        Swal.fire("Accepted!", "Agreement has been accepted.", "success");
        fetchRequests();
      } catch (err) {
        Swal.fire("Error", "Failed to accept agreement", "error");
      }
    }
  };

  
  const handleReject = async (id) => {
    const confirm = await Swal.fire({
      title: "Reject Agreement?",
      text: "This user will remain as a normal user.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e74c3c",
      cancelButtonColor: "#95a5a6",
      confirmButtonText: "Yes, reject it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.put(`http://localhost:5000/api/agreements/reject/${id}`);
        Swal.fire("Rejected!", "Agreement has been rejected.", "success");
        fetchRequests();
      } catch (err) {
        Swal.fire("Error", "Failed to reject agreement", "error");
      }
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
