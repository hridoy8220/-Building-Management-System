import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../Auth/AuthContext';
import { updateProfile } from 'firebase/auth';
import axios from 'axios';
import Swal from 'sweetalert2';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      toast.error('Password must contain uppercase, lowercase and be at least 6 characters.', {
        position: 'top-center',
      });
      return;
    }

    try {
      // Create user
      const userCredential = await createUser(email, password);

      // Update profile
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: photo
      });

      // Save to backend
      await axios.post("https://building-server-six.vercel.app/api/register", {
        name,
        email,
        photo,
        role: "user"
      });

      // SweetAlert Success
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'Welcome to the platform!',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Go to Home'
      }).then(() => {
        navigate("/");
      });

    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: error.response?.data?.message || error.message || 'Something went wrong.',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <ToastContainer />
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
