import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageCupon = () => {
  const [coupons, setCoupons] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    discount: '',
    description: ''
  });

  // 🔄 Fetch all coupons
  const fetchCoupons = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/coupons');
      setCoupons(res.data);
    } catch (err) {
      console.error('Failed to fetch coupons', err);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  // 📩 Submit new coupon
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/coupons', formData);
      setShowModal(false);
      setFormData({ code: '', discount: '', description: '' });
      fetchCoupons(); // Refresh list
      alert("Coupon added successfully!");
    } catch (err) {
      alert("Failed to add coupon");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">🎟 Manage Coupons</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Add Coupon
        </button>
      </div>

      {/* 📋 Coupon Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 text-left">Coupon Code</th>
              <th className="p-3 text-left">Discount (%)</th>
              <th className="p-3 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <tr key={coupon._id} className="border-t">
                <td className="p-3">{coupon.code}</td>
                <td className="p-3">{coupon.discount}</td>
                <td className="p-3">{coupon.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🪟 Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-xl w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">➕ Add New Coupon</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Coupon Code"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                required
                className="w-full px-3 py-2 border rounded"
              />
              <input
                type="number"
                placeholder="Discount Percentage"
                value={formData.discount}
                onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                required
                className="w-full px-3 py-2 border rounded"
              />
              <textarea
                placeholder="Coupon Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                className="w-full px-3 py-2 border rounded"
              ></textarea>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCupon;
