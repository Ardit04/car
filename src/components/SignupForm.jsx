import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function SignupForm({ onSignup }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch("http://localhost/car/backend/api/auth/signup.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.status === "success") {
        onSignup(data.user);
        navigate("/");
      } else {
        setMessage(data.message || "Signup failed.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-gray-900 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-800 rounded-3xl p-10 shadow-2xl space-y-6 border border-yellow-500"
      >
        <h2 className="text-3xl font-bold text-center text-yellow-400">
          Create Your Account
        </h2>

        <div className="space-y-4">
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            type="text"
            placeholder="Username"
            className="w-full px-4 py-3 bg-gray-900 text-yellow-300 border border-yellow-600 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:outline-none transition"
            required
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-3 bg-gray-900 text-yellow-300 border border-yellow-600 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:outline-none transition"
            required
          />

          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 bg-gray-900 text-yellow-300 border border-yellow-600 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:outline-none transition"
            required
          />

          <input
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-3 bg-gray-900 text-yellow-300 border border-yellow-600 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:outline-none transition"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-xl shadow-md transition"
        >
          Sign Up
        </button>

        <p className="text-center text-sm text-gray-300">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-400 hover:underline font-medium">
            Login
          </Link>
        </p>

        {message && (
          <p className="mt-2 text-center text-red-500 font-medium">{message}</p>
        )}
      </form>
    </div>
  );
}
