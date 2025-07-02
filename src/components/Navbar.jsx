import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user, onLogout, vertical }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  if (vertical) {
  return (
    <div className="relative h-screen flex bg-gray-900 text-white">
      {/* Sidebar - responsive */}
      <div
        className={`
          fixed top-0 left-0 h-full w-64 bg-gray-900 z-40 transform transition-transform duration-300 ease-in-out
          ${menuOpen ? 'translate-x-0' : '-translate-x-full'}
          md:relative md:translate-x-0 md:block
        `}
      >
        <div className="p-6 flex flex-col h-full justify-between">
          <div>
            <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>

            {user && (
              <div className="mb-4 text-sm text-gray-300">
                Logged in as:{' '}
                <span className="font-semibold">{user.username || user.email}</span>
              </div>
            )}

            <ul className="space-y-4">
              <li>
                <Link to="/admin/add-car" className="hover:underline block" onClick={closeMenu}>
                  Add Car
                </Link>
              </li>
              <li>
                <Link to="/admin/comments" className="hover:underline block" onClick={closeMenu}>
                  Comment List
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/contact-messages"
                  className="hover:underline block"
                  onClick={closeMenu}
                >
                  Contact Messages
                </Link>
              </li>
            </ul>
          </div>

          <button
            onClick={() => {
              handleLogout();
              closeMenu();
            }}
            className="text-red-400 hover:underline mt-6"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Overlay for mobile when menu is open */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Main content */}
      <div className="flex-1 p-4 md:p-8 md:ml-64">
        {/* Toggle button for mobile */}
        <button
          className="md:hidden mb-4 text-white"
          onClick={toggleMenu}
          aria-label="Open menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

      
      </div>
    </div>
  );
}


  // Regular horizontal navbar for users
  return (
    <nav className="bg-black text-white p-4 relative z-50">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-xl font-bold no-underline">
          car
        </Link>

        <button
          className="md:hidden focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6 fill-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop menu */}
        <ul className="hidden md:flex space-x-4">
          <li><Link to="/" className="hover:underline">Home</Link></li>

          {!user && (
            <>
              <li><Link to="/about" className="hover:underline">About Us</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
              <li><Link to="/car" className="hover:underline">Cars</Link></li>
              <li><Link to="/login" className="hover:underline">Login</Link></li>
            </>
          )}

          {user && user.role === 1 && (
            <>
              <li><Link to="/about" className="hover:underline">About Us</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
              <li><Link to="/car" className="hover:underline">Cars</Link></li>
              <li><Link to="/cart" className="hover:underline">Save</Link></li>
              <li><button onClick={handleLogout} className="hover:underline">Logout</button></li>
            </>
          )}

          {user && user.role === 0 && (
            <>
              <li><Link to="/admin/add-car" className="hover:underline">Add Car</Link></li>
              <li><Link to="/admin/comments" className="hover:underline">Comments</Link></li>
              <li><Link to="/admin/cars" className="hover:underline">Car List</Link></li>
              <li><button onClick={handleLogout} className="hover:underline">Logout</button></li>
            </>
          )}
        </ul>
      </div>

      {/* Mobile dropdown menu */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out bg-black mt-2 rounded
          ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <ul className="flex flex-col items-center space-y-6 py-4 text-lg">
          <li>
            <Link to="/" onClick={closeMenu} className="block hover:underline">
              Home
            </Link>
          </li>

          {!user && (
            <>
              <li>
                <Link to="/about" onClick={closeMenu} className="block hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={closeMenu} className="block hover:underline">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/car" onClick={closeMenu} className="block hover:underline">
                  Cars
                </Link>
              </li>
              <li>
                <Link to="/login" onClick={closeMenu} className="block hover:underline">
                  Login
                </Link>
              </li>
            </>
          )}

          {user && user.role === 1 && (
            <>
              <li>
                <Link to="/about" onClick={closeMenu} className="block hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={closeMenu} className="block hover:underline">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/car" onClick={closeMenu} className="block hover:underline">
                  Cars
                </Link>
              </li>
              <li>
                <Link to="/cart" onClick={closeMenu} className="block hover:underline">
                  Order
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    closeMenu();
                  }}
                  className="block hover:underline"
                >
                  Logout
                </button>
              </li>
            </>
          )}

          {user && user.role === 0 && (
            <>
              <li>
                <Link to="/admin/add-car" onClick={closeMenu} className="block hover:underline">
                  Add Car
                </Link>
              </li>
              <li>
                <Link to="/admin/comments" onClick={closeMenu} className="block hover:underline">
                  Comments
                </Link>
              </li>
            
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    closeMenu();
                  }}
                  className="block hover:underline"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
