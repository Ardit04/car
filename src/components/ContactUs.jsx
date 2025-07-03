import React, { useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineUser, AiOutlineMail, AiOutlineMessage, AiOutlineCheckCircle, AiOutlineExclamationCircle } from "react-icons/ai";
import { sendContactMessage } from "../api/contactService";
import bgImage from '../img/a.jpg';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); 
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: null }));
    }
    if (status) setStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const data = await sendContactMessage(formData);
      setStatus('success');
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus('error');
    }
    setLoading(false);
  };

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center flex justify-center items-center p-6 relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 bg-black bg-opacity-70 rounded-2xl shadow-2xl max-w-md w-full p-10"
      >
        <h1 className="text-4xl font-extrabold text-yellow-400 mb-10 text-center">
          Contact Us
        </h1>

        {status === "success" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center mb-6 text-green-400 font-semibold"
          >
            <AiOutlineCheckCircle className="mr-2" size={24} />
            Message sent successfully!
          </motion.div>
        )}

        {status === "error" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center mb-6 text-red-500 font-semibold"
          >
            <AiOutlineExclamationCircle className="mr-2" size={24} />
            Failed to send message. Please try again.
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* NAME */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-400 pointer-events-none">
              <AiOutlineUser size={20} />
            </div>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className={`peer w-full bg-gray-900 text-white rounded-lg pl-10 pr-4 py-3 shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:scale-105 transition transform ${
                errors.name ? 'ring-2 ring-red-500' : ''
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1 ml-1">{errors.name}</p>
            )}
          </div>

          {/* EMAIL */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-400 pointer-events-none">
              <AiOutlineMail size={20} />
            </div>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className={`peer w-full bg-gray-900 text-white rounded-lg pl-10 pr-4 py-3 shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:scale-105 transition transform ${
                errors.email ? 'ring-2 ring-red-500' : ''
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1 ml-1">{errors.email}</p>
            )}
          </div>

          {/* MESSAGE */}
          <div className="relative">
            <div className="absolute left-3 top-4 text-yellow-400 pointer-events-none">
              <AiOutlineMessage size={20} />
            </div>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              className={`peer w-full bg-gray-900 text-white rounded-lg pl-10 pr-4 py-3 shadow-md resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:scale-105 transition transform ${
                errors.message ? 'ring-2 ring-red-500' : ''
              }`}
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-sm mt-1 ml-1">{errors.message}</p>
            )}
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className={`w-full bg-yellow-400 text-gray-900 font-semibold py-3 rounded-lg shadow-lg hover:bg-yellow-300 transition ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Sending..." : "Send Message"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default ContactUs;
