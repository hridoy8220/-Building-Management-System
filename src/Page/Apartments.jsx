import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { AuthContext } from "../Auth/AuthContext";

const Apartments = () => {
  const [apartments, setApartments] = useState([]);
  const [page, setPage] = useState(1);
  const [minRent, setMinRent] = useState("");
  const [maxRent, setMaxRent] = useState("");
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userHasAgreement, setUserHasAgreement] = useState(false);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const limit = 6;

  const fetchApartments = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://building-server-six.vercel.app/api/apartments", {
        params: {
          page,
          min: minRent || 0,
          max: maxRent || Infinity,
        },
      });
      setApartments(res.data.apartments);
      setTotal(res.data.total);
    } catch (err) {
      console.error("Error fetching apartments:", err);
    } finally {
      setLoading(false);
    }
  };

  const checkUserAgreement = async () => {
    if (!user?.email) return;
    try {
      const res = await axios.get("https://building-server-six.vercel.app/api/agreements", {
        params: { email: user.email },
      });
      if (res.data?.agreement) {
        setUserHasAgreement(true);
      } else {
        setUserHasAgreement(false);
      }
    } catch (err) {
      console.error("Agreement check error:", err);
    }
  };

  useEffect(() => {
    fetchApartments();
  }, [page]);

  useEffect(() => {
    checkUserAgreement();
  }, [user]);

  const handleSearch = () => {
    setPage(1);
    fetchApartments();
  };

  const handleAgreement = async (apt) => {
    if (!user) return navigate("/login");

    try {
      await axios.post("https://building-server-six.vercel.app/api/agreements", {
        userName: user.displayName || user.name || "User",
        userEmail: user.email,
        floor: apt.floor,
        block: apt.block,
        apartmentNo: apt.apartmentNo,
        rent: apt.rent,
      });
      alert("Agreement submitted!");
      setUserHasAgreement(true);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit agreement");
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {userHasAgreement && (
        <marquee className="text-red-600 text-lg font-semibold mb-6">
          You have already made an agreement!
        </marquee>
      )}

      {/* Search Filter */}
      <div className="flex gap-2 mb-6">
        <input
          type="number"
          placeholder="Min Rent"
          value={minRent}
          onChange={(e) => setMinRent(e.target.value)}
          className="border px-2 py-1 rounded w-28"
        />
        <input
          type="number"
          placeholder="Max Rent"
          value={maxRent}
          onChange={(e) => setMaxRent(e.target.value)}
          className="border px-2 py-1 rounded w-28"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Search
        </button>
      </div>

      {/* Apartment Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p>Loading...</p>
        ) : (
          apartments.map((apt) => (
            <div
              key={apt._id}
              className="bg-white border rounded shadow-md overflow-hidden"
            >
              <img src={apt.image} className="w-full h-48 object-cover" />
              <div className="p-4 space-y-1">
                <h3 className="text-lg font-bold">Apt #{apt.apartmentNo}</h3>
                <p>Floor: {apt.floor}</p>
                <p>Block: {apt.block}</p>
                <p>Rent: ৳{apt.rent}</p>
                <button
                  onClick={() => handleAgreement(apt)}
                  disabled={userHasAgreement}
                  className={`mt-2 px-3 py-1 rounded w-full ${
                    userHasAgreement
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  {userHasAgreement ? "Already Applied" : "Apply for Agreement"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 border rounded ${
              page === i + 1 ? "bg-blue-500 text-white" : "bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Apartments;
