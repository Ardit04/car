import React, { useState } from "react";
import { sendContactMessage } from "../api/contactService"; // Adjust the import path as necessary
import bgImage from '../img/a.jpg';


const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await sendContactMessage(formData);
      alert(data.message);
    } catch (err) {
      alert('Failed to send message.');
    }
  };

  return (
    <div
              className="w-full min-h-screen bg-cover bg-center flex flex-col justify-center items-center text-white p-6 "
              
              style={{ backgroundImage: `url(${bgImage})` }}
            >
              <div className="backdrop-blur-2xl bg-opacity-50 p-8 rounded-lg shadow-lg max-w-3xl w-full">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <form onSubmit={handleSubmit} className="space-y-4 ">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows="5"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Send Message
        </button>
      </form>
      </div>
    </div>
  );
};

export default ContactUs;
