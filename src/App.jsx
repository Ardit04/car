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

  return (
    <Router>
      <div className="App min-h-screen flex flex-col">
        <Navbar user={user} onLogout={handleLogout} />
        
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/car" element={<CarList user={user} />} />
            <Route path="/admin" element={
              user && user.role === 0 ? (
                <>
                  <CarManager />
<CommentList userId={user?.id} />
                </>
              ) : (
                <Navigate to="/login" />
              )
            } />
            <Route path="/cart" element={user ? <Cart /> : <Navigate to="/login" />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
            <Route path="/signup" element={<SignupForm />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
