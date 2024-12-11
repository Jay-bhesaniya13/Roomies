import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const RoomBooking = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { hotelId, hotelName, roomCategoryId, categoryName, pricePerRoom, foodCharge ,max_bed_per_room} =
        location.state || {};
    const [formData, setFormData] = useState({
        check_in_date: '',
        check_out_date: '',
        no_of_members: 1,
        is_food_included: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleNext = (e) => {
        e.preventDefault();
        const total_members=formData.no_of_members

        const days = 1 + (new Date(formData.check_out_date) - new Date(formData.check_in_date)) / (1000 * 60 * 60 * 24);
        if (days <= 0) {
            alert('Check-out date must be after check-in date.');
            return;
        }

        console.log("**** pricePerRoom:"+pricePerRoom)
        const rooms_required=(total_members)/max_bed_per_room;

        let totalAmount = days * pricePerRoom * rooms_required * total_members;
            // console.log("**** Total Amount at room booking before condition :"+totalAmount) 

            if(formData.is_food_included)
            {
                totalAmount=totalAmount + foodCharge*total_members
                console.log("totalAmount:"+totalAmount)
                console.log("food charge:"+foodCharge)
            }
            // console.log("**** Total Days:"+days) 

            // console.log("**** Total Amount at room booking after condition:"+totalAmount)    


        navigate('/payment', {
            state: {
                hotelName,
                categoryName,
                roomCategoryId,
                totalAmount,
                formData,
            },
        });
    };

    return (
        <div className="container">
            <h1 className="mb-4">Room Booking for {hotelName} & catagory: {categoryName}</h1>
            <form onSubmit={handleNext}>
                <div className="mb-3">
                    <label className="form-label">Check-in Date</label>
                    <input
                        type="date"
                        className="form-control"
                        name="check_in_date"
                        value={formData.check_in_date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Check-out Date</label>
                    <input
                        type="date"
                        className="form-control"
                        name="check_out_date"
                        value={formData.check_out_date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Number of Members</label>
                    <input
                        type="number"
                        className="form-control"
                        name="no_of_members"
                        value={formData.no_of_members}
                        onChange={handleChange}
                        min="1"
                        required
                    />
                </div>
                <div className="form-check mb-3">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        name="is_food_included"
                        checked={formData.is_food_included}
                        onChange={handleChange}
                    />
                    <label className="form-check-label">Include Food</label>
                </div>
                <button type="submit" className="btn btn-primary">
                    Proceed to Payment
                </button>
            </form>
        </div>
    );
};

export default RoomBooking;
