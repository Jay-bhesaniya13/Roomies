import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/NavigationBar.css"

const NavigationBar = () => {
    const navigate = useNavigate();
    
    // Get authentication status from localStorage
    const isAuthenticated = localStorage.getItem('authenticate') === 'true';
    const username = localStorage.getItem('username');

    // Function to handle logout
    const logout = () => {
        localStorage.removeItem('authenticate');
        localStorage.removeItem('username');
        navigate('/'); // Redirect to home after logout
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
             
            <Link className="navbar-brand" to="/">
  {localStorage.getItem('authenticate') === 'true' ? (
    <span className="username-box">{localStorage.getItem('username')}</span>
  ) : (
    'Roomies'
  )}
</Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        {/* <li className="nav-item">
                            <Link className="nav-link" to="/hotel">Hotels</Link>
                        </li> */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">Contact</Link>
                        </li>
                        
                        {isAuthenticated && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/profile">Profile</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/booking">Bookings</Link>
                                </li>
                                
                            </>
                        )}
                    </ul>
                    <div className="d-flex">
                        {!isAuthenticated ? (
                            <>
                                <Link className="btn btn-outline-primary me-2" to="/register">Register</Link>
                                <Link className="btn btn-outline-success" to="/login">Login</Link>
                            </>
                        ) : (
                            <button className="btn btn-outline-danger" onClick={logout}>Logout</button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavigationBar;
