import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const MannageMember = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔄 Fetch members with role = 'member'
  const fetchMembers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://building-server-six.vercel.app/api/members");
      setMembers(res.data);
    } catch (error) {
      console.error("Error fetching members", error);
      Swal.fire("Error", "Failed to fetch members", "error");
    } finally {
      setLoading(false);
    }
  };

  // ❌ Remove member (update role to user)
  const handleRemove = async (email) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to remove this member?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await axios.put(`https://building-server-six.vercel.app/api/users/downgrade/${email}`);
        Swal.fire("Removed!", "Member removed successfully.", "success");
        // Refresh member list
        fetchMembers();
      } catch (error) {
        console.error("Remove failed", error);
        Swal.fire("Error", "Failed to remove member.", "error");
      }
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
