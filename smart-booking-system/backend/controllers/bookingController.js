const { getDb } = require('../db');

exports.getBookings = async (req, res) => {

  try {

    const db = getDb();
    const bookings = db.data.bookings
      .filter(b => b.user === req.user.id)
      .map(b => {
        const out = { ...b };
        if (b.type === 'movie') {
          out.movie = db.data.movies.find(m => m._id === b.movie);
        }
        if (b.type === 'flight') {
          out.flight = db.data.flights.find(f => f._id === b.flight);
        }
        return out;
      });

    res.json(bookings);

  } catch (err) {

    res.status(500).json({ msg: 'Server error' });

  }

};