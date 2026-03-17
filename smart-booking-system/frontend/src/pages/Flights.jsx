import React, { useState } from 'react';

import axios from 'axios';

const Flights = () => {

  const [formData, setFormData] = useState({ from: '', to: '', date: '' });

  const [flights, setFlights] = useState([]);

  const { from, to, date } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {

    e.preventDefault();

    try {

      const res = await axios.get('http://localhost:5000/api/flights/search', { params: formData });

      setFlights(res.data);

    } catch (err) {

      alert('Error searching flights');

    }

  };

  const bookFlight = async (flightId) => {

    const token = localStorage.getItem('token');

    try {

      await axios.post('http://localhost:5000/api/flights/book', {

        flightId

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

      <h1>Search Flights</h1>

      <form onSubmit={onSubmit}>

        <input type="text" name="from" value={from} onChange={onChange} placeholder="From" required />

        <input type="text" name="to" value={to} onChange={onChange} placeholder="To" required />

        <input type="date" name="date" value={date} onChange={onChange} required />

        <button type="submit">Search</button>

      </form>

      <div>

        {flights.map(flight => (

          <div key={flight._id} className="flight">

            <h3>{flight.airline}</h3>

            <p>From: {flight.from} To: {flight.to}</p>

            <p>Departure: {flight.departureTime} Arrival: {flight.arrivalTime}</p>

            <p>Price: ${flight.price}</p>

            <button onClick={() => bookFlight(flight._id)}>Book</button>

          </div>

        ))}

      </div>

    </div>

  );

};

export default Flights;