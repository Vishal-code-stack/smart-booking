import React from 'react';

import { Link } from 'react-router-dom';

const Home = () => {

  return (

    <div>

      <h1>Welcome to Smart Booking System</h1>

      <p>Book movies and flights in one place.</p>

      <nav>

        <Link to="/login">Login</Link>

        <Link to="/register">Register</Link>

        <Link to="/movies">Movies</Link>

        <Link to="/flights">Flights</Link>

        <Link to="/my-bookings">My Bookings</Link>

      </nav>

    </div>

  );

};

export default Home;