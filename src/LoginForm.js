import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = ({setIsLoggedIn}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send username and password to the API server for authentication
    // You can use fetch or Axios to make an API request
    try {
        const response = await axios.post(`${serverUrl}/login`, { username, password }, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
        console.log(response.data);
        setIsLoggedIn(true)
    } catch (error) {
        console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Render login form inputs */}
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
