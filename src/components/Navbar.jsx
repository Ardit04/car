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
    // Admin vertical sidebar
    return (
      <nav className="p-6 h-full flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
          {user && (
            <div className="mb-4 text-sm text-gray-300">
              Logged in as: <span className="font-semibold">{user.username || user.email}</span>
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
              <Link to="/admin/cars" className="hover:underline block" onClick={closeMenu}>
                Car List
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <button onClick={handleLogout} className="text-red-400 hover:underline mt-8">
            Logout
          </button>
        </div>
      </nav>
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
                <Link to="/admin/cars" onClick={closeMenu} className="block hover:underline">
                  Car List
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
