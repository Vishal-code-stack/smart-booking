import React, { useEffect, useState } from 'react';

import axios from 'axios';

const MyBookings = () => {

  const [bookings, setBookings] = useState([]);

  useEffect(() => {

    const fetchBookings = async () => {

      const token = localStorage.getItem('token');

      const res = await axios.get('http://localhost:5000/api/bookings', {

        headers: { 'x-auth-token': token }

      });

      setBookings(res.data);

    };

    fetchBookings();

  }, []);

  return (

    <div>

      <h1>My Bookings</h1>

      {bookings.map(booking => (

        <div key={booking._id}>

          <p>Type: {booking.type}</p>

          {booking.type === 'movie' && booking.movie && (

            <p>Movie: {booking.movie.name} Seats: {booking.seats.map(s => `${s.row}${s.number}`).join(', ')}</p>

          )}

          {booking.type === 'flight' && booking.flight && (

            <p>Flight: {booking.flight.airline} From {booking.flight.from} to {booking.flight.to}</p>

          )}

          <p>Date: {new Date(booking.date).toLocaleDateString()}</p>

        </div>

      ))}

    </div>

  );

};

export default MyBookings;