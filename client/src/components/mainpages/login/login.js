import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/user/login`, { ...user }); // sends to backend server to check for credentials

      localStorage.setItem("firstLogin", true);
      window.location.href = "/";
      console.log(user);
    } catch (err) {
      const errorMsg =
        err.response?.data?.msg || "An error occurred during login";
      alert(errorMsg);
      console.error(err);
    }
  };
  return (
    <div className="login-page">
      <form onSubmit={loginSubmit}>
        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          value={user.email}
          onChange={onChangeInput}
        />
        <input
          type="password"
          name="password"
          required
          placeholder="Password"
          value={user.password}
          onChange={onChangeInput}
        />
        <div className="row">
          <button type="submit">Login </button>
          <Link to="/register"> Register</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
