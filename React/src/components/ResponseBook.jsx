import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ResponseBook = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { hotelName, categoryName, check_in_date, check_out_date, no_of_members, message } =
        location.state || {};

    return (
        <div className="container text-center mt-5">
            <h1>{message}</h1>
            <p>
                Your ticket is booked in <b>{hotelName}</b> under room category <b>{categoryName}</b>.
            </p>
            <p>
                Dates: <b>{check_in_date}</b> to <b>{check_out_date}</b>
            </p>
            <p>Number of Members: <b>{no_of_members}</b></p>
            <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>
                Done
            </button>
        </div>
    );
};

export default ResponseBook;
