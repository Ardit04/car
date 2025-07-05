import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCarAlt } from 'react-icons/fa'; // hequr FaSun, FaMoon
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ user, onLogout, vertical }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  // ---------------- VERTICAL ADMIN SIDEBAR ---------------- //
  if (vertical) {
    return (
      <div className="relative h-screen flex bg-gray-900 text-yellow-400">
        <div
          className={`
            fixed top-0 left-0 h-full w-64 bg-gray-900 z-40 transform transition-transform duration-300 ease-in-out
            ${menuOpen ? 'translate-x-0' : '-translate-x-full'}
            md:relative md:translate-x-0 md:block
          `}
        >
          <div className="p-6 flex flex-col h-full justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-yellow-300">Admin Panel</h2>
              {user && (
                <div className="mb-4 text-sm text-yellow-500">
                  Logged in as: <span className="font-semibold">{user.username || user.email}</span>
                </div>
              )}
              <ul className="space-y-4">
                <li><Link to="/admin/add-car" className="hover:text-yellow-300" onClick={closeMenu}>Add Car</Link></li>
                <li><Link to="/admin/comments" className="hover:text-yellow-300" onClick={closeMenu}>Comment List</Link></li>
                <li><Link to="/admin/contact-messages" className="hover:text-yellow-300" onClick={closeMenu}>Contact Messages</Link></li>
              </ul>
            </div>
            <button
              onClick={() => { handleLogout(); closeMenu(); }}
              className="text-red-400 hover:text-red-500 font-semibold mt-6"
            >
              Logout
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="fixed inset-0 bg-black opacity-60 z-30 md:hidden" onClick={closeMenu} />
        )}

        <div className="flex-1 p-4 md:p-8 md:ml-64">
          <button
            className="md:hidden mb-4 text-yellow-400"
            onClick={toggleMenu}
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  // ---------------- HORIZONTAL NAVBAR ---------------- //
  return (
    <nav className="bg-black bg-opacity-90 text-yellow-400 p-4 relative z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2 text-yellow-300 hover:text-yellow-400">
            <FaCarAlt className="w-6 h-6" />
            <span className="text-2xl font-bold tracking-wide">CarZone</span>
          </Link>
        </div>

        <div className="flex items-center md:hidden">
          {/* Hequr butoni për toggleTheme */}
          <button
            className="text-yellow-400 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        <ul className="hidden md:flex space-x-6 text-lg font-medium flex-1 justify-end">
          <li><Link to="/" className="hover:text-yellow-300">Home</Link></li>

          {!user && (
            <>
              <li><Link to="/about" className="hover:text-yellow-300">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-yellow-300">Contact Us</Link></li>
              <li><Link to="/car" className="hover:text-yellow-300">Cars</Link></li>
              <li><Link to="/login" className="hover:text-yellow-300">Login</Link></li>
            </>
          )}

          {user?.role === 1 && (
            <>
              <li><Link to="/about" className="hover:text-yellow-300">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-yellow-300">Contact Us</Link></li>
              <li><Link to="/car" className="hover:text-yellow-300">Cars</Link></li>
              <li><Link to="/cart" className="hover:text-yellow-300">Save</Link></li>
              <li><button onClick={handleLogout} className="hover:text-red-400">Logout</button></li>
            </>
          )}

          {user?.role === 0 && (
            <>
              <li><Link to="/admin/add-car" className="hover:text-yellow-300">Add Car</Link></li>
              <li><Link to="/admin/comments" className="hover:text-yellow-300">Comments</Link></li>
              <li><Link to="/admin/cars" className="hover:text-yellow-300">Car List</Link></li>
              <li><button onClick={handleLogout} className="hover:text-red-400">Logout</button></li>
            </>
          )}
        </ul>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-black bg-opacity-95 rounded mt-2"
          >
            <ul className="flex flex-col items-start space-y-4 py-4 px-6 text-lg font-medium">
              <li><Link to="/" onClick={closeMenu} className="hover:text-yellow-300">Home</Link></li>

              {!user && (
                <>
                  <li><Link to="/about" onClick={closeMenu} className="hover:text-yellow-300">About Us</Link></li>
                  <li><Link to="/contact" onClick={closeMenu} className="hover:text-yellow-300">Contact Us</Link></li>
                  <li><Link to="/car" onClick={closeMenu} className="hover:text-yellow-300">Cars</Link></li>
                  <li><Link to="/login" onClick={closeMenu} className="hover:text-yellow-300">Login</Link></li>
                </>
              )}

              {user?.role === 1 && (
                <>
                  <li><Link to="/about" onClick={closeMenu} className="hover:text-yellow-300">About Us</Link></li>
                  <li><Link to="/contact" onClick={closeMenu} className="hover:text-yellow-300">Contact Us</Link></li>
                  <li><Link to="/car" onClick={closeMenu} className="hover:text-yellow-300">Cars</Link></li>
                  <li><Link to="/cart" onClick={closeMenu} className="hover:text-yellow-300">Save</Link></li>
                  <li><button onClick={() => { handleLogout(); closeMenu(); }} className="hover:text-red-400">Logout</button></li>
                </>
              )}

              {user?.role === 0 && (
                <>
                  <li><Link to="/admin/add-car" onClick={closeMenu} className="hover:text-yellow-300">Add Car</Link></li>
                  <li><Link to="/admin/comments" onClick={closeMenu} className="hover:text-yellow-300">Comments</Link></li>
                  <li><button onClick={() => { handleLogout(); closeMenu(); }} className="hover:text-red-400">Logout</button></li>
                </>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
