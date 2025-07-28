import React, { useEffect, useState } from "react";
import axios from "axios";

const MannageMember = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔄 Fetch members with role = 'member'
  const fetchMembers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/members");
      setMembers(res.data);
    } catch (error) {
      console.error("Error fetching members", error);
    } finally {
      setLoading(false);
    }
  };

  // ❌ Remove member (update role to user)
  const handleRemove = async (email) => {
    const confirm = window.confirm("Are you sure to remove this member?");
    if (!confirm) return;

    try {
      await axios.put(`http://localhost:5000/api/users/downgrade/${email}`);
      alert("Member removed successfully.");
      // Refresh member list
      fetchMembers();
    } catch (error) {
      console.error("Remove failed", error);
      alert("Failed to remove member.");
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Members</h2>

      {loading ? (
        <p>Loading members...</p>
      ) : members.length === 0 ? (
        <p>No members found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded shadow">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member._id} className="border-t">
                  <td className="py-2 px-4">{member.name}</td>
                  <td className="py-2 px-4">{member.email}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleRemove(member.email)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Remove
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

export default MannageMember;
