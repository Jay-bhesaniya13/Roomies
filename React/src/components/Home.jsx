import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Initialize navigation

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await fetch('http://localhost:3000/API/hotel/');
                if (!response.ok) {
                    throw new Error('Failed to fetch hotels');
                }
                const data = await response.json();
                setHotels(data.slice(0, 4)); // Show only 4 hotels
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHotels();
    }, []);

    const handleCardClick = (hotel) => {
        navigate('/hotel', { state: { hotelId: hotel._id, hotelName: hotel.hotel_name } }); // Pass state
    };

    return (
        <div className="flex-grow-1 bg-light d-flex align-items-center justify-content-center">
            <div className="container">
                <h1 className="mb-4 text-center">Welcome to Roomies</h1>
                {loading ? (
                    <p className="text-center">Loading hotels...</p>
                ) : error ? (
                    <p className="text-center text-danger">Error: {error}</p>
                ) : (
                    <div className="row">
                        {hotels.map((hotel) => (
                            <div
                                key={hotel._id}
                                className="col-md-3 mb-4"
                                onClick={() => handleCardClick(hotel)} // Navigate and pass data
                                style={{ cursor: 'pointer' }} // Add pointer cursor for visual feedback
                            >
                                <div className="card h-100">
                                    <img
                                        src={hotel.image_url || '/assets/home.jpg'} // Fallback image
                                        className="card-img-top"
                                        alt={hotel.hotel_name}
                                        style={{ height: '150px', objectFit: 'cover' }}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title text-center">{hotel.hotel_name}</h5>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
