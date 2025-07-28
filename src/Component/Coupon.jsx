import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Coupon = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/coupons')
      .then((res) => setCoupons(res.data))
      .catch((err) => {
        console.error('Failed to fetch coupons', err);
        setCoupons([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner text-blue-600"></span>
      </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-12 bg-gradient-to-r from-blue-100 to-blue-50 rounded-xl shadow-lg my-12">
      <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">Exclusive Coupons</h2>
      
      {coupons.length === 0 ? (
        <p className="text-center text-gray-500">No coupons available right now.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {coupons.map(({ _id, code, discount, description }) => (
            <div
              key={_id}
              className="bg-white border border-blue-300 rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full font-semibold tracking-wide">
                  {discount}% OFF
                </span>
                <span className="text-sm text-gray-500 italic">Code:</span>
              </div>
              <h3 className="text-2xl font-extrabold text-blue-700 mb-2">{code}</h3>
              <p className="text-gray-600">{description || "Use this coupon to save on your rent!"}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Coupon;
