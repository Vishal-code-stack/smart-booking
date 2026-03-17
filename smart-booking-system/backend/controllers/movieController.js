const { getDb, createId } = require('../db');

exports.getMovies = async (req, res) => {
  // Default to Coimbatore, Tamil Nadu, India for first launch.
  const country = (req.query.country || 'India').toLowerCase();
  const state = (req.query.state || 'Tamil Nadu').toLowerCase();
  const district = (req.query.district || 'Coimbatore').toLowerCase();

  try {
    const db = getDb();
    let movies = db.data.movies;

    movies = movies
      .filter(m => (m.country || '').toLowerCase() === country)
      .filter(m => (m.state || '').toLowerCase() === state)
      .filter(m => (m.district || '').toLowerCase() === district);

    res.json(movies);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getLocations = async (req, res) => {
  try {
    const db = getDb();
    const movies = db.data.movies;

    const locations = [];
    const seen = new Set();

    for (const movie of movies) {
      const country = (movie.country || 'India').trim();
      const state = (movie.state || 'Tamil Nadu').trim();
      const district = (movie.district || 'Coimbatore').trim();
      const key = `${country}||${state}||${district}`;
      if (!seen.has(key)) {
        seen.add(key);
        locations.push({ country, state, district });
      }
    }

    res.json({ locations });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.bookMovie = async (req, res) => {

  const { movieId, seats } = req.body;

  try {
    const db = getDb();
    const movie = db.data.movies.find(m => m._id === movieId);
    if (!movie) return res.status(404).json({ msg: 'Movie not found' });

    // Check if seats are available

    for (let seat of seats) {

      const existingSeat = movie.seats.find(s => s.row === seat.row && s.number === seat.number);

      if (!existingSeat || !existingSeat.available) {

        return res.status(400).json({ msg: 'Seat not available' });

      }

    }

    // Mark seats as booked

    for (let seat of seats) {

      const index = movie.seats.findIndex(s => s.row === seat.row && s.number === seat.number);

      movie.seats[index].available = false;

    }

    db.data.bookings.push({
      _id: createId('booking'),
      user: req.user.id,
      type: 'movie',
      movie: movieId,
      seats,
      date: new Date().toISOString()
    });

    await db.write();

    res.json({ msg: 'Booking successful' });

  } catch (err) {

    res.status(500).json({ msg: 'Server error' });

  }

};

