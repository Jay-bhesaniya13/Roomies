import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Hotel = () => {
    const location = useLocation();
    const { hotelId, hotelName } = location.state || {}; // Extract hotelId and hotelName
    const [roomCategories, setRoomCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRoomCategories = async () => {
            try {
                const response = await fetch(`http://localhost:3000/API/roomcategory/hotel/${hotelId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch room categories');
                }
                const data = await response.json();
                setRoomCategories(data.filter((category) => category.isExistCategory)); // Filter by `isExistCategory`
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (hotelId) {
            fetchRoomCategories();
        }
    }, [hotelId]);

    if (!hotelId) {
        return <p className="text-center text-danger">No hotel selected</p>;
    }

    return (
        <div className="container">
            <h1 className="mb-4 text-center">Hotel: {hotelName}</h1>
            {loading ? (
                <p className="text-center">Loading room categories...</p>
            ) : error ? (
                <p className="text-center text-danger">Error: {error}</p>
            ) : (
                <div className="row">
                    {roomCategories.map((category) => (
                        <div key={category._id} className="col-md-4 mb-4">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title">{category.category_name}</h5>
                                    <p>Max Beds per Room: {category.max_bed_per_room}</p>
                                    <p>Available Rooms: {category.available_room}</p>
                                    <p>Price per Room: ₹{category.amount_per_room}</p>
                                    <p>Food Charge (per person): ₹{category.food_charge}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Hotel;
