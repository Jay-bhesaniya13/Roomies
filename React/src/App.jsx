import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext'; // Import the AuthProvider
import Login from './components/Login';
import Register from './components/Register';
import Home from "./components/Home";
import Admin from "./components/Admin";
import Hotel from "./components/Hotel";
import Booking from "./components/Booking";
import ContactPage from "./components/ContactPage";
import Setting from "./components/Setting";

function App() {
  return (
    <AuthProvider> {/* Wrap the router with AuthProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/hotel" element={<Hotel />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/settings" element={<Setting />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
