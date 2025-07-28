import { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router'; 
import { FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import { AuthContext } from '../Auth/AuthContext';
import photo from '../assets/Bannerphotos/logo.jpg';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation(); // ✅ get current location

  const handleLogout = async () => {
    try {
      await logout();
      alert('Logged out!');
    } catch (error) {
      alert('Logout failed');
    }
  };

  // ✅ Hide navbar on any dashboard route
  if (location.pathname.startsWith('/dashboard')) {
    return null;
  }

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo & Brand */}
        <div className="flex items-center gap-2 text-2xl font-bold">
          <img src={ photo} alt="Logo" className="h-9 w-9 rounded-full shadow-md" />
          <span className="tracking-wider">OneBuilding</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-white font-medium">
          <Link to="/" className="hover:text-yellow-300 transition">Home</Link>
          <Link to="/apartments" className="hover:text-yellow-300 transition">Apartments</Link>
          
        </div>

        {/* User & Mobile Icon */}
        <div className="flex items-center gap-4">
          <div className="relative group">
            {!user ? (
              <Link to="/login">
                <FaUserCircle className="text-3xl text-white hover:text-yellow-300 transition" />
              </Link>
            ) : (
              <>
                <img
                  src={user.photoURL}
                  alt="User"
                  className="h-10 w-10 rounded-full border-2 border-yellow-300 shadow-md cursor-pointer"
                />
                <div className="absolute right-0 mt-2 hidden group-hover:block bg-white text-gray-800 border rounded-md shadow-lg w-44 z-50">
                  <p className="px-4 py-2 text-sm font-semibold">{user.displayName || 'User'}</p>
                  <hr />
                  <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-100 text-sm">Dashboard</Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-red-50 text-sm text-red-500"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl text-white focus:outline-none"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Links */}
      {menuOpen && (
        <div className="md:hidden bg-gradient-to-b from-blue-600 via-blue-500 to-indigo-600 text-white px-6 py-4 space-y-3">
          <Link to="/" className="block hover:text-yellow-300 transition">Home</Link>
          <Link to="/apartments" className="block hover:text-yellow-300 transition">Apartments</Link>
          <Link to="/announcements" className="block hover:text-yellow-300 transition">Announcements</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="block hover:text-yellow-300 transition">Dashboard</Link>
              <button
                onClick={handleLogout}
                className="block text-left w-full text-red-200 hover:text-red-500"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="block hover:text-yellow-300 transition">Login</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
