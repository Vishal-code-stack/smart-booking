const Movie = require('../models/Movie');

const Booking = require('../models/Booking');

exports.getMovies = async (req, res) => {

  try {

    const movies = await Movie.find();

    res.json(movies);

  } catch (err) {

    res.status(500).json({ msg: 'Server error' });

  }

};

exports.bookMovie = async (req, res) => {

  const { movieId, seats } = req.body;

  try {

    const movie = await Movie.findById(movieId);

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

    await movie.save();

    const booking = new Booking({ user: req.user.id, type: 'movie', movie: movieId, seats });

    await booking.save();

    res.json({ msg: 'Booking successful' });

  } catch (err) {

    res.status(500).json({ msg: 'Server error' });

  }

};