import React, { useState } from 'react';

import { useLocation } from 'react-router-dom';

import axios from 'axios';

const MovieBooking = () => {

  const location = useLocation();

  const { movie } = location.state;

  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (row, number) => {

    const seat = { row, number };

    if (selectedSeats.find(s => s.row === row && s.number === number)) {

      setSelectedSeats(selectedSeats.filter(s => !(s.row === row && s.number === number)));

    } else {

      setSelectedSeats([...selectedSeats, seat]);

    }

  };

  const bookSeats = async () => {

    const token = localStorage.getItem('token');

    try {

      await axios.post('http://localhost:5000/api/movies/book', {

        movieId: movie._id,

        seats: selectedSeats

      }, {

        headers: { 'x-auth-token': token }

      });

      alert('Booking successful');

    } catch (err) {

      alert(err.response.data.msg);

    }

  };

  return (

    <div>

      <h1>Book {movie.name}</h1>

      <div>

        {movie.seats.map(seat => (

          <div

            key={`${seat.row}${seat.number}`}

            className={`seat ${selectedSeats.find(s => s.row === seat.row && s.number === seat.number) ? 'selected' : ''} ${!seat.available ? 'booked' : ''}`}

            onClick={() => seat.available && toggleSeat(seat.row, seat.number)}

          >

            {seat.row}{seat.number}

          </div>

        ))}

      </div>

      <button onClick={bookSeats}>Book Selected Seats</button>

    </div>

  );

};

export default MovieBooking;