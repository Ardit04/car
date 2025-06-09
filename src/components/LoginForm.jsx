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
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.status === "success") {
        onLogin(data.user);
        setMessage(`Welcome ${data.user.username}!`);
        navigate('/'); // ose sipas logjikës së aksesit
      } else {
        setMessage(data.message || "Login failed.");
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      setMessage("An error occurred while connecting to the server. Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4 shadow-md rounded-xl space-y-3">
        <h2 className="text-xl font-semibold">Login</h2>
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
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Login
        </button>
        <span>
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 no-underline">Sign Up</Link>
          </span>
 
        {message && <p className="text-red-500 mt-2">{message}</p>}
      </form>
    </div>
  );
}