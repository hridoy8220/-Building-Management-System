import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Auth/AuthContext";
import axios from "axios";

const MakePayment = () => {
  const { user } = useContext(AuthContext);
  const [agreement, setAgreement] = useState(null);
  const [coupon, setCoupon] = useState("");
  const [validCoupon, setValidCoupon] = useState(null);
  const [discountedRent, setDiscountedRent] = useState(null);
  const [month, setMonth] = useState("");
  const [allCoupons, setAllCoupons] = useState([]);
  const [alreadyPaid, setAlreadyPaid] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // ✅ Fetch agreement info
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/api/member-agreement?email=${user.email}`)
        .then((res) => {
          if (res.data) setAgreement(res.data);
        })
        .catch(() => alert("Failed to load agreement data."));
    }
  }, [user]);

  // ✅ Fetch coupons
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/coupons")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setAllCoupons(res.data);
        } else {
          setAllCoupons([]);
        }
      })
      .catch(() => console.log("Failed to load coupons"));
  }, []);

  // ✅ Check if already paid
  useEffect(() => {
    if (user?.email && month) {
      axios
        .get(
          `http://localhost:5000/api/payments/check?email=${user.email}&month=${month}`
        )
        .then((res) => {
          setAlreadyPaid(res.data.paid);
        })
        .catch(() => {
          setAlreadyPaid(false);
        });
    } else {
      setAlreadyPaid(false);
    }
  }, [user, month]);

  // ✅ Apply coupon
  const applyCoupon = () => {
    const found = allCoupons.find((c) => c.code === coupon.trim());
    if (!found) {
      alert("Invalid coupon code");
      return;
    }

    const discountAmount = (agreement.rent * found.discount) / 100;
    const newRent = agreement.rent - discountAmount;

    setValidCoupon(found);
    setDiscountedRent(newRent.toFixed(2));
  };

  // ✅ Submit payment
  const handlePayment = async (e) => {
    e.preventDefault();

    if (!month) return alert("Please select a month");
    if (alreadyPaid) return alert("You have already paid for this month");

    const paymentData = {
      userEmail: user.email,
      amount: discountedRent || agreement.rent,
      month,
      method: "Card",
    };

    try {
      await axios.post("http://localhost:5000/api/payments", paymentData);
      setPaymentSuccess(true);
      setCoupon("");
      setValidCoupon(null);
      setDiscountedRent(null);
      setAlreadyPaid(true);
    } catch {
      alert("❌ Payment failed");
    }
  };

  // ✅ Show loading
  if (!agreement)
    return <p className="p-6 text-gray-500">Loading agreement info...</p>;

  // ✅ Success page
  if (paymentSuccess) {
    return (
      <div className="max-w-xl mx-auto bg-white p-6 mt-8 rounded shadow text-center">
        <h2 className="text-3xl font-bold mb-4 text-green-600">Payment Successful</h2>
        <p className="mb-6">
          You have successfully paid your rent for <strong>{month}</strong>.
        </p>
        <button
          className="btn btn-primary"
          onClick={() => {
            setPaymentSuccess(false);
            setAlreadyPaid(false);
            setMonth("");
          }}
        >
          Make Another Payment
        </button>
      </div>
    );
  }

  // ✅ Payment form
  return (
    <div className="max-w-xl mx-auto bg-white p-6 mt-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Make Payment</h2>

      <form onSubmit={handlePayment} className="space-y-4">
        <div>
          <label>Email</label>
          <input
            type="text"
            readOnly
            value={user.email}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label>Floor</label>
          <input
            type="text"
            readOnly
            value={agreement.floor}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label>Block</label>
          <input
            type="text"
            readOnly
            value={agreement.block}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label>Room No</label>
          <input
            type="text"
            readOnly
            value={agreement.apartmentNo}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label>Rent (৳)</label>
          <input
            type="text"
            readOnly
            value={discountedRent || agreement.rent}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label>Month</label>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="input input-bordered w-full"
          >
            <option value="">Select a month</option>
            {[
              "January", "February", "March", "April", "May", "June",
              "July", "August", "September", "October", "November", "December"
            ].map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Coupon Code</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter coupon code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="input input-bordered w-full"
              disabled={alreadyPaid}
            />
            <button
              type="button"
              onClick={applyCoupon}
              className="btn btn-secondary"
              disabled={alreadyPaid}
            >
              Apply
            </button>
          </div>

          {allCoupons.length > 0 && (
            <div className="mt-2 p-2 border rounded bg-gray-50 max-h-32 overflow-auto">
              <p className="font-semibold mb-1">Available Coupons:</p>
              <ul className="text-sm text-gray-700">
                {allCoupons.map((c) => (
                  <li key={c._id} className="mb-1">
                    <strong>{c.code}</strong> — {c.discount}% off
                  </li>
                ))}
              </ul>
            </div>
          )}

          {validCoupon && (
            <p className="text-green-600 mt-2">
              Coupon "{validCoupon.code}" applied! Discount: {validCoupon.discount}%
            </p>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={alreadyPaid}
        >
          Pay
        </button>

        {alreadyPaid && (
          <p className="text-red-600 mt-2 font-semibold">
            You have already paid for this month.
          </p>
        )}
      </form>
    </div>
  );
};

export default MakePayment;
