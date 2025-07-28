import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router'; // ✅ fixed import
import { AuthContext } from '../Auth/AuthContext';
import { updateProfile } from 'firebase/auth';
import axios from 'axios';

const Register = () => {
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    photo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, photo } = formData;

    const passwordValid = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(password);
    if (!passwordValid) {
      alert('Password must be at least 6 characters and include both uppercase and lowercase letters.');
      return;
    }

    try {
      // ✅ 1. Create user in Firebase
      const userCredential = await createUser(email, password);

      // ✅ 2. Update Firebase profile with name and photo
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: photo
      });

      // ✅ 3. Save to backend MongoDB
      await axios.post("http://localhost:5000/api/register", {
        name,
        email,
        photo,
        role: "user"
      });

      alert("User registered successfully!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Registration failed: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Create an Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Full Name</label>
            <input
              name="name"
              type="text"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              name="email"
              type="email"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Photo URL</label>
            <input
              name="photo"
              type="text"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Password</label>
            <input
              name="password"
              type="password"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md"
            />
            <p className="text-xs text-gray-500 mt-1">
              Must contain uppercase, lowercase, and be at least 6 characters.
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
