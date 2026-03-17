import React from 'react';

import { Link } from 'react-router-dom';

import axios from 'axios';

import { notify } from '../utils/notify';
import Button from '../components/Button';

const Home = () => {
  const resetData = async () => {
    try {
      await axios.post('http://localhost:5000/api/reset');
      notify('Data reset to initial seed', 'success');
    } catch (err) {
      notify('Failed to reset data', 'error');
    }
  };

  return (
    <div className="page">
      <h1>Welcome to Smart Booking System</h1>

      <p>Book movies and flights in one place.</p>

      <nav>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/flights">Flights</Link>
        <Link to="/my-bookings">My Bookings</Link>
      </nav>

      <Button variant="secondary" onClick={resetData}>
        Reset demo data
      </Button>
    </div>
  );

};

export default Home;