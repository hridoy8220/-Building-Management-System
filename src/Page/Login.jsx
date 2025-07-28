import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router'; // ✅ use react-router-dom
import { FaGoogle } from 'react-icons/fa';
import { AuthContext } from '../Auth/AuthContext';

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await signIn(formData.email, formData.password);
      alert('✅ Login successful!');
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('❌ Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Welcome Back</h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              name="email"
              type="email"
              placeholder="example@mail.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Password</label>
            <input
              name="password"
              type="password"
              placeholder="••••••"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {/* OR divider */}
        <div className="flex items-center gap-2 my-4">
          <div className="flex-grow h-px bg-gray-300" />
          <p className="text-gray-500 text-sm">OR</p>
          <div className="flex-grow h-px bg-gray-300" />
        </div>

        {/* Google Login (optional/future) */}
        <button
          disabled
          className="w-full border border-gray-300 py-2 rounded-md flex items-center justify-center gap-2 bg-gray-100 cursor-not-allowed"
        >
          <FaGoogle className="text-red-500 text-lg" />
          <span className="text-sm text-gray-700">Continue with Google (coming soon)</span>
        </button>

        {/* Register Redirect */}
        <p className="text-center mt-4 text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
