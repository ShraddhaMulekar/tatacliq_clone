import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BaseURL from "../public/Base_URL";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res = await fetch(`${BaseURL}user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      let data = await res.json();
      setMessage(data.msg);

      if (data.token) {
        localStorage.setItem("token", data.token);
        alert("Login successful!");
        navigate("/"); // Redirect to home or dashboard
      } else {
        alert(data.msg || "Login failed!");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Something went wrong!");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Welcome Back 👋</h2>
        <p className="subtitle">Login to continue shopping</p>

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Log In</button>

        {message && <p className="message">{message}</p>}
        <p className="switch">
          New user? <span onClick={() => navigate("/register")}>Register here</span>
        </p>
      </form>
    </div>
  );
};

export default Login;
