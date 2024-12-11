import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLoginSubmit = async (event) => {
    console.log("username:"+email)
    console.log("password:"+password)
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/API/user/login', { email, password });
      if (response.status === 200) {
        // Store username and authenticate value in local storage
        localStorage.setItem('username', response.data.user.name);
        localStorage.setItem('userId', response.data.user.id);
        localStorage.setItem('isAuthenticate', response.data.authenticate);
        


        console.log("userId in login.jsx:"+localStorage.getItem('userId'))
        
        // Redirect to the home page or any other page
        navigate('/');
      } else {
        alert('Login failed. Please check your credentials and try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred while logging in. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLoginSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
