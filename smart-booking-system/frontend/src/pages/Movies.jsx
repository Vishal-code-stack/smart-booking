import React, { useEffect, useState } from 'react';

import axios from 'axios';

import { Link } from 'react-router-dom';

import Card from '../components/Card';
import Select from '../components/Select';
import Button from '../components/Button';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [locations, setLocations] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedState, setSelectedState] = useState('Tamil Nadu');
  const [selectedDistrict, setSelectedDistrict] = useState('Coimbatore');

  const country = 'India';

  useEffect(() => {
    const fetchLocations = async () => {
      const res = await axios.get('http://localhost:5000/api/movies/locations');
      setLocations(res.data.locations || []);
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    const uniqueStates = [...new Set(locations.map(l => l.state))];
    setStates(uniqueStates);

    if (uniqueStates.length && !uniqueStates.includes(selectedState)) {
      setSelectedState(uniqueStates[0]);
    }
  }, [locations]);

  useEffect(() => {
    const availableDistricts = locations
      .filter(l => l.state === selectedState)
      .map(l => l.district);

    setDistricts(availableDistricts);

    if (availableDistricts.length && !availableDistricts.includes(selectedDistrict)) {
      setSelectedDistrict(availableDistricts[0]);
    }
  }, [locations, selectedState]);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const params = { country, state: selectedState, district: selectedDistrict };
      const res = await axios.get('http://localhost:5000/api/movies', { params });
      setMovies(res.data);
      setLoading(false);
    };

    fetchMovies();
  }, [selectedState, selectedDistrict]);

  const resetToDefault = () => {
    setSelectedState('Tamil Nadu');
    setSelectedDistrict('Coimbatore');
  };

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1 className="page-title">Now Showing</h1>
          <p className="page-subtitle">
            {country} — {selectedState} / {selectedDistrict}
          </p>
        </div>

        <div className="filter-bar">
          <Select
            label="State"
            value={selectedState}
            onChange={e => setSelectedState(e.target.value)}
            options={states}
          />

          <Select
            label="District"
            value={selectedDistrict}
            onChange={e => setSelectedDistrict(e.target.value)}
            options={districts}
          />

          <Button variant="secondary" onClick={resetToDefault}>
            Reset to Coimbatore
          </Button>
        </div>
      </header>
      {loading ? (
        <div className="empty">
          <div className="spinner" />
          <div>Loading movies…</div>
        </div>
      ) : movies.length === 0 ? (
        <div className="empty">No movies found for this location.</div>
      ) : (
        <div className="movies-grid">
          {movies.map(movie => (
            <Card key={movie._id} className="movie-card">
              <img className="movie-poster" src={movie.poster} alt={movie.name} />
              <div className="movie-card-body">
                <h3 className="movie-title">{movie.name}</h3>
                <div className="movie-meta">
                  <span>{movie.genre}</span>
                  <span>{movie.duration}</span>
                </div>
                <div className="movie-detail">
                  <strong>Theatre:</strong> {movie.theatre}
                </div>
                <div className="movie-detail">
                  <strong>Location:</strong> {movie.state}, {movie.district}
                </div>
                <div className="movie-detail">
                  <strong>Show:</strong> {movie.showTime}
                </div>
                <Link to="/movie-booking" state={{ movie }} className="btn btn-primary btn-block">
                  Book Now
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}

    </div>

  );

};

export default Movies;