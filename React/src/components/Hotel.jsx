import React, { useEffect, useState } from 'react';
import '../css/Hotel.css';

const Hotel = () => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await fetch('http://localhost:3000/API/hotel/');
                if (!response.ok) {
                    throw new Error('Failed to fetch hotels');
                }
                const data = await response.json();
                setHotels(data.map(hotel => ({
                    id: hotel._id,
                    name: hotel.hotel_name,
                    imageUrl: hotel.image_url || '../assets/hotel.jpg' // Use a fallback image if image_url is not present
                })));
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHotels();
    }, []);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (error) {
        return <h2>Error: {error}</h2>;
    }

    return (

        <div className="hotel-container">
            {hotels.map(hotel => (
                <div key={hotel.id} className="hotel-card">
                    <img
                        src={hotel.imageUrl}
                        alt={hotel.name}
                        className="hotel-image"
                    />
                    <h3 className="hotel-name">{hotel.name}</h3>
                </div>
            ))}
        </div>

    );
};

export default Hotel;
