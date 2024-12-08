// import React, { useState, useEffect } from 'react';
// import '../App.css';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../AuthContext'; // Make sure to import the AuthContext

// function Login({ handleLoginSuccess }) {
//     const [username, setUsername] = useState(''); 
//     const [password, setPassword] = useState('');
//     const [showPassword, setShowPassword] = useState(false);
//     const [userData, setUserData] = useState(null); // State to hold user data
//     const navigate = useNavigate();
//     const { login } = useAuth(); // Use the AuthContext for login management

//     const handleRegisterClick = () => {
//         navigate('/register');
//     };

//     const handleLoginSubmit = async (event) => {
//         event.preventDefault();
    
//         try {
//             const response = await fetch('http://localhost:3000/user/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     username: username,  
//                     password: password,
//                 }),
//             });
    
//             if (response.ok) {
//                 const data = await response.json();
//                 console.log("Login response:", data);
                
//                 // Storing token and user data in localStorage
//                 localStorage.setItem('userData', JSON.stringify(data.user));
//                 localStorage.setItem('token', data.token);

//                 // Notify the auth context of login
//                 login(data.token);

//                 // Update the local state
//                 setUserData(data.user);

//                 // Optionally call the parent's login success handler
//                 if (handleLoginSuccess) handleLoginSuccess();

//                 // Navigate to the home page
//                 navigate('/');
//             } else {
//                 const errorData = await response.json();
//                 // Show a user-friendly message
//                 alert(errorData.msg || 'Login failed, please try again.');
//             }
//         } catch (error) {
//             console.error('Error during login:', error);
//             alert('An error occurred. Please try again.');
//         }
//     };
    
//     const handleCheckboxChange = () => {
//         setShowPassword(!showPassword);
//     };

//     // Use effect to check for user data in localStorage on component mount
//     useEffect(() => {
//         const storedUserData = localStorage.getItem('userData');
//         if (storedUserData && storedUserData !== 'undefined') { // Check for valid string
//             try {
//                 setUserData(JSON.parse(storedUserData)); // Set user data from localStorage
//             } catch (error) {
//                 console.error("Failed to parse user data:", error);
//             }
//         }
//     }, []);

//     return (
//         <div className="login-container">
//             <div className="login-box">
//                 <h2>Login</h2>

//                 {userData && ( // Conditionally render user data if it exists
//                     <div>
//                         <h3>Welcome, {userData.username}!</h3> {/* Display username */}
//                         <p>Email: {userData.email}</p> {/* Display email */}
//                         <p>Contact Number: {userData.contact_no}</p> {/* Display contact number */}
//                     </div>
//                 )}

//                 <form onSubmit={handleLoginSubmit}>
//                     <input
//                         type="text"
//                         placeholder="Username" 
//                         name="username"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                     />
//                     <input
//                         type={showPassword ? 'text' : 'password'}
//                         placeholder="Password"
//                         name="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                     <div className="checkbox-container">
//                         <input
//                             type="checkbox"
//                             id="show-password-checkbox"
//                             checked={showPassword}
//                             onChange={handleCheckboxChange}
//                         />
//                         <label htmlFor="show-password-checkbox">Show Password</label>
//                     </div>
//                     <button type="submit">Login</button>
//                     <button type="button" onClick={handleRegisterClick}>
//                         Don't have an account? Register
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// }


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
 
const Login = () => {

    return (
        <h1>Login</h1>
    )
}

 
export default Login;