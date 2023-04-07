import React, { useState } from "react";
import axios from "axios";
import "./css/login.css";

const LoginForm = ({ setIsLoggedIn, setAccessToken, setRefreshToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send username and password to the API server for authentication
    // You can use fetch or Axios to make an API request
    try {
      const response = await axios.post(
        `${serverUrl}/login`,
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const accessToken = response.headers["auth-token-access"];
      const refreshToken = response.headers["auth-token-refresh"];
      console.log("Access Token:", accessToken);
      console.log("Refresh Token:", refreshToken);
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      console.log(response.data);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  return (
    <div className="login-form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-form-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-form-input"
        />
        <button type="submit" className="login-form-button">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
