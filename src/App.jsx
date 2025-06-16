import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';
import CarList from './components/CarList';
import CommentList from './components/CommentList';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import CarManager from './components/CarManager';
import Cart from './components/Cart';
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Footer from './components/Footer';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const loggedInUser = JSON.parse(localStorage.getItem('user'));
      if (loggedInUser) {
        setUser(loggedInUser);
      }
    } catch (error) {
      console.error('Failed to parse user data from localStorage:', error);
      localStorage.removeItem('user');
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const isAdmin = user && user.role === 0;

  return (
    <Router>
      <div className="App min-h-screen flex flex-col">
        {!isAdmin && <Navbar user={user} onLogout={handleLogout} />}

        {isAdmin ? (
          <div className="flex flex-grow min-h-screen">
            <div className="w-1/5 bg-gray-900 text-white">
              <Navbar user={user} onLogout={handleLogout} vertical />
            </div>
            <div className="w-4/5 p-6">
              <Routes>
                <Route path="/admin/add-car" element={<CarManager />} />
                <Route path="/admin/comments" element={<CommentList userId={user?.id} />} />
                <Route path="/admin/cars" element={<CarList user={user} />} /> {/* Admin car table view */}
                <Route path="/admin" element={<Navigate to="/admin/add-car" />} />
                <Route path="*" element={<Navigate to="/admin/add-car" />} />
              </Routes>
            </div>
          </div>
        ) : (
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/car" element={<CarList user={user} />} />
              <Route path="/cart" element={user ? <Cart /> : <Navigate to="/login" />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
              <Route path="/signup" element={<SignupForm />} />
              <Route path="/admin" element={<Navigate to="/login" />} />
            </Routes>
          </div>
        )}

        {!isAdmin && <Footer />}
      </div>
    </Router>
  );
}

export default App;
