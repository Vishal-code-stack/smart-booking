import React, { useEffect, useState } from 'react';

import axios from 'axios';

import { Link } from 'react-router-dom';

const Movies = () => {

  const [movies, setMovies] = useState([]);

  useEffect(() => {

    const fetchMovies = async () => {

      const res = await axios.get('http://localhost:5000/api/movies');

      setMovies(res.data);

    };

    fetchMovies();

  }, []);

  return (

    <div>

      <h1>Movies</h1>

      {movies.map(movie => (

        <div key={movie._id} className="movie">

          <img src={movie.poster} alt={movie.name} width="100" />

          <h3>{movie.name}</h3>

          <p>Genre: {movie.genre}</p>

          <p>Duration: {movie.duration}</p>

          <p>Theatre: {movie.theatre}</p>

          <p>Show Time: {movie.showTime}</p>

          <Link to="/movie-booking" state={{ movie }}>Book Now</Link>

        </div>

      ))}

    </div>

  );

};

export default Movies;