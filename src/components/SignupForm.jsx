import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function SignupForm() {
  const [form, setForm] = useState({ username: "", email: "", password: "", number: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost/carshop/backend/api/auth/signup.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setMessage(data.message);

      if (data.status === "success") {
        setTimeout(() => navigate("/login"), 2000); // Ridhegjo pas 2 sekondash
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      setMessage("Failed to sign up. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4 shadow-md rounded-xl space-y-3">
      <h2 className="text-xl font-semibold">Sign Up</h2>

      <input
        name="username"
        value={form.username}
        onChange={handleChange}
        placeholder="Username"
        className="w-full border p-2 rounded"
        required
      />

      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        type="email"
        placeholder="Email"
        className="w-full border p-2 rounded"
        required
      />

      <input
        name="password"
        value={form.password}
        onChange={handleChange}
        type="password"
        placeholder="Password"
        className="w-full border p-2 rounded"
        required
      />

      <input
        name="number"
        value={form.number}
        onChange={handleChange}
        type="number"
        placeholder="Phone Number"
        className="w-full border p-2 rounded"
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Sign Up
      </button>

      <span>
        Have an account?{" "}
        <Link to="/login" className="text-blue-500 no-underline hover:underline">
          Log In
        </Link>
      </span>

      {message && <p className="text-center text-sm text-gray-700 mt-2">{message}</p>}
    </form>
  );
}
