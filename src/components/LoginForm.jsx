import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function LoginForm({ onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("http://localhost/car/backend/api/auth/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.status === "success") {
        onLogin(data.user);
        setMessage(`Welcome ${data.user.username}!`);
        navigate("/");
      } else {
        setMessage(data.message || "Login failed.");
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      setMessage(
        "An error occurred while connecting to the server. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl space-y-6"
      >
        <h2 className="text-3xl font-extrabold text-center text-green-700">
          Login to Your Account
        </h2>

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          type="email"
          placeholder="Email Address"
          className="w-full px-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          required
        />

        <input
          name="password"
          value={form.password}
          onChange={handleChange}
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          required
        />

        <button
          type="submit"
          className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-green-600 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>

        {message && (
          <p className="mt-2 text-center text-red-600 font-medium">{message}</p>
        )}
      </form>
    </div>
  );
}
