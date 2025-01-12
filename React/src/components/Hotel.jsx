import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Home from "./Home";

const Hotel = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { hotelId, hotelName } = location.state || {};
    const [roomCategories, setRoomCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const isAuthenticated = localStorage.getItem('isAuthenticate') === 'true';

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
        }


        const fetchRoomCategories = async () => {
            try {
                const response = await fetch(`http://localhost:3000/API/roomcategory/hotel/${hotelId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch room categories');
                }
                const data = await response.json();
                setRoomCategories(data.filter((category) => category.isExistCategory));
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

    const handleBookNow = (category) => {
        navigate('/room-booking', {
            state: {
                hotelId,
                hotelName,
                roomCategoryId: category._id,
                categoryName: category.category_name,
                pricePerRoom: category.amount_per_room,
                max_bed_per_room: category.max_bed_per_room
            },
        });
    };

    if (!hotelId) {
        return  navigate('/');
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
                                    {/* <p>Available Rooms: {category.available_room}</p> */}
                                    <p>Price per Room: ₹{category.amount_per_room}</p>
                                    <p>Food Charge (per person): ₹{category.food_charge}</p>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleBookNow(category)}
                                    >
                                        Book Now
                                    </button>
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
