import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Auth/AuthContext';
import axios from 'axios';

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const [role, setRole] = useState('');
  const [agreement, setAgreement] = useState(null);
  const [adminInfo, setAdminInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRoleAndData = async () => {
      if (!user?.email) return;

      try {
        // 1. Get user role
        const roleRes = await axios.get(`https://building-server-six.vercel.app/api/user-role`, {
          params: { email: user.email }
        });
        setRole(roleRes.data.role);

        // 2. If member, fetch agreement
        if (roleRes.data.role === 'member') {
          const agreementRes = await axios.get(`https://building-server-six.vercel.app/api/member-agreement`, {
            params: { email: user.email }
          });
          setAgreement(agreementRes.data || null);
        }

        // 3. If admin, fetch admin dashboard info
        if (roleRes.data.role === 'admin') {
          const adminRes = await axios.get(`https://building-server-six.vercel.app/api/admin-dashboard-info`);
          setAdminInfo(adminRes.data);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRoleAndData();
  }, [user]);

  if (loading) return <p className="p-6">Loading profile...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">👤 My Profile</h2>

      <div className="space-y-3 mb-6">
        {user?.photoURL && (
          <img src={user.photoURL} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
        )}
        <div><strong>Name:</strong> {user?.displayName || 'N/A'}</div>
        <div><strong>Email:</strong> {user?.email}</div>
        <div><strong>Role:</strong> {role}</div>
      </div>

      {/* 🔷 Member Info */}
      {role === 'member' && (
        <div className="space-y-2">
          <h3 className="text-xl font-semibold mb-2 text-green-600">🏠 Member Agreement Info</h3>
          <div><strong>Agreement Date:</strong> {agreement ? new Date(agreement.appliedAt).toLocaleDateString() : 'None'}</div>
          <div><strong>Floor:</strong> {agreement?.floor || 'None'}</div>
          <div><strong>Block:</strong> {agreement?.block || 'None'}</div>
          <div><strong>Apartment No:</strong> {agreement?.apartmentNo || 'None'}</div>
          <div><strong>Rent:</strong> {agreement ? `৳${agreement.rent}` : 'None'}</div>
        </div>
      )}

      {/* 🟡 Admin Info */}
      {role === 'admin' && adminInfo && (
        <div className="space-y-2">
          <h3 className="text-xl font-semibold mb-2 text-purple-600">📊 Admin Dashboard Info</h3>
          <div><strong>Total Rooms:</strong> {adminInfo.totalRooms}</div>
          <div><strong>Available Rooms:</strong> {adminInfo.availablePercentage}%</div>
          <div><strong>Unavailable Rooms (Agreed):</strong> {adminInfo.unavailablePercentage}%</div>
          <div><strong>Total Users:</strong> {adminInfo.totalUsers}</div>
          <div><strong>Members:</strong> {adminInfo.totalMembers}</div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
