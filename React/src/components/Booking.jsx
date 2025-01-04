import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import "../css/Booking.css";  

const Booking = () => {     
    const [bookings, setBookings] = useState([]);     
    const [filter, setFilter] = useState('all');     
    const [loading, setLoading] = useState(true);     
    const [error, setError] = useState(null);     
    const isAuthenticated = localStorage.getItem('isAuthenticate') === 'true';     
    const navigate = useNavigate(); // Initialize the useNavigate hook

    useEffect(() => {         
        // If not authenticated, redirect to home page
        if (!isAuthenticated) {
            navigate('/');
        }

        const fetchBookings = async () => {             
            const userId = localStorage.getItem('userId');             
            try {                 
                const response = await fetch(`http://localhost:3000/API/booking/user/${userId}`);                 
                if (!response.ok) {                     
                    throw new Error('Failed to fetch bookings');                 
                }                 
                const data = await response.json();                 
                console.log("Fetched Bookings:", data); // Log to verify populated data                 
                setBookings(data);             
            } catch (err) {                 
                setError(err.message);             
            } finally {                 
                setLoading(false);             
            }         
        };          

        fetchBookings();     
    }, [isAuthenticated, navigate]); // Add isAuthenticated and navigate as dependencies to rerun the effect

    const filteredBookings = filter === 'all'         
        ? bookings         
        : bookings.filter((booking) => booking.booking_status === filter);     

    return (         
        <div className="bookings-page">             
            <h1 className="text-center">My Bookings</h1>             
            <div className="filter-buttons">                 
                {['all', 'Confirmed', 'Cancelled', 'Refunded'].map((status) => (                     
                    <button                         
                        key={status}                         
                        className={filter === status ? 'active' : ''}                         
                        onClick={() => setFilter(status)}                     
                    >                         
                        {status}                     
                    </button>                 
                ))}             
            </div>             
            <div className="bookings-container">                 
                {loading ? (                     
                    <p>Loading bookings...</p>                 
                ) : error ? (                     
                    <p className="text-danger">{error}</p>                 
                ) : filteredBookings.length > 0 ? (                     
                    filteredBookings.map((booking) => (                         
                        <div                             
                            key={booking._id}                             
                            className={`booking-card ${booking.booking_status.toLowerCase()}`}                         
                        >                             
                            <p><strong>Booking Status:</strong> {booking.booking_status}</p>                             
                            <p><strong>Hotel:</strong> {booking.room_category_id?.hotel_id?.hotel_name || 'Unknown'}</p>                             
                            <p><strong>Category:</strong> {booking.room_category_id?.category_name || 'Unknown'}</p>                              
                            <p><strong>Check-in:</strong> {new Date(booking.check_in_date).toLocaleDateString()}</p>                             
                            <p><strong>Check-out:</strong> {new Date(booking.check_out_date).toLocaleDateString()}</p>                             
                            <p><strong>No. of Rooms:</strong> {booking.no_of_rooms}</p>                             
                            <p><strong>Members:</strong> {booking.no_of_members}</p>                             
                            <p><strong>Food Included:</strong> {booking.is_food_included ? 'Yes' : 'No'}</p>                             
                            <p><strong>Amount:</strong> ₹{booking.book_amount}</p>                         
                        </div>                     
                    ))                 
                ) : (                     
                    <p className="text-center">No bookings found for {filter} status.</p>                 
                )}             
            </div>         
        </div>     
    ); 
};  

export default Booking;
