import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Destructure and validate the state data
    const {
        hotelName,
        categoryName,
        roomCategoryId,
        totalAmount,
        formData,
    } = location.state || {};

    // Redirect to RoomBooking if accessed directly
    useEffect(() => {
         console.log("totalAmount at payment:"+totalAmount)
    }, []);

    const handlePayment = async () => {
        try {
            const response = await fetch('http://localhost:3000/API/booking/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: localStorage.getItem('userId'),
                    room_category_id: roomCategoryId,
                    ...formData,
                }),
            });
            const result = await response.json();
            if (response.ok) {
                navigate('/response-book', {
                    state: {
                        hotelName,
                        categoryName,
                        ...formData,
                        message: result.message,
                    },
                });
            } else {
                alert(result.message || 'Booking failed');
            }
        } catch (err) {
            alert('An error occurred during payment.');
        }
    };

    return (
        <div className="container text-center">
            <h1>Payment</h1>
            <p>
                <b>Hotel:</b> {hotelName}
            </p>
            <p>
                <b>Room Category:</b> {categoryName}
            </p>
            <p>
                <b>Total Amount:</b> ₹{totalAmount?.toFixed(2)}
            </p>
            <button className="btn btn-success" onClick={handlePayment}>
                Pay Now
            </button>
        </div>
    );
};

export default Payment;
