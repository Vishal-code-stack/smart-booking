import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';

import Login from './pages/Login';

import Register from './pages/Register';

import Movies from './pages/Movies';

import MovieBooking from './pages/MovieBooking';

import Flights from './pages/Flights';

import MyBookings from './pages/MyBookings';

function App() {

  return (

    <Router>

      <div className="App">

        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/movies" element={<Movies />} />

          <Route path="/movie-booking" element={<MovieBooking />} />

          <Route path="/flights" element={<Flights />} />

          <Route path="/my-bookings" element={<MyBookings />} />

        </Routes>

      </div>

    </Router>

  );

}

export default App;