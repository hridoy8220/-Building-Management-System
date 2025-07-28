import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Auth/AuthContext";
import axios from "axios";

const PaymentStory = () => {
  const { user } = useContext(AuthContext);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.email) return;

    const fetchPayments = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:5000/api/payments/user?email=${user.email}`
        );
        setPayments(res.data);
      } catch (err) {
        setError("Failed to load payments.");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [user]);

  if (!user) {
    return <p className="p-4">Please log in to see your payments.</p>;
  }

  if (loading) {
    return <p className="p-4">Loading payments...</p>;
  }

  if (error) {
    return <p className="p-4 text-red-600">{error}</p>;
  }

  if (payments.length === 0) {
    return <p className="p-4">No payment records found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h2 className="text-2xl font-semibold mb-4">Your Payment History</h2>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Month</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Amount (৳)</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Method</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Paid At</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(({ _id, month, amount, method, paidAt }) => (
            <tr key={_id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{month}</td>
              <td className="border border-gray-300 px-4 py-2">{amount}</td>
              <td className="border border-gray-300 px-4 py-2">{method}</td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(paidAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentStory;
