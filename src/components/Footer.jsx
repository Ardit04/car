import React from "react";
import { Link } from "react-router-dom"; // Make sure to import Link

const Footer = () => {
  return (
    <footer className="bg-black text-white px-4 py-8 md:px-6 md:py-10">
      <div className="max-w-6xl mx-auto flex flex-wrap md:flex-nowrap flex-col md:flex-row justify-between gap-8 md:gap-10">
        {/* About Section */}
        <div className="flex-1 min-w-[220px] text-center md:text-left mb-8 md:mb-0">
          <h3 className="text-xl font-semibold border-b border-gray-600 pb-2 mb-4">About Us</h3>
          <p>We offer luxury and reliable cars for every customer, ensuring quality and satisfaction.</p>
        </div>

        {/* Links Section */}
        <div className="flex-1 min-w-[220px] text-center md:text-left mb-8 md:mb-0">
          <h3 className="text-xl font-semibold border-b border-gray-600 pb-2 mb-4">Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-gray-300 no-underline hover:text-white hover:underline transition duration-200">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-300 no-underline hover:text-white hover:underline transition duration-200">
                About
              </Link>
            </li>
            <li>
              <Link to="/car" className="text-gray-300 no-underline hover:text-white hover:underline transition duration-200">
                Cars
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-300 no-underline hover:text-white hover:underline transition duration-200">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="flex-1 min-w-[220px] text-center md:text-left">
          <h3 className="text-xl font-semibold border-b border-gray-600 pb-2 mb-4">Contact</h3>
          <p>Email: info@example.com</p>
          <p>Phone: +383 44 123 456</p>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="text-center text-sm text-gray-400 border-t border-gray-700 mt-8 pt-6">
        <p>&copy; 2025 Luxury Cars. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
