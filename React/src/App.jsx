import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
 import NavigationBar from './components/NavigationBar'; // Import NavigationBar
import Login from './components/Login';
import Register from './components/Register';
import Home from "./components/Home";
import Admin from "./components/Admin";
import Hotel from "./components/Hotel";
import Booking from "./components/Booking";
import ContactPage from "./components/ContactPage";
import ProfilePage from "./components/ProfilePage";

function App() {
  return (
       <Router>
        <div className="d-flex flex-column vh-100">
          {/* NavigationBar at the top */}
          <NavigationBar />
          {/* Main content */}
          <div className="flex-grow-1 bg-light">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/bookings" element={<Booking />} />
              <Route path="/Admin" element={<Admin />} />
              <Route path="/hotel" element={<Hotel />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </div>
        </div>
      </Router>
   );
}

export default App;
