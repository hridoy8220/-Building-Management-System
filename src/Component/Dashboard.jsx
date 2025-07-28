import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router";
import { AuthContext } from "../Auth/AuthContext";
import {
  FaUser, FaBullhorn, FaCreditCard, FaListAlt,
  FaHome, FaUsers, FaMoneyBillWave, FaArrowLeft
} from "react-icons/fa";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user?.email) return;
      try {
        const res = await fetch(`http://localhost:5000/api/users/${user.email}`);
        const data = await res.json();
        setRole(data.role);
      } catch (error) {
        console.error("Failed to fetch user role", error);
      }
    };
    fetchUserRole();
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-800 text-white p-5 space-y-4">
        <h1 className="text-2xl font-bold text-center mb-6">🏢 Dashboard</h1>

        <nav className="space-y-2">
          <Link to="/dashboard/profile" className="block hover:bg-blue-700 p-2 rounded flex items-center gap-2">
            <FaUser /> My Profile
          </Link>

          <Link to="/dashboard/announcements" className="block hover:bg-blue-700 p-2 rounded flex items-center gap-2">
            <FaBullhorn /> Announcements
          </Link>

          {/* Member Routes */}
          {role === "member" && (
            <>
              <Link to="/dashboard/make-payment" className="block hover:bg-blue-700 p-2 rounded flex items-center gap-2">
                <FaCreditCard /> Make Payment
              </Link>
              <Link to="/dashboard/payment-history" className="block hover:bg-blue-700 p-2 rounded flex items-center gap-2">
                <FaListAlt /> Payment History
              </Link>
            </>
          )}

          {/* Admin Routes */}
          {role === "admin" && (
            <>
              <Link to="/dashboard/manage-members" className="block hover:bg-blue-700 p-2 rounded flex items-center gap-2">
                <FaUsers /> Manage Members
              </Link>
              <Link to="/dashboard/agreementRequest" className="block hover:bg-blue-700 p-2 rounded flex items-center gap-2">
                <FaHome /> Agreement Requests
              </Link>
              <Link to="/dashboard/manage-coupons" className="block hover:bg-blue-700 p-2 rounded flex items-center gap-2">
                <FaMoneyBillWave /> Manage Coupons
              </Link>
              <Link to="/dashboard/make-announcement" className="block hover:bg-blue-700 p-2 rounded flex items-center gap-2">
                <FaBullhorn /> Make Announcement
              </Link>
            </>
          )}
        </nav>

        <div className="mt-10">
          <Link to="/" className="flex items-center gap-2 text-sm hover:underline">
            <FaArrowLeft /> Back to Home
          </Link>
          <button
            onClick={handleLogout}
            className="mt-4 w-full bg-red-500 hover:bg-red-600 p-2 rounded text-white text-sm"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
